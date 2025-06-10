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

export default function ManageStudent() {

    const [student, setStudent] = useState([])
    const [load, setLoad] = useState(true)
    const [filter, setFilter] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [total, setTotal] = useState()

    useEffect(() => {
        fetchStudent()
    }, [filter, currentPage])


    const fetchStudent = () => {

        setLoad(true)
        let formData = {
            limit: LIMIT,
            currentPage: currentPage
        }

        if (!!filter) {
            formData.status = filter
        }

        ApiServices.allStudent(formData)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message)

                    setStudent(res.data.data)
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

                    setLoad(false)
                }, 1000)

            })
    }

    const changeStatusStudent = (id, status) => {
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
                ApiServices.changeStatusStudent(formData)
                    .then((res) => {
                        if (res.data.success) {
                            toast.success(res.data.message)

                            fetchStudent()
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
                <PageTitle>Manage Students</PageTitle>
                <section id="contact" className="contact section " style={{ marginTop: "8vh" , marginBottom:"8vh" }}>

                    {load ?
                        <FadeLoader color="#f98603" cssOverride={{ display: "block", margin: "0 auto" }} loading={load} />
                        :
                        <div className="container my-3" >

                            <div className="row justify-content-center gy-4">
                                <div className="col-md-12 table-responsive">
                                    <table className="table border shadow-sm table-hover table-striped">
                                        <thead style={{ backgroundColor: "#121212e3", color: "#fff" }}>
                                            <tr>
                                                <th>Sno.</th>
                                                {/* <th>Profile</th> */}
                                                <th>Student Name</th>
                                                <th>Email</th>
                                                <th>Contact</th>
                                                {/* <th>Education Level</th>
                                                <th>Topics Interested</th> */}
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {student?.map((student, index) => (
                                                <tr>
                                                    <td>{(currentPage - 1) * LIMIT + index + 1}</td>

                                                  {/*   <td>
                                                        <img src={student?.profile} style={{ height: "60px", width: "60px", borderRadius: "50%" }} />
                                                    </td> */}

                                                    <td>{student?.userId?.name}</td>
                                                    <td>{student?.userId?.email}</td>
                                                    <td>{student?.contact}</td>
                                                   {/*  <td>{student?.educationLevel}</td>
                                                    <td>{student?.topicInterested?.map((t) => t.topic).join(", ")} </td> */}




                                                    <td className="">
                                                        <div className="d-flex  align-items-center">

                                                            <Link to={"/admin/student/view/" + student?.userId?._id} className=" btn btn-outline-info btn-md">
                                                                <i className="bi bi-eye"></i>
                                                            </Link>

                                                            <button className="btn ">
                                                                <Switch onChange={() => {
                                                                    changeStatusStudent(student?.userId?._id, student?.status)
                                                                }} checked={student?.status}
                                                    
                                                                />
                                                            </button>
                                                        </div>
                                                    </td>

                                                </tr>
                                            ))}

                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colSpan={10} >
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