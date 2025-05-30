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

export default function ManageDiscussionReplies() {

    const [discussionReplies, setDiscussionReplies] = useState([])
    const [load, setLoad] = useState(true)
    const [filter, setFilter] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [total, setTotal] = useState()

    useEffect(() => {
        fetchDiscussionReplies()
    }, [filter, currentPage])


    const fetchDiscussionReplies = () => {

        setLoad(true)
        let formData = {
            limit: LIMIT,
            currentPage: currentPage
        }

        if (!!filter) {
            formData.status = filter
        }

        ApiServices.allDiscussionReplies(formData)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message)

                    setDiscussionReplies(res.data.data)
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

    const changeStatusDiscussionReplies = (id, status) => {
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
                ApiServices.changeStatusDiscussionReplies(formData)
                    .then((res) => {
                        if (res.data.success) {
                            toast.success(res.data.message)
                            // window.location.reload()
                            fetchDiscussionReplies()
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
              <PageTitle>Manage Discussion Replies</PageTitle>
                <section id="contact" className="contact section " style={{ marginTop: "10vh" }}>

                    {load ?
                        <FadeLoader color="#f98603" cssOverride={{ display: "block", margin: "0 auto" }} loading={load} />
                        :
                        <div className="container my-3" >
                            
                            <div className="row justify-content-center gy-4">
                                <div className="col-md-12 table-responsive">
                                    <table className="table shadow-sm border table-striped table-hover">
                                        <thead style={{ backgroundColor: "#121212e3", color: "#fff" }}>
                                            <tr>
                                                <th>Sno.</th>
                                                <th>Added By</th>
                                                <th>Discussion Reply</th>
                                                <th>Discussion Question</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {discussionReplies?.map((discussionReplies, index) => (
                                                <tr>
                                                    <td>{(currentPage-1)*LIMIT+index + 1}</td>
                                                    <td>{discussionReplies?.addedById?.name}</td> 
                                                    <td>{discussionReplies?.text} </td>
                                                    <td>{discussionReplies?.discussionId?.description}</td>
                                                   
                            <td className="align-middle">
                                        <div className="d-flex flex-column align-items-center gap-2">

                                        <Link to={"/admin/discussionReplies/view/"+discussionReplies?._id} className=" btn btn-outline-info">
                                            <i className="bi bi-eye"></i>
                                        </Link>         

                                         <button className="btn ">
                                            <Switch onChange={()=>{
                                                changeStatusDiscussionReplies(discussionReplies?._id, discussionReplies?.status)
                                            }} checked={discussionReplies?.status}/>
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