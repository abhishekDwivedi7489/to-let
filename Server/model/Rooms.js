const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    roomNum:{
        type:String
    },
    price:{
        type:String,
    },
    facility:{
        type:[String],
    },
    aboutRoom:{
      type:String,
    },
    size:{
        type:String
    },
    images:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Section"
    }],
    status:{
        type:String,
        enum:["Booked","Empty"]
    }
})
module.exports = mongoose.model("Rooms",roomSchema);