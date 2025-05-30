import { useEffect, useState } from "react"
import ApiServices from "../../services/ApiServices"

import { toast } from "react-toastify"
import { FadeLoader } from "react-spinners"
import { Link, useNavigate, useParams } from "react-router-dom"
import Pagination, {LIMIT} from "../../utilities/Pagination"
import ResponsivePagination from "react-responsive-pagination"
import 'react-responsive-pagination/themes/classic.css';
import Swal from "sweetalert2"


export default function Enrollment() {
    const {id}=useParams()
    const [data, setData] = useState([])
    const [load, setLoad] = useState(true)
    const [filter, setFilter] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [total, setTotal] = useState()

    useEffect(() => {
        fetchEnrollment()
    }, [filter, currentPage, id])


    const fetchEnrollment = () => {

        setLoad(true)
        let formData = {
            limit: LIMIT,
            currentPage: currentPage,
            mentorshipId:id
        }
       
       
        ApiServices.allEnrollment(formData)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message)

                    setData(res.data.data)
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
  

    return (
        <>
            <main className="main">
                {/* <PageTitle>Mentorship Programs</PageTitle> */}
                <section id="contact" className="contact section " style={{ marginTop: "10vh" }}>

                    {load ?
                        <FadeLoader color="#f98603" cssOverride={{ display: "block", margin: "0 auto" }} loading={load} />
                        :
                        <div className="container my-3" >
                            <div className="row justify-content-center gy-4">
                                <div className="col-md-12 table-responsive">
                                         <table className="table border shadow-sm table-striped table-hover">
                                        <thead style={{ backgroundColor: "#121212e3", color: "#fff" }}>
                                            <tr>
                                                <th>Sno.</th>
                                                <th>Date</th>
                                                <th>User Details</th>
                                              {/*   <th>Status</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data?.map((el, index) => (
                                                <tr>
                                                    <td>{(currentPage - 1) * LIMIT + index + 1}</td>
                                                    <td>{el?.createdAt}</td>
                                                    <td>{el?.userId?.name}, {el?.userId?.email} </td>
                                                    {/* <td>{el?.status}</td> */}
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
                                  

                               

                 
{/* <div className="d-flex justify-content-center mt-4">
  <ResponsivePagination
    current={currentPage}
    total={Math.ceil(total / LIMIT)}
    onPageChange={setCurrentPage}
  />
</div>
 */}

                                  

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