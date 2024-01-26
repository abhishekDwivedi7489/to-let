const User = require("../model/User");
const Profile = require("../model/profile");
// const OTP = require("../model/OTPSchema");
const OTP = require("../model/OTPschema")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const passwordUpdated = require("../mailTemplate/passwordUpdate")
require("dotenv").config();


exports.sendOTP = async(req, res) =>{
     try {
        const {email} = req.body;
        
        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(400).json({
                success:false,
                message:"User already registered"
            })
        }
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })
        await OTP.create({email,otp});
        res.status(200).json({
            success:true,
            message:"Otp sent successfully",
            otp,
           })
     } catch (error) {
        console.log(error)
        return res.status(500).json({
        success:false,
        message:"OTP SEND FAILED",

       }) 
     }
}

//Sign up
exports.signUp = async(req,res) =>{
    try {
        let {firstName, lastName, email
            , password, confirmPassword, accountType,
            countryCode,contactNum,otp} = req.body;

            if(confirmPassword !== password){
                return res.status(400).json({
                    success:false,
                    message:"Password is not same"
                })
            }
            
            if(!firstName || !lastName || !email || !password || !countryCode || !contactNum)
            {
                return res.status(400).json({
                    success:false,
                    message:"All field required"
                })  
            }
            if(!accountType){
                accountType="Owner"
            }
            const recentOtp = await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
            if(recentOtp.length == 0)
            {
                return res.status(400).json({
                    success:false,
                    message:'OTP not found',
                });  
            }
            
            if(recentOtp.otp !== otp){
                return res.status(400).json({
                    success:false,
                    message:'OTP does not match',
                });
            }
            const hashPassword = await bcrypt.hash(password,10);
            const profileDetail = await Profile.create({
                gender:null,
                dateOfBirth:null,
                mobNumber:null
            });
            const user = await User.create({firstName,lastName,email,accountType,
                                            password:hashPassword,contactNum,countryCode,
                                            additionalDetails:profileDetail._id ,
                                        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`})
               return res.status(200).json({
                success:true,
                message:"User registered successfully",
                user
               })
    } catch (error) {
       return res.status(500).json({
        success:false,
        message:error.message,
       }) 
    }
}

//login
exports.login = async(req, res) =>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                success:false,
                message:"All field required",
            });   
        }
        //exist user
        let user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(403).json({
                success:false,
                message:"User doesn't registered"
            });
        }
        if(await bcrypt.compare(password,user.password)){
           const payload={
            email:user.email,
            id:user._id,
            accountType:user.accountType
           }
            const token = jwt.sign(payload,process.env.JWT_SECRET);
            user.token = token;
            user.password = undefined;
            
            const option ={
                expires: new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true
            }
            res.cookie("token",token,option).status(200).json({
                success:true,
                message:"Logged In",
                token,
                user
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Incorrect Password"
            })
        }
    } catch (error) {
       return res.status(500).json({
        success:false,
        message:"login Failed"
       }) 
    }
}

//change password
exports.changePassword = async (req, res) => {
    try {
      //get data from req body
      const {oldPassword, confirmNewPassowrd}=req.body;
      const id = req.user.id;
      const email = req.user.email;
     // console.log("change pass",id);
      //get oldPassword, newPassword, confirmNewPassowrd
      //validation
      if(!oldPassword || !confirmNewPassowrd ){
          return res.status(403).json({
              success:false,
              message:"All field mandatory"
          });
      }
      const existUser = await User.findOne({_id:id});
      if(!existUser) {
          return res.status(401).json({
              success:false,
              message:"User does not registerd"
          });
      }
      let hashedPassword = await bcrypt.hash(confirmNewPassowrd,10);
      let name =existUser.firstName;
       
       //console.log(name)
      //update pwd in DB
      const updatePassword=await User.findOneAndUpdate({_id:id},
                                                       {password:hashedPassword},
                                                       {new:true});
      //send mail - Password u
      const response = await mailSender(email,"Change password success email",passwordUpdated(email,name));
 
      //return response
      res.status(200).json({
         success:true,
         message:"Password Change successfully",
      });
    } catch (error) {
     console.log(error);
     res.status(500).json({
         success:false,
         message:"Does not change password"
     });
    }
 }