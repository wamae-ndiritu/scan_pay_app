// const JsBarcode = require("jsbarcode");
const QRCode = require("qrcode");
const { createCanvas } = require("canvas");
const path = require("path");
const base_url = process.env.qr_code_base_url;

const generateQRCode = async (productId) => {
  const canvas = createCanvas(1);

  const url = `${base_url}/${productId}`;
  const qrcodePath = path.join(__dirname, "qrcodes", `${productId}.png`);

  await new Promise((resolve, reject) => {
    QRCode.toFile(qrcodePath, url, { width: 300 }, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log("QR Code generated!");
        resolve();
      }
    });
  });

  console.log(qrcodePath);

  return qrcodePath;

  //   JsBarcode(canvas, `http://localhost/produxts/${productId}`, {
  //     width: 1,
  //     displayValue: true,
  //     // fontSize: 14,
  //     // text: productId,
  //     textAlign: "center",
  //   });
  //   const buffer = canvas.toBuffer("image/png");
  //   fs.writeFileSync(qrcodePath, buffer);
};

module.exports = { generateQRCode };
