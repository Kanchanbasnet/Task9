const express = require('express');
const dotenv = require('dotenv');
dotenv.config()
const userRouter = require('../server/src/routes/User.Route')
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = require('swagger-jsdoc');
const path = require('path');
const app = express();
const loggermiddleware = require('./src/middlewares/logger.middleware');



app.get('/', (req, res) => {
  res.send('Hello, Server!');
});


app.use(express.json());
const options = {
   definition: {
     openapi: "3.0.0",
     info: {
       title: "USER API",
       version: "1.0.0",
       description: "This is the USER API application made with express. It is a simple Express USER API.",
     },
     servers: [
       {
         url: "https://nodeapplication-hvwu.onrender.com",
       },
     ],
   },
   apis: [path.resolve(__dirname, '../server/docs/*.js')]
 };
 
const specs = swaggerDocs(options);
app.use(loggermiddleware);
app.use('/api/users', userRouter);
app.use('/docs',swaggerUI.serve, swaggerUI.setup(specs))





module.exports=app
