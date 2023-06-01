const mongoose = require("mongoose");

const connectDatabase = async () => {
  // Error: URI must include hostname, domain name, and tld => fixed by encoding special characters in the pass
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDatabase };
