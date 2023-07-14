const serverless = require("serverless-http");
const app = require('./src/singleton/app');
const cors = require('cors');
const express = require('express');
const morgan = require("morgan");
const updateDB = require("./src/apis/updateDB");



app.use(cors({credentials:true,origin:true}));
app.use(express.json());
app.use(morgan('tiny'));


app.get('/',(req,res) => {
  
  res.json({
    name:'get'
  });
});

app.post('/',(req,res) => {
  res.json({
    name:'post'
  });
});

app.get('/updateDB',updateDB);

module.exports.handler = serverless(app);