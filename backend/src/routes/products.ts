import express from "express";
import * as ProductsController from '../controllers/products'
import { protect } from "../middlewares/authProtect";


const productsRouter = express.Router();

productsRouter.get("/", ProductsController.getAllProducts);
productsRouter.get("/product/:productId", ProductsController.getProduct);
productsRouter.get("/search/:queryParam", ProductsController.searchProducts);

productsRouter.put('/:productId/like', ProductsController.toggleSavedProduct);
productsRouter.post('/create-product', protect, ProductsController.createProduct);
productsRouter.get('/seller-products', protect, ProductsController.getSellerProducts);
productsRouter.put('/update-product/:productId', protect, ProductsController.updateProduct);
productsRouter.delete('/delete-product/:productId', protect, ProductsController.deleteProduct);

productsRouter.get('/orders', protect, ProductsController.getUserOrders);
productsRouter.get('/order/:orderId', protect, ProductsController.getOrder);
productsRouter.delete('/delete-order/:orderId', protect, ProductsController.deleteOrder);

export default productsRouter;