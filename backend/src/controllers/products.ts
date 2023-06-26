import { RequestHandler } from "express";
import ProductModel, { Product } from "../models/product";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { paginateResults } from "../middlewares/pagination";




export const getAllProducts: RequestHandler = async (req, res, next) => {
  try {
    const paginatedResults = await paginateResults(ProductModel, {}, req);

    res.status(200).json(paginatedResults);
  } catch (error) {
    next(error);
  }
};




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

    res.json(searchResults || [] );
  } catch (error) {
    next(error);
  }
};




// Create a product
export const createProduct: RequestHandler = async (req, res, next) => {
  try {
    const productData = req.body as Product;
    const newProduct = await ProductModel.create(productData);
    res.status(201).json(newProduct);
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