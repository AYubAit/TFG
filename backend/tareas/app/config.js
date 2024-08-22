const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  mongoURI: process.env.MONGODB_URI,
  
  port: process.env.PORT || 3001,
};