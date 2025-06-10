import { useEffect, useState } from "react"
import ApiServices from "../../services/ApiServices"
import PageTitle from "../../layouts/PageTitle"
import { toast } from "react-toastify"
import { FadeLoader } from "react-spinners"
import Switch from "react-switch"
import { Link } from "react-router-dom"
import Pagination, { LIMIT } from "../../utilities/Pagination"
import ResponsivePagination from "react-responsive-pagination"
import 'react-responsive-pagination/themes/classic.css';
import Swal from "sweetalert2"

export default function ManageMentor() {

    const [mentor, setMentor] = useState([])
    const [load, setLoad] = useState(true)
    const [filter, setFilter] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [total, setTotal] = useState()

    useEffect(() => {
        fetchMentor()
    }, [filter, currentPage])


    const fetchMentor = () => {

        setLoad(true)
        let formData = {
            limit: LIMIT,
            currentPage: currentPage
        }

        if (!!filter) {
            formData.status = filter
        }

        ApiServices.allMentor(formData)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message)

                    setMentor(res.data.data)
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


    const changeStatusMentor = (id, status) => {
        const formData = {
            _id: id,
            status
        }

        ApiServices.changeStatusMentor(formData)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message);
                    fetchMentor(); // Refresh list
                } else {
                    toast.error(res.data.message || "Failed to update status");
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error("Error updating status");
            });
    };
    /* 
        const changeStatusMentor = (id, status) => {
             Swal.fire({
                title: `You are about to ${status ? "disable" : "enable"} status`,
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Update It !!" 
            })
           .then((result) => {
                if (result.isConfirmed) {
                    let formData = {
                        _id: id,
                        status: !status
                    }
                    ApiServices.changeStatusMentor(formData)
                        .then((res) => {
                            if (res.data.success) {
                                toast.success(res.data.message)
                        
                                fetchMentor()
                                Swal.fire({
                                    title: `${status ? "disabled" : "enabled"}!`,
                                    text: `${status ? "disabled" : "enabled"} successfully!!`,
                                    icon: "success"
                                });
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
     */
    return (
        <>
            <main className="main">
                <PageTitle>Manage Mentors</PageTitle>
                <section id="contact" className="contact section " style={{ marginTop: "8vh", marginBottom:"8vh" }}>

                    {load ?
                        <FadeLoader color="#f98603" cssOverride={{ display: "block", margin: "0 auto" }} loading={load} />
                        :
                        <div className="container my-3" >
                            <div className="row d-flex justify-content-between my-2">
                            </div>
                            <div className="row justify-content-center gy-4">
                                <div className="col-md-12 table-responsive">
                                    <table className="table border shadow-sm table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>Sno.</th>
                                                <th>Profile</th>
                                                <th>Mentor Name</th>
                                                <th>email</th>
                                                <th>contact</th>
                                                <th>Graduation Year</th>
                                                <th>Current Job</th>
                                                <th>Topics Interested</th>
                                                <th>Company</th>
                                                <th>Experience</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {mentor?.map((mentor, index) => (
                                                <tr>
                                                    <td>{(currentPage - 1) * LIMIT + index + 1}</td>

                                                    <td>
                                                        <img src={mentor?.profile} style={{ height: "70px", width: "80px", borderRadius: "50%" }} />
                                                    </td>

                                                    <td>{mentor?.userId?.name}</td>
                                                    <td>{mentor?.userId?.email}</td>
                                                    <td>{mentor?.contact}</td>
                                                    <td>{mentor?.graduationYear}</td>
                                                    <td>{mentor?.currentJob}</td>
                                                    <td>{mentor?.topicInterested?.map((t) => t.topic).join(", ")} </td>
                                                    <td>{mentor?.company}</td>
                                                    <td>{mentor?.experience}</td>

                                                    <td>
                                                        <span
                                                            className={`badge ${mentor.status === "Approved"
                                                                ? "bg-success"
                                                                : mentor.status === "Rejected"
                                                                    ? "bg-danger"
                                                                    : "bg-warning text-dark"
                                                                }`}>
                                                            {mentor.status}
                                                        </span>
                                                    </td>

                                                    <td className="">
                                                        <div className="d-flex  align-items-center">

                                                            <Link to={"/admin/mentor/view/" + mentor?.userId?._id} className=" btn btn-md btn-outline-info d-flex align-items-center gap-1">
                                                                <i className="bi bi-eye"></i>
                                                            </Link>
                                                        
                                                        <button
                                                            className="btn btn-md mx-2  btn-success me-1"
                                                            onClick={() => changeStatusMentor(mentor?.userId?._id, "Approved")}
                                                            disabled={mentor.status === "Approved"}
                                                        >
                                                            <i className="bi bi-check-circle "></i>  
                                                        </button>
                                                        <button
                                                            className="btn btn-md btn-danger "
                                                            onClick={() => changeStatusMentor(mentor?.userId?._id, "Rejected")}
                                                            disabled={mentor.status === "Rejected"}
                                                        >
                                                            <i className="bi bi-x-circle"></i> 
                                                        </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan={14} >
                                                    <ResponsivePagination
                                                        current={currentPage}
                                                        total={Math.ceil(total / LIMIT)}
                                                        onPageChange={setCurrentPage}
                                                    />
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
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