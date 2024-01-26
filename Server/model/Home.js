const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
   description:{
    type:String,
    require:true,
    trim:true,
   },
   state:{
    type:String,
    require:true,
    trim:true,
   },
   city:{
    type:String,
    require:true,
    trim:true,
   },
   area:{
    type:String,
    require:true,
    trim:true,
   },
   address:{
    type:String,
    require:true,
    trim:true,
   },
   thumbnail:{
    type:String,
    require:true,
   },
   category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
   },
   owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
   }, 
   // ratingAndReview:[{
   //    type:mongoose.Schema.Types.ObjectId,
   //    ref:"Rating"
   // }],
   houseRooms:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Rooms"
   }],
   instructions:{
    type:[String],
   },
   status:{
    type:String,
    enum:["Published","Draft"],
   },
   homeStatus:{
      type:String,
      enum:["Booked","Empty"],
     }
})

module.exports = mongoose.model("Home",homeSchema)