const mongoose=require('mongoose');
const User=require('./../model/user.js');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');


exports.signUp=async (req,res)=>{
try{
const newUser = await User.create(req.body);
const token=jwt.sign({id:newUser._id},process.env.SECRET,{
    expiresIn:process.env.JWT_EXPIRY
});
res.status(201).json({
    'Status':'Account Created',
    'token':token,
    'data':{newUser}
});
        
}catch (err) {
    console.log(err);
    res.status(500).json({
        'Status':'Failed',
        'reason':JSON.stringify(err)
    })
}

};


const val = async (input,og)=>{
  console.log('HEREE');
 let x= await bcrypt.compare(input,og);
 console.log(x);
return x;
}

exports.login=async (req,res,next)=>{
  console.log(req.body);
  try{
  const {email,password}=req.body;
  const olduser=await User.findOne({email:email});
  const pwd=await val(password,olduser.password);




  if(pwd||!email)
    {const token=jwt.sign({id:olduser._id},process.env.SECRET,{
      expiresIn:process.env.JWT_EXPIRY
    
    });
    res.status(200).render('base',{
      user:'B'
  });

    


  }else res.status(400).json({
      Status:'Failed',
      Reason:'Invalid Username Or Password'
    });
  }catch (err) {
    console.log(err);
    res.send('ERROR');
  }

}


exports.results=async (req,res)=>{
  console.log(req.query);

  try{const bloodGroup=req.query['choices-single-defaul'];
    const location=req.query.location;


  let olduser=await User.find({disease:"off",age:{$gte:18},age:{$lte:65},city:location,bloodGroup:bloodGroup},{firstName:1,lastName:1,email:1,mobileNumber:1,_id:0});
  console.log(olduser.length);
  if(olduser.length==0)
  {   
  res.status(200).render('res2');
  }else
  {
  res.status(200).render('res',{
    olduser:olduser
  });
}
}catch (err){
  console.log(err);
  res.send('ERROR');
}

}



