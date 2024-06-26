const User = require("../model/User");
const Profile = require("../model/profile");
const {uploadToCloud} = require("../utils/uploadToCloud");
const Home = require("../model/Home");
const Room = require("../model/Rooms");
const RoomImg = require("../model/Section");
const Category = require("../model/Category")

exports.updateProfile = async(req, res) =>{
    try {
        const {gender, dateOfBirth, mobNumber} = req.body;
        const id = req.user.id;

        if(!id || !gender || !dateOfBirth || !mobNumber){
            return res.status(400).json({
                success:false,
                message:"All Feild require"
            });
        }

        const userId  = await User.findById({_id:id});
        const profileid = userId.additionalDetails;
        
        await Profile.findByIdAndUpdate({_id:profileid},
            {gender, dateOfBirth, mobNumber},{new:true});
        
        const user = await User.findById({_id:id})
        .populate("additionalDetails").exec();
      
        return res.status(200).json({
            success:true,
            message:"Updated Successfully",
            data:user
        })
        
    } catch (error) {
       res.status(500).json({
        success:false,
        message:error.message
       }) 
    }
}

//deleted profile
exports.deleteProfile = async(req, res) =>{
    try {
       const {id} = req.user;
       
       const user = await User.findById({_id:id});
       if(!user){
        return res.status(404).json({
            success:false,
            message:'User not found',
        });
       } 
       
       const home = user.homes;
       
       for(const homeId of home){
          const homeDetails =  await Home.findById(homeId);
          const categoryId = homeDetails.category;
          await Category.findByIdAndUpdate(categoryId,{
            $pull : {homes : homeDetails._id}
          });

          const rooms = homeDetails.houseRooms;
         
          for(const roomId of rooms){
            const room = await Room.findById(roomId);
            if(room){
              const image = room.images;
              
              for(const imgId of image){
                await RoomImg.findByIdAndDelete(imgId);
              }

            }
            await Room.findByIdAndDelete(roomId);
          }

          await Home.findByIdAndDelete(homeId);

       }
 
       await Profile.findByIdAndDelete({_id:user.additionalDetails});
       await User.findByIdAndDelete({_id:id});
       
     return  res.status(200).json({
        success:true,
        message:"Profile Deleted successfully"
      });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
           })  
    }
}
require("dotenv").config();

exports.updateProfilePicture = async(req, res) =>{
    try {
      const displayPicture = req.files.displayPicture;
      const id= req.user.id;
      
      const image = await uploadToCloud(displayPicture,
        process.env.FOLDER_NAME,1000,100);

      const profile = await User.findByIdAndUpdate(
        {_id:id},
        {image: image.secure_url},
        {new:true}
      );
      
      return  res.status(200).json({
        success:true,
        message:"Profile picture updated successfully",
        data:profile
      });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
           })  
    }
}
