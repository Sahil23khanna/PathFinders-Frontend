import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiServices from "../../services/ApiServices";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";
import { LIMIT } from "../../utilities/Pagination";
import PageTitle from "../../layouts/PageTitle";
import ResponsivePagination from "react-responsive-pagination";
import Switch from "react-switch";
import Swal from "sweetalert2";

export default function ViewDiscussionReplies() {
  const { discussionId } = useParams();
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [discussionReplies, setDiscussionReplies] = useState([]);
  const [total, setTotal] = useState(0);
  const [load, setLoad] = useState(true);

 

  const fetchReplies = () => {
    setLoad(true);
    const formData = { discussionId, currentPage, limit: LIMIT };
    if (filter === "Active") formData.status = true;
    if (filter === "Inactive") formData.status = false;

    apiServices.allDiscussionReplies(formData)
      .then((res) => {
        if (res.data.success) {
          setDiscussionReplies(res.data.data);
          setTotal(res.data.total);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(() => toast.error("Failed to fetch discussion replies"))
      .finally(() => setTimeout(() => setLoad(false), 500));
  };

  useEffect(() => {
    fetchReplies();
  }, [filter, currentPage]);

  return (
    <main className="main">
      <PageTitle>View Discussion Replies</PageTitle>
      <section className="section py-5">
        {load ? (
          <FadeLoader color="#f98603" cssOverride={{ display: "block", margin: "0 auto" }} loading={load} />
        ) : (
          <div className="container">
            <div className="row mb-3">
              <div className="col-md-3">
                <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="">All</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered table-hover text-center">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Reply</th>
                    <th>User</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {discussionReplies.length > 0 ? (
                    discussionReplies.map((reply, index) => (
                      <tr key={reply._id}>
                        <td>{(currentPage - 1) * LIMIT + index + 1}</td>
                        <td>{reply.reply}</td>
                        <td>{reply.user?.name || "Anonymous"}</td>
                        <td>{reply.status ? "Active" : "Inactive"}</td>
                       
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No replies found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <ResponsivePagination
                current={currentPage}
                total={Math.ceil(total / LIMIT)}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
