import { useParams } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import { useEffect, useState } from "react";
import ApiServices from "../../services/ApiServices";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";

export default function ViewStudent() {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const [load, setLoad] = useState(true);

  useEffect(() => {
    fetchSingleStudent();
  }, [id]);

  const fetchSingleStudent = () => {
    const formData = { userId: id };

    ApiServices.singleStudent(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setStudent(res.data.data);
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
      <PageTitle>View Student</PageTitle>
      <section style={{marginTop:"8vh", marginBottom:"8vh"}}>
      {load && (
        <FadeLoader
          loading={load}
          color="#f98603"
          cssOverride={{ display: "block", margin: "0 auto" }}
        />
      )}

      {!load && (
        <div className="container d-flex justify-content-center align-items-center">
          <div
            className="card shadow-sm border-0"
            style={{
              maxWidth: "480px",
              width: "100%",
              borderRadius: "16px",
              padding: "35px 25px",
              backgroundColor: "#ffffff",
            }}
          >
            <div className="text-center mb-4">
              <h4 className="text-dark fw-bold mb-1">{student?.userId?.name}</h4>
              <p className="text-muted mb-2">{student?.userId?.email}</p>
            </div>

            <hr className="my-3" />

            <div className="px-2">
              <Info label="Contact" value={student?.contact} />
            </div>
          </div>
        </div>
      )}
      </section>
    </>
  );
}

// Reusable Info Component
const Info = ({ label, value }) => (
  <p className="mb-3 fs-6">
    <strong className="text-secondary">{label}:</strong>{" "}
    <span className="text-dark">{value || "N/A"}</span>
  </p>
);
