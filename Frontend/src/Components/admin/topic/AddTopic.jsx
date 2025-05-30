import { useState } from "react";
import { toast } from "react-toastify";
import ApiServices from "../../services/ApiServices";
import { FadeLoader } from "react-spinners";
import PageTitle from "../../layouts/PageTitle";

export default function AddTopic() {
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [image, setImage] = useState({});
  const [imageName, setImageName] = useState("");
  const [load, setLoad] = useState(false);

  const changeImg = (e) => {
    setImageName(e.target.value);
    setImage(e.target.files[0]);
  };

  const handleForm = (e) => {
    e.preventDefault();
    setLoad(true);

    let formData = new FormData();
    formData.append("description", description);
    formData.append("topic", topic);
    formData.append("image", image);

    ApiServices.addTopic(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setDescription("");
          setTopic("");
          setImage({});
          setImageName("");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setTimeout(() => {
          setLoad(false);
        }, 1000);
      });
  };

  return (
    <>
      <main className="main">
        <PageTitle>Add Topics</PageTitle>

        <section
          id="contact"
          className="section d-flex justify-content-center align-items-center"
          style={{ marginTop: "9vh", minHeight: "70vh" }}
        >
          <FadeLoader
            color="#f98603"
            cssOverride={{ display: "block", margin: "0 auto" }}
            loading={load}
          />

          {!load && (
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8">
                  <div
                    className="card shadow-lg rounded-4 p-4"
                    style={{ backgroundColor: "#fff" }}
                  >
                    <h3 className="card-title text-center text-primary mb-4 fw-semibold">
                      Add New Topic
                    </h3>

                    <form method="post" onSubmit={handleForm} encType="multipart/form-data">
                      <div className="mb-4">
                        <label
                          htmlFor="topicInput"
                          className="form-label fw-medium text-secondary"
                        >
                          Topic
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="topicInput"
                          placeholder="Enter Topic"
                          required
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="descriptionInput"
                          className="form-label fw-medium text-secondary"
                        >
                          Description
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="descriptionInput"
                          placeholder="Description About Topic"
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="imageInput"
                          className="form-label fw-medium text-secondary"
                        >
                          Image
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="imageInput"
                          required
                          value={imageName}
                          onChange={changeImg}
                        />
                      </div>

                      <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
