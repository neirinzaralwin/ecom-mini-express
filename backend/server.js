require("dotenv").config();
const express = require('express');
const productRoutes = require('./routes/product_route');
const cartRoutes = require('./routes/cart_route');
const userRoutes = require('./routes/user_route');
const { connectDB } = require("./config/db");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.get('/', (_, res) => {
    res.json({
        message: 'API is running'
    });
});
app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));