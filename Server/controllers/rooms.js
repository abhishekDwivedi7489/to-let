const Rooms = require("../model/Rooms");
const Home = require("../model/Home");
const Section = require("../model/Section");
require("dotenv").config();

//Create room
exports.createRooms = async(req, res)=>{
    try {
       const {homeId, price, facility, aboutRoom,roomNum,size} = req.body;
      
       if(!homeId || !price || !facility || !aboutRoom || !roomNum){
         return res.status(400).json({
            success:false,
            message:"All feilds require"
         });
       } 
        const status = "Empty"
       const newRoom = await Rooms.create({
        price, facility, aboutRoom, roomNum,status,size
       });
     
       const updateDetail = await Home.findByIdAndUpdate(homeId,{
                                                          $push:{
                                                            houseRooms:newRoom._id
                                                          }
                                                         },{new:true})
                                                         .populate({
                                                            path:"houseRooms",
                                                            populate:{
                                                                path:"images"
                                                            }
                                                         });
       
        return res.status(200).json({
            success:true,
            message:"Created Successfully",
            data:updateDetail
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Creation Failed, Server Error"
        })
    }
}

//update
exports.updateRoom = async(req, res) =>{
    try {
        const{homeId, roomId} = req.body;
        const updateData = req.body; 
        
        const roomData = await Rooms.findById(roomId);
        
        for (const key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                if(key === "facility"){
                    roomData[key] = updateData[key]
                }
                else{
                    roomData[key] = updateData[key]
                }
            }
        }
        let status;
        if(updateData.status == "Booked"){  
            status = "Booked"
        }
        else{
            status = "Empty"
        }
       let roomNum = updateData.roomNum;
       let price = updateData.price;
       let facility = updateData.facility;
       let aboutRoom = updateData.aboutRoom;
       let size = updateData.size
       await Rooms.findByIdAndUpdate({_id : roomId},{roomNum, price, facility, aboutRoom, status, size});
        // await updateData.save();
        const homeData = await Home.findById(homeId)
        .populate({
            path:"houseRooms",
            populate:{
                path:"images"
            }
        });

        return res.status(200).json({
            success:true,
            message:"Updation Successfully",
            data:homeData,
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Updation Failed, Server Error"
        })
    }
}

//delete

exports.deleteRoom = async(req, res) =>{
  try {
    const {roomId, homeId} = req.body;
     
    await Home.findByIdAndUpdate(homeId,{
        $pull:{
            houseRooms:roomId
        }
    })

    const room = await Rooms.findById(roomId);
    if(!room){
        return res.json({
            success:false,
            message:"Not found"
        })
    }

    await Section.deleteMany({_id:{$in: room.images}});
    await Rooms.findByIdAndDelete(roomId);

    const home = await Home.findById(homeId).populate({
        path:"houseRooms",
        populate:{
            path:"images"
        }
    }).exec();

    return res.status(200).json({
        success:true,
        message:"Deleted",
        data:home,
    })
  } catch (error) {
    return res.status(500).json({
        success:false,
        message:"deletaion Failed, Server Error"
    })
  }   
}

 
//get room data

exports.getRoomData = async(req, res) => {
    try {
        const {roomId} = req.body;
        const response = await Rooms.findById({_id : roomId}).populate("images");
        if(!response){
            return res.status(400).json({
                success:false,
                message:"Not Found data"
            })
        }
         
        return res.status(200).json({
            success : true,
            message : "fetched Data",
            data  :response,
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Not fetched Room Data"
        })
      }     
    
}