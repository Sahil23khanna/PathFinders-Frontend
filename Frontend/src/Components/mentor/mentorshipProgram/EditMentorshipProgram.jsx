
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import ApiServices from "../../services/ApiServices";
import { FadeLoader } from "react-spinners";
import Select from "react-select";

export default function EditMentorshipProgram() {
    const { id } = useParams()
    const [topicId, setTopicId] = useState([])
    const [topicList, setTopicList] = useState([]);
    /* const [topics,setTopics]=useState("") */
    const [sessionDate, setSessionDate] = useState("")
    const [meetingLink, setMeetingLink] = useState("")
    const [duration, setDuration] = useState(0)
    const [load, setLoad] = useState(false)

    useEffect(() => {
        fetchTopicList()
        fetchSingleMentorshipProgram()
    }, [id])

    const fetchTopicList = () => {
        ApiServices.allTopic({ status: true })
            .then((res) => {
                if (res.data.success) {
                    const formatted = res.data.data.map(el => ({
                        value: el._id,
                        label: el.topic
                    }));
                    setTopicList(formatted);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => toast.error(err.message));
    };

    const fetchSingleMentorshipProgram = () => {
        ApiServices.singleMentorshipProgram({ _id: id })
            .then((res) => {
                if (res.data.success) {

                    setTopicId(res.data.data.topics.map(topic => ({
                        value: topic._id,
                        label: topic.topic
                    })))
                    setSessionDate(res.data.data.sessionDate)
                    setMeetingLink(res.data.data.meetingLink)
                    setDuration(res.data.data.duration)

                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error(err?.message)
            })
    }
    const nav = useNavigate()

    const handleForm = (e) => {
        e.preventDefault()
        setLoad(true)
        
    let formData = {
        _id: id,
        topics: topicId.map(el => el.value),
        meetingLink,
        sessionDate,
        duration,
    };
    

        ApiServices.updateMentorshipProgram(formData)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message)
                    nav("/mentor/mentorshipProgram/manage")
                } else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error(err.message);

            })
            .finally(() => {
                setTimeout(() => {
                    setLoad(false)
                }, 1000)
            })
    }
    return (
        <>
            <main className="main">
                <PageTitle>Update Mentorship Program</PageTitle>
                <section id="contact" className="contact section">
                    {/* {load? */}
                    <FadeLoader color="#f98603" loading={load} cssOverride={{ display: "block", margin: "0 auto" }} />
                    {/* : */}
                    <div className={load ? "d-none" : "container"} >
                        <div className="row justify-content-center gy-4">

                            <div className="col-lg-8">
                            
                                <form method="post" onSubmit={handleForm}>

                                    {/*  <div className="form-group mb-5 pt-2 pb-2"> 
                                        <label htmlFor="topics2">Topics</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="topics2"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Topics"
                                            name="topics"
                                            required=""
                                            value={topics}
                                            onChange={(e)=>{setTopics(e.target.value)}}
                                        />
                                    </div> */}
                                    <div className="form-group mb-5 pt-2 pb-2">
                                        <label htmlFor="topics2">Topics</label>
                                        <Select
                                            id="topics2"
                                            name="topics"
                                            placeholder="Enter Topics"
                                            isMulti
                                            required
                                            options={topicList}
                                            value={topicId}
                                            onChange={setTopicId}
                                            classNamePrefix="react-select"
                                        />
                                    </div>


                                    <div className="form-group mb-5 pt-2 pb-2">
                                        <label htmlFor="sessionDate2">Session Date</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="sessionDate2"
                                            placeholder="Date"
                                            name="Date"
                                            required=""
                                            value={sessionDate}
                                            onChange={(e) => { setSessionDate(e.target.value) }}
                                        />
                                    </div>


                                    <div className="form-group mb-5 pt-2 pb-2">
                                        <label htmlFor="meetingLInk2">Meeting Link</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="meetingLInk2"
                                            placeholder="Link"
                                            name="meetingLink"
                                            required=""
                                            value={meetingLink}
                                            onChange={(e) => { setMeetingLink(e.target.value) }}
                                        />
                                    </div>

                                    <div className="form-group mb-5 pt-2 pb-2">
                                        <label htmlFor="duration2">Duration</label>
                                        <input
                                            type="Number"
                                            className="form-control"
                                            id="duration2"
                                            placeholder="Duration"
                                            name="Duration"
                                            required=""
                                            value={duration}
                                            onChange={(e) => { setDuration(e.target.value) }}
                                        />
                                    </div>


                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>

                                </form>


                            </div>
                            {/* End Contact Form */}
                        </div>
                    </div>
                    {/* } */}
                </section>
                {/* /Contact Section */}
            </main>
        </>
    )
}
