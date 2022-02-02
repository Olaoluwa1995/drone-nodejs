const mongoose = require('mongoose');

const MONGODBURI = process.env.NODE_ENV === 'test'
  ? process.env.MONGO_URI_TEST
  : process.env.MONGO_URI
  
module.exports = {
  connect: async () => {
    mongoose
      .connect(MONGODBURI, {
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