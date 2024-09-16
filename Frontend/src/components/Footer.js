import React from "react";
import "../styles/footer.css";
import logo from "../images/logo-white.png";

export default function Footer() {
  return (
    <div className="footer-main">
      <div className="footer container">
        <div className="foot-col">
          <div className="foot-topic">ABOUT US</div>
          <div className="foot-content">
            The best leading Smart Office Management System. Manage your work
            from anywhere around the world.
          </div>
        </div>

        <div className="foot-col">
          <div className="foot-topic">OUR MISSION</div>
          <div className="foot-content">
          Empowering businesses to efficiently manage work from anywhere with the leading Office Management System.
          </div>
        </div>

        <div className="foot-col">
          <div className="foot-topic">CONTACT INFO</div>
          <div className="foot-content">
            <p>Address: 284/1, Galle Road, Colombo 00300</p>

            <p>
              Phone: <a href="#">011 779 4556</a>
            </p>

            <p>
              Email: <a href="#">info@nova.com </a>
            </p>
          </div>
        </div>
       
        <div className="foot-col">
          <div className="foot-topic">NEWSLETTER</div>
          <div className="foot-content">
            <p>
              <a href="#">How to start an online business from home?</a>
            </p>
          </div>
          <div className="foot-topic footer-form">
            <form>
              <input
                type="text"
                className="footer-input"
                required="true"
                placeholder="Email Address"
              />
              <button className="footer-submit">
                <i class="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container footer footer-lower">
        <div className="foot-lower">
          <a href="/">
            <img src={logo} className="img-fluid footer-logo" alt="Logo" />
          </a>
        </div>
        <div className="foot-lower-icons">
          <a href="#">
            <i class="fa-brands fa-instagram"></i>
          </a>

          <a href="#">
            <i class="fa-brands fa-facebook"></i>
          </a>

          <a href="#">
            <i class="fa-brands fa-twitter"></i>
          </a>

          <a href="#">
            <i class="fa-brands fa-youtube"></i>
          </a>

          <a href="#">
            <i class="fa-brands fa-pinterest"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
