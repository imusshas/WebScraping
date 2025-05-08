import { Router } from "express";
import { getSearchedProducts } from "../controllers/products.controller.js";

const productRoute = Router();

productRoute.route("/:searchKey/:currentPage").get(getSearchedProducts);

export { productRoute };