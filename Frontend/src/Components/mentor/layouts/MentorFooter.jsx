export default function MentorFooter(){
    return(
        <>
             {/* footer part start*/}
  <footer className="footer-area" style={{marginTop:"10vh"}}>
        <div className="container">
          <div className="row justify-content-between">
            {/* Logo and Description */}
            <div className="col-sm-6 col-md-4 col-xl-3">
              <div className="single-footer-widget footer_1">
                <a>
                 {/*  <img src="img/logo.png" alt="logo" /> */}
                 {/*  <p>PathFinders</p> */}
                  <h4 style={{color:'black'}}>PathFinders</h4>
                </a>
                <p>
                Discover your future with PathFinders - a career guidance platform connecting students with experienced mentors, guided discussions, and structured programs to explore opportunities
                </p>
               
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="col-sm-6 col-md-4 col-xl-3">
              <div className="single-footer-widget footer_2">
                <h4>Quick Links</h4>
                <ul className="list-unstyled">
                  <li><a href="/about">About Us</a></li>
                  <li><a href="/mentorshipProgram">Programs</a></li>
                  <li><a href="/discussionform">Discussions</a></li>
                  <li><a href="/topics">Topics</a></li>
                  
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-xl-3 col-sm-6 col-md-4">
              <div className="single-footer-widget footer_2">
                <h4>Contact us</h4>
                <div className="contact_info">
                  <p>
                    <span> Address :</span> WR 96 Model Town, Jalandhar
                  </p>
                  <p>
                    <span> Phone :</span> +91 9517806970
                  </p>
                  <p>
                    <span> Email : </span>sahilkhanna2330@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="copyright_part_text text-center">
                <div className="row">
                  <div className="col-lg-12">
                    <p className="footer-text m-0">
                      Copyright © All rights reserved
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
  {/* footer part end*/}
        </>
    )
}