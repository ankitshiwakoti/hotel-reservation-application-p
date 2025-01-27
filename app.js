const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sequelizedb = require('./utils/database');

const server = express();

server.set('view engine', 'ejs');
server.set('views', 'views');

sequelizedb.sync()
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });

server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, 'public')));


const indexRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');

// Use the routes
server.use(indexRoutes);
server.use(adminRoutes);

const port = 3002;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
