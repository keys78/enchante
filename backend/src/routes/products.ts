import express from "express";
import * as ProductsController from '../controllers/products'
import { protect } from "../middlewares/authProtect";


const productsRouter = express.Router();

productsRouter.get("/", ProductsController.getAllProducts);
productsRouter.get("/product/:productId", ProductsController.getProduct);
productsRouter.get("/search/:queryParam", ProductsController.searchProducts);
productsRouter.put('/:productId/like', protect, ProductsController.toggleSavedProduct);


productsRouter.post('/products', ProductsController.createProduct);
productsRouter.put('/products/:productId', ProductsController.updateProduct);
productsRouter.delete('/products/:productId', ProductsController.deleteProduct);

export default productsRouter;