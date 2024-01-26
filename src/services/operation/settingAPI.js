import { upadateSettings } from "../api";
import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";
import { setUser } from "../../slices/profileSlice";
import { setToken } from "../../slices/authSlices";

const {
    UPDATE_PROFILE,
    DELETE_ACCOUNT,
    UPADATE_PROFILE_PIC,
    CHANGE_PASSWORD
} = upadateSettings;

export function updateProfilePicture(formData,token,navigate){
    return async(dispatch) =>{
        const tid = toast.loading("Wait");
         try {
           const response = await apiConnector("PUT",UPADATE_PROFILE_PIC,formData,{Authorization:`Bearer ${token}`}) ;
           if(!response.data.success){
            
            throw new Error(response.data.message)
           }
           dispatch(setUser(response.data.data))
           toast.success("Upadated successfully");
           navigate("/dashboard/my-profile");

         } catch (error) {
            console.log("CHANGE_PASSWORD_API_ERROR>......",error);
            toast.error("Could not update profile picture");
         }
         toast.dismiss(tid)
    }
}

export function updateProfile(data, token, navigate){
    return async(dispatch) =>{
        const tid = toast.loading("Wait...")
        try {
            const response = await apiConnector("PUT",UPDATE_PROFILE, data,{Authorization:`Bearer ${token}`});
            if(!response.data.success){
                
                throw new Error(response.data.data);
            }
            
            dispatch(setUser(response.data.data));
            
            toast.success("Successfully profile Update");
            navigate("/dashboard/my-profile")

        } catch (error) {
            console.log("CHANGE PROFILE ERROR",error);
            toast.error(error.response.data.message);
        }
        toast.dismiss(tid);
    }
}

export function changePassword(data, token, navigate){
    return async()=>{
        const tid = toast.loading("Wait...");
        try {
            const response = await apiConnector("POST",CHANGE_PASSWORD , data,{
                Authorization:`Bearer ${token}`
            });
           
            if(!response.data.success){
                
                throw new Error(response.data.message)
            }
            toast.success("Password change successfully");
            navigate("/dashboard/my-profile");
        } catch (error) {
            console.log("CHANGE_PASSWORD_API",error);
            toast.error(error.response.data.message); 
        }
        toast.dismiss(tid)
    }
}

//delete Account Api

export function deleteAccount (token, navigate){
    return async(dispatch) =>{
         const tid = toast.loading("Wait...");
         try {
            
            const response = await apiConnector("POST",DELETE_ACCOUNT,null,{Authorization:`Bearer ${token}`});

            if(!response.data.success){
                
                throw new Error (response.data.message);
            }
            dispatch(setToken(null));
            dispatch(setUser(null));
            
            toast.success("Account Deleted");
            navigate("/signup");
         } catch (error) {
            console.log("DELETE_ACCOUNT_API",error);
            toast.error("Could not delete account"); 
         }
         toast.dismiss(tid);
    }
}