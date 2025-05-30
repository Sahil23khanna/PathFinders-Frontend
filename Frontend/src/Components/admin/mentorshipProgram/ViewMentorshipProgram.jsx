import { useParams } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import { useEffect, useState } from "react";
import ApiServices from "../../services/ApiServices";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";
import Enrollment from "./Enrollment";

export default function ViewMentorshipProgram() {
  const { id } = useParams();
  const [program, setProgram] = useState({});
  const [load, setLoad] = useState(true);

  useEffect(() => {
    fetchSingleMentorshipProgram();
  }, [id]);

  const fetchSingleMentorshipProgram = () => {
    const formData = { _id: id };

    ApiServices.singleMentorshipProgram(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setProgram(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err?.message || "Something went wrong.");
      })
      .finally(() => {
        setTimeout(() => setLoad(false), 500);
      });
  };

  return (
    <>
      <PageTitle>View Mentorship Program</PageTitle>

      {load ? (
        <FadeLoader
          loading={load}
          color="#f98603"
          cssOverride={{ display: "block", margin: "0 auto" }}
        />
      ) : (
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div
                className="card shadow-sm border-0 rounded-4 p-4"
                style={{ backgroundColor: "#ffffff" }}
              >
                <h5 className="mb-4 text-center text-primary fw-semibold">
                  Mentorship Program Details
                </h5>

                <Detail label="Mentor Name" value={program.mentor?.name} />
                <Detail
                  label="Topics"
                  value={program.topics?.map((t) => t.topic).join(", ")}
                />
                <Detail label="Session Date" value={program.sessionDate} />
                <Detail label="Meeting Link" value={program.meetingLink} />
                <Detail label="Duration" value={program.duration} />
                <Detail
                  label="Price"
                  value={program.price ? `₹${program.price}` : "Free"}
                />
                <Detail label="Rating" value={program.rating} />
              </div>
            </div>
          </div>

          <h2 className="text-center mt-5 mb-3">Enrollments</h2>
          <Enrollment />
        </div>
      )}
    </>
  );
}

// Reusable Detail Component
const Detail = ({ label, value }) => (
  <div className="d-flex justify-content-between mb-3 px-1">
    <span className="text-secondary fw-medium">{label}</span>
    <span className="text-dark text-end">{value || "N/A"}</span>
  </div>
);
