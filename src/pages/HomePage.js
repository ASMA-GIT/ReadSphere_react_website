import React from "react";
import "./css/HomePage.css";
import reader from ".././assests/reader.png";
import NavBar1 from "../components/NavBar1";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import Contact from "../components/Contact";
import About from "../components/About";

const HomePage = () => {
  const navigate = useNavigate();

  const isUserLoggedIn = () => {
    const user = auth.currentUser;
    console.log("hey");
    if (!user) {
      console.log("hey");
      navigate("/login");
    } else {
      navigate("/catalog");
    }
  };

  return (
    <>
      <NavBar1 />
      <div className="home_container">
        <div className="container_content">
          <div className="container_content_inner">
            <div className="title" id="projects">
              <h1 className="bold">Book Sphere</h1>
            </div>
            <div className="para">
              <h4 >
                "Explore a world of boundless stories and infinite choices at
                our online book store—your ultimate destination for literary
                adventures." 
              </h4>
              <p className="mini_desc">- Boundless Stories, Infinite Choices: Your Ultimate
                Book Destination.</p>
            </div>
            <div className="btns">
              <button className="btns_more" onClick={() => isUserLoggedIn()}>
                {" "}
                See more{" "}
              </button>
            </div>
          </div>
        </div>
        <div className="container_outer_img">
          <div className="img-inner">
            <img src={reader} alt="readerimage" className="container_img" />
          </div>
        </div>
      </div>
      <div className="overlay"></div>
      <div className="contact_section" id="about_section">
        <About />
      </div>
     <div className="contact_section" id="contact_section">
     <div className="line"></div>
     <Contact />
     </div>
    </>
  );
};

export default HomePage;
