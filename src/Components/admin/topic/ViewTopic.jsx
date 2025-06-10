import { useParams } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import { useEffect, useState } from "react";
import ApiServices from "../../services/ApiServices";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";

export default function ViewTopic(){
    
    const {id}=useParams()
    const [topic,setTopic]=useState({})
    const [load,setLoad]=useState(true)

    useEffect(()=>{
        fetchSingleTopic()
    },[id]) 
    const fetchSingleTopic=()=>{
        let formData={
            _id:id
        }
        ApiServices.singleTopic(formData)

        .then((res)=>{
            if(res.data.success){
                toast.success(res.data.message)
                setTopic(res.data.data)
            }else{
                toast.error(res.data.message)
            }
        })
        .catch((err)=>{
            toast.error(err?.message)
        })
        .finally(()=>{
            setTimeout(()=>{
                setLoad(false)
            },500)
        })
        
    }   
    return(
        <>
        <PageTitle>View Topic</PageTitle>
        <section style={{marginTop:"8vh", marginBottom:"8vh"}}>
        <FadeLoader loading={load} color="#f98603" cssOverride={{display:"block", margin:"0 auto"}}/>

        <div className={load ? "d-none":"container"}>
            <div className="row justify-content-center my-5">
                <div className="col-md-4">
                    <div className="card" style={{ width: "18rem" }}>
                        <img src={topic.image} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{topic.topic}</h5>
                            <p>{topic.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
        </>
    )
}