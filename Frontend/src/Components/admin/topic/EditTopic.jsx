import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle"
import ApiServices from "../../services/ApiServices";
import { FadeLoader } from "react-spinners";


export default function EditTopic(){
    const {id}=useParams()    
    const [topic,setTopic]=useState("")
    const [description,setDescription] = useState("")
    const [image,setImage]=useState(null)
    const [imageName,setImageName]=useState("")
    const [previousImage,setPreviousImage]=useState("")
    const [load,setLoad]=useState(false)

    useEffect(()=>{
        fetchSingleTopic()
    },[id])

    const fetchSingleTopic=()=>{
        ApiServices.singleTopic({_id:id})
        .then((res)=>{
            if(res.data.success){
                // console.log(res);
                setTopic(res.data.data.topic)
                setDescription(res.data.data.description)
                setPreviousImage(res.data.data.image)
            }else{
                toast.error(res.data.message)
            }
        })
        .catch((err)=>{
            toast.error(err?.message)
        })
    }
    const changeImg=(e)=>{
        setImageName(e.target.value)
        setImage(e.target.files[0]);
    }
    /* const dispatch=useDispatch()  */
    const nav=useNavigate()
    const handleForm=(e)=>{
        e.preventDefault()
        // dispatch(showLoader())
        setLoad(true)
        //formdata 
        let formData=new FormData()
        formData.append("_id", id)
        formData.append("topic",topic)
        formData.append("description",description)
        if(!!image){
            formData.append("image", image)
        }
        ApiServices.updateTopic(formData)
        .then((res)=>{
            if(res.data.success){
                toast.success(res.data.message)
                nav("/admin/topic/manage")
            }else{
                toast.error(res.data.message)
            }       
        })
        .catch((err)=>{
            toast.error(err.message);
            
        })
        .finally(()=>{
            // setTimeout(()=>{
            //     dispatch(hideLoader())
            // },1000)
            setTimeout(()=>{
                setLoad(false)
            },1000)
        })
    }
    return(
        <>
            <main className="main">
                <PageTitle>Update Topic</PageTitle>
                <section id="contact" className="contact section">
                {/* {load? */}
                <FadeLoader color="#f98603" loading={load} cssOverride={{display:"block", margin:"0 auto"}}/>
                {/* : */}
                <div className={load?"d-none":"container"} >
                    <div className="row justify-content-center gy-4">
                
                    <div className="col-lg-8">
                        <img src={previousImage} style={{height:"200px", width:"250px", display:"block", margin:"10px  auto"}}/>
                      {/*   <form
                        method="post"
                        onSubmit={handleForm}
                        >
                        <div className="row gy-4">
                           
                            <div className="col-md ">
                            <input
                                type="text"
                                className="form-control"
                                name="topic"
                                placeholder="Enter Topic Name"
                                required=""
                                value={topic}
                                onChange={(e)=>{setTopic(e.target.value)}}
                            />
                            </div>

                             <div className="col-md ">
                            <input
                                type="text"
                                className="form-control"
                                name="description"
                                placeholder="Enter Description"
                                required=""
                                value={description}
                                onChange={(e)=>{setDescription(e.target.value)}}
                            />
                            </div>

                            <div className="col-md-12">
                            <input
                                type="file"
                                className="form-control"
                                name="image"
                                placeholder="image"
                                required=""
                                value={imageName}
                                onChange={changeImg}
                            />
                            </div>
                         
                            <div className="col-md-12 text-center">
                            
                            <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                        </form> */}

 <form method="post" onSubmit={handleForm}>

                                    <div className="form-group mb-5 pt-2 pb-2"> 
                                        <label htmlFor="exampleInputEmail1">Topic</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Topic"
                                            name="topic"
                                            required=""
                                            value={topic}
                                            onChange={(e)=>{setTopic(e.target.value)}}
                                        />
                                    </div>

                                    <div className="form-group mb-5 pt-2 pb-2">
                                        <label htmlFor="exampleInputPassword1">Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Description About Topic"
                                            name="description"
                                            required=""
                                            value={description}
                                            onChange={(e)=>{setDescription(e.target.value)}}
                                        />
                                    </div>


                                     <div className="form-group mb-5 pt-2 pb-2">
                                        <label htmlFor="exampleInputPassword1">Image</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            placeholder="Topic Image"
                                            name="image"
                                            required=""
                                            value={imageName}
                                            onChange={changeImg}
                                        />
                                    </div>

                                    
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                    
                                </form>


                    </div>
                    {/* End Contact Form */}
                    </div>
                </div>
                {/* } */}
                </section>
                {/* /Contact Section */}
            </main>
        </>
    )
}