const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   homes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Home"
   }]
})
module.exports = mongoose.model("Category", categorySchema)