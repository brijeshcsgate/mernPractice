require('../db/conn');
const jwt=require('jsonwebtoken');
const express= require('express');
const bcrypt=require('bcryptjs');
const router=express.Router();

require('../db/conn');
const User =require('../model/UserSchema');
const Authenticate = require('../middleware/authenticate');
router.get('/',(req,res)=>{
    res.send('hello world from the server router js');
});


router.post('/registerk',(req,res)=>{
    const {name,email,phone,work, password ,cpassword}=req.body;

    if(!name||!email ||!phone ||!work ||!password ||!cpassword){
        return res.status(422).json({error:'plz filled the fields property'});
    }
    

    User.findOne({email:email})
    .then((userExist)=>{if(userExist){
        return res.status(422).json({error:'email already exist'});
    }

    const user2=new User({name, email, phone ,work ,password,cpassword});
    user2.save().then(()=>{
        res.status(201).json({message:'user registerd success fully'});
    })
    .catch((err)=>res.status(500).json({error:'failed to registered'}));

}).catch(err=>{
    console.log(err);
});
})


router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;
  
    if (!name || !email || !phone || !work || !password || !cpassword) {
      return res.status(422).json({ error: 'Please fill all the fields' });
    }
 
 try{
    const userExist=await User.findOne({ email: email });
     console.log(userExist)
    if (userExist) {
        return res.status(422).json({ error: 'Email already exists' });
      }
      const user=new User({name,email, phone, work ,password, cpassword});
      await user.save();
      res.status(201).json({
        message:'user register successfully'
      })

        }
      catch(err)  {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
      };
  });
  
  router.post('/signin',async (req,res)=>{

    try{
      
let token;
    const {email,password}=req.body;
    if(!email||!password){
      return res.status(400).json({error:'plz filled the data'});

    }

    const userLogin=await User.findOne({email:email});

    if(userLogin){
      const isMatch= await bcrypt.compare(password,
        userLogin.password);
        token=await userLogin.generateAuthToken();

        res.cookie("jwtoken",token,{
          expires:new Date(Date.now()+2589000000),
          // httpOnly:true
        })
        if(!isMatch){
          res.status(400).json({error:'invalid credentials'});
        }
        else{
          res.json({message:'user Signin successfully'});
        }

    }
else{
  res.status(400).json({
    error:'invalid Credentials'
  });
}

  }
catch(err){
  console.log(err);
  
  res.status(500).json({ error: 'Internal server error' });
}

  })



  router.get('/about',Authenticate,(req,res)=>{
console.log("this is about page")
    res.send(req.rootUser);
})

router.get('/getdata',Authenticate,(req,res)=>{
  console.log("this is about page")
      res.send(req.rootUser);
  })


  
router.post('/contact',Authenticate,async (req,res)=>{
 try{
  const {name,email,phone, message}=req.body;
  if(!name|| !email||!phone || !message){
    console.log('error in contact form ');
    return res.json({error:'plz filled the contact form'});
  }

const userContact=await User.findOne({_id:req.userID});
if(userContact){
  const userMessage=userContact.addMessage(name,email,phone, message);
  // await userContact.save();
  res.status(201).json({message:'user Contact successfully'});
}


 }catch(error){
  console.log(error);
 }
  })


  router.get('/logout',(req,res)=>{
    console.log("this is logout page")
    res.clearCookie('jwtoken',{path:'/'})
        res.status(200).send('user logout');
    })
    
module.exports=router;