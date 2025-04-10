import { getAllProducts , placeOrder} from "./controller.product.js";
import { Router } from "express";

const productRouter = new Router() //create router to handling product related controllers

productRouter.get("/", getAllProducts)
productRouter.post("/place-order",placeOrder)

export default productRouter