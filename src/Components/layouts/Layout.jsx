import Header from './Header'
import Footer from './Footer'
import {Outlet, useLocation} from "react-router-dom"
import { useEffect } from 'react'


export default function Layout(){

    const {pathname} = useLocation()
    useEffect(()=>{
window.scrollTo(0,0)
    },[pathname])
    
    return(
        <>
        <Header />
        <Outlet />
        <Footer />
        </>
    )
}