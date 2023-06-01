const express = require("express");
const path = require("path");
const barcode = require("barcode");
const asyncHandler = require("express-async-handler");
const { protect, admin } = require("../Middlewares/authMiddleware");
const { Product } = require("../models/productModel");
const { generateQRCode } = require("../generateQRCode");
const { uploadQRCode } = require("../firebase/firebase");
const { deleteQRCode } = require("../deleteQRCode");

const productRouter = express.Router();

// CREATE PRODUCT
productRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const product = req.body;
    const title = product.title;
    const price = product.price;
    const image = product.image;
    const description = product.description;
    const category = product.category;
    const quantity = product.quantity;

    const productExist = await Product.findOne({ title });
    if (productExist) {
      res
        .status(400)
        .json({ message: "Product with the title already exists" });
    } else {
      const newproduct = new Product({
        title,
        price,
        image,
        description,
        category,
        quantity,
      });
      if (newproduct) {
        const createdproduct = await newproduct.save();

        const qrCodeFilePath = await generateQRCode(createdproduct._id);
        const uploadedQrCode = await uploadQRCode(qrCodeFilePath);
        if (uploadedQrCode) {
          deleteQRCode(qrCodeFilePath);
          createdproduct.qrcode = uploadedQrCode;
        }
        await createdproduct.save();
        res.status(201).json(createdproduct);
      } else {
        res.status(400).json({ message: "Invalid product data" });
      }
    }
  })
);

// GET ALL PRODUCT
productRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// GET SINGLE PRODUCT
productRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (id !== " ") {
      const product = await Product.findById(req.params.id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Product not found!" });
      }
    }
  })
);

// GET SIMILAR PRODUCTS
productRouter.get("/similar/:id", async (req, res) => {
  const pageSize = 12;
  const product = await Product.findById(req.params.id);

  if (product) {
    const catArray = product.categories;
    const similarProducts = await Product.find({
      categories: { $in: catArray },
    })
      .limit(pageSize)
      .sort({ _id: -1 });
    res.json(similarProducts);
  }
});

// DELETE PRODUCTS
productRouter.delete("/delete", async (req, res) => {
  const products = await Product.deleteMany({});
  if (products) {
    res.status(200).json({ message: "product deleted" });
  }
});

// ADMIN GET ALL PRODUCT WITHOUT SEARCH AND PEGINATION
productRouter.get(
  "/all/products",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ _id: -1 });
    res.json(products);
  })
);

// GET SINGLE PRODUCT
productRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

// DELETE PRODUCT
productRouter.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const product = await Product.findOneAndDelete(req.params.id);
    if (product) {
      res.json({ message: "Product deleted" });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

// UPDATE PRODUCT
productRouter.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { title, image, price, description, category, quantity } = req.body;

    const product = await Product.findById(req.params.id);
    if (product) {
      product.title = title || product.title;
      product.image = image || product.image;
      product.price = price || product.price;
      product.category = category || product.category;
      product.quantity = quantity || product.quantity;
      product.description = description || product.description;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

module.exports = { productRouter };
