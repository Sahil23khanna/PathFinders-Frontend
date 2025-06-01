import { Link } from "react-router-dom"

export default function PageTitle({children}){
    return(
        <>
         {/* breadcrumb start*/}

  <section className="breadcrumb breadcrumb_bg ">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumb_iner text-center">
            <div className="breadcrumb_iner_item">
              <h2>{children}</h2>
              <p>
               <Link to={"/"} style={{color:"white"}}>Home</Link><span>/</span>{children}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* breadcrumb start*/}
        
        </>
    )
}

