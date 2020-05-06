const express=require('express');
const fs=require('fs');
const auth=require('./../controller/auth');
const userController=require('./../controller/usercontroller');
var path=require('path');

const route=express.Router();


route.route('/signup')
    .post(auth.signUp);

route.route('/login')
    .get((req,res)=>{
        res.sendFile(path.join(__dirname+'/..'+'/index_reg.html'));
    })
    .post(auth.login);
    

route.route('/reg')
    .get((req,res)=>{
        res.sendFile(path.join(__dirname+'/..'+'/index.html'));
    });


route.route('/results')
        .get(auth.results);

route.route('/deleteall4b')
     .delete(userController.deleteAll);  



module.exports=route;