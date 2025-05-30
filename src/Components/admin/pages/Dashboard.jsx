import { useEffect, useState } from "react";
import PageTitle from "../../layouts/PageTitle";
import { FadeLoader } from "react-spinners";
import ApiServices from "../../services/ApiServices";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    ApiServices.dashboard()
      .then((res) => {
        if (res.data.success){

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
      <PageTitle>Admin Dashboard</PageTitle>
      {load ? (
        <FadeLoader color="#f98603" cssOverride={{ display: "block", margin: "0 auto" }} />
      ) : (
        <div className="container my-5">
          <div className="row g-4 p-2">
            <DashboardCard title="Total Students" count={dashboardData?.totalstudent} icon="bi-people" color="info" />
            <DashboardCard title="Total Mentors" count={dashboardData?.totalmentor} icon="bi-person-check" color="primary"/>
            <DashboardCard title="Total Topics" count={dashboardData?.totalTopic} icon="bi-journal-text" color="success" />
            <DashboardCard title="Total Feedback" count={dashboardData?.totalfeedback} icon="bi-chat-square-dots" color="danger"/>
            <DashboardCard title="Total Enrollments" count={dashboardData?.totalenrollment} icon="bi-clipboard-check" color="warning" />
            <DashboardCard title="Total Programs" count={dashboardData?.mentorshipProgram?.total} icon="bi-laptop" color="secondary" />
            <DashboardCard title="Active Programs" count={dashboardData?.mentorshipProgram?.activementorshipProgram} icon="bi-toggle-on" color="dark"/>
            <DashboardCard title="Inactive Programs" count={dashboardData?.mentorshipProgram?.inActivementorshipProgram} icon="bi-toggle-off" color="info"/>
          </div>
        </div>
      )}
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



