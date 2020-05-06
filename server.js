const mongoose=require('mongoose');
const express=require('express');
const dotenv=require('dotenv');
const fs=require('fs')

const app=require('./app');

dotenv.config({path:`./config.env`});


const DB=process.env.DATABASE.replace('<password>',process.env.PASSWORD);

mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>{console.log('Database Online');});


app.listen(3000,()=>{
    console.log('App Up And Running');
});





