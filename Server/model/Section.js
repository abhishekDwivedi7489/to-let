const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
image:{
    type:String,
    required:true
}
})

module.exports = mongoose.model("Section",sectionSchema)