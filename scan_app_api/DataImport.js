const express = require("express");
const { Product } = require("./models/productModel.js");
const productData = require("./data/ProductsData.js");
const asyncHandler = require("express-async-handler");
const { generateQRCode } = require("./generateQRCode.js");
const { uploadQRCode } = require("./firebase/firebase.js");
const { deleteQRCode } = require("./deleteQRCode.js");

const ImportData = express.Router();

ImportData.post(
  "/products",
  asyncHandler(async (req, res) => {
    // await Product.remove({});
    console.log(productData);
    const importProducts = await Product.insertMany(productData);
    res.send({ importProducts });
  })
);

ImportData.delete("/products", async (req, res) => {
  const products = await Product.deleteMany({});
});
ImportData.get(
  "/products",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    if (products.length > 0) {
      products.forEach(async (product) => {
        const qrCodeFilePath = await generateQRCode(product._id);
        // const uploadedQrCode = await uploadQRCode(qrCodeFilePath);
        if (qrCodeFilePath) {
          // deleteQRCode(qrCodeFilePath);
          product.qrcode = `/qrcodes/${product._id}.png`;
        }
        await product.save();
      });
    }
    res.json(products);
  })
);

module.exports = { ImportData };
