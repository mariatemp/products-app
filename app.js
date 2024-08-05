require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

app.use(express.json());

const productRoutes = require('./routes/product.route');
const userRoutes = require('./routes/user.route');
const userProductsRoutes = require('./routes/user.products.routes');

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/user-products', userProductsRoutes);

app.listen(port, () => {
  console.log("Server is up");
});

module.exports = app;
