const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate =require("../mailTemplate/emailVerification");
const OtpSchema = new mongoose.Schema({
   email:{
    type:String,
    required:true
    },
   otp:{
    type:String,
    required:true
   },
   createdAt:{
    type:Date,
    default:Date.now(),
    expires:5*60*1000,
   }
 })
async function mailSend(email,otp){
   try {
      await mailSender(email,"Verification email from TO-LET",otpTemplate(otp));
   } catch (error) {
      console.log("Error occoured while sending mail",error);
      throw error; 
   }
}
OtpSchema.pre("save", async function(next){
   await mailSend(this.email, this.otp);
   next();
})
module.exports = mongoose.model("OTPSchema", OtpSchema);