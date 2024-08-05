const Product = require('../models/product.model');
const logger = require('../logger/logger');

exports.findAll = async(req, res) => {
  console.log("Find all users");

  try {
    const result = await Product.find();
    res.status(200).json({data: result});
    logger.debug("Success in reading all products");
    logger.info("Success in reading all products");
  } catch(err) {
    console.log(`Problem in reading products, ${err}`)
    logger.error(`Problem in reading all products , ${err}`);
  }
}

exports.findOne = async(req, res) => {
  console.log("Find a product");
  
const product = req.params.product;
  try {
  const result = await Product.findOne({product: product})
  res.status(200).json({ data: result});
  } catch(err) {
  console.log(`Problem in reading product, ${err}`);
  }
}

exports.create = async(req, res) => {
  console.log("Insert product");

  console.log(req.body);

  const newProduct = new Product ({
    product: req.body.product,
    cost: req.body.cost,
    description: req.body.description,
    quantity: req.body.quantity
  });

  try {
    const result = await newProduct.save();
    res.status(200).json({ data:result });
    console.log("Product saved");
  } catch(err) {
    res.status(400).json({data:err});
    console.log("Product in saving product");
  }
}

exports.update = async(req, res) => {
  const product = req.params.product;
  console.log("Update product: ", product);

  const updateProduct = {
    product: req.body.product,
    cost: req.body.cost,
    description: req.body.description,
    quantity: req.body.quantity
  }

  try {
    const result = await Product.findOneAndUpdate (
      {product: product},
      updateProduct,
      {new:true}
    )
    res.status(200).json({data: result});
    console.log("Success in updating product: ", product)
    } catch(err) {
      res.status(400).json({data: err})
      console.log("Problem in updating product: ", product)
    }
  }

  exports.delete = async(req, res) => {
    const product = req.params.product;
    console.log("Delete product: ", product);

    try {
      const result = await Product.findOneAndDelete ({product: product})
      res.status(200).json({data:result});
      console.log("Success in deleting product", product);
    } catch(err) {
      res.status(400).json({data:err})
      console.log("Problem in deleting product", product);
    }
  }
