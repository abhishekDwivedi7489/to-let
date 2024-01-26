const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    contactNum:{
        type:String,
        required:true,
        trim:true
    },
    countryCode:{
        type:String,
        required:true,
        trim:true 
    },
    accountType:{
        type:String,
        enum:["Admin","Owner"],
        require:true,
       
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"profile",
      },
    image:{
        type:String,
        required:true,
      },
    token :{
        type:String,
    },
    resetPasswordExpires: {
        type:Date,
    },
    homes :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Home"
    }]
})

module.exports = mongoose.model("User",userSchema);