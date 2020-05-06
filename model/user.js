const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt');

const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'User Should Have A First Name']
    },
    lastName:{
        type:String,
        required:[true,'User Should Have A Last Name']
    },
    mobileNumber:{
        type:String,
        required:[true,'User Should Have A Mobile Number'],
        unique:true
    },
    email:{
        type:String,
        required:[true,'User Should Have A Email Address'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Enter A Valid Email']
    },
    password:{
        type:String,
        minLength:8,
        required:[true,'User Should Have A Password']
    },    
    passwordConfirm:{
        type:String,
        minLength:8,
        validate:[function match(el){ 
                return el===this.password;
            },'Password Not Matching'
        ]
    },
    age:{
        type:Number
    },
    disease:{
        type:String,
    },
    city:{
        type:String,
        required:[true,'User Should Have A City']
    },
    bloodGroup:{
        type:String,
        required:[true,'User Should Have A Blood Group']
    }

});


userSchema.pre('save',async function (next){
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password,12);
    this.passwordConfirm=undefined;
    next();
});



const User=new mongoose.model('User',userSchema);
module.exports=User;


