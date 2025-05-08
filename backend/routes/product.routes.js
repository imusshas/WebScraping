import { Router } from "express";
import { getSearchedProducts } from "../controllers/products.controller.js";

const productRoute = Router();

productRoute.route("/:searchKey").get(getSearchedProducts);

export { productRoute };