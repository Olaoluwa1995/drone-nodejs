const mongoose = require('mongoose');
const { mongodbUri } = require('.');

module.exports = {
  connect: async () => {
    mongoose
      .connect(mongodbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log('Successfully connected to database');
      })
      .catch((error) => {
        console.log('database connection failed. exiting now...');
        console.error(error);
        process.exit(1);
      });
  },

  disconnect: async () => {
    mongoose.connection.close();
  }
};