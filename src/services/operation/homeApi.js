import { toast } from "react-hot-toast";
import { categories, homeData } from "../api";
import { apiConnector } from "../apiConnector";


const {CATEGORY_DATA_API} = categories;
const { GET_CITY_WISE_DATA,GET_HOMEID_DATA, GET_ROOM_DATA,GET_AREA_WISE_DATA } = homeData

export async function categoryPagehome(){
    try {
         let result ;
       
         const response = await apiConnector("GET",CATEGORY_DATA_API, null) ;
         
         if(!response.data.success){
            throw new Error(response.data.message);
         }
          result = response.data.data
         
          return result;
    } catch (error) {
        console.log("CATEGORY ERROR API",error); 
        toast.error(error.response.data.message) ;  
    }
}

export async function cityWiseHomeData(){
    try {
        let result ;
         const response = await apiConnector("GET",GET_CITY_WISE_DATA, null) ;
         if(!response.data.success){
            throw new Error(response.data.message);
         }
         return result = response.data.data
    } catch (error) {
        console.log("Home Search ERROR API",error); 
        toast.error(error.response.data.message) ; 
    }
}

export async function areaWiseHomeData(area){
    try {
        let result ;
         const response = await apiConnector("POST",GET_AREA_WISE_DATA, {area}) ;
         if(!response.data.success){
            throw new Error(response.data.message);
         }
         return result = response.data.data
    } catch (error) {
        console.log("Home Search ERROR API",error); 
        toast.error(error.response.data.message) ; 
    }
}

export async function getHomeData(homeId){

    try {
        let result;
        const response = await apiConnector("POST",GET_HOMEID_DATA, {homeId});
        if(!response.data.success){
            throw new Error(response.data.message);
         }
         return result = response.data.data
    } catch (error) {
        console.log("Home Search ERROR API",error); 
        toast.error(error.response.data.message) ; 
    }

}

export async function getRoomData(roomId){
    try {
         let result;
         const response = await apiConnector("POST",GET_ROOM_DATA,{roomId}) 
         if(!response.data.success){
            throw new Error(response.data.message)
         }

         return result = response.data.data;
    } catch (error) {
        console.log("Room Search ERROR API",error); 
        toast.error(error.response.data.message) ;
    }
}