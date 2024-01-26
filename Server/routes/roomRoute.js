const express = require("express");
const router = express.Router();

const {createHome ,editHome ,deleteHome ,getOwnerData,
    getOwnerAllData,cityWiseSearchHomeData,getHomeIdData,areaWiseHomeData} = require("../controllers/home");
const {createRooms, updateRoom, deleteRoom, getRoomData} = require("../controllers/rooms");
const {uploadImages,  deleteImages} = require("../controllers/section");
const {createCategory, showAllCategory,categoryPageDetails} = require("../controllers/category")
const {updateProfilePicture, deleteProfile, updateProfile} = require("../controllers/profile")

const {auth, isOwner, isAdmin} = require("../middlewares/Auth");

//Homes Route
router.post("/createHome",auth,isOwner,createHome);
router.post("/editHome",auth,isOwner,editHome);
router.delete("/deleteHome",auth,isOwner,deleteHome);
router.get("/getOwnerData",auth,isOwner,getOwnerData);
//router.post("/getOwnerData",auth)
router.post("/getOwnerAllData",auth, isOwner, getOwnerAllData);
router.get("/city-wise-data",cityWiseSearchHomeData);
router.post("/area-wise-data",areaWiseHomeData);
router.post("/getHomeIdData",getHomeIdData);

//Rooms routes
router.post("/createRooms",auth,isOwner,createRooms);
router.post("/updateRooms",auth,isOwner,updateRoom);
router.post("/deleteRooms",auth,isOwner,deleteRoom);
router.post("/getRoomData",getRoomData);

//images route
router.post("/uploadImages",auth,isOwner,uploadImages);
// router.post("/updateImages",auth,isOwner,updateImages);
router.post("/deleteImages",auth,isOwner,deleteImages);

//category
router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/showAllCategory",showAllCategory);
router.get("/category-homedata",categoryPageDetails);
//profile
router.put("/update-profile",auth,updateProfile);
router.post("/delete-profile",auth,deleteProfile);
router.put("/update-profile-picture",auth,updateProfilePicture);




module.exports = router;