
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const dotenv=require("dotenv");
dotenv.config({path:'./config.env'});
require('./db/conn');
const express=require('express');

const PORT=process.env.PORT;
const app=express();
app.use(express.json());
    app.use(require('./router/auth'));
    app.use(require('./router/neccessaryField'));
    app.use(require('./router/email'));
    
app.get('/',(req,res)=>{

    res.send('hello server world ');
})

app.get('/home',(reqs,ress)=>{
    ress.send('this is home page');
})

app.listen(PORT
    
    ,()=>{
    console.log('server is running at port no 4001');
}
)





