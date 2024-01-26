const cloudinary = require("cloudinary").v2;

exports.uploadToCloud = async(file, folder, quality, height) =>{
    
    const option = {folder};
    if(quality){
        option.quality = quality;
    }
    if(height){
        option.height = height
    }
    option.resourse_type = "auto";
 
    const data =await cloudinary.uploader.upload(file.tempFilePath, option);
  
    return data;
}