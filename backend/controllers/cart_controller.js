const Cart = require('../models/Cart');
const { sendResponseError } = require('../helpers/custom_responses');
const jwt = require('jsonwebtoken');


const getUserIdFromToken = (token) => {
    const tokenParts = token.split(' ');
    const bearerToken = tokenParts[1];
    const decodedToken = jwt.decode(bearerToken);
    if (decodedToken && decodedToken.id) {
        return decodedToken.id;
    } else {
        return null;
    }
};

const getCartProducts = async (req, res) => {
    const token = req.headers.authorization;
    const userId = getUserIdFromToken(token);

    console.log(userId)
    // res.status(200).json({message: "successful"});

    try {
      const carts = await Cart.find({userId: userId}).populate('productId')
      res.status(200).json({message: "successful" ,data: carts});
    } catch (err) {
      console.error(err)
      sendResponseError(500, `Error ${err}`, res)
    }
    
  }

const addProductToCart = async (req, res) => {
    const {productId, count} = req.body

    try{
        const cart = await Cart.findOneAndUpdate(
            {productId},
            {productId, count, userId: req.user._id},
            {upsert: true},
          )
          res.status(200).json({message: "successful" ,data: cart});
    }catch(err){
        console.error(err)
        sendResponseError(500, `Error ${err}`, res)
    }
} 

const deleteProductFromCart = async (req, res) => {
    try {
        await Cart.findByIdAndRemove(req.params.id)
        res.status(200).json({message: "successfully deleted"});
    } catch (e) {
        console.log(err)
        sendResponseError(500, `Error ${err}`, res)
    }
}

module.exports = {
    getCartProducts,
    addProductToCart,
    deleteProductFromCart
}

