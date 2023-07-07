import { RequestHandler } from "express";
import ProductModel, { Product } from "../models/product";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { paginateResults } from "../middlewares/pagination";
import { getFromCache, setInCache } from "../redisCache";
import { AuthRequest } from "./user";
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { upload } from "../middlewares/uploadMiddleware";
import { extractPublicIdFromImageUrl, validateFields } from "../utils/helpers";


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


export const getAllProducts: RequestHandler = async (req, res, next) => {
  try {

    const paginatedResults = await paginateResults(ProductModel, {}, req)

    res.status(200).json(paginatedResults);
  } catch (error) {
    next(error);
  }
};

// export const getAllProducts: RequestHandler = async (req, res, next) => {
//   try {
//     const limit = Number(req.query.limit)
//     const cacheKey = `allProducts:${limit}`;

//     const cachedData = await getFromCache(cacheKey);
//     if (cachedData) {
//       res.status(200).json(cachedData);
//       return;
//     }

//     const paginatedResults = await paginateResults(ProductModel, {}, req);

//     // Store the fetched data in the cache
//     await setInCache(cacheKey, paginatedResults);

//     res.status(200).json(paginatedResults);
//   } catch (error) {
//     next(error);
//   }
// };


// export const getAllProducts: RequestHandler = async (req, res, next) => {
//   try {
//     const limit = Number(req.query.limit);
//     const cacheKey = `allProducts:${limit}`;

//     const cachedData = await getFromCache(cacheKey);
//     if (cachedData) {
//       res.status(200).json(cachedData);
//       return;
//     }

//     const paginatedResults = await paginateResults(ProductModel, {}, req);

//     // const productIds = paginatedResults.results.map(product => product.savedItems);

//     // Populate the savedItems field with product data
//     await ProductModel.populate(paginatedResults.results, { path: 'savedItems', select: 'name price' });

//     // Store the fetched data in the cache
//     await setInCache(cacheKey, paginatedResults);

//     res.status(200).json(paginatedResults);
//   } catch (error) {
//     next(error);
//   }
// };





export const getProduct: RequestHandler = async (req, res, next) => {
  const productId = req.params.productId;

  try {

    if (!mongoose.isValidObjectId(productId)) {
      throw createHttpError(400, "invalid products id")
    }

    const note = await ProductModel.findById(productId).exec();

    if (!note) {
      throw createHttpError(404, "Products not found");
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};


export const searchProducts: RequestHandler = async (req, res, next) => {
  const { queryParam } = req.params;

  if (!queryParam) {
    throw createHttpError(400, "Missing query parameter");
  }

  try {
    const searchResults = await paginateResults(ProductModel, {
      $or: [
        { category: { $regex: new RegExp(`^${queryParam}$`, 'i') } },
        { name: { $regex: queryParam, $options: 'i' } },
        { brand: { $regex: queryParam, $options: 'i' } },
      ],
    }, req);

    res.json(searchResults || []);
  } catch (error) {
    next(error);
  }
};


export const toggleSavedProduct: RequestHandler = async (req: AuthRequest, res, next) => {
  try {
    const productId = req.params.productId;
    const userId = req.user.id;

    if (!mongoose.isValidObjectId(productId)) {
      throw createHttpError(400, 'Invalid product ID');
    }

    const user = await UserModel.findById(userId).exec();

    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    const isProductSaved = user.savedItems.includes(productId);

    if (isProductSaved) {
      user.savedItems = user.savedItems.filter((item) => item.toString() !== productId);
    } else {
      user.savedItems.unshift(productId);
    }

    await user.save();

    res.json({ message: 'Saved Items Updated' });
  } catch (error) {
    next(error);
  }
};





// Create a product
// export const createProduct: RequestHandler = async (req: AuthRequest, res, next) => {
//   const sellerId = req.user.id;

//   try {
//     const productData = req.body as Product;
//     productData.sellerId = sellerId; // Add the sellerId to the product data
//     const newProduct = await ProductModel.create(productData);
//     res.status(201).json({ message: `${newProduct.name} was successfully created` });
//   } catch (error) {
//     next(error);
//   }
// };



export const createProduct: RequestHandler = async (req: AuthRequest, res, next) => {
  try {
    const sellerId = req.user.id;

    upload.single('image')(req, res, async (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ message: 'File size exceeds the limit. Maximum file size allowed is <600KB.' });
        }
        return next(err);
      }

      const productData = req.body as Product;

      const validation = validateFields({ ...productData });
      if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
      }

      const file = req.file;
      if (!file) return res.status(400).json({ message: 'No file uploaded' });


      const user = await UserModel.findById(sellerId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const randomString = `${user.username}_${Math.random().toString(36).substring(2)}_${Date.now()}`;
      const uploadResult = await cloudinary.uploader.upload(file.path, { folder: 'enchante', public_id: randomString });
      
      const imageUrl = uploadResult.secure_url;
      const sizesArray = req.body.sizes.split(',').map((sizeString: string) => sizeString.trim());
      
      productData.image = imageUrl
      productData.sizes = sizesArray
      const createdProduct = await ProductModel.create(productData);

      return res.status(201).json({ message: `${createdProduct.name} was successfully created`, data: createdProduct });
    });
  } catch (error) {
    next(error);
  }
};



