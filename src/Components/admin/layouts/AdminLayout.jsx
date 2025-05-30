import { Outlet, Navigate} from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter"; 
import { toast } from "react-toastify";


export default function AdminLayout(){

    let isLogin=sessionStorage.getItem("isLogin")
    let userType=sessionStorage.getItem("userType")
    if(!isLogin || userType!=1){
      /*   toast.error("You cannot access this page"); */
        return <Navigate to={"/login"}/> 
 } 
     console.log("isLogin:", isLogin);
console.log("userType:", userType);
    return(
        <>
        <AdminHeader/>
        <Outlet/>
        <AdminFooter/>
        
        </>
    )
}