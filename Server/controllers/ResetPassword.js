const User = require("../model/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const passwordUpdated = require("../mailTemplate/passwordUpdate");
// const crypto = require("crypto");

exports.resetPasswordToken = async(req, res) =>{
    try {
        const {email} = req.body;
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Your email is not registered with us"
            })
        }
        // const token = crypto.randomBytes(20).toString("hex");
        const token = Math.floor(Math.random() * 10) + 1;
        await User.findOneAndUpdate({email:email},
                                     {
                                        token:token,
                                        resetPasswordExpires:Date.now()+5*60*1000
                                     },{new:true});
        const url = `https://to-let.vercel.app/update-password/${token}`;
        await mailSender(email,"Password reset link", `Your Link for email verification is ${url}. Please click this url to reset your password.`);
        return res.status(200).json({
            success:true,
            message:"Sending email successfully",
           });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Email sent failed"
        });  
    }
}

exports.passwordReset = async(req, res) =>{
    try {
        const {token, password, confirmPassword}=req.body; 
        if(!password || !confirmPassword){
            return res.json({
                success:false,
                message:"All field required "
            });
        }
        
        const userDetail = await User.findOne({token:token});
        if(!userDetail){
            return res.status(401).json({
                success:false,
                message:"Token invalid"
            })  
        }
    
        if(userDetail.resetPasswordExpires<Date.now()){
            return res.status(401).json({
                success:false,
                message:"Token time expire, Please regenerate token",
            }); 
        }
      
        const hashPassword = await bcrypt.hash(password);
        
        await User.findOneAndUpdate({token:token},
                                   {password:hashPassword},{new:true} );
        let email = userDetail.email;
        let name = userDetail.firstName
  
        await mailSender(email, "Password reset successfully",
                          passwordUpdated(email,name))

                          return res.status(200).json({
                            success:true,
                            message:"password reset successfully",
                        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong while sending reset password mail"
           }) 
    }
}
