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







// export const createProduct: RequestHandler = async (req: AuthRequest, res, next) => {
//   const sellerId = req.user.id;
//   console.log("seller_id", sellerId);

//   try {
//     upload.single('image')(req, res, async (err) => {
//       if (err) {
//         return next(err);
//       }

//       const file = req.file;
//       console.log('file', file);
//       if (!file) {
//         return res.status(400).json({ message: 'No file uploaded' });
//       }

//       const { name, category, desc, sizes, color, free_shipping, brand, price, new_product, discount, star_ratings } = req.body;

//       if (!name) {
//         return res.status(400).json({ message: 'Name is a required field' });
//       }
//       if (!category) {
//         return res.status(400).json({ message: 'Category is a required field' });
//       }


//       const user = await UserModel.findById(sellerId);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }

//       const uploadResult = await cloudinary.uploader.upload(file.path, {
//         folder: 'enchante',
//         public_id: `${user.username}_${file.originalname}`,
//       });

//       const imageUrl = uploadResult.secure_url;
//       const sizesArray = sizes.split(',').map((sizeString: string) => sizeString.trim());


//       const newProduct = new ProductModel({
//         name: name,
//         category: category,
//         sellerId: sellerId,
//         image: imageUrl,
//         desc: desc,
//         sizes: sizesArray,
//         color: color,
//         free_shipping: free_shipping,
//         brand: brand,
//         price: price,
//         new_product: new_product,
//         discount: discount,
//         star_ratings: star_ratings
//       });

//       const createdProduct = await newProduct.save();
//       return res.status(201).json({ message: `${createdProduct.name} was successfully created`, data: createdProduct });
//     });
//   } catch (error) {
//     next(error);
//   }
// };




export const createProduct: RequestHandler = async (req: AuthRequest, res, next) => {
  try {
    const sellerId = req.user.id;

    upload.single('image')(req, res, async (err) => {
      if (err) {
        return next(err);
      }

      const { name, category, desc, sizes, color, free_shipping, brand, price, new_product, discount, star_ratings } = req.body;

      const validateFields = (fields) => {
        switch (false) {
          case Boolean(fields.name):
            return { isValid: false, message: 'Name is a required field' };
          case Boolean(fields.category):
            return { isValid: false, message: 'Category is a required field' };
          case Boolean(fields.desc):
            return { isValid: false, message: 'Description is a required field' };
          case Boolean(fields.sizes):
            return { isValid: false, message: 'Sizes is a required field' };
          case Boolean(fields.color):
            return { isValid: false, message: 'Color is a required field' };
          case Boolean(fields.free_shipping):
            return { isValid: false, message: 'Free shipping is a required field' };
          case Boolean(fields.brand):
            return { isValid: false, message: 'Brand is a required field' };
          case Boolean(fields.price):
            return { isValid: false, message: 'Price is a required field' };
          case Boolean(fields.new_product):
            return { isValid: false, message: 'New product is a required field' };
          case Boolean(fields.discount):
            return { isValid: false, message: 'Discount is a required field' };
          case Boolean(fields.star_ratings):
            return { isValid: false, message: 'Star ratings is a required field' };
          default:
            return { isValid: true };
        }
      };

      const validation = validateFields({ name, category, desc, sizes, color, free_shipping, brand, price, new_product, discount, star_ratings });
      if (!validation.isValid) {
        return res.status(400).json({ message: validation.message });
      }
      
      const file = req.file;
      if (!file) return res.status(400).json({ message: 'No file uploaded' });


      const user = await UserModel.findById(sellerId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const folderName = 'enchante';
      const uploadResult = await cloudinary.uploader.upload(file.path, { folder: folderName, public_id: `${user.username}_${file.originalname}` });
      const imageUrl = uploadResult.secure_url;
      const sizesArray = sizes.split(',').map((sizeString: string) => sizeString.trim());

      const newProduct = new ProductModel({
        name: name,
        category: category,
        sellerId: sellerId,
        image: imageUrl,
        desc: desc,
        sizes: sizesArray,
        color: color,
        free_shipping: free_shipping,
        brand: brand,
        price: price,
        new_product: new_product,
        discount: discount,
        star_ratings: star_ratings,
      });

      const createdProduct = await newProduct.save();
      return res.status(201).json({ message: `${createdProduct.name} was successfully created`, data: createdProduct });
    });
  } catch (error) {
    next(error);
  }
};





// Update a product
export const updateProduct: RequestHandler = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const updateData = req.body as Partial<Product>;

    if (!mongoose.isValidObjectId(productId)) {
      throw createHttpError(400, 'Invalid product ID');
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updateData, {
      new: true,
    }).exec();

    if (!updatedProduct) {
      throw createHttpError(404, 'Product not found');
    }

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// Delete a product
export const deleteProduct: RequestHandler = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    if (!mongoose.isValidObjectId(productId)) {
      throw createHttpError(400, 'Invalid product ID');
    }

    const deletedProduct = await ProductModel.findByIdAndDelete(productId).exec();

    if (!deletedProduct) {
      throw createHttpError(404, 'Product not found');
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