export const updateProduct: RequestHandler = async (req: AuthRequest, res, next) => {
  try {
    const productId = req.params.productId;
    const userId = req.user.id;

    if (!mongoose.isValidObjectId(productId)) {
      throw createHttpError(400, 'Invalid product ID');
    }

    const product = await ProductModel.findById(productId).exec();

    if (!product) {
      throw createHttpError(404, 'Product not found');
    }

    if (req.user.role !== 'admin' && product.sellerId.toString() !== userId) {
      throw createHttpError(403, 'Unauthorized to update product');
    }


    upload.single('image')(req, res, async (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ message: 'File size exceeds the limit. Maximum file size allowed is <600KB.' });
        }
        return next(err);
      }

      const { name, category, desc, sizes, color, free_shipping, brand, price, new_product, discount, star_ratings } = req.body;

      const validation = validateFields({ name, category, desc, sizes, color, free_shipping, brand, price, new_product, discount, star_ratings });
      if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      
      const user = await UserModel.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      
      // Delete the old image from Cloudinary
      if (product.image) {
        const oldImagePublicId = extractPublicIdFromImageUrl(product.image);
        await cloudinary.uploader.destroy(oldImagePublicId);
      }
      
      const randomString = `${user.username}_${Math.random().toString(36).substring(2)}_${Date.now()}`;
      const uploadResult = await cloudinary.uploader.upload(req.file.path, { folder: 'enchante', public_id: randomString });
      const imageUrl = uploadResult.secure_url;
      

      const updateData = {
        name: name,
        category: category,
        desc: desc,
        image:imageUrl,
        sizes: sizes.split(',').map((sizeString) => sizeString.trim()),
        color: color,
        free_shipping: free_shipping,
        brand: brand,
        price: price,
        new_product: new_product,
        discount: discount,
        star_ratings: star_ratings,
      };

      const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updateData, { new: true }).exec();

      if (!updatedProduct) {
        throw createHttpError(404, 'Product not found');
      }

      return res.status(200).json({ message: `${updatedProduct.name} was successfully updated`, data: updatedProduct });
    });
  } catch (error) {
    next(error);
  }
};







export const deleteProduct: RequestHandler = async (req: AuthRequest, res, next) => {
  try {
    const productId = req.params.productId;
    const userId = req.user.id;

    if (!mongoose.isValidObjectId(productId)) {
      throw createHttpError(400, 'Invalid product ID');
    }

    const product = await ProductModel.findById(productId).exec();

    if (!product) {
      throw createHttpError(404, 'Product not found');
    }

    if (req.user.role !== 'admin' && (!product.sellerId || product.sellerId.toString() !== userId)) {
      throw createHttpError(403, 'Unauthorized to delete product');
    }

    const imagePublicId = extractPublicIdFromImageUrl(product.image);

    try {
      const deletionResponse = await cloudinary.uploader.destroy(imagePublicId);

      if (deletionResponse.result !== 'ok') {
        throw createHttpError(400, 'Error deleting file from Cloudinary');
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        ok: false,
        message: 'Error deleting file',
        errors: error,
      });
    }

    await ProductModel.findByIdAndDelete(productId).exec();

    res.status(200).json({ message: 'Product erased!' });
  } catch (error) {
    next(error);
  }
};