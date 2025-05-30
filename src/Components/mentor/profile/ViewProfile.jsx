import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import ApiServices from "../../services/ApiServices";
import { Link } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle"

export default function ViewProfile() {
  const [mentor, setMentor] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { userId } = useParams();
  console.log("userId from URL:", userId);


  /* const mentorId = sessionStorage.getItem("userId"); */

  useEffect(() => {
    /*  if (!mentorId) {
         
       toast.error("Mentor not logged in");
       setLoading(false);
       return;
     } */
    const mentorId = sessionStorage.getItem("userId");

    if (!mentorId) {
      toast.error("You must be logged in as a mentor to view this page.");
      navigate("/login");
      return;
    }


    ApiServices.singleMentor({ userId: mentorId })
      .then((res) => {
        console.log("API Response:", res.data);
        if (res.data.success) {
          setMentor(res.data.data);
        } else {
          toast.error("Could not fetch profile");
        }
      })
      .catch(() => toast.error("Server error"))
      .finally(() => setLoading(false));
  }, []);


  return (
    <main className="main">
<PageTitle>View Profile</PageTitle>
      <section className="section" style={{ marginTop: "14vh", marginBottom:"10vh"}}>
        {loading ? (
          <FadeLoader color="#f98603" cssOverride={{ display: "block", margin: "0 auto" }} />
        ) : (
          <div className="container card shadow p-4">
            <h4 className="mb-4">Welcome <strong>{mentor?.userId?.name}</strong></h4>
            <div className="container">
              <div className="main-body">
                
               {/*  <nav aria-label="breadcrumb" className="main-breadcrumb">
                  <ol className="breadcrumb ">
                    <li className="breadcrumb-item">
                      <Link to={"/"}>Home</Link>
                    </li>
                    {/* <li className="breadcrumb-item">
          <a href="javascript:void(0)">User</a>
        </li> */} {/*}
                    <li className="breadcrumb-item active" aria-current="page" color="secondary">
                      My Profile
                    </li>
                  </ol>
                </nav> */}
               
                <div className="row gutters-sm">
                  <div className="col-md-4 mb-3">
                    <div className="card" style={{ marginTop: "3vh" }}>
                      <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center" >
                          <img
                            src={mentor?.profile}
                          
                            className="rounded-circle"
                           style={{ height: "100px", width: "100px", borderRadius:"50%"}}
                           /*   width={100}  */
                          />
                          <div className="mt-3">
                            <h4>{mentor?.userId?.name}</h4>
                            <p className="text-secondary mb-1">{mentor?.currentJob}</p>
                            <p className="text-muted font-size-sm">
                              {mentor?.company}
                            </p>
                            {/* <button className="btn btn-primary">Follow</button>
                <button className="btn btn-outline-primary">Message</button> */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row" style={{marginTop:"3vh", marginLeft:"8vw"}} >
                      <div className="col-sm-12" >
                        <Link
                          className="btn btn-info "
                         /*  to={"/mentor/profile/edit"+mentor?.userId} */
                         to={`/mentor/profile/edit/${mentor?.userId?._id}`}

                          /* target="__blank"
                          href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills" */
                        >
                          Update Details
                        </Link>
                      </div>
                    </div>
                    {/*  
        <div className="card mt-3">
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-globe mr-2 icon-inline"
                >
                  <circle cx={12} cy={12} r={10} />
                  <line x1={2} y1={12} x2={22} y2={12} />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                Website
              </h6>
              <span className="text-secondary">https://bootdey.com</span>
            </li>

            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-github mr-2 icon-inline"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                Github
              </h6>
              <span className="text-secondary">bootdey</span>
            </li>

            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-twitter mr-2 icon-inline text-info"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
                Twitter
              </h6>
              <span className="text-secondary">@bootdey</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-instagram mr-2 icon-inline text-danger"
                >
                  <rect x={2} y={2} width={20} height={20} rx={5} ry={5} />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                Instagram
              </h6>
              <span className="text-secondary">bootdey</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
              <h6 className="mb-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-facebook mr-2 icon-inline text-primary"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                Facebook
              </h6>
              <span className="text-secondary">bootdey</span>
            </li>
          </ul>
        </div>
 */}
                  </div>

                  <div className="col-md-8">
                    <div className="card mb-3" style={{ marginTop: "3vh" }}>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Name</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">{mentor?.userId?.name}</div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Email</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">{mentor?.userId?.email}</div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Contact</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">{mentor?.contact}</div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Experience</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">{mentor?.experience}</div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Graduation Year</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {mentor?.graduationYear}
                          </div>
                        </div>
                        <hr />

                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Graduation Year</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {mentor?.currentJob}
                          </div>
                        </div>
                        <hr />

                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Topics Interested</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {mentor?.topicInterested?.map((t) => t.topic).join(", ")}
                          </div>
                        </div>
                        <hr />

                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Current Job</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {mentor?.company}
                          </div>
                        </div>
                        <hr />

                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Story</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {mentor?.alumniStory}
                          </div>
                        </div>
                        <hr />

                        {/*   <div className="row">
                          <div className="col-sm-12">
                            <a
                              className="btn btn-info "
                              target="__blank"
                              href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills"
                            >
                              Edit
                            </a>
                          </div>
                        </div> */}

                      </div>
                    </div>

                    {/*   <div className="row gutters-sm">
          <div className="col-sm-6 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h6 className="d-flex align-items-center mb-3">
                  <i className="material-icons text-info mr-2">assignment</i>
                  Project Status
                </h6>
                <small>Web Design</small>
                <div className="progress mb-3" style={{ height: 5 }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: "80%" }}
                    aria-valuenow={80}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <small>Website Markup</small>
                <div className="progress mb-3" style={{ height: 5 }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: "72%" }}
                    aria-valuenow={72}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <small>One Page</small>
                <div className="progress mb-3" style={{ height: 5 }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: "89%" }}
                    aria-valuenow={89}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <small>Mobile Template</small>
                <div className="progress mb-3" style={{ height: 5 }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: "55%" }}
                    aria-valuenow={55}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <small>Backend API</small>
                <div className="progress mb-3" style={{ height: 5 }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: "66%" }}
                    aria-valuenow={66}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h6 className="d-flex align-items-center mb-3">
                  <i className="material-icons text-info mr-2">assignment</i>
                  Project Status
                </h6>
                <small>Web Design</small>
                <div className="progress mb-3" style={{ height: 5 }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: "80%" }}
                    aria-valuenow={80}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <small>Website Markup</small>
                <div className="progress mb-3" style={{ height: 5 }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: "72%" }}
                    aria-valuenow={72}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <small>One Page</small>
                <div className="progress mb-3" style={{ height: 5 }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: "89%" }}
                    aria-valuenow={89}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <small>Mobile Template</small>
                <div className="progress mb-3" style={{ height: 5 }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: "55%" }}
                    aria-valuenow={55}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <small>Backend API</small>
                <div className="progress mb-3" style={{ height: 5 }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: "66%" }}
                    aria-valuenow={66}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}
                  </div>

                </div>
              </div>
            </div>


          </div>
        )}
      </section>
    </main>
  );
}
