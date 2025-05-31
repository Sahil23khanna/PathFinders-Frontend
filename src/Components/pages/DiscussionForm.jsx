import { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion"; 
import PageTitle from "../layouts/PageTitle";
import { FadeLoader } from "react-spinners";
import { LIMIT } from "../utilities/Pagination";
import ApiServices from "../services/ApiServices";
import { FaReply, FaThumbsUp } from "react-icons/fa"; 
import moment from "moment";
import { toast } from "react-toastify";

export default function DiscussionForm() {
    const [discussionQuestion, setDiscussionQuestion] = useState([]);
    const [load, setLoad] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState();
    const [activeAccordion, setActiveAccordion] = useState(null); // Track open accordion
    const [replyText, setReplyText] = useState("");

    useEffect(() => {
        fetchDiscussionQuestion();
    }, [currentPage]);

    const fetchDiscussionQuestion = () => {
        setLoad(true);
        let formData = { limit: LIMIT, currentPage };
        
        ApiServices.allDiscussionQuestion(formData)
            .then((res) => {
                if (res.data.success) {
                    setDiscussionQuestion(res.data.data.map(q => ({ ...q, replies: [] })));
                    setTotal(res.data.total);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => toast.error(err.message))
            .finally(() => setLoad(false));
    };

    const fetchReplies = (id) => {
        ApiServices.allDiscussionReplies({ discussionId: id })
            .then((res) => {
                if (res.data.success) {
                    setDiscussionQuestion(prev =>
                        prev.map(q => (q._id === id ? { ...q, replies: res.data.data } : q))
                    );
                }
            })
            .catch(err => toast.error(err.message));
    };

    const addReply = (id) => {
        let data = { discussionId: id, text: replyText };
        ApiServices.addDiscussionReplies(data)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message);
                    fetchReplies(id);
                    setReplyText("");
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch(err => toast.error(err.message));
    };

    const handleAccordionToggle = (id) => {
        setActiveAccordion(prev => (prev === id ? null : id)); // Close previous & open new
        fetchReplies(id);
    };

    return (
        <div>
            <PageTitle>Discussions</PageTitle>
            {load ? <FadeLoader color="#f98603" cssOverride={{ display: "block", margin: "0 auto" }}/> : (
                <div className="container my-5">
                    <Accordion activeKey={activeAccordion}>
                        {discussionQuestion.map((question) => (
                            <Accordion.Item eventKey={question._id} key={question._id}>
                                <Accordion.Header onClick={() => handleAccordionToggle(question._id)}>
                                    <div className="d-flex justify-content-between w-100">
                                        <h6>{question.title}</h6>
                                        <div className="me-2 text-muted">{moment(question?.createdAt).fromNow()}</div>
                                    </div>
                                </Accordion.Header>

                                <Accordion.Body>
                                    <p>{question.description}</p>

                                    {/* Display Replies */}
                                    <div className="replies-section">
                                        {question.replies.map(reply => (
                                            <div className="reply-card d-flex p-3 mb-2 align-items-center border-left border-info">
                                                {/* Avatar */}
                                                <div className="bg-info text-light rounded-circle text-center me-2 pt-2" style={{ height: "50px", width: "50px" }}>
                                                    <h4>{reply?.addedById?.name.charAt(0)}</h4>
                                                </div>
                                                {/* Reply Content */}
                                                <div className="flex-grow-1">
                                                    <div className="fw-bold">{reply?.addedById?.name}</div>
                                                    <div className="text-muted">{moment(reply?.createdAt).fromNow()}</div>
                                                    <div>{reply?.text}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Reply Input & Send Button */}
                                    <div className="d-flex mt-3">
                                        <textarea className="form-control me-2" placeholder="Write your reply..." 
                                            onChange={(e) => setReplyText(e.target.value)} value={replyText} />
                                        <button className="btn btn-primary" onClick={() => addReply(question._id)}>Send</button>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </div>
            )}
        </div>
    );
}
