import Order from '../models/order.model';
import Product from '../models/product.model';
import { Request, Response } from 'express';

export class OrderController {
    static async createOrder(req: Request, res: Response) {
        try {
            const order = new Order(req.body);
            await order.save();
            res.status(201).json(order);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export class OrderListController {
    static async getOrders(req: Request, res: Response) {
        try {
            const orders = await Order.find();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export class OrderByIdController {
    static async getOrder(req: Request, res: Response) {
        try {
            const order = await Order.findById(req.params.id);
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export class OrderUpdateController {
    static async updateOrder(req: Request, res: Response) {
        try {
            const order = await Order.findByIdAndUpdate(req
                .params.id, req.body
            );
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export class OrderDeleteController {
    static async deleteOrder(req: Request, res: Response) {
        try {
            await Order.findByIdAndDelete(req.params.id);
            res.status(204).json();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}