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

export default function ManageMentorshipProgram() {

    const [mentorshipProgram, setMentorshipProgram] = useState([])
    const [load, setLoad] = useState(true)
    const [filter, setFilter] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [total, setTotal] = useState()

    useEffect(() => {
        fetchMentorshipProgram()
    }, [filter, currentPage])


    const fetchMentorshipProgram = () => {

        setLoad(true)
        let formData = {
            limit: LIMIT,
            currentPage: currentPage
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

    const changeStatusMentorshipProgram = (id, status) => {
        Swal.fire({
            title: `You are about to ${status ? "disable" : "enable"} status`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update It !!"
        }).then((result) => {
            if (result.isConfirmed) {
                let formData = {
                    _id: id,
                    status: !status
                }
                ApiServices.changeStatusMentorshipProgram(formData)
                    .then((res) => {
                        if (res.data.success) {
                            toast.success(res.data.message)
                            // window.location.reload()
                            fetchMentorshipProgram()
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

    return (
        <>
            <main className="main">
              <PageTitle>Manage Mentorship Programs</PageTitle>
                <section id="contact" className="contact section " style={{ marginTop: "10vh" }}>

                    {load ?
                        <FadeLoader color="#f98603" cssOverride={{ display: "block", margin: "0 auto" }} loading={load} />
                        :
                        <div className="container my-3" >
                            <div className="row d-flex justify-content-between my-2">
                                {/* <div className="col-md-2">

                                    <select className="form-control" onChange={(e) => { setFilter(e.target.value) }} value={filter}>
                                        <option value={""}>All</option>
                                        <option value={true}>Active</option>
                                        <option value={false}>In-Active</option>
                                    </select>
                                </div> */}

                               {/*  <div className="col-md-2 ">
                                    <Link to={"/admin/topic/add"} className="btn btn-outline-primary">Add New +</Link>
                                </div> */}
                            </div>
                            <div className="row justify-content-center gy-4">
                                <div className="col-md-12 table-responsive">
                                    <table className="table border shadow-sm table-striped table-hover">
                                        <thead style={{ backgroundColor: "#121212e3", color: "#fff" }}>
                                            <tr>
                                                <th>Sno.</th>
                                                <th>Mentor Name</th>
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
                                                    <td>{mentorshipProgram?.mentor?.name}</td> 
                                                    <td>{mentorshipProgram?.topics?.map((t)=>t.topic).join(", ")}</td>
                                                    <td>{mentorshipProgram?.sessionDate} </td>
                                                    <td>{mentorshipProgram?.meetingLink}</td>
                                                    <td>{mentorshipProgram?.duration}</td>
                                                    <td>{mentorshipProgram?.price ? `₹${mentorshipProgram.price}` : "N/A"}</td>
                                                    <td>{mentorshipProgram?.rating}</td>

                                                    <td className="">
                                        <div className="d-flex  align-items-center">

                                        <Link to={"/admin/mentorshipProgram/view/"+mentorshipProgram?._id} className=" btn btn-outline-info">
                                            <i className="bi bi-eye"></i>
                                        </Link>         

                                         <button className="btn ">
                                            <Switch onChange={()=>{
                                                changeStatusMentorshipProgram(mentorshipProgram?._id, mentorshipProgram?.status)
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