/* import { useParams } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import { useEffect, useState } from "react";
import ApiServices from "../../services/ApiServices";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";

export default function ViewMentor(){
    
    const {id}=useParams()
    const [mentor, setMentor]=useState({})
    const [load,setLoad]=useState(true)

    useEffect(()=>{
        fetchSingleMentor()
    },[id]) 

    const fetchSingleMentor=()=>{
        let formData={
            userId:id
        }

        ApiServices.singleMentor(formData)

        .then((res)=>{
            if(res.data.success){
                toast.success(res.data.message)
                setMentor(res.data.data)
            }else{
                toast.error(res.data.message)
            }
        })
        .catch((err)=>{
            toast.error(err?.message)
        })
        .finally(()=>{
            setTimeout(()=>{
                setLoad(false)
            },500)
        })
        
    }   
    return(
        <>
        <PageTitle>View Mentor</PageTitle>
        <FadeLoader loading={load} color="#f98603" cssOverride={{display:"block", margin:"0 auto"}}/>

        <div className={load ? "d-none":"container"}>
        
  <div className="card" style={{maxWidth: "600px",
    margin: "40px auto",
    boxShadow: "0 0 15px rgba(0,0,0,0.1)",
    borderRadius: "12px",
    overflow: "hidden"}}>
      <div className="card-body text-center">
        <img
          src={mentor?.profile}
          alt="Student"
          style={{ width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "50%",
    border: "3px solid #dee2e6"}}
          className="mb-3"
        />
        <h4 className="card-title">{mentor?.userId?.name}</h4>
        <p className="text-muted">{mentor?.userId?.email}</p>
        <hr />
        <div className="text-start px-4">
          <p>
            <span style={{ fontWeight: "600", color: "#6c757d"}}>Contact:</span> {mentor?.contact}
          </p>
          <p>
            <span style={{ fontWeight: "600",color: "#6c757d"}}>Graduation Year:</span> {mentor?.graduationYear}
          </p>
          <p>
            <span style={{ fontWeight: "600",color: "#6c757d"}}>Topics Interested:</span> {mentor?.topicInterested?.map((t)=>t.topic).join(", ")}
          </p>
           <p>
            <span style={{ fontWeight: "600",color: "#6c757d"}}>Experience:</span> {mentor?.experience}
          </p>
            <p>
            <span style={{ fontWeight: "600",color: "#6c757d"}}>Current Job:</span> {mentor?.currentJob}
          </p>
            <p>
            <span style={{ fontWeight: "600",color: "#6c757d"}}>Company:</span> {mentor?.company}
          </p>
            <p>
            <span style={{ fontWeight: "600",color: "#6c757d"}}>Story:</span> {mentor?.alumniStory}
          </p>
        </div>
      </div>
    </div>

    </div>
        </>
    )
} */

import { useParams } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import { useEffect, useState } from "react";
import ApiServices from "../../services/ApiServices";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";

export default function ViewMentor() {
  const { id } = useParams();
  const [mentor, setMentor] = useState({});
  const [load, setLoad] = useState(true);

  useEffect(() => {
    fetchSingleMentor();
  }, [id]);

  const fetchSingleMentor = () => {
    const formData = { userId: id };

    ApiServices.singleMentor(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setMentor(res.data.data);
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
      <PageTitle>View Mentor</PageTitle>
      <section style={{marginTop:"8vh" , marginBottom:"8vh"}}>
      {load && (
        <FadeLoader
          loading={load}
          color="#f98603"
          cssOverride={{ display: "block", margin: "0 auto" }}
        />
      )}

      {!load && (
        <div className="container d-flex justify-content-center align-items-center" style={{  marginTop:"10vh"}}>
          <div
            className="card shadow-lg border-0"
            style={{
              maxWidth: "600px",
              width: "100%",
              borderRadius: "16px",
              overflow: "hidden",
              padding: "30px",
              backgroundColor: "#fff",
            }}
          >
            <div className="text-center">
              <img
                src={mentor?.profile || "/default-profile.png"}
                alt="Mentor"
                className="rounded-circle mb-3"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  border: "3px solid #f1f1f1",
                }}
              />
              <h4 className="mb-1 text-primary">{mentor?.userId?.name}</h4>
              <p className="text-muted mb-3">{mentor?.userId?.email}</p>
              <hr />
            </div>

            <div className="px-2">
              <Info label="Contact" value={mentor?.contact} />
              <Info label="Graduation Year" value={mentor?.graduationYear} />
              <Info
                label="Topics Interested"
                value={mentor?.topicInterested?.map((t) => t.topic).join(", ")}
              />
              <Info label="Experience" value={mentor?.experience} />
              <Info label="Current Job" value={mentor?.currentJob} />
              <Info label="Company" value={mentor?.company} />
              <Info label="Story" value={mentor?.alumniStory} />
            </div>
          </div>
        </div>
      )}
      </section>
    </>
  );
}

const Info = ({ label, value }) => (
  <p className="mb-2">
    <strong className="text-secondary">{label}:</strong>{" "}
    <span className="text-dark">{value || "N/A"}</span>
  </p>
);
