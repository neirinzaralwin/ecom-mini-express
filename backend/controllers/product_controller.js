const Product = require('../models/Product');


const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({message: "successful" ,data: products});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json({message: "successful" ,data: product});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
  };

module.exports = {
    getProducts,
    getProductById,
  };  