import { useEffect, useState } from "react"
import ApiServices from "../services/ApiServices"
import PageTitle from "../layouts/PageTitle"
import { toast } from "react-toastify"
import { FadeLoader } from "react-spinners"
import { Link, useNavigate, useParams } from "react-router-dom"
import Pagination, { LIMIT } from "../utilities/Pagination"
import ResponsivePagination from "react-responsive-pagination"
import 'react-responsive-pagination/themes/classic.css';
import Swal from "sweetalert2"


export default function MentorshipProgram() {
  const { topic } = useParams()
  const [mentorshipProgram, setMentorshipProgram] = useState([])
  const [load, setLoad] = useState(true)
  const [filter, setFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState()

  useEffect(() => {
    fetchMentorshipProgram()
  }, [filter, currentPage, topic])


  const fetchMentorshipProgram = () => {

    setLoad(true)
    let formData = {
      limit: LIMIT,
      currentPage: currentPage
    }
    if (!!topic) {
      formData.topics = topic
    }

    if (!!filter) {
      formData.status = filter
    }

    ApiServices.allMentorshipProgram(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message)

          setMentorshipProgram(res.data.data)
          setTotal(res.data.total)
        }
        else {
          toast.error(res.data.message)
        }
      })
      .catch((err) => {
        toast.error(err.message)
      })
      .finally(() => {
        setTimeout(() => {
          // dispatch(hideLoader())
          setLoad(false)
        }, 1000)

      })
  }
  const nav = useNavigate()

  const handleEnroll = (id, name, totalAmount) => {
    Swal.fire({
      title: `You are about to enroll in program by ${name}`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Enroll Me !!"
    }).then((result) => {
      if (result.isConfirmed) {
        let formData = {
          mentorshipId: id,
          userId: sessionStorage.getItem("userId"),
          totalAmount,
          step: "order",
        }

        ApiServices.addEnrollment(formData)
          .then((res) => {
            if (res.data.success) {
              toast.success(res.data.message)
                const order = res.data.order;
                var options = {
                  key: "rzp_test_5LJZnRI3r5tD6S",
                  amount: order.amount,
                  currency: "INR",
                  name: "Path Finder corp",
                  description: " Transaction",
                  order_id: order.id,
                  handler: function (response) {
                    let confirmData = {
                      userId: sessionStorage.getItem("userId"),
                      mentorshipId: id,
                      razorpayOrderId: response.razorpay_order_id,
                      totalAmount: totalAmount,
                      step: "confirm",
                    };
                    ApiServices.addEnrollment(confirmData)
                      .then((res) => {
                        if (res.data.success) {
                             nav("/myenrollments")
                            Swal.fire({
                              title: `Enrolled!`,
                              text: `Enrolled successfully!!`,
                              icon: "success"
                            });
                        } else {
                          toast.error(res.data.message);
                        }
                      }).catch(err => toast.error(err.message));
                  },
                  prefill: {
                    name: "Mohit Kumar",
                    email: "mohit@gmail.com",
                    contact: "1234567890",
                  },
                  theme: {
                    color: "#3399cc",
                  },
                };
                var rzp1 = new window.Razorpay(options);
                rzp1.open();
           
            } else {
              toast.error(res.data.message)
            }
          })
          .catch((err) => {
            toast.error(err?.message)
          })
          .finally(() => {
            setLoad(false)
          })

      }
    });



  }

  const handleFreeEnrollment = (id, name) => {
  Swal.fire({
    title: `You are about to enroll in a program by ${name}`,
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Enroll Me !!"
  }).then((result) => {
    if (result.isConfirmed) {
      let formData = {
        mentorshipId: id
      };

      ApiServices.add1Enrollment(formData)
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            Swal.fire({
              title: `Enrolled!`,
              text: `You have been enrolled successfully!`,
              icon: "success"
            });
          
             nav("/myenrollments");
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          toast.error(err?.message || "Something went wrong");
        });
    }
  });
};


  return (
    <>
      <main className="main">
        <PageTitle>Mentorship Programs</PageTitle>
        <section id="contact" className="contact section " style={{ marginTop: "10vh", marginBottom:"10vh" }}>

          {load ?
            <FadeLoader color="#f98603" cssOverride={{ display: "block", margin: "0 auto" }} loading={load} />
            :
            <div className="container my-3" >
              <div className="row justify-content-center gy-4">
                <div className="col-md-12">




                  <div className="row">
                    {mentorshipProgram?.map((program, index) => (
                      <div className="col-md-6 col-lg-4 d-flex  mt-3 mb-3" key={program._id}>
                        <div className="card shadow-sm rounded-3 mb-4 w-100 h-100  ">
                          <div className="card-body d-flex flex-column">
                            <h5 className="card-title mb-3 text-primary  ">
                              Mentorship Program {(currentPage - 1) * LIMIT + index + 1}
                            </h5>

                            <div className="row mb-2">
                              <div className="col-6 fw-medium text-muted">
                                <i className="bi bi-person-circle me-2 text-info"></i>Mentor Name
                              </div>
                              <div className="col-6">{program.mentor?.name}</div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-6 fw-medium text-muted">
                                <i className="bi bi-journal-code me-2 text-success"></i>Topics
                              </div>
                              <div className="col-6">{program.topics?.map((t) => t.topic).join(", ")}</div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-6 fw-medium text-muted">
                                <i className="bi bi-calendar-event me-2 text-danger"></i>Session Date
                              </div>
                              <div className="col-6">{program.sessionDate}</div>
                            </div>

                            {/* <div className="row mb-2">
                              <div className="col-6 fw-medium text-muted">
                                <i className="bi bi-link-45deg me-2 text-warning"></i>Meeting Link
                              </div>
                               <div className="col-6">
                                <a href={program.meetingLink} target="_blank" rel="noopener noreferrer">
                                  Join Now
                                </a>
                              </div> 
                            </div> */}

                            <div className="row mb-2">
                              <div className="col-6 fw-medium text-muted">
                                <i className="bi bi-clock me-2 text-secondary"></i>Duration
                              </div>
                              <div className="col-6">{program.duration}</div>
                            </div>

                            <div className="row mb-2">
                              <div className="col-6 fw-medium text-muted">
                                <i className="bi bi-currency-rupee me-2 text-dark"></i>Price
                              </div>
                              <div className="col-6">{program.price ? `₹${program.price}` : "Free"}</div>
                            </div>


                            <div className="row mb-3">
                              <div className="col-6 fw-medium text-muted">
                                <i className="bi bi-star me-2 text-warning"></i>Rating
                              </div>
                              <div className="col-6">{program.rating}</div>
                            </div>

                            <div className="mt-auto">
                              {/* <button
                                className="btn btn-primary w-100"
                                onClick={() => handleEnroll(program._id, program?.mentor?.name, program?.price)}
                              >
                                Enroll
                              </button> */}

                              <button
  className="btn btn-primary w-100"
  onClick={() =>
    program.price
      ? handleEnroll(program._id, program?.mentor?.name, program?.price)
      : handleFreeEnrollment(program._id, program?.mentor?.name)
  }
>
  {program.price ? "Enroll (Paid)" : "Enroll (Free)"}
</button>



                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>



                  <div className="d-flex justify-content-center mt-4">
                    <ResponsivePagination
                      current={currentPage}
                      total={Math.ceil(total / LIMIT)}
                      onPageChange={setCurrentPage}
                    />
                  </div>

                </div>
              </div>
            </div>
          }
        </section>
        {/* /Contact Section */}
      </main>


    </>
  )
}