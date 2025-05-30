/* import 'mdb-react-ui-kit/dist/css/mdb.min.css'; */
/* npm i mdb-react-ui-kit */
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import ApiServices from "../services/ApiServices"
import PageTitle from "../../Components/layouts/PageTitle"


export default function Register() {
   /*  const {register, handleSubmit, formState:{errors}, reset}=useForm()
    const [load,setLoad]=useState(false)
    const nav = useNavigate()
    const submitForm=(data)=>{
        console.log(data);
        reset()
    }
    const handleError=(errors)=>{
        console.log(errors);
        
    }  */

    const [name, setName]=useState("")
    const [email,setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [contact, setContact] = useState()

    const nav=useNavigate()

    const handleForm=(e)=>{
        e.preventDefault();
        //axios.method(url, body, headers)
        let formData={
            name:name,
            email:email,
            password:password,
            contact:contact
        }
     
    ApiServices.register(formData)
    .then((res)=>{
           if(res.data.success){
                toast.success(res.data.message)
                let data = {
                  email:email,
                  password:password
                }  
            
            ApiServices.login(formData)
            .then((res)=>{
                if(res.data.success){
                  toast.success(res.data?.message)
                        sessionStorage.setItem("isLogin", true)
                       /*  localStorage.setItem("isLogin", true) */
                        sessionStorage.setItem("token", res.data.token)
                        sessionStorage.setItem("name",res.data.data.name)
                        sessionStorage.setItem("userId",res.data.data._id)
                        sessionStorage.setItem("userType", res.data.data.userType)

                         if(res.data?.data?.userType==1){
                            nav("/admin")
                        }
                        
                        else{
                            nav("/")
                        }
                }

                else{
                        toast.error(res.data?.message)
                    }
            })

            .catch((err)=>{
                toast.error(err?.message)
            })

           }

           else{
            toast.error(res.data.message)
           }   
    })

    .catch((err)=>{
      toast.error(err?.message)
    })
}

  console.log('User Registered:', { name, email, password, contact });

    return (
        <> 
        <PageTitle>Student Register</PageTitle>
     <section className="vh-100" style={{ backgroundColor: "#eee"  }}>
  <div className="container h-100 ">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11 mt-2 ">  {/* added mt-2 here */}
        <div className="card text-black " style={{ borderRadius: 25  }}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign up
                </p>
                <form className="mx-1 mx-md-4 php-email-form"  method="post" onSubmit={handleForm}>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw" />

                    <div
                      data-mdb-input-init=""
                      className="form-outline flex-fill mb-0"
                    >
                      <input
                        type="text"
                        id="form3Example1c"
                        className="form-control"
                         name="name"
                         required 
                         value={name}
                         onChange={(e)=>{setName(e.target.value)}}
                         />

                         {/* {...register("name", {required:{
                            value:true, message:"name is required"
                        }})}  */}

                     {/*    <span className="text-danger">{errors?.name?.message}</span> */}

                      <label className="form-label" htmlFor="form3Example1c">
                        Your Name
                      </label>

                    </div>



                  </div>



                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                    <div
                      data-mdb-input-init=""
                      className="form-outline flex-fill mb-0" >
                      <input
                        type="email"
                        id="form3Example3c"
                        className="form-control"
                         name="email"
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                         value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                        required
                         /*  {...register("email",{
                            required:{
                                value:true,
                                message:"email is required"
                            } ,

                            pattern:{
                                value:/^[a-zA-Z0-9\-\_\.]+\@+[a-zA-Z0-9]+\.+[a-zA-Z]{2,3}$/,
                                message:"Email is not valid"
                            }
                        })} */
                      />
                        {/* <span className="text-danger">{errors?.email?.message}</span> */}
                      <label className="form-label" htmlFor="form3Example3c">
                        Your Email
                      </label>
                    </div>
                  </div>


                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw" />



                    <div
                      data-mdb-input-init=""
                      className="form-outline flex-fill mb-0"
                    >
                      <input
                        type="password"
                        id="form3Example4c"
                        className="form-control"
                        name="password"

                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        required
                       /*  {...register("password")} */
                      />
                      <label className="form-label" htmlFor="form3Example4c">
                        Password
                      </label>

                    </div>

                  </div>




                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw" />
                    <div
                      data-mdb-input-init=""
                      className="form-outline flex-fill mb-0"
                    >
                      <input
                        type="tel"
                        id="form3Example4cd"
                        className="form-control"
                        name="contact"
                        pattern="[0-9]{10}"
                         value={contact}
                         minLength={10}
                         maxLength={10}
                        /*  onChange={(e)=>{setContact(e.target.value)}} */
                          onChange={(e) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, '');
        setContact(onlyNums);
                         }}
                         required

                       /*  {...register("password")} */
                      />
                      <label className="form-label" htmlFor="form3Example4cd">
                        contact
                      </label>
                    </div>
                  </div>


                 {/*  <div className="form-check d-flex justify-content-center mb-5">
                     <input
                      className="form-check-input me-2"
                      type="checkbox"
                      defaultValue=""
                      id="form2Example3c"
                    /> 
                      <label className="form-check-label" htmlFor="form2Example3">
                      I agree all statements in{" "}
                      <a href="#!">Terms of service</a>
                    </label> 
                  </div> */}



                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button
                      type="submit"
                      data-mdb-button-init=""
                      data-mdb-ripple-init=""
                      className="btn btn-primary btn-lg"
                    >
                      Register
                    </button>
                  </div>

                </form>
              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid"
                  alt="Sample image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
        </section>
       
        </>
    )
}