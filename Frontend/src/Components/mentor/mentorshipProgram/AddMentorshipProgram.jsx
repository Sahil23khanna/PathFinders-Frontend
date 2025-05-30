import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ApiServices from "../../services/ApiServices";
import { FadeLoader } from "react-spinners";
import PageTitle from "../../layouts/PageTitle";
import Select from "react-select";

export default function AddMentorshipProgram() {

    const [topicId, setTopicId] = useState([]);
    const [sessionDate, setSessionDate] = useState("");
    const [meetingLink, setMeetingLink] = useState("");
    const [duration, setDuration] = useState();
    const [price, setPrice] = useState();
    const [topic, setTopic] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        fetchTopic();
    }, []);

    const fetchTopic = () => {
        setLoad(true);
        let formData = { status: true };
        ApiServices.allTopic(formData)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message);
                    let data = res.data.data;
                    setTopic(data?.map((el) => (
                        { value: el?._id, label: el?.topic }
                    )));
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                toast.error(err.message);
            })
            .finally(() => {
                setTimeout(() => setLoad(false), 1000);
            });
    };

    const handleForm = (e) => {
        e.preventDefault();
        setLoad(true);

        let topics = topicId?.map((el) => el.value);
        let selectedDate = new Date(sessionDate);
        let today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            toast.error("Session date cannot be in the past.");
            setLoad(false);
            return;
        }

        if (price < 0) {
            toast.error("Price cannot be negative.");
            setLoad(false);
            return;
        }

        let formData = {
            topics,
            sessionDate,
            meetingLink,
            duration,
            price,
        };

        ApiServices.addMentorshipProgram(formData)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message);
                    setMeetingLink("");
                    setSessionDate("");
                    setDuration("");
                    setPrice("");
                    setTopicId([]);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                toast.error(err.message);
            })
            .finally(() => {
                setTimeout(() => setLoad(false), 1000);
            });
    };

    return (
        <>
            <main className="main">
                <PageTitle>Add Mentorship Program</PageTitle>

                <section id="contact" className="section" style={{ marginTop: "9vh" }}>
                    <FadeLoader color="#f98603" cssOverride={{ display: "block", margin: "0 auto" }} loading={load} />

                    <div className={load ? "d-none" : "container"}>
                        <div className="row justify-content-center">
                            <div className="col-lg-8 mt-5 mb-5">
                                <div className="card shadow p-4 border-0">
                                    <h3 className="mb-4 text-center">Add New Mentorship Program</h3>
                                    <form onSubmit={handleForm}>
                                        <div className="form-group mb-4">
                                            <label htmlFor="topics1">Topics</label>
                                            <Select
                                                id="topics1"
                                                placeholder="Select Topics"
                                                name="topics"
                                                isMulti
                                                options={topic}
                                                value={topicId}
                                                onChange={setTopicId}
                                            />
                                        </div>

                                        <div className="form-group mb-4">
                                            <label htmlFor="sessionDate1">Session Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="sessionDate1"
                                                name="sessionDate"
                                                min={new Date().toISOString().split("T")[0]}
                                                value={sessionDate}
                                                onChange={(e) => setSessionDate(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="form-group mb-4">
                                            <label htmlFor="meetingLink1">Meeting Link</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="meetingLink1"
                                                name="meetingLink"
                                                placeholder="Enter meeting link"
                                                value={meetingLink}
                                                onChange={(e) => setMeetingLink(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="form-group mb-4">
                                            <label htmlFor="duration1">Duration (in minutes)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="duration1"
                                                name="duration"
                                                placeholder="Enter session duration"
                                                value={duration}
                                                onChange={(e) => setDuration(Number(e.target.value))}
                                                required
                                            />
                                        </div>

                                        <div className="form-group mb-4">
                                            <label htmlFor="price1">Price (₹)</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="price1"
                                                name="price"
                                                placeholder="Enter session price"
                                                min="0"
                                                value={price}
                                                onChange={(e) => setPrice(Number(e.target.value))}
                                                required
                                            />
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary px-4 py-2">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
