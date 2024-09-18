import { Router } from "express";

import { verifyToken } from "../middlewares/AuthMiddleware.js";
import {
  
  confirmOrder,
  createOrder,
  getBuyerOrders,
  getSellerOrders,
  releasePayment,
} from "../controllers/OrdersControllers.js";

export const orderRoutes = Router();

orderRoutes.post("/create", verifyToken, createOrder);
orderRoutes.put("/success", verifyToken, confirmOrder);
orderRoutes.put("/release-payment", verifyToken, releasePayment);
orderRoutes.get("/get-buyer-orders", verifyToken, getBuyerOrders);
orderRoutes.get("/get-seller-orders", verifyToken, getSellerOrders);

