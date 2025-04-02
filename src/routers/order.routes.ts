import { Router } from "express";
import { OrderController } from "../controllers/order.controller";

export const orderRouter = Router()

orderRouter.post('/', OrderController.createOrder)
orderRouter.get('/', OrderController.getOrders)
orderRouter.get('/:id', OrderController.getOrder)
orderRouter.put('/:id', OrderController.updateOrder)
orderRouter.delete('/:id', OrderController.deleteOrder)