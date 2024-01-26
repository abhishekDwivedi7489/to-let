const BASE_URL = process.env.REACT_APP_BASE_URL;

export const categories = {
    CATEGORIES_API : BASE_URL + "/rooms/showAllCategory",
    CATEGORY_DATA_API : BASE_URL + "/rooms/category-homedata"
}

export const auth = {
    SENDOTP_API : BASE_URL+"/auth/sendotp",
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
    RESETPASSWORDTOKEN_API : BASE_URL+"/auth/reset-password-token",
    RESETPASSWORD_API : BASE_URL + "/auth/reset-password"
}

export const upadateSettings ={
   UPADATE_PROFILE_PIC : BASE_URL+"/rooms/update-profile-picture",
   DELETE_ACCOUNT : BASE_URL+"/rooms/delete-profile",
   UPDATE_PROFILE : BASE_URL+"/rooms/update-profile",
   CHANGE_PASSWORD : BASE_URL+"/auth/changePassword"
}

export const homeData ={
   CREATE_HOME_API : BASE_URL+"/rooms/createHome",
   EDIT_HOME_API   : BASE_URL+"/rooms/editHome",
   DELETE_HOME_API : BASE_URL+"/rooms/deleteHome",
   GET_OWNER_DATA  : BASE_URL+"/rooms/getOwnerData",
   GET_OWNER_ALL_DATA : BASE_URL+"/rooms/getOwnerAllData",
   GET_CITY_WISE_DATA : BASE_URL+"/rooms/city-wise-data",
   GET_AREA_WISE_DATA : BASE_URL+"/rooms/area-wise-data",
    GET_HOMEID_DATA  : BASE_URL+"/rooms/getHomeIdData",

   CREATE_ROOMS_API : BASE_URL+"/rooms/createRooms",
   UPDATE_ROOMS_API : BASE_URL+"/rooms/updateRooms",
   DELETE_ROOM_API  : BASE_URL+"/rooms/deleteRooms",
   STATUS_API       : BASE_URL+"/rooms/roomStatus",
   GET_ROOM_DATA : BASE_URL+"/rooms/getRoomData",

   UPLOAD_IMAGE_API:BASE_URL+"/rooms/uploadImages",
   DELETE_IMAGE_API :BASE_URL+"/rooms/deleteImages"
}

