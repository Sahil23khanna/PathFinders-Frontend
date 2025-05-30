import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ApiServices from "../../services/ApiServices";
import { FadeLoader } from "react-spinners"
import PageTitle from "../../layouts/PageTitle"
import Select from "react-select";

export default function AddMentorshipProgram() {

    
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState([])
    const [tagsId, setTagsId] = useState([])
    const [load, setLoad] = useState(true)

    useEffect(() => {
        fetchdiscussionQuestion()
    }, [])


    const fetchdiscussionQuestion = () => {

        setLoad(true)
        let formData = {
            status: true
        }
        ApiServices.alldiscussionQuestion(formData)
            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message)
                    let data = res.data.data
                    // setTags(data?.map((el) => (
                    //     { value: el?.tags, label: el?.tags }
                    // )))
                }
                else {
                    toast.error(res.data.message)
                }
            })
            .catch((err) => {
                toast.error(err.message)
            })
            .finally(() => {
                setTimeout(() => {
                    setLoad(false)
                }, 1000)

            })
    }

    const handleForm = (e) => {

        e.preventDefault()
        setLoad(true)
        let tags = tagsId?.map((el) => el.value)

        let formData = {

            tags: tags,
            description:description,
            title:title,
        }

        ApiServices.addDiscussionQuestion(formData)

            .then((res) => {
                if (res.data.success) {
                    toast.success(res.data.message)
                    setDescription("")
                    setTitle("")
                    setTags("")
                }
                else {
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
                <PageTitle>Add Discussion Questions</PageTitle>
                <section id="contact" className="contact section " style={{ marginTop: "9vh" }}> {/* margintop */}

                    <FadeLoader color="#f98603" cssOverride={{ display: "block", margin: "0 auto" }} loading={load} />

                    <div className={load ? "d-none" : "container"}>

                        <div className="row justify-content-center gy-4 ">

                            <div className="col-lg-8 mt-5 mb-5">

                                <form method="post" onSubmit={handleForm}>

                                    <div className="form-group mb-5 pt-2 pb-2">
                                        <label htmlFor="topics1">Tags</label>
                                        <Select

                                            id="topics1"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter Tags"
                                            name="topics"
                                            isMulti={true}
                                            required=""
                                            options={[{value:"Graduation",label:"Graduation"}, {value:"Post Graduation",label:"Post Graduation"},{value:"Higher Secondary Education", label:"Higher Secondary Education"}]}
                                            value={tagsId}
                                            onChange={setTagsId}
                                        /*  classNamePrefix="react-select" */
                                        />
                                    </div>

                                    <div className="form-group mb-5 pt-2 pb-2">
                                        <label htmlFor="sessionDate1">Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="sessionDate1"
                                            placeholder="Title"
                                            name="Title"
                                            required=""
                                            value={title}
                                            onChange={(e) => { setTitle(e.target.value) }}
                                        />
                                    </div>


                                    <div className="form-group mb-5 pt-2 pb-2">
                                        <label htmlFor="meetingLInk1">Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="meetingLInk1"
                                            placeholder="Description"
                                            name="meetingLink"
                                            required=""
                                            value={description}
                                            onChange={(e) => { setDescription(e.target.value) }}
                                        />
                                    </div>

                               {/*      <div className="form-group mb-5 pt-2 pb-2">
                                        <label htmlFor="duration1">Duration</label>
                                        <input
                                            type="Number"
                                            className="form-control"
                                            id="duration1"
                                            placeholder="Enter Duration Of Session"
                                            name="Duration"
                                            required=""
                                            value={duration}
                                            onChange={(e) => { setDuration(Number(e.target.value)) }}
                                        />
                                    </div>

                                    <div className="form-group mb-5 pt-2 pb-2">
                                        <label htmlFor="price1">Price (₹)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="price1"
                                            placeholder="Enter Price for Session"
                                            name="price"
                                            required=""
                                            value={price}
                                            onChange={(e) => setPrice(Number(e.target.value))}
                                        />
                                    </div>
 */}


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