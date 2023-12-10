// const express=require('express');

import express from 'express'
const app=express();

/// fat arrow function

app.get('/',(req,res)=>{

    res.send('hello server world ');
})


app.listen(4001
    
    ,()=>{
    console.log('server is running at port no 4001');
}
)






//// Server without express


// var http=require('http');

// http.createServer( (req,res)=>{
//     res.writeHead(200,{' Content-Type':'text/plain'});
//     res.end('hello world');

// }).listen(4001);




///by ecmascript

// import { createServer } from 'http';

// createServer( (req,res)=>{
//     res.writeHead(200,{' Content-Type':'text/plain'});
//     res.end('hello world');

// }).listen(4001);

