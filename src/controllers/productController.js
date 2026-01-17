const Product = require("../models/Product");


exports.createProduct = async (req, res) => {
    try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
};


exports.getProducts = async (req, res) => {
    try {
        let { search, category, minPrice, maxPrice, rating, page, limit } = req.query;

        let query = {};


        if (search) {
        query.name = { $regex: search, $options: "i" };
        }


        if (category) {
        query.category = category;
        }


        if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        
        if (rating) {
        query.rating = { $gte: Number(rating) };
        }

        
        page = Number(page) || 1;
        limit = Number(limit) || 10;
        const skip = (page - 1) * limit;

        const total = await Product.countDocuments(query);
        const products = await Product.find(query).skip(skip).limit(limit);

        res.json({
        total,
        page,
        pages: Math.ceil(total / limit),
        products
        });

    }catch (error) {
            res.status(500).json({ error: error.message });
        }
};


exports.updateProduct = async (req, res) => {
    try {
    const updated = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (!updated) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json(updated);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
};
