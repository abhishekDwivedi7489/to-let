const Category = require("../model/Category");

exports.createCategory = async(req, res) =>{
    try {
       const {name} = req.body;
       
       await Category.create({name});
       return res.status(200).json({ 
        success:true,
        message:"Category Created Successfully"
       })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });  
    }
}

exports.showAllCategory = async(req, res) =>{
    try {
        const allCategory = await Category.find({},{name:true,homes:true});
        return res.status(200).json({
            success:true,
            message:"Return All Category",
            data:allCategory,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });   
    }
}

//category page details

exports.categoryPageDetails = async(req, res) => {
    try {

        const allCategoryData = await Category.find().populate({
                                                                 path : "homes",
                                                                 match : {status : "Published"},
                                                                 match : {homeStatus : "Empty"},
                                                                populate : {                                     
                                                                    path : "houseRooms",
                                                                    populate:{
                                                                        path:"images"
                                                                    }
                                                                } 
                                                             });
                                                           
        if(!allCategoryData){
            return res.status(400).json({
                success:false,
                message : "Not Found Data"
            })
        }

        return res.status(200).json({
            success : true,
            message : "Date fetched Successfully",
            data : allCategoryData
        })
        
    } catch (error) {
        return res.status(500).json({
			success: false,
			message: error.message,
			error: error.message,
		});
    }
}