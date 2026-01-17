const express = require("express");
const {
    addToCart,
    updateCartItem,
    removeFromCart,
    getCart
} = require("../controllers/cartController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/add", protect, addToCart);
router.put("/update", protect, updateCartItem);
router.delete("/remove/:productId", protect, removeFromCart);
router.get("/", protect, getCart);

module.exports = router;
