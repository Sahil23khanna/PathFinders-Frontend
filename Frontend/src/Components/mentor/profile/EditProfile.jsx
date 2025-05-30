import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../layouts/PageTitle"
import ApiServices from "../../services/ApiServices";
import { FadeLoader } from "react-spinners";
import Select from "react-select";


export default function EditProfile() {
  const { id } = useParams()
  const [contact, setContact] = useState("")
  const [graduationYear, setGraduationYear] = useState()
  const [currentJob, setCurrentJob] = useState("")
  const [alumniStory, setAlumniStory] = useState("")
  const [experience, setExperience] = useState()
  const [company, setCompany] = useState("")
  const [topicList, setTopicList] = useState([])
  const [topicId, setTopicId] = useState([])
  const [image, setImage] = useState(null)
  const [imageName, setImageName] = useState("")
  const [previousImage, setPreviousImage] = useState("")
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (id) {
      fetchSingleMentor(id)
      fetchTopicList()
    }
  }, [id])


  const fetchTopicList = () => {
    ApiServices.allTopic({ status: true })
      .then((res) => {
        if (res.data.success) {
          const formatted = res.data.data.map((el) => ({
            value: el._id,
            label: el.topic,
          }));
          setTopicList(formatted);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };


  const fetchSingleMentor = (id) => {
    ApiServices.singleMentor({ userId: id })
      .then((res) => {
        if (res.data.success) {
          // console.log(res);
          setExperience(res.data.data.experience)
          setCurrentJob(res.data.data.currentJob)
          setCompany(res.data.data.company)
          setAlumniStory(res.data.data.alumniStory)
          setContact(res.data.data.contact)
          setGraduationYear(res.data.data.graduationYear)
          setPreviousImage(res.data.data.profile)

          setTopicId(
            res.data.data.topicInterested?.map((t) => ({
              value: t._id,
              label: t.topic,
            })) || []
          );

        }
        else {
          toast.error(res.data.message)
        }
      })
      .catch((err) => {
        toast.error(err?.message)
      })
  }
  const changeImg = (e) => {
    setImageName(e.target.value)
    setImage(e.target.files[0]);
  }
  /* const dispatch=useDispatch()  */
  const nav = useNavigate()
  const handleForm = (e) => {
    e.preventDefault()
    // dispatch(showLoader())
    setLoad(true)
    //formdata 
    let formData = new FormData()

    formData.append("_id", id);
    formData.append("contact", contact)
    formData.append("graduationYear", graduationYear)
    formData.append("currentJob", currentJob)
    formData.append("experience", experience)
    formData.append("company", company)
    formData.append("alumniStory", alumniStory)
    formData.append("topicInterested", (topicId.map(el => el.value)));

    if (!!image) {
      formData.append("image", image)
    }
    ApiServices.updateMentor(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message)
          nav("/mentor/profile/view/:userId")
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
        <PageTitle>Update Details</PageTitle>
        <section id="contact" className="contact section">
          {/* {load? */}
          <FadeLoader color="#f98603" loading={load} cssOverride={{ display: "block", margin: "0 auto" }} />
          {/* : */}
          <div className={load ? "d-none" : "container"} >
            <div className="row justify-content-center gy-4">

              <div className="col-lg-8">
             {/*    <img src={previousImage} style={{ height: "200px", width: "250px", display: "block", margin: "10px  auto" }} /> */}

               {/*  <form method="post" onSubmit={handleForm}>

                  <div className="form-group mb-5 pt-2 pb-2">
                    <label htmlFor="contact">Contact</label>
                    <input
                      type="Number"
                      className="form-control"
                      id="contact"
                      aria-describedby="emailHelp"
                      placeholder="contact"
                      name="topic"
                      required=""
                      value={contact}
                      onChange={(e) => { setContact(e.target.value) }}
                    />
                  </div>

                  <div className="form-group mb-5 pt-2 pb-2">
                    <label htmlFor="graduationYear">Graduation Year</label>
                    <input
                      type="Number"
                      className="form-control"
                      id="graduationYear"
                      placeholder="Graduation Year"
                      name="description"
                      required=""
                      value={graduationYear}
                      onChange={(e) => { setGraduationYear(e.target.value) }}
                    />
                  </div>


                  <div className="form-group mb-5 pt-2 pb-2">
                    <label htmlFor="profileimage">Profile Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="profileimage"
                      placeholder="profile image"
                      name="image"
                      required=""
                      value={imageName}
                      onChange={changeImg}
                    />
                  </div>
                  <div className="form-group mb-5 pt-2 pb-2">
                    <label htmlFor="currentJOb">Current Job</label>
                    <input
                      type="text"
                      className="form-control"
                      id="currentJOb"
                      placeholder="Current Job"
                      name="currentjob"
                      required=""
                      value={currentJob}
                      onChange={(e) => { setCurrentJob(e.target.value) }}
                    />
                  </div>

                  <div className="form-group mb-5 pt-2 pb-2">
                    <label htmlFor="alumnistory">Story</label>
                    <input
                      type="text"
                      className="form-control"
                      id="alumnistory"
                      placeholder="Mentor Story"
                      name="story"
                      required=""
                      value={alumniStory}
                      onChange={(e) => { setAlumniStory(e.target.value) }}
                    />
                  </div>

                  <div className="form-group mb-5 pt-2 pb-2">
                    <label htmlFor="experience">Experience</label>
                    <input
                      type="text"
                      className="form-control"
                      id="experience"
                      placeholder="Experience"
                      name="experience"
                      required=""
                      value={experience}
                      onChange={(e) => { setExperience(e.target.value) }}
                    />
                  </div>

                  <div className="form-group mb-5 pt-2 pb-2">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      className="form-control"
                      id="company"
                      placeholder="company"
                      name="company"
                      required=""
                      value={company}
                      onChange={(e) => { setCompany(e.target.value) }}
                    />
                  </div>

                  <div className="form-group mb-5 pt-2 pb-2">
                    <label htmlFor="topics">Interested Topics</label>
                    <Select
                      id="topics"
                      name="topics"
                      placeholder="Select Topics"
                      isMulti
                      required
                      options={topicList}
                      value={topicId}
                      onChange={setTopicId}
                      classNamePrefix="react-select"
                    />
                  </div>


                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>

                </form> */}
<div className="card shadow rounded p-4">
  <h3 className="mb-4 text-center">Update Profile</h3>
  <form method="post" onSubmit={handleForm}>
    <div className="text-center mb-4">
      <img
        src={previousImage}
        alt="Profile"
        style={{ height: "200px", width: "250px", objectFit: "cover" , borderRadius:"50%"}}
        className="rounded shadow"
      />
    </div>

    <div className="form-group mb-4">
      <label htmlFor="contact">Contact</label>
      <input
        type="number"
        className="form-control"
        id="contact"
        placeholder="Enter contact number"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        required
      />
    </div>

    <div className="form-group mb-4">
      <label htmlFor="graduationYear">Graduation Year</label>
      <input
        type="number"
        className="form-control"
        id="graduationYear"
        placeholder="Enter graduation year"
        value={graduationYear}
        onChange={(e) => setGraduationYear(e.target.value)}
        required
      />
    </div>

    <div className="form-group mb-4">
      <label htmlFor="profileimage">Profile Image</label>
      <input
        type="file"
        className="form-control"
        id="profileimage"
        onChange={changeImg}
      />
    </div>

    <div className="form-group mb-4">
      <label htmlFor="currentJOb">Current Job</label>
      <input
        type="text"
        className="form-control"
        id="currentJOb"
        placeholder="Current Job"
        value={currentJob}
        onChange={(e) => setCurrentJob(e.target.value)}
        required
      />
    </div>

    <div className="form-group mb-4">
      <label htmlFor="alumnistory">Alumni Story</label>
      <textarea
        className="form-control"
        id="alumnistory"
        placeholder="Your story"
        value={alumniStory}
        onChange={(e) => setAlumniStory(e.target.value)}
        rows={3}
        required
      ></textarea>
    </div>

    <div className="form-group mb-4">
      <label htmlFor="experience">Experience</label>
      <input
        type="text"
        className="form-control"
        id="experience"
        placeholder="e.g. 3 years"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        required
      />
    </div>

    <div className="form-group mb-4">
      <label htmlFor="company">Company</label>
      <input
        type="text"
        className="form-control"
        id="company"
        placeholder="Company name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />
    </div>

    <div className="form-group mb-4">
      <label htmlFor="topics">Interested Topics</label>
      <Select
        id="topics"
        name="topics"
        placeholder="Select Topics"
        isMulti
        options={topicList}
        value={topicId}
        onChange={setTopicId}
        classNamePrefix="react-select"
      />
    </div>

    <div className="text-center">
      <button type="submit" className="btn btn-primary px-4">
        Submit
      </button>
    </div>
  </form>
</div>


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