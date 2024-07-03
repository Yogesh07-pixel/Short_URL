const mongoose = require("mongoose");

async function ConnectToMongoDB(url) {
  return mongoose.connect(url);
}

module.exports = {
  ConnectToMongoDB,
};
