
const dotenv=require("dotenv");

const mongoose = require("mongoose")
dotenv.config({path:'./config.env'});
require('./db/conn');
const express=require('express');

// require('dotenv').config();
// const DB=process.env.DB;
const PORT=process.env.PORT;
// import express from 'express'
const app=express();

/// fat arrow function

app.get('/',(req,res)=>{

    res.send('hello server world ');
})

console.log("DB:->"+DB)

//middlewares 



const middlewareF=(req,res, next)=>{
console.log('middlewale is running on console');
    // res.send('middleware is running');
    next();
}


app.get('/about',middlewareF,(req,res)=>{

    res.send('this is about page');
})
app.get('/home',(reqs,ress)=>{
    ress.send('this is home page');
})
app.listen(PORT
    
    ,()=>{
    console.log('server is running at port no 4001');
}
)





