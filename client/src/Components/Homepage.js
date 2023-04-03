import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <div className="home-page">
        <div className="about">
          <h2 className="home-page-titles">About</h2>
          <div className="about-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ipsum
            facilis distinctio maiores? Quos repellendus accusantium dicta
            consequatur id at dignissimos unde numquam maiores molestiae,
            ducimus iusto modi voluptatum deserunt?
          </div>
          <div className="about-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ipsum
            facilis distinctio maiores? Quos repellendus accusantium dicta
            consequatur id at dignissimos unde numquam maiores molestiae,
            ducimus iusto modi voluptatum deserunt?
          </div>
        </div>

        <div className="mission">
          <h2 className="home-page-titles">Mission</h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
          vitae numquam debitis, laboriosam quos error obcaecati, eaque impedit,
          sunt exercitationem quidem in ipsam rerum earum eos blanditiis
          necessitatibus eligendi minima.
          <ul className="mission-list">
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              esse
            </li>
            <li>
              commodi fugit qui labore libero deserunt mollitia error, nisi
            </li>
            <li>
              illum? Quos cumque rerum, sunt non quibusdam reprehenderit
              nesciunt animi deserunt.
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
