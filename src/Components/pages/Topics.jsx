import { useEffect, useState } from "react"
import ApiServices from "../services/ApiServices"
import PageTitle from "../layouts/PageTitle"
import { toast } from "react-toastify"
import { FadeLoader } from "react-spinners"
import Switch from "react-switch"
import { Link } from "react-router-dom"
import Pagination, { LIMIT } from "../utilities/Pagination"
import ResponsivePagination from "react-responsive-pagination"
import 'react-responsive-pagination/themes/classic.css';
import Swal from "sweetalert2"

export default function Topics(){

  const [topic, setTopic] = useState([])
      const [load, setLoad] = useState(true)
      const [filter, setFilter] = useState("")
      const [currentPage, setCurrentPage] = useState(1)
      const [total, setTotal] = useState()
  
      useEffect(() => {
          fetchTopic()
      }, [filter, currentPage])
  
  
      const fetchTopic = () => {
  
          setLoad(true)
          let formData = {
              limit: LIMIT,
              currentPage: currentPage
          }
  
          if (!!filter) {
              formData.status = filter
          }
  
          ApiServices.allTopic(formData)
              .then((res) => {
                  if (res.data.success) {
                      toast.success(res.data.message)
  
                      setTopic(res.data.data)
                      setTotal(res.data.total)
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


    return(
        <>
         <main className="main">
              <PageTitle>Topics</PageTitle>
                <section id="contact" className="contact section " style={{ marginTop: "10vh" }}>

                    {load ?
                        <FadeLoader color="#f98603" cssOverride={{ display: "block", margin: "0 auto" }} loading={load} />
                        :
                        <div className="container my-3" >
                            
                            <div className="row justify-content-center gy-4">
                                <div className="col-md-12">
                                    
 
<div className="container my-4">
  <div className="row">
    {topic?.map((topic, index) => (
      <div className="col-md-6 col-lg-4 mb-4" key={topic._id}>
        <div
          className="card h-100 shadow-sm"
          style={{
            borderRadius: "1rem",
            overflow: "hidden",
            height: "350px",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "0 .125rem .25rem rgba(0,0,0,.075)";
          }}
        >
          <img
            src={topic?.image}
            className="card-img-top"
            alt="Topic"
            style={{
              height: "180px",
              objectFit: "cover",
              borderTopLeftRadius: "1rem",
              borderTopRightRadius: "1rem",
            }}
          />
          <div className="card-body d-flex flex-column">
           <Link to={"/mentorshipProgram/"+topic?._id}> <h5 className="card-title">{topic?.topic}</h5></Link>
            <p
              className="card-text"
              style={{
                maxHeight: "60px",
                overflow: "hidden",
                transition: "max-height 0.4s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.maxHeight = "200px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.maxHeight = "60px";
              }}
              title={topic?.description}
            >
              {topic?.description}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>

  <div className="d-flex justify-content-center mt-4">
    <ResponsivePagination
      current={currentPage}
      total={Math.ceil(total / LIMIT)}
      onPageChange={setCurrentPage}
    />
  </div>
</div>


                                </div>
                            </div>
                        </div>
                    }
                </section>
                {/* /Contact Section */}
            </main>


  {/* breadcrumb start*/}
  {/*::review_part start::*/}

 {/*  <section className="special_cource padding_top">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-5">
          <div className="section_tittle text-center">
            <p>popular courses</p>
            <h2>Special Courses</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-lg-4">
          <div className="single_special_cource">
            <img
              src="/assets/img/special_cource_1.png"
              className="special_img"
              alt=""
            />
            <div className="special_cource_text">
              <a href="course-details.html" className="btn_4">
                Web Development
              </a>
              <h4>$130.00</h4>
              <a href="course-details.html">
                <h3>Web Development</h3>
              </a>
              <p>
                Which whose darkness saying were life unto fish wherein all fish
                of together called
              </p>
              <div className="author_info">
                <div className="author_img">
                  <img src="/assets/img/author/author_1.png" alt="" />
                  <div className="author_info_text">
                    <p>Conduct by:</p>
                    <h5>
                      <a href="#">James Well</a>
                    </h5>
                  </div>
                </div>
                <div className="author_rating">
                  <div className="rating">
                    <a href="#">
                      <img src="/assets/img/icon/color_star.svg" alt="" />
                    </a>
                    <a href="#">
                      <img src="/assets/img/icon/color_star.svg" alt="" />
                    </a>
                    <a href="#">
                      <img src="/assets/img/icon/color_star.svg" alt="" />
                    </a>
                    <a href="#">
                      <img src="/assets/img/icon/color_star.svg" alt="" />
                    </a>
                    <a href="#">
                      <img src="/assets/img/icon/star.svg" alt="" />
                    </a>
                  </div>
                  <p>3.8 Ratings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-4">
          <div className="single_special_cource">
            <img
              src="/assets/img/special_cource_2.png"
              className="special_img"
              alt=""
            />
            <div className="special_cource_text">
              <a href="course-details.html" className="btn_4">
                design
              </a>
              <h4>$160.00</h4>
              <a href="course-details.html">
                <h3>Web UX/UI Design </h3>
              </a>
              <p>
                Which whose darkness saying were life unto fish wherein all fish
                of together called
              </p>
              <div className="author_info">
                <div className="author_img">
                  <img src="/assets/img/author/author_2.png" alt="" />
                  <div className="author_info_text">
                    <p>Conduct by:</p>
                    <h5>
                      <a href="#">James Well</a>
                    </h5>
                  </div>
                </div>
                <div className="author_rating">
                  <div className="rating">
                    <a href="#">
                      <img src="/assets/img/icon/color_star.svg" alt="" />
                    </a>
                    <a href="#">
                      <img src="/assets/img/icon/color_star.svg" alt="" />
                    </a>
                    <a href="#">
                      <img src="/assets/img/icon/color_star.svg" alt="" />
                    </a>
                    <a href="#">
                      <img src="/assets/img/icon/color_star.svg" alt="" />
                    </a>
                    <a href="#">
                      <img src="/assets/img/icon/star.svg" alt="" />
                    </a>
                  </div>
                  <p>3.8 Ratings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-4">
          <div className="single_special_cource">
            <img
              src="/assets/img/special_cource_3.png"
              className="special_img"
              alt=""
            />
            <div className="special_cource_text">
              <a href="course-details.html" className="btn_4">
                Wordpress
              </a>
              <h4>$140.00</h4>
              <a href="course-details.html">
                <h3>Wordpress Development</h3>
              </a>
              <p>
                Which whose darkness saying were life unto fish wherein all fish
                of together called
              </p>
              <div className="author_info">
                <div className="author_img">
                  <img src="/assets/img/author/author_3.png" alt="" />
                  <div className="author_info_text">
                    <p>Conduct by:</p>
                    <h5>
                      <a href="#">James Well</a>
                    </h5>
                  </div>
                </div>
                <div className="author_rating">
                  <div className="rating">
                    <a href="#">
                      <img src="/assets/img/icon/color_star.svg" alt="" />
                    </a>
                    <a href="#">
                      <img src="/assets/img/icon/color_star.svg" alt="" />
                    </a>
                    <a href="#">
                      <img src="/assets/img/icon/color_star.svg" alt="" />
                    </a>
                    <a href="#">
                      <img src="/assets/img/icon/color_star.svg" alt="" />
                    </a>
                    <a href="#">
                      <img src="/assets/img/icon/star.svg" alt="" />
                    </a>
                  </div>
                  <p>3.8 Ratings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> */}

  {/*::blog_part end::*/}
  {/*::review_part start::*/}

  {/* <section className="testimonial_part section_padding">
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-xl-5">
          <div className="section_tittle text-center">
            <p>tesimonials</p>
            <h2>Happy Students</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="textimonial_iner owl-carousel">
            <div className="testimonial_slider">
              <div className="row">
                <div className="col-lg-8 col-xl-4 col-sm-8 align-self-center">
                  <div className="testimonial_slider_text">
                    <p>
                      Behold place was a multiply creeping creature his domin to
                      thiren open void hath herb divided divide creepeth living
                      shall i call beginning third sea itself set
                    </p>
                    <h4>Michel Hashale</h4>
                    <h5> Sr. Web designer</h5>
                  </div>
                </div>
                <div className="col-lg-4 col-xl-2 col-sm-4">
                  <div className="testimonial_slider_img">
                    <img src="img/testimonial_img_1.png" alt="#" />
                  </div>
                </div>
                <div className="col-xl-4 d-none d-xl-block">
                  <div className="testimonial_slider_text">
                    <p>
                      Behold place was a multiply creeping creature his domin to
                      thiren open void hath herb divided divide creepeth living
                      shall i call beginning third sea itself set
                    </p>
                    <h4>Michel Hashale</h4>
                    <h5> Sr. Web designer</h5>
                  </div>
                </div>
                <div className="col-xl-2 d-none d-xl-block">
                  <div className="testimonial_slider_img">
                    <img src="img/testimonial_img_1.png" alt="#" />
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial_slider">
              <div className="row">
                <div className="col-lg-8 col-xl-4 col-sm-8 align-self-center">
                  <div className="testimonial_slider_text">
                    <p>
                      Behold place was a multiply creeping creature his domin to
                      thiren open void hath herb divided divide creepeth living
                      shall i call beginning third sea itself set
                    </p>
                    <h4>Michel Hashale</h4>
                    <h5> Sr. Web designer</h5>
                  </div>
                </div>
                <div className="col-lg-4 col-xl-2 col-sm-4">
                  <div className="testimonial_slider_img">
                    <img src="img/testimonial_img_1.png" alt="#" />
                  </div>
                </div>
                <div className="col-xl-4 d-none d-xl-block">
                  <div className="testimonial_slider_text">
                    <p>
                      Behold place was a multiply creeping creature his domin to
                      thiren open void hath herb divided divide creepeth living
                      shall i call beginning third sea itself set
                    </p>
                    <h4>Michel Hashale</h4>
                    <h5> Sr. Web designer</h5>
                  </div>
                </div>
                <div className="col-xl-2 d-none d-xl-block">
                  <div className="testimonial_slider_img">
                    <img src="img/testimonial_img_1.png" alt="#" />
                  </div>
                </div>
              </div>
            </div>
            <div className="testimonial_slider">
              <div className="row">
                <div className="col-lg-8 col-xl-4 col-sm-8 align-self-center">
                  <div className="testimonial_slider_text">
                    <p>
                      Behold place was a multiply creeping creature his domin to
                      thiren open void hath herb divided divide creepeth living
                      shall i call beginning third sea itself set
                    </p>
                    <h4>Michel Hashale</h4>
                    <h5> Sr. Web designer</h5>
                  </div>
                </div>
                <div className="col-lg-4 col-xl-2 col-sm-4">
                  <div className="testimonial_slider_img">
                    <img src="img/testimonial_img_1.png" alt="#" />
                  </div>
                </div>
                <div className="col-xl-4 d-none d-xl-block">
                  <div className="testimonial_slider_text">
                    <p>
                      Behold place was a multiply creeping creature his domin to
                      thiren open void hath herb divided divide creepeth living
                      shall i call beginning third sea itself set
                    </p>
                    <h4>Michel Hashale</h4>
                    <h5> Sr. Web designer</h5>
                  </div>
                </div>
                <div className="col-xl-2 d-none d-xl-block">
                  <div className="testimonial_slider_img">
                    <img src="img/testimonial_img_1.png" alt="#" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> */}

  {/*::blog_part end::*/}
</>

        
      
    )
}