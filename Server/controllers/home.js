const Category = require("../model/Category");
const User = require("../model/User");
const Home = require("../model/Home");
const {uploadToCloud} = require("../utils/uploadToCloud");
const Rooms = require("../model/Rooms")
const Section = require("../model/Section")
require("dotenv").config();

//Create Rooms

exports.createHome = async(req, res) =>{
    try {
        let{ description, state, city, area, address,
           category, instructions, status} = req.body;

        const thumbnail = req.files.thumbnail;
        
        if(!description || !state || !city || !area || !address ||
            !category || !instructions || !thumbnail){
                return res.status(400).json({
                    success:false,
                    message:"All fields required",
                });   
            }
        if(!status || status === undefined){
            status = "Draft"
        }

        const userId = req.user.id;
        const userDetail = await User.findById(userId,{accountType:"Owner"})
        if(!userDetail){
            return res.status(404).json({
                success:false,
                message:"Owner Detail not found"
            })
        }

        const categoryDetail = await Category.findById({_id:category});

        
        if(!categoryDetail){
            return res.status(404).json({
                success:false,
                message:"Category Detail not found"
            })   
        }

        const thumbnailUpload = await uploadToCloud(thumbnail, process.env.FOLDER_NAME)

        const newHome = await Home.create({
            description, 
            state, 
            city, 
            area, 
            address,
            category:categoryDetail._id, 
            instructions, 
            status,
            homeStatus :"Empty",
            owner:userDetail._id,
            thumbnail:thumbnailUpload.secure_url
        });

        await User.findByIdAndUpdate({_id : userDetail._id},
                                      {
                                        $push:{homes:newHome._id}
                                      },{new:true})

        await Category.findByIdAndUpdate({_id:categoryDetail._id},
                                        {
                                            $push:{homes:newHome._id}
                                        },{new:true} )//.populate("houseRooms");

        return res.status(200).json({
            success:true,
            message:"Created Successfully",
            data:newHome,
        });
    } catch (error) {
       res.status(500).json({
        success:false,
        message:error.message
       }) 
    }
}


//edit home
exports.editHome = async(req, res) =>{
    try {
        const {homeId} = req.body;
        const updates = req.body;
       
        const homeData = await Home.findById(homeId);
        if(!homeData){
            return res.status(404).json({
                success:false,
                message:"Home Not Found"
            })
        }

        if(req.files){
            const thumbnail = req.files.thumbnail;
            const thumbnailUpload = await uploadToCloud(
                thumbnail,
                process.env.FOLDER_NAME
            )
            homeData.thumbnail = thumbnailUpload.secure_url;
        }

        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {

                if(key === "instructions")
                 homeData[key] = updates[key]; 
                else{
                    homeData[key] = updates[key];
                }  
            }
        }
        await homeData.save();

        const updatedHome = await Home.findOne({_id:homeId})
        .populate({
            path:"owner",
            populate:{
                path:"additionalDetails"
            }
        })
        .populate("category")
        .populate({
            path:"houseRooms",
            populate:{
                path:"images"
            }
        }).exec();
         
        return res.status(200).json({
            success:true,
            message:"Updated Successfully",
            data:updatedHome
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
          }) 
    }
}

//delete Homes

exports.deleteHome = async(req, res) =>{
   try {
     const {homeId} = req.body;
    
     const homeDetail = await Home.findById(homeId);

     const categoryId = homeDetail.category;

     await Category.findByIdAndUpdate(categoryId,{
        $pull:{hemes:homeDetail._id}
     })

     const rooms = homeDetail.houseRooms;
     for (const roomId of rooms) {
        const room = await Rooms.findById(roomId);
        if(room){
            const section = room.images;
            for (const sectionId of section) {
                await Section.findByIdAndDelete(sectionId)
            }
        }
        await Rooms.findByIdAndDelete(roomId);
     }
     const homeData = await Home.findByIdAndDelete(homeId);
      
     return res.status(200).json({
        success:true,
        message:"Deleted Successfully"
     })
   } catch (error) {
    return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      })
   } 
}

// get Owner Data

exports.getOwnerData = async(req, res) =>{
    try {
           const ownerId = req.user.id; 
           
        // console.log("first",ownerId)
            const ownerRoom = await Home.find({owner:ownerId}).sort({createdAt:-1}).populate({
                path:"houseRooms",
                populate:{
                    path:"images"
                }
            }).populate("category");
            
        
        return res.status(200).json({
            success:true,
            data:ownerRoom,
            message:"Retrieve Data"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to retrieve Data"
        })  
    }
}

exports.getOwnerAllData = async(req, res) =>{
    try {
        const {homeId} = req.body;
        
        const ownerRoom = await Home.findOne({_id : homeId})
        .populate({ 
         path:"owner",
         populate:{
             path : "additionalDetails"
         }
        })
        .populate("category")
        .populate({
         path:"houseRooms",
          populate:{
             path : "images"
          }
        })
       
        return res.status(200).json({
            success:true,
            data:ownerRoom,
            message:"Retrieve Data"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to retrieve Data"
        })  
    }
}

//for Citywise Home page

exports.cityWiseSearchHomeData = async(req, res) => {
    try {
        const response = await Home.find({homeStatus : {$ne :"Book"}}).populate("category");
        
      if(!response){
        return res.status(400).json({
            success:false,
            message:"Failed to retrieve Data"
        })  
      }
        return res.status(200).json({
            success:true,
            message:"Successfully to retieved Data",
            data : response
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to retrieve Data"
        }) 
    }
}

exports.getHomeIdData = async(req, res) => { 
    try {
        const {homeId} = req.body;
        
        const result = await Home.findById({_id : homeId})
        .populate({path:"houseRooms",
        populate : {path : "images"} })
        .populate({path:"owner",
                   populate : {path : "additionalDetails"} })
      
       return res.status(200).json({
        success: true,
        message : "Retrieve data",
        data: result
       }) 
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to retrieve Data"
        })   
    }
}

 exports.areaWiseHomeData = async(req, res) => {
 try {
    const {area} = req.body;

     const data = await Home.find({area:area}).populate("category");

return res.status(200).json({
    success:true,
    data:data,
    message:"Retrieve Data"
})

  } catch (error) {
    return res.status(500).json({
        success:false,
        message:"Failed to retrieve Data"
    })   
   }
 }

