const log = require('./tools/log');
try {
  require('dotenv').config();
  const express = require('express');
  const app = express();
  const mongoose = require('mongoose');
  app.use(express.json());
  app.use(require('cors')())
  const port = process.env.PORT || 8000;
  const dbUrl = process.env.DBURL;
  // Database Connection Eastablishation
  mongoose.connect(dbUrl).then(() => {
    console.log('Connected to MongoDB successfully!');
  }).catch((error) => {
    log(error);
  });

  // routes configuration setup
  app.use('/seller', require("./routes/seller/sellerRoutes"));
  app.use('/seller/item', require("./routes/seller/item/item"));
  app.use('/user', require('./routes/user/userRoutes'));
  app.use('/user/item', require("./routes/user/item/itemRoutes"));
  // server runner code
  app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}/`);
  })
} catch (error) {
  log(error);
}