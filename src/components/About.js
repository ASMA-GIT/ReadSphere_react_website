import React from "react";
import "./css/About.css";
import { SiBookstack } from "react-icons/si";
import { FaBookReader } from "react-icons/fa";
import { PiHandshakeBold } from "react-icons/pi";
import { FaGlobeAsia } from "react-icons/fa";


const About = () => {
  return (
    <div>
      <div className="about_section_container">
        <div>
          <h1 className="about_title">
            Not sure what to <span className="highlight ">Read Next?</span>{" "}
          </h1>
          <p className="about_desc">
            Welcome to <span className="highlight">BookSphere</span>, your
            one-stop destination for all things books! Immerse yourself in a
            world of captivating stories, knowledge, and entertainment. From
            bestsellers to hidden gems, we curate a diverse collection just for
            you.
          </p>
        </div>
        <div className="about_cards_container">
          <div className="about_card">
            <div className="about_card_icon">
            <SiBookstack />
            </div>
            <div className="about_card_desc">
                <h4>Curated Selection:</h4>
                <p>From timeless classics to contemporary masterpieces, we handpick books that spark curiosity and ignite imaginations.</p>
            </div>
          </div>
          <div className="about_card">
            <div className="about_card_icon">
            <FaBookReader />
            </div>
            <div className="about_card_desc">
            <h4>Reader-Centric Approach:</h4>
                <p> Our user-friendly website and recommendations aim to make your journey with books most enjoyable .</p>
            </div>
          </div>
          <div className="about_card">
            <div className="about_card_icon">
            <PiHandshakeBold />
            </div>
            <div className="about_card_desc">
                <h4>Community Building:</h4>
                <p>Join us in celebrating the joy of reading through book clubs and discussions. Together, we create space for book lovers.</p>
            </div>
          </div>
          <div className="about_card">
            <div className="about_card_icon">
                <FaGlobeAsia />
            </div>
            <div className="about_card_desc">
                <h4>Sustainability</h4>
                <p>We are committed to environmental responsibility. Our packaging is eco-friendly, and sustainable for our planet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
