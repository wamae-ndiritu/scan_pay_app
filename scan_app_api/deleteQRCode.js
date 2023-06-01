const fs = require("fs");

const deleteQRCode = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`${filePath} has been deleted`);
  });
};

module.exports = { deleteQRCode };
