const Cart=require("../models/Cart");
const Product = require("../models/Product");

exports.addToCart=async(req, res)=>{
    try{
        const userId=req.user.id;
        const {productId, quantity} = req.body;

        let cart = await Cart.findOne({user: userId});

        if(!cart){
            cart=await Cart.create({user:userId, items:[]});
        }

        const productIndex=cart.items.findIndex(
            items=>item.product.toString()===productId
        );

        if(productIndex>-1){
            cart.items[productIndex].quantity+=quantity||1;
        }else{
            cart.items.push({product:productId, quantity: quantity||1});
        }

        await cart.save();
        res.json(cart);
    } catch(error){
        res.status(500).json({error: error.message});
    }
};
exports.updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const item = cart.items.find(
        item => item.product.toString() === productId
        );

        if (!item) return res.status(404).json({ message: "Item not in cart" });

        item.quantity = quantity;
        await cart.save();

        res.json(cart);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;

        let cart = await Cart.findOne({ user: userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(
        item => item.product.toString() !== productId
        );

        await cart.save();
        res.json(cart);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        if (!cart) return res.status(404).json({ message: "Cart is empty" });

        let total = 0;
        cart.items.forEach(item => {
        total += item.product.price * item.quantity;
        });

        res.json({
        cart,
        totalPrice: total
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};