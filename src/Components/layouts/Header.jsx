import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import Modal from "react-modal"
import Register from "../auth/Register"
import Swal from "sweetalert2"

export default function Header() {

  let loc = useLocation()
  let pathname = loc.pathname
  const [isOpen, setIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const nav = useNavigate()
  const isLogin = sessionStorage.getItem("isLogin")

  const logout = () => {
    Swal.fire({
      title: "Do you really want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF7F7F",
      cancelButtonColor: "#03b6fc",
      confirmButtonText: "Yes, Logout"
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear()
        nav("/login")
        Swal.fire({
          title: "Logout",
          text: "Logout Successfully",
          icon: "success"
        });
      }
    });
  }

  console.log("isLogin session:", sessionStorage.getItem("isLogin"));

  return (
    <>
      <>
        {/*::header part start::*/}
        {/* <header className="main_menu home_menu" > */}
        <header className={`main_menu home_menu  ${pathname === "/" ? "light-header" : "dark-header"}`} >



          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-12">
                <nav className="navbar navbar-expand-lg navbar-light">
                  <a className="navbar-brand">
                    {" "}
                    {/*  <img src="/assets/img/logo.png" alt="logo" />{" "} */}
                    {/*  <img src="/assets/img/pathfinders_logo.svg" alt="logo" /> */}
                    {/* Path<span style={{color:"orange"}}>Finders</span>  */}
                    <span
                      style={{
                        /* background: "linear-gradient(to left, #ee390f 100%, #f9b700 51%, #ee390f 100%)" */
                        /*    background: "linear-gradient(to left, #ee390f 20%, #f9b700 0%, #ee390f 20%)", */ 
                        background:"linear-gradient(to left, var(--bs-orange) 20%, var(--orange) 0%, var(--orange) 20%) text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        display: "inline-block"
                      }}/* #f9b700 51% */
                    >
                      Path Finders
                    </span>


                  </a>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon" />
                  </button>

                  <div
                    className="collapse navbar-collapse main-menu-item justify-content-end"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav align-items-center">

                      <li className={`nav-item ${pathname == "/" && "active"}`}>
                        <Link className="nav-link" to={"/"}>
                          Home
                        </Link>
                      </li>

                      <li className={`nav-item ${pathname == "/" && "active"}`}>
                        <Link className="nav-link" to={"/topics"}>
                          Topics
                        </Link>
                      </li>

                      {/* <li className="nav-item">
                  <a className="nav-link" href="blog.html">
                    Blog
                  </a>
                </li> */}

                      <li className={`nav-item dropdown ${pathname == "/" && "active"}`}>
                        <a
                          className="nav-link dropdown-toggle"
                          href="blog.html"

                          id="navbarDropdown"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Mentorship
                        </a>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="navbarDropdown"
                        >

                          <Link className="dropdown-item" to={"/mentorshipProgram"}>
                            Mentorship Programs
                          </Link>
                          <Link className="dropdown-item" to={"/myenrollments"}>
                            My Enrollments
                          </Link>
                        </div>
                      </li>

                      <li className={`nav-item ${pathname == "/" && "active"}`}>
                        <Link className="nav-link" to={"/discussionform"}>
                          Discussions
                        </Link>
                      </li>

                      <li className={`nav-item ${pathname == "/" && "active"}`}>
                        <Link className="nav-link" to={"/about"}>
                          About
                        </Link>
                      </li>

                      <li className={`nav-item ${pathname == "/" && "active"}`}>
                        {isLogin ?
                          <a href="#" onClick={logout} className={`nav-link btn btn-link ${pathname == "/" && "active"}`}>Logout</a>
                          :
                          <Link to="/login" className={`nav-link ${pathname === "/login" ? "active" : ""}`}>Login</Link>
                        }
                      </li>

                      <li /* className="btn btn-link nav-link nav-item dropdown" */className={`nav-item dropdown ${pathname == "/" && "active"}`}>
                    <Link className="nav-link">    {sessionStorage.getItem("name")}  </Link>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="navbarDropdown"
                        >

                          <Link className="dropdown-item" to={"/changePassword"}>
                            Change Password
                          </Link>

                        </div>
                      </li>

                    </ul>
                  </div>

                </nav>

              </div>
            </div>



          </div>
        </header>

        <Modal isOpen={isOpen} style={customStyles}>
          <button onClick={() => { setIsOpen(false) }} className="btn-close"></button>
          <Register />
        </Modal>
        {/* Header part end*/}
      </>


    </>
  )
}