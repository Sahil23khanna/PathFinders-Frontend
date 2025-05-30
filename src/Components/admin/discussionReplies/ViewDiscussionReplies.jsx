import { useParams } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import { useEffect, useState } from "react";
import ApiServices from "../../services/ApiServices";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";


export default function ViewDiscussionReplies(){
    
    const {id}=useParams()
    const [discussionReplies,setDiscussionReplies]=useState([])
    const [load,setLoad]=useState(true)

    useEffect(()=>{
        fetchSingleDiscussionReplies()
    },[id]) 
    const fetchSingleDiscussionReplies=()=>{
        let formData={
            discussionId:id
        }
        ApiServices.allDiscussionReplies(formData)

        .then((res)=>{
            if(res.data.success){
                toast.success(res.data.message)
                setDiscussionReplies(res.data.data)
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
        <PageTitle>View Discussions</PageTitle>
        {/* <FadeLoader loading={load} color="#f98603" cssOverride={{display:"block", margin:"0 auto"}}/> */}

        <div className={load ? "d-none":"container"}>
            <div className="row justify-content-center my-5">
                <div className="col-md-8">
               
                    <div className="p-4 shadow-sm rounded-3 mb-4">
  <div className="card-body">
    <h5 className="card-title mb-3">Discussion Details</h5>
  
   
    <div className="row mb-2">
      <div className="col-6 fw-medium text-muted">Description</div>
      <div className="col-6">{discussionReplies[0]?.discussionId?.description}</div>
    </div>
        {discussionReplies?.map((el,index)=>(
        <div className="row mb-2">
            <div className="card">
            <div className="col-6 fw-medium text-muted">{el?.addedById?.name}</div>
            <div className="col-6">{el?.text}</div>
            </div>
        </div>
        ))}
  
  </div>
</div>

                </div>
            </div>
        </div>
       
        </>
    )
}