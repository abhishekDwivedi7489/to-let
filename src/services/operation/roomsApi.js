import { homeData } from "../api";
import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";
import { categories } from "../api";

const {CATEGORIES_API} = categories;
const {
    CREATE_HOME_API,
    EDIT_HOME_API,
    DELETE_HOME_API,
    GET_OWNER_DATA,
    CREATE_ROOMS_API,
    UPDATE_ROOMS_API,
    DELETE_ROOM_API,
    STATUS_API,
    UPLOAD_IMAGE_API,
    DELETE_IMAGE_API,
    GET_OWNER_ALL_DATA
} = homeData;
 
export async function fetchCategory(){
     let result = [];
        try {
            const response = await apiConnector("GET",CATEGORIES_API,null)
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            result = response.data.data;
        } catch (error) {
          console.log("CATEGORY ERROR API",error);  
        }
        return result;
   
}

export async function addHomeDetail(formData, token){
    let result = null;
    const tid = toast.loading("Wait...");
    try {
        const response = await apiConnector("POST",CREATE_HOME_API,formData,{Authorization: `Bearer ${token}`} );

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response.data.data;
        toast.success(response.data.message);
    } catch (error) {
      console.log("CATEGORY ERROR API",error); 
      toast.error(error.response.data.message) ;
    }
    toast.dismiss(tid);
    return result;
}

export async function editHomeDetails(formData, token){
    let result = null;
    const tid = toast.loading("Wait...");
    
    try {
        const response = await apiConnector("POST",EDIT_HOME_API,formData,{Authorization: `Bearer ${token}`} );
        
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response.data.data;
        toast.success(response.data.message);
    } catch (error) {
      console.log("EDIT HOME ERROR API",error); 
      toast.error(error.response.data.message) ;
    }
    toast.dismiss(tid);
    return result;
}

export async function deleteHomeDetail(homeId, token){
    console.log("delete operation", homeId);
    let result =[]
    try {
       const response = await apiConnector("DELETE",DELETE_HOME_API, {homeId}, {Authorization :`Bearer ${token}`});
       if(!response?.data?.success){
        throw new Error(response?.data?.message);
       } 
       toast.success("Home Deleted Successfully")
        result = response?.data?.data;
    } catch (error) {
        console.log("DELETE Home ERROR API",error); 
        toast.error(error.response.data.message) ;  
    }
    return result;

}

export async function addRoomDetail(formData, token){
    let result = null;
    const tid  = toast.loading("Wait...");
    try {
        const response = await apiConnector("POST", CREATE_ROOMS_API, formData,{Authorization :`Bearer ${token}`});
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response.data.data;
        toast.success(response.data.message);
    } catch (error) {
        console.log("ADD ROOM ERROR API",error); 
        toast.error(error.response.data.message) ; 
    }
    toast.dismiss(tid)
    return result;
}

export async function updateRoomDetail(formData, token){
   
    let result = null;
    const tid = toast.loading("Wait...");
    try {
        const response = await apiConnector("POST",UPDATE_ROOMS_API, formData,{Authorization: `Bearer ${token}`});
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response.data.data;
        toast.success(response.data.message);
    } catch (error) {
        console.log("UPDATE ROOM ERROR API",error); 
        toast.error(error.response.data.message) ; 
    }
   toast.dismiss(tid);
   return result;
}

export async function deleteRoomDetail(homeId, roomId,token){
    let result = null;
    const tid = toast.loading("Wait...");
    try {
        const response = await apiConnector("POST",DELETE_ROOM_API,{homeId, roomId},{Authorization: `Bearer ${token}`});
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response.data.data;
        toast.success(response.data.message);
    } catch (error) {
        console.log("DELETE ROOM ERROR API",error); 
        toast.error(error.response.data.message) ; 
    }
   toast.dismiss(tid);
   return result;
}


//upload  Image
export async function uploadImages(formData, token) {
    let result = null;
    const tid = toast.loading("Wait...");
    try {
        const response = await apiConnector("POST",UPLOAD_IMAGE_API,formData,{Authorization: `Bearer ${token}`});
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response.data.data;
        toast.success(response.data.message);
    } catch (error) {
        console.log("UPLOAD IMAGE API ERROR ",error); 
        toast.error(error.response.data.message) ; 
    }
   toast.dismiss(tid);
   return result;
}

export async function deleteImages(roomId, sectionId, token) {
    let result = null;
    const tid = toast.loading("Wait...");
    try {
        const response = await apiConnector("POST",DELETE_IMAGE_API,{sectionId, roomId},{Authorization: `Bearer ${token}`});
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response.data.data;
        toast.success(response.data.message);
    } catch (error) {
        console.log("DELETE IMAGE API ERROR ",error); 
        toast.error(error.response.data.message) ; 
    }
   toast.dismiss(tid);
   return result;
}

//get owner data
export async function getOwnerHomeData(token){
    
    try {
         let result = [];
        const response = await apiConnector("GET",GET_OWNER_DATA,null,{AuthoriZation :`Bearer ${token}`})
        
        if(!response.data.success){
            throw new Error(response?.data?.message);
        }

        toast.success(response?.data?.message)
         return result = response?.data?.data;

    } catch (error) {
        console.log("GET DATA API ERROR ",error); 
        toast.error(error.response.data.message) ; 
    }
    
}

//all data
export async function getOwnerALLHomeData(homeId, token){
    let result = {};
    try {
         
        const response = await apiConnector("POST",GET_OWNER_ALL_DATA, {homeId}, {AuthoriZation :`Bearer ${token}`})
        
        
        if(!response.data.success){
            throw new Error(response?.data?.message);
        }
        toast.success(response?.data?.message)
         return result = response?.data?.data;
          
    } catch (error) {
        console.log("GET OWNER ALL DATA API ERROR ",error); 
        toast.error(error.response.data.message) ; 
    }
    
}