const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
 gender:{
    type:String,  
 },
 dateOfBirth:{
    type:String, 
 },
 mobNumber:{
    type:Number,
    trim:true,
   }, 
})
module.exports = mongoose.model("profile", profileSchema);