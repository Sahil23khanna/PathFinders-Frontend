import { Outlet, Navigate} from "react-router-dom";
import MentorHeader from "./MentorHeader";
import MentorFooter from "./MentorFooter"; 
import { toast } from "react-toastify";


export default function MentorLayout(){
   /*  let isLogin=sessionStorage.getItem("isLogin")
    let userType=sessionStorage.getItem("userType")
    if(!isLogin || userType!=1){
        toast.error("You cannot access this page");
        return <Navigate to={"/login"}/> */
    
    return(
        <>
        <MentorHeader/>
        <Outlet/>
        <MentorFooter/>
        
        </>
    )
}