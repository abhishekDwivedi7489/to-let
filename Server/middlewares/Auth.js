const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async(req, res,next) =>{
    try {
        
        const token = req.cookies.token || req.body.token || 
         req.header("Authorization").replace("Bearer ","");
         
         if(!token || token === undefined){
            return res.status(400).json({
                success:false,
                message:"Token Missing"
            })
         }
       
         try {
            const decodeToken = jwt.verify(token,process.env.JWT_SECRET);
          
            req.user = decodeToken;
         } catch (error) {
            return res.status(500).json({
                success:false,
                message:"Token is invalid"}) 
         }
         next();
    } catch (error) {
        console.log(error);
    }
}

exports.isOwner = (req, res, next) =>{
    try {
        if(req.user.accountType !== "Owner"){
            return res.status(401).json({
                success:false,
                message:"This protected route for Instructor only"
            }) 
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role can not find",
        }); 
    }
}

exports.isAdmin = (req, res, next) =>{
    try {
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This protected route for Admin only"
            })  
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role can not find",
        }); 
    }
}