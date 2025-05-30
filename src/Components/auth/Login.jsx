import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { toast } from "react-toastify"
import ApiServices from "../services/ApiServices";
import Swal from "sweetalert2"
import PageTitle from "../../Components/layouts/PageTitle"


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();


  const handleForm = (e) => {
    e.preventDefault();

    let formData = {
      email: email,
      password: password
    }

    ApiServices.login(formData)

      .then((res) => {
        // console.log(res);

        if (res.data.success) {
          /* toast.success(res.data?.message) */

          sessionStorage.setItem("isLogin", true)
          sessionStorage.setItem("token", res.data.token)
          sessionStorage.setItem("name", res.data.data.name)
          sessionStorage.setItem("userId", res.data.data._id)
          sessionStorage.setItem("userType", res.data.data.userType)
          sessionStorage.setItem("mentorId", res.data.data.userId)   // newly added


          if (res.data?.data?.userType == 1) {
            toast.success(res.data?.message)
            nav("/admin")
          }

          else if (res.data?.data?.userType === 2) {
            if (res.data?.data?.status === false) {
              Swal.fire({
                icon: "info",
                title: "Account in Review",
                text: "Your account is under review. Please wait for approval."
              });
              setEmail("");
              setPassword("");
              return;
            }

            else {
              toast.success(res.data?.message)
              nav("/mentor");
            }
          }

          else {
            toast.success(res.data?.message)
            nav("/");
          }
        }

        else {
          toast.error(res.data?.message)
        }

      })

      .catch((error) => {
        toast.error(error?.message)
      })
  }

  return (
    <>
      <>
        <PageTitle>Login</PageTitle>
        <section className="vh-89" style={{ marginTop: "50px", marginBottom: "100px" }}>
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  className="img-fluid"
                  alt="Sample image"
                />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form method="post" onSubmit={handleForm}>

                  {/* Email input */}
                  <div data-mdb-input-init="" className="form-outline mb-4">

                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control form-control-lg"
                      placeholder="Enter a valid email address"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value) }} />

                    <label className="form-label" htmlFor="form3Example3">
                      Email address
                    </label>
                  </div>
                  {/* Password input */}
                  <div data-mdb-input-init="" className="form-outline mb-3">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control form-control-lg"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value) }} />

                    <label className="form-label" htmlFor="form3Example4">
                      Password
                    </label>

                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    {/* Checkbox */}
                    <div className="form-check mb-0">
                      {/*  <input
                        className="form-check-input me-2"
                        type="checkbox"
                        defaultValue=""
                        id="form2Example3"
                      />
                      <label className="form-check-label" htmlFor="form2Example3">
                        Remember me
                      </label>*/}
                    </div>
                   {/*  <a href="#!" className="text-body">
                      Forgot password?
                    </a> */}
                  </div>

                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button
                      type="submit"
                      data-mdb-button-init=""
                      data-mdb-ripple-init=""
                      className="btn btn-primary btn-lg"
                      style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>
                      Login
                    </button>
                    <p className="small fw-bold mt-2 pt-1 mb-0 gap-2 d-flex">
                      Don't have an account?{" "}
                      <Link to={"/register"} className="link-danger">
                        Student Register
                      </Link>
                      <Link to={"/registermentor"} className="link-danger">
                        Mentor Register
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </section>

      </>


    </>
  )
}



