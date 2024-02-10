import { toast } from "react-hot-toast";
import {apiConnector} from "../apiConnector"
import { setLoading, setToken } from "../../slices/authSlices";
import {setUser} from "../../slices/profileSlice"
import {auth} from "../api"

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API ,
    RESETPASSWORDTOKEN_API,
    RESETPASSWORD_API
} = auth;

export function sendOtp(email, navigate){

    return async(dispatch)=>{
        
        const tid = toast.loading("Wait...");
        try {
            
            const response = await apiConnector("POST",SENDOTP_API,{email});
            if(!response.data.success){
                
                throw new Error(response.data.message)
            }
            navigate("/verify-email")
            toast.success(response.data.message)
        } catch (error) {
            console.log("SENDOTP API ERROR............", error)
            toast.error(error.response.data.message)  
        }
        
        toast.dismiss(tid);
    }

}

//signup

export function signUp(firstName,lastName,email,
                       password,confirmPassword,
                       contactNum,countryCode,otp,navigate){
    return async(dispatch) => {
        const tid =  toast.loading("Wait...");
        
        try {
            const response = await apiConnector("POST", SIGNUP_API,{
                firstName,lastName,email,
                password,confirmPassword,
                contactNum,countryCode,otp  
            });
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            navigate("/login");
            toast.success(response.data.message);
        } catch (error) {
            console.log("SIGNUP API ERROR............", error)
            toast.error(error.response.data.message) 
        }
        
        toast.dismiss(tid);
    }

}

//login
export function login({email, password}, navigate){
    return async(dispatch) =>{
       
        const tid = toast.loading("Wait...");
        try {
            console.log("data",email)
            const response = await apiConnector("POST",LOGIN_API,{email, password});

             console.log("data",response)
            if(!response.data.message){
                
                throw new Error(response.data.message)
            }
           
            dispatch(setToken(response.data.token));
            const userImage = response?.data?.user?.image 
           
            dispatch(setUser({...response?.data?.user, image:userImage}));
           
            localStorage.setItem("token", JSON.stringify(response?.data?.token));
            localStorage.setItem("user", JSON.stringify(response?.data?.user));
            toast.success(response.data.message)
            navigate("/dashboard/my-profile");

        } catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error(error.response.data.message)   
        }
        
        toast.dismiss(tid);
    }
}

//logout
export function logout(navigate){
    return async(dispatch)=>{
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("log out");
        navigate("/");
    }
}

export function resetPasswordToken(email, setEmailSent){
    return async() => {
        const tid = toast.loading("Wait..")
        try {
      
            const response = await apiConnector("POST",RESETPASSWORDTOKEN_API,{email})
      
            if(!response.data.success){
              throw new Error(response.data.message)
            }
            toast.success("Email send Successfully");
            setEmailSent(true);
            
          }  catch (error) {
            console.log("RESET PASSWORD TOKEN API ERROR............", error)
            toast.error(error.response.data.message)     
        }
        toast.dismiss(tid)
    }
}

export function resetPassword(password , confirmPassword, token, navigate){
    return async()=>{
      
      try {
          const response = await apiConnector("POST",RESETPASSWORD_API,{password , confirmPassword, token})
          if(!response.data.success){
            throw new Error(response.data.message)
          }
          toast.success("Password update Successfully"); 
          
          navigate("/login");
      } catch (error) {
        console.log("RESETPASSWORD ERROR............", error)
        toast.error("Failed To Reset Password")
      }
      
    }
   }