
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle";
import ApiServices from "../../services/ApiServices";
import { FadeLoader } from "react-spinners";
import Select from "react-select";

export default function EditDiscussionQuestion() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [tagsId, setTagsId] = useState([]);
    const [load, setLoad] = useState(true);
    const nav = useNavigate();

    useEffect(() => {
        fetchDiscussionQuestionList();
        fetchSingleDiscussionQuestion();
    }, [id]);

    const fetchDiscussionQuestionList = () => {
        ApiServices.alldiscussionQuestion({ status: true })
            .then((res) => {
                if (res.data.success) {
                    const formattedTags = res.data.data.map(el => ({
                        value: el._id,
                        label: el.tags
                    }));
                    setTags(formattedTags);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => toast.error(err.message));
    };

    const fetchSingleDiscussionQuestion = () => {
        ApiServices.singleDiscussionQuestion({ _id: id })
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.data;
                    setTagsId(data.tags.map(tag => ({
                        value: tag._id,
                        label: tag.tags
                    })));
                    setTitle(data.title);
                    setDescription(data.description);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => toast.error(err.message))
            .finally(() => {
                setTimeout(() => {
                    setLoad(false);
                }, 1000);
            });
    };

    const handleForm = (e) => {
        e.preventDefault();
        setLoad(true);

        const formData = {
            _id: id,
            title,
            description,
            tags: tagsId.map(tag => tag.value),
        };

        ApiServices.updateDiscussionQuestion(formData)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message);
                    nav("/mentor/discussionQuestion/manage");
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => toast.error(err.message))
            .finally(() => {
                setTimeout(() => {
                    setLoad(false);
                }, 1000);
            });
    };

    return (
        <main className="main">
            <PageTitle>Update Discussions</PageTitle>
            <section id="contact" className="contact section">
                <FadeLoader color="#f98603" loading={load} cssOverride={{ display: "block", margin: "0 auto" }} />
                <div className={load ? "d-none" : "container"}>
                    <div className="row justify-content-center gy-4">
                        <div className="col-lg-8">
                            <form method="post" onSubmit={handleForm}>
                                <div className="form-group mb-5 pt-2 pb-2">
                                    <label htmlFor="tags">Tags</label>
                                    <Select
                                        id="tags"
                                        placeholder="Select Tags"
                                        name="tags"
                                        isMulti
                                        required
                                        options={tags}
                                        value={tagsId}
                                        onChange={setTagsId}
                                    />
                                </div>

                                <div className="form-group mb-5 pt-2 pb-2">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        placeholder="Enter Title"
                                        name="title"
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                <div className="form-group mb-5 pt-2 pb-2">
                                    <label htmlFor="description">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        placeholder="Enter Description"
                                        name="description"
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
