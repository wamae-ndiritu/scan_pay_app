const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { userRouter } = require("./routes/userRouter");
const { connectDatabase } = require("./connectDB");
const { productRouter } = require("./routes/productRouter");
const { generateBarcode } = require("./generateQRCode");
const { uploadQRCode } = require("./firebase/firebase");
const { ImportData } = require("./DataImport");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDatabase();
// generateBarcode("645d6fbf348a5b2f6677498e");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// API MIDDLEWARE
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);
app.use("/api/import", ImportData);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
