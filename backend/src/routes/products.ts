import express from "express";
import * as ProductsController from '../controllers/products'


const productsRouter = express.Router();

productsRouter.get("/", ProductsController.getAllProducts);
productsRouter.get("/product/:productId", ProductsController.getProduct);
productsRouter.get("/search/:queryParam", ProductsController.searchProducts);

productsRouter.post('/products', ProductsController.createProduct);
productsRouter.put('/products/:productId', ProductsController.updateProduct);
productsRouter.delete('/products/:productId', ProductsController.deleteProduct);

export default productsRouter;