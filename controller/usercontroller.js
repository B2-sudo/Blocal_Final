const mongoose=require('mongoose');
const User=require('./../model/user.js');

exports.deleteAll=async (req,res)=>{
 try{  
    await User.deleteMany();
    res.status(200).json({
        'status':'Database Cleared',
        
    });
 }catch (err){
     console.log(err);
     res.status(500).send('SOME SERIOUS FUCKIN ERROR!');
 }

}