import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiServices from "../../services/ApiServices"
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";
import Pagination, { LIMIT } from "../../utilities/Pagination"
import Swal from "sweetalert2";
import PageTitle from "../../layouts/PageTitle";
import { Link } from "react-router-dom";
import Switch from "react-switch"
import ResponsivePagination from "react-responsive-pagination"

export default function ManageMentorshipProgramMentor() {
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [mentorshipProgram, setMentorshipProgram] = useState([]);
  const [total, setTotal] = useState(0);
  const [load, setLoad] = useState(true);

  const changeStatusProgram = (id, currentStatus) => {
    Swal.fire({
      title: `Are you sure you want to ${currentStatus ? "disable" : "enable"} this program?`,
      text: `This program will be ${currentStatus ? "disabled and hidden from students" : "enabled and visible to students"}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${currentStatus ? "disable" : "enable"} it`,
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = { _id: id, status: !currentStatus };

        apiServices
          .changeStatusProgram(formData)
          .then((res) => {
            if (res.data.success) {
              toast.success(res.data.message);

              if (filter === "Inactive" && mentorshipProgram.length === 1) {
                setFilter("");
                setCurrentPage(1);
              } else {
                fetchPrograms();
              }

              Swal.fire({
                title: "Updated!",
                text: `Program has been ${currentStatus ? "disabled" : "enabled"}`,
                icon: "success",
              });
            } else {
              toast.error(res.data.message);
            }
          })
          .catch(() => {
            toast.error("Failed to update program status");
          });
      }
    });
  };

  const fetchPrograms = () => {
    setLoad(true);
    const mentorId = sessionStorage.getItem("userId");

    if (!mentorId) {
      toast.error("Mentor ID not found in sessionStorage.");
      setLoad(false);
      return;
    }

    const formData = {
      mentor: mentorId,
      limit: LIMIT,
      currentPage,
    };

    if (filter === "Active") formData.status = true;
    if (filter === "Inactive") formData.status = false;

    apiServices
      .getMentorMentorshipPrograms(formData)
      .then((res) => {
        if (res.data.success) {
          setMentorshipProgram(res.data.data);
          setTotal(res.data.total);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => {
        toast.error("Failed to fetch mentorship programs");
      })
      .finally(() => {
        setTimeout(() => setLoad(false), 500);
      });
  };

  useEffect(() => {
      fetchPrograms();
  }, [filter, currentPage]);

  return (
 
     <main className="main">
   <PageTitle>Manage Mentorship programs</PageTitle>
      <section id="contact" className="contact section " style={{ marginTop: "7vh", marginBottom:"7vh" }}>
   
    {load ?
                        <FadeLoader color="#f98603" cssOverride={{ display: "block", margin: "0 auto" }} loading={load} />
                        :
                        <div className="container my-3" >
                            <div className="row d-flex justify-content-between my-2">

                                <div className="col-md-2 ">
                                    <Link to={"/mentor/MentorshipProgram/add"} className="btn btn-outline-primary">Add New +</Link>
                                </div>

                            </div>

                            <div className="row justify-content-center gy-4">
                                <div className="col-md-12 table-responsive">
                                    <table className="table border shadow-sm table-striped table-hover">
                                        <thead style={{ backgroundColor: "#121212e3", color: "#fff" }}>
                                            <tr>
                                                <th>Sno.</th>
                                                <th>Topics</th>
                                                <th>Session Date</th>
                                                <th>Meeting Link</th>
                                                <th>Duration</th>
                                                <th>Price</th>
                                                <th>Rating</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {mentorshipProgram?.map((mentorshipProgram, index) => (
                                                <tr>
                                                    <td>{(currentPage-1)*LIMIT+index + 1}</td> 
                                                    <td>{mentorshipProgram?.topics?.map((t)=>t.topic).join(", ")}</td>
                                                    <td>{mentorshipProgram?.sessionDate} </td>
                                                    <td>{mentorshipProgram?.meetingLink}</td>
                                                    <td>{mentorshipProgram?.duration}</td>
                                                    <td>{mentorshipProgram?.price}</td>
                                                    <td>{mentorshipProgram?.rating}</td>

                                                    <td className="align-middle">
                                        <div className="d-flex  align-items-center gap-1">

                                         <Link to={"/mentor/mentorshipProgram/view/"+mentorshipProgram?._id} className=" btn btn-outline-info">
                                            <i className="bi bi-eye"></i>
                                        </Link>   

                                        <Link to={"/mentor/mentorshipProgram/edit/"+mentorshipProgram?._id} className="btn btn-outline-success">
                                            <i className="bi bi-pencil-square"></i>
                                        </Link>


                                         <button className="btn ">
                                            <Switch onChange={()=>{
                                                changeStatusProgram(mentorshipProgram?._id, mentorshipProgram?.status)
                                            }} checked={mentorshipProgram?.status}/>
                                        </button>

                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                        <tfoot>
                                            <tr>
                                                <td colSpan={8} >
                                                    <ResponsivePagination
                                                        current={currentPage}
                                                        total={Math.ceil(total / LIMIT)}
                                                        onPageChange={setCurrentPage}   />
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    }
    </section>
    </main>
  );
}
