import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"


export default function MentorHeader(){

const [mentorId, setMentorId] = useState(null);

  useEffect(() => {
    const mentorId = sessionStorage.getItem("userId");
    console.log("Mentor ID from session:", mentorId);
    setMentorId(mentorId);
  }, []);

const nav = useNavigate()
const isLogin = sessionStorage.getItem("isLogin") 

  const logout=()=>{
  Swal.fire({
    title: "Do you really want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#fcba03",
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
  console.log("Mentor ID:", mentorId);

    return(
        <>
           {/*::header part start::*/}
  <header className="main_menu home_menu">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-12">
          <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand" href="index.html">
              {" "}
             {/*  <img src="/assets/img/logo.png" alt="logo" />{" "} */}
                <span
  style={{
    background: "linear-gradient(to left, #ee390f 0%, #f9b700 51%, #ee390f 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-block"
  }}
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
              id="navbarSupportedContent" >

              <ul className="navbar-nav align-items-center">

                <li className="nav-item ">
                  <Link className="nav-link" to={"/mentor"} >
                    Dashboard
                  </Link>
                </li>

               {/*  <li className="nav-item">
                  <Link className="nav-link"  >
                    Mentors
                  </Link>
                </li>
 */}
                {/* <li className="nav-item">
                  <Link className="nav-link" >
                    Topics
                  </Link>
                </li> */}

                <li className="nav-item">
                  <Link className="nav-link" to={"/mentor/mentorshipProgram/manage"}>
                    Programs
                  </Link>
                </li>

                {/*  <li className="nav-item">
                  <Link className="nav-link">
                    Enrollments
                  </Link>
                </li> */}

               {/*  <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="blog.html"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Discussions
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link className="dropdown-item" to={"/mentor/discussionQuestion/manage"}>
                      Discussion Questions
                    </Link>
                    <a className="dropdown-item" href="elements.html">
                      Discussion Replies
                    </a>
                  </div>
                </li> */}

                {/* <li className="nav-item">
                  <Link className="nav-link" to={"/contact"}>
                    Contact
                  </Link>
                </li> */}

                {/*  <li className="d-none d-lg-block">
                  <a className="btn_1" href="#">
                    Logout
                  </a>
                </li>  */}
                   <li className="nav-item">
                  <Link className="nav-link" to={"/mentor/discussionQuestion/manage"}>
                    Discussions
                  </Link>
                </li> 


                <li className="nav-item dropdown">
                  <a
                    style={{padding:"5px 20px"}}
                    className="nav-link dropdown-toggle btn_1"
                    href="blog.html"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                     {sessionStorage.getItem("name")}
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown" >

                    {/* <a className="dropdown-item" href="wow">
                      View Profile
                    </a> */}
{mentorId && (
  <Link
    to={`/mentor/profile/view/${mentorId}`}
    className="dropdown-item"
  >
    View Profile
  </Link>
)}
                    <Link className="dropdown-item" to={"/changePassword"}>
                      Change Password
                    </Link>
                    {/*  <a className="dropdown-item" href="elements.html">
                      Logout
                    </a> */}
                       {isLogin?
                     <a onClick={(e)=>{
                      e.preventDefault();
                      logout();
                     }} className="nav-link btn btn-link dropdown-item"  href="#">
                      Logout
                    </a>
                    :
                    <Link to="/login">Login</Link>  }
                  </div>

                </li>
              </ul>

            </div>
          </nav>
        </div>
      </div>
    </div>
  </header>
  {/* Header part end*/}
        
        </>
    )
}