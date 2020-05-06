const express=require('express');
const userRouter=require('./routes/user');
const morgan=require('morgan');
const app=express();
const bodyParser=require('body-parser');
const fs=require('fs');
const path=require('path');

app.set('view engine','pug');

app.set('views',path.join(__dirname+'/views'));

app.use(express.static('public'));
app.use(express.json());

app.use(morgan('dev'));



app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
app.use((req,res,next)=>{
    console.log('Middleware');
    next();
});




app.get('/',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname+'/TheIndex.html'));
});

app.use('',userRouter);




module.exports=app;