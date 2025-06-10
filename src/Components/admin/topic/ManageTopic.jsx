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

export default function ManageTopic() {

    const [topic, setTopic] = useState([])
    const [load, setLoad] = useState(true)
    const [filter, setFilter] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [total, setTotal] = useState()

    useEffect(() => {
        fetchTopic()
    }, [filter, currentPage])


    const fetchTopic = () => {

        setLoad(true)
        let formData = {
            limit: LIMIT,
            currentPage: currentPage
        }

        if (!!filter) {
            formData.status = filter
        }

        ApiServices.allTopic(formData)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message)

                    setTopic(res.data.data)
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

    const changeStatusTopic = (id, status) => {
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
                ApiServices.changeStatusTopic(formData)
                    .then((res) => {
                        if (res.data.success) {
                            toast.success(res.data.message)
                            // window.location.reload()
                            fetchTopic()
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
              <PageTitle>Manage Topics</PageTitle>
                <section id="contact" className="contact section " style={{ marginTop: "8vh", marginBottom:"8vh" }}>

                    {load ?
                        <FadeLoader color="#f98603" cssOverride={{ display: "block", margin: "0 auto" }} loading={load} />
                        :
                        <div className="container my-3" >
                            <div className="row d-flex justify-content-between align-items-center my-2" style={{paddingTop:"1vh", paddingBottom:"1vh"}}>
                                <div className="col-md-2" style={{paddingLeft:"4vw"}}>

                                    <select className="form-control" onChange={(e) => { setFilter(e.target.value) }} value={filter}>
                                        <option value={""}>All</option>
                                        <option value={true}>Active</option>
                                        <option value={false}>In-Active</option>
                                    </select>
                                </div>

                                <div className="col-md-2" style={{paddingLeft:"3vw"}}>
                                    <Link to={"/admin/topic/add"} className="btn btn-outline-primary">Add New +</Link>
                                </div>
                            </div>
                            <div className="row justify-content-center gy-4">
                                <div className="col-md-12 table-responsive">
                                    <table className="table table-striped table-hover border shadow-sm">
                                        <thead /* className="table-primary" */ style={{ backgroundColor: "#121212e3", color: "#fff" }}>
                                            <tr>
                                                <th>Sno.</th>
                                                <th>Image</th>
                                                <th>Topic Name</th>
                                                <th>Description</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {topic?.map((topic, index) => (
                                                <tr>
                                                <td>{(currentPage-1)*LIMIT+index + 1}</td>
                                                    <td>
                                                        <img src={topic?.image} style={{ height: "120px", width: "230px" }} />
                                                    </td>
                                                    <td>{topic?.topic}</td>
                                                    <td>{topic?.description}</td>

                                                    <td className="">
                                        <div className="d-flex align-items-center gap-2">

                                        <Link to={"/admin/topic/view/"+topic?._id} className=" btn btn-outline-info btn-md">
                                            <i className="bi bi-eye"></i>
                                        </Link>          {/* btn btn-info ms-2 */}

                                        <Link to={"/admin/topic/edit/"+topic?._id} className="btn btn-outline-success btn-md">
                                            <i className="bi bi-pencil-square"></i>
                                        </Link>

                                                       <button className="btn btn-md">
                                            <Switch onChange={()=>{
                                                changeStatusTopic(topic?._id, topic?.status)
                                            }} checked={topic?.status}/>
                                        </button>
                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <tfoot>
                                            {/*  <tr>
                                <td colSpan={5} >
                                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}
                                    total={total}
                                  />
                                </td>
                            </tr>  */}
                                            <tr>
                                                <td colSpan={5} >
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