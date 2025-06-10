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

export default function ManageDiscussionQuestion() {

    const [discussionQuestion, setDiscussionQuestion] = useState([])
    const [load, setLoad] = useState(true)
    /* const [filter, setFilter] = useState("") */
    const [currentPage, setCurrentPage] = useState(1)
    const [total, setTotal] = useState()

    useEffect(() => {
        fetchDiscussionQuestion()
    }, [ currentPage])


    const fetchDiscussionQuestion = () => {

        setLoad(true)
        let formData = {
            limit: LIMIT,
            currentPage: currentPage
        }

       /*  if (!!filter) {
            formData.status = filter
        } */
console.log("discussionQuestion", discussionQuestion);
        ApiServices.allDiscussionQuestion(formData)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message)

                    setDiscussionQuestion(res.data.data)
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

    const changeStatusDiscussionQuestion = (id, status) => {
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
                ApiServices.changeStatusDiscussionQuestion(formData)
                    .then((res) => {
                        if (res.data.success) {
                            toast.success(res.data.message)
                            // window.location.reload()
                            fetchDiscussionQuestion()
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
              <PageTitle>Manage Discussions</PageTitle>
                <section id="contact" className="contact section " style={{ marginTop: "8vh", marginBottom:"8vh" }}>

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
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>Tags</th>
                                             <th>Actions</th>
                                            </tr>
                                           
                                        </thead>

                                        <tbody>
                                            {discussionQuestion?.map((discussionQuestion, index) => (
                                                <tr>
                                                    <td>{(currentPage-1)*LIMIT+index + 1}</td>
                                                    <td>{discussionQuestion?.addedById?.name}</td> 
                                                    <td>{discussionQuestion?.title} </td>
                                                    <td>{discussionQuestion?.description}</td>
                                                     <td>{discussionQuestion?.tags?.join(", ")}</td>
                                                   


                                                    <td className="align-middle">
                                        <div className="d-flex flex-column align-items-center gap-2">

                                        <Link to={"/admin/discussionQuestion/view/"+discussionQuestion?._id} className=" btn btn-outline-info">
                                            <i className="bi bi-eye"></i>
                                        </Link>         

                                         <button className="btn ">
                                            <Switch onChange={()=>{
                                                changeStatusDiscussionQuestion(discussionQuestion?._id, discussionQuestion?.status)
                                            }} checked={discussionQuestion?.status}/>
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