import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap"; // Import Modal
import StarRatings from 'react-star-ratings';
import ApiServices from "../services/ApiServices";
import PageTitle from "../layouts/PageTitle";
import { toast } from "react-toastify";
import { FaUserGraduate, FaCalendarAlt, FaClock, FaStar, FaLink } from "react-icons/fa";
import Pagination, { LIMIT } from "../utilities/Pagination";
import ResponsivePagination from "react-responsive-pagination";
import 'react-responsive-pagination/themes/classic.css';

export default function MyEnrollment() {
    const [data, setData] = useState([]);
    const [load, setLoad] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState();
    const [showModal, setShowModal] = useState(false);
    const [selectedMentorship, setSelectedMentorship] = useState(null);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        fetchEnrollment();
    }, [currentPage]);

    const fetchEnrollment = () => {
        setLoad(true);
        let formData = {
            limit: LIMIT,
            currentPage,
            userId: sessionStorage.getItem("userId"),
        };

        ApiServices.allEnrollment(formData)
            .then((res) => {
                if (res.data.success) {
                    setData(res.data.data);
                    setTotal(res.data.total);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => toast.error(err.message))
            .finally(() => setLoad(false));
    };

    const handleRate = (mentorship) => {
        setSelectedMentorship(mentorship);
        setShowModal(true);
    };

    const submitRating = () => {
        if (!rating || feedback.trim() === "") {
            toast.error("Please provide both rating and feedback.");
            return;
        }

        let formData = {
            mentorshipId: selectedMentorship?.mentorshipId?._id,
            rating,
            feedback,
        };

        ApiServices.addRating(formData)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message);
                    setShowModal(false);
                    setRating(0);
                    setFeedback("");
                    fetchEnrollment()
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => toast.error(err.message));
    };

    return (
        <>
            <main className="main">
                <PageTitle>My Enrollments</PageTitle>
                <section id="contact" className="contact section" style={{ marginTop: "10vh" }}>
                    {load ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="container my-3">
                           
                            <div className="row">
  {data?.map((el, index) => (
    <div className="col-md-6 col-lg-4 d-flex mt-3 mb-3" key={el._id}>
      <div className="card shadow-sm rounded-3 mb-4 w-100 h-100">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title mb-3 text-primary">
            Enrolled Program {(currentPage - 1) * LIMIT + index + 1}
          </h5>

          <div className="row mb-2">
            <div className="col-6 fw-medium text-muted">
              <FaUserGraduate className="me-2 text-info" />
              Mentor
            </div>
            <div className="col-6">{el?.mentorshipId?.mentor?.name}</div>
          </div>

          <div className="row mb-2">
            <div className="col-6 fw-medium text-muted">
              <FaCalendarAlt className="me-2 text-danger" />
              Date
            </div>
            <div className="col-6">{el?.mentorshipId?.sessionDate}</div>
          </div>

          <div className="row mb-2">
            <div className="col-6 fw-medium text-muted">
              <FaClock className="me-2 text-secondary" />
              Duration
            </div>
            <div className="col-6">{el?.mentorshipId?.duration}</div>
          </div>

          <div className="row mb-2">
            <div className="col-6 fw-medium text-muted">
              <FaStar className="me-2 text-warning" />
              Rating
            </div>
            <div className="col-6">{el?.mentorshipId?.rating || "Not Rated Yet"}</div>
          </div>

          <div className="row mb-3">
            <div className="col-6 fw-medium text-muted">
              <FaLink className="me-2 text-success" />
              Meeting Link
            </div>
            <div className="col-6">
              <a href={el?.mentorshipId?.meetingLink} target="_blank" rel="noopener noreferrer">
                Join Now
              </a>
            </div>
          </div>

          <button className="btn btn-primary mt-auto" onClick={() => handleRate(el)}>
            Rate This Session
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

                            <div className="d-flex justify-content-center mt-4">
                                <ResponsivePagination current={currentPage} total={Math.ceil(total / LIMIT)} onPageChange={setCurrentPage} />
                            </div>
                        </div>
                    )}
                </section>
            </main>

            {/* Rating Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-dialog-centered">
                <Modal.Header closeButton>
                    <Modal.Title>Rate Mentorship Session</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StarRatings
                        rating={rating}
                        starRatedColor="gold"
                        changeRating={(newRating) => setRating(newRating)}
                        numberOfStars={5}
                        name="rating"
                    />
                    <textarea className="form-control mt-3" placeholder="Write your feedback..." value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={submitRating}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
