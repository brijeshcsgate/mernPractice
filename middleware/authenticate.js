const jwt=require('jsonwebtoken');
const User=require('../model/UserSchema');

const Authenticate= async (req, res, next)=>{
    try{
        // const token=req.cookies.jwtoken;
        // const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDMwZWRjZDZhOWFhOTViMTQxM2RiZGEiLCJpYXQiOjE2ODA5ODA0MjF9.4U2AA4f0NZ5WpWGdeP9RFEmnJ2xL_ch-_8LKtcMhPkc';
        let token = req.headers.authorization;
        console.log("this is about page1"+JSON.stringify(token))
        // console.log("this is about page2"+JSON.stringify(token.cookie))
        // console.log("this is about page3"+JSON.stringify(token.cookies))
        
        // console.log("token->>>>>"+token);
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
        const rootUser=await User.findOne({_id:verifyToken._id,"tokens.token":token});
        if(!rootUser){
            throw new Error('user not found')
        }
        req.token=token;
        req.rootUser=rootUser;
        req.userID=rootUser._id;
        next();
    }
    catch(err){
        res.status(401).send('unauthorized:no token provided');
        console.log(err);
    }
}

module.exports=Authenticate;