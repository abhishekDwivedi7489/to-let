const Section = require("../model/Section");
const Room = require("../model/Rooms");
const {uploadToCloud} = require("../utils/uploadToCloud");
require("dotenv").config();

//upload room images
exports.uploadImages = async(req, res) =>{
    try {
       const {roomId} = req.body;
       const { image } =req.files;
       
       if(!roomId || !image){
        return res.status(400).json({
            success:false,
            message:"All feild required" 
        });
       } 
      
       const uploadImages = await uploadToCloud(image, process.env.FOLDER_NAME) 
       
       const updateSectionDetail = await Section.create({image:uploadImages.secure_url});
       
       const updateRoom = await Room.findByIdAndUpdate({_id:roomId},
                                                        {
                                                         $push:{images:updateSectionDetail._id}
                                                        },{new:true}).populate("images");

        
     
        return res.status(200).json({
            success:true,
            message:"Uploaded",
            data:updateRoom,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"not uploaded images, server error"
        })
    }
}

//update image
// exports.updateImages = async(req, res) =>{
//     try {
//         const {roomId, sectionId} = req.body;
//         const section = await Section.findById(sectionId);
//         if(!section){
//             return res.status(401).json({
//                 success:false,
//                 message:"section is not found"
//             });
//         }

//         if(req.files && req.files.image !== undefined)
//         {
//             const image = req.files.image;
//             const uploadImage = await uploadToCloud(image,process.env.FOLDER_NAME);
//             section.image = uploadImage.secure_url;
//         }

//         await section.save();

//         const updatedRoom = await Room.findById(roomId).populate("images");
//         return res.status(200).json({
//             success:true,
//             message:"Updated Successfully",
//             data:updatedRoom
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:"not uploaded images, server error"
//         })  
//     }
// }

//delete image
exports.deleteImages = async(req, res) =>{
    try {
        const {roomId, sectionId} = req.body;

        await Room.findByIdAndUpdate({_id:roomId},
            {$pull:{images:sectionId}},
            );

        const result = await Section.findByIdAndDelete({_id:sectionId});
        if(!result){
            return res
            .status(404)
            .json({ success: false, message: "Section not found" }) 
        }

        const updatedRoom = await Room.findById(roomId).populate("images");
        return res.status(200).json({
            success:true,
            message:"Deleted successfully",
            data:updatedRoom,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Deleted Failed, server error"
        })  
    }
}