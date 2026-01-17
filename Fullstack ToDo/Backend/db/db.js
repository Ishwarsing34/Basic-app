const mongoose = require("mongoose");

async function ConnectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log("DB CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.error("ERROR CONNECTING TO DB:", error.message);
    process.exit(1);
  }
}

module.exports = ConnectDB;


