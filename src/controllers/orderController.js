const Order = require("../models/Order");
const Cart = require("../models/Cart");


exports.placeOrder = async (req, res) => {
    try {
        const userId = req.user.id;

        
        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
        }

        
        let totalAmount = 0;
        const orderItems = cart.items.map(item => {
        totalAmount += item.product.price * item.quantity;
        return {
            product: item.product._id,
            quantity: item.quantity
        };
        });

        
        const order = await Order.create({
        user: userId,
        items: orderItems,
        totalAmount
        });

        
        cart.items = [];
        await cart.save();

        res.status(201).json({
        message: "Order placed successfully",
        order
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getMyOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        const orders = await Order.find({ user: userId })
        .populate("items.product")
        .sort({ createdAt: -1 });

        res.json(orders);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
