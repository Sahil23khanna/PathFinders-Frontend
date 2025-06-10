import { useEffect, useState } from "react";
import PageTitle from "../../layouts/PageTitle";
import { FadeLoader } from "react-spinners";
import ApiServices from "../../services/ApiServices";
import { toast } from "react-toastify";

export default function MentorDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    ApiServices.Mentordashboard()
      .then((res) => {
        if (res.data.success) {

          setDashboardData(res.data);
        } 
        else {
          toast.error("Failed to load dashboard data");
        }
      })

      .catch((err) => {
        toast.error("An error occurred while fetching dashboard data");
      })

      .finally(() => {
        setLoad(false);
      });

  }, []);

  return (
    <>
      <PageTitle>Mentor Dashboard</PageTitle>
      <section style={{marginTop:"7vh", marginBottom:"7vh"}}>
      {load ? (
        <FadeLoader color="#f98603" cssOverride={{ display: "block", margin: "0 auto" }} />
      ) : (
        <div className="container my-5">               {/*  row g-4 p-2 */}
          <div className=" d-flex justify-content-center flex-wrap gap-3">
            <DashboardCard title="Total mentorship Programs" count={dashboardData?.totalmentorshipProgram} icon="bi-people" color="info" />
            <DashboardCard title="Total discussion Questions" count={dashboardData?.totaldiscussionQuestion} icon="bi-person-check" color="primary"/>
            <DashboardCard title="Total discussion Replies" count={dashboardData?.totaldiscussionReplies} icon="bi-journal-text" color="success" />
          </div>
        </div>
      )}
      </section>
    </>
  );
}

function DashboardCard({ title, count, icon, color = "primary" }) {
  return (
    <div className="col-md-3 mb-4">
      <div
        className={`card text-white bg-${color} text-center p-4 h-100 rounded-4 shadow-sm`}
        style={{
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.06)";
          e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
        }}
      >
        <i className={`bi ${icon} fs-1`}></i>
        <h4 className="mt-3">{count ?? 0}</h4>
        <p className="text-white-50">{title}</p>
      </div>
    </div>
  );
}


