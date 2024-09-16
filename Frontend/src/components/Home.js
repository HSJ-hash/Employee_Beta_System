import React, { useState, useRef } from "react";
import "../styles/home.css";
import { Button, OverlayTrigger, Tooltip, Carousel } from "react-bootstrap";
import caro1 from "../images/caro1.png";
import caro2 from "../images/caro2.png";
import caro3 from "../images/caro3.png";
import empicon from "../images/emp-icon.png";
import taskicon from "../images/task-icon.png";
import departicon from "../images/industrial.png";
import projecticon from "../images/analytics.png";
import todoicon from "../images/to-do-list.png";
import chaticon from "../images/chat.png";
import memoicon from "../images/memo.png";
import meeticon from "../images/meet.png";
import Header from "./Header";
import Login from "./Login";
import Footer from "./Footer";

export default function Home() {
  const [openPopup, setOpenPopup] = useState(false);

  // References for sections
  const browseRef = useRef(null);
  const testimonialRef = useRef(null);
  const footerRef = useRef(null);
  const topRef = useRef(null);

  // Scroll functions
  const scrollToBrowse = () =>
    browseRef.current.scrollIntoView({ behavior: "smooth" });
  const scrollToTestimonials = () =>
    testimonialRef.current.scrollIntoView({ behavior: "smooth" });
  const scrollToFooter = () =>
    footerRef.current.scrollIntoView({ behavior: "smooth" });
  const scrollToTop = () =>
    topRef.current.scrollIntoView({ behavior: "smooth" });

  const handleFeaturesClick = () => {
    browseRef.current.scrollIntoView({ behavior: "smooth" });
  };

  //TOOLTIP
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Login
    </Tooltip>
  );

  // CAROUSEL
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <div ref={topRef}>
        {/* Pass the handleFeaturesClick function to the Header */}
        <Header
          onFeaturesClick={scrollToBrowse}
          onContactClick={scrollToTestimonials}
          onAboutClick={scrollToFooter}
          onHomeClick={scrollToTop}
        />
        <div className="main-top">
          <div className="top-container">
            <div className="home-main container">
              <div className="left-main">
                <div className="left-inner" style={{ textAlign: "left" }}>
                  <p className="lead flex-wrap">
                    <span>Work Smart</span> <span>With Nova</span>
                  </p>
                  <p className="flex-wrap lead-second">
                    Register today and Manage your work at home
                  </p>
                  <div className="top-btns">
                    <Button
                      variant="outline-light"
                      onClick={() => {
                        setOpenPopup(true);
                      }}
                      className="header-btn register reg-company-btn"
                    >
                      Login to Continue
                    </Button>
                    <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip}
                    >
                      <Button
                        variant="outline-light"
                        href="/login"
                        className="header-btn login reg-company-btn login-body"
                      >
                        <i className="fa-sharp fa-solid fa-right-to-bracket"></i>
                      </Button>
                    </OverlayTrigger>
                  </div>
                </div>
              </div>
              <div className="right-main img-fluid"></div>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="topic topic-intro">FEATURED TOUR PACKAGES</div>
        <div ref={browseRef} className="topic topic-main">
          Browse Top Categories
        </div>

        {/* CATEGORIES */}
        <div className="categories-main">
          {/* UPPER SECTION */}
          <div className="categ-upper container ">
            <div className="left">
              <p className="categ-topic">
                <span>A wider view</span>
                <span>in your team</span>
                <span>management</span>
              </p>
              <section>
                <p className="categ-desc categ-subtopic">
                  Automate and manage all your team and internal work in one
                  place to simplify your workflow with our solutions.
                </p>
              </section>
            </div>
            <div className="right">
              <div className="category">
                <div className="categ-icon">
                  <img src={taskicon} alt="icon" />
                </div>
                <p className="categ-name">Employee Monitoring</p>
                <p className="categ-desc">
                  Measure and boost workforce productivity by capturing and
                  analyzing activities in real time.
                </p>
              </div>
              <div className="category">
                <div className="categ-icon">
                  <img src={projecticon} alt="icon" />
                </div>
                <p className="categ-name">Project Management</p>
                <p className="categ-desc">
                  Enhance performance and boost trust with detailed insights
                  about your team's workdays.
                </p>
              </div>
              <div className="category">
                <div className="categ-icon">
                  <img src={empicon} alt="icon" />
                </div>
                <p className="categ-name">Task Monitoring</p>
                <p className="categ-desc">
                  Allows teams to see which tasks are important for planning,
                  testing, tracking, and reporting.
                </p>
              </div>
              <div className="category">
                <div className="categ-icon">
                  <img src={departicon} alt="icon" />
                </div>
                <p className="categ-name">AI Tools</p>
                <p className="categ-desc">
                Powered by advanced AI tools for enhanced Employee Management, productivity, and insights.
                </p>
              </div>
            </div>
          </div>

          {/* LOWER SECTION */}
          <div className="categ-upper categ-lower container">
            <div
              className="left"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                textAlign: "right",
                paddingRight: "100px",
              }}
            >
              <p className="categ-topic categ-topic-lower">
                <span>Increase transparency</span>
                <span>and maximize</span>
                <span>collaboration</span>
              </p>
              <p className="categ-desc categ-subtopic">
                Communicate quickly and effortlessly making your team to set
                schedules, determine project goals, and set expectations
                together.
              </p>
            </div>
            <div className="right">
              <div className="category">
                <div className="categ-icon">
                  <img src={todoicon} alt="icon" />
                </div>
                <p className="categ-name">To Do Application</p>
                <p className="categ-desc">
                Manage day-to-day tasks, organize priorities, or list everything that is supposed to be done.
                </p>
              </div>
              <div className="category">
                <div className="categ-icon">
                  <img src={chaticon} alt="icon" />
                </div>
                <p className="categ-name">Notice Management</p>
                <p className="categ-desc">
                  Communicate with people within the organization by sending or
                  receiving notices in real time.
                </p>
              </div>
              <div className="category">
                <div className="categ-icon">
                  <img src={memoicon} alt="icon" />
                </div>
                <p className="categ-name">Memo Notepad</p>
                <p className="categ-desc">
                  Quikly record and save any word, text, information and
                  knowledge immediately.
                </p>
              </div>
              <div className="category">
                <div className="categ-icon">
                  <img src={meeticon} alt="icon" />
                </div>
                <p className="categ-name">Video Scheduling</p>
                <p className="categ-desc">
                  Schedule meetings within the organization and host or attend
                  virtual meetings with fellow employees.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BROWSE SECTION */}
        <div className="browse" ref={testimonialRef}>
          <div className="d-flex flex-column bd-highlight mb-3 container">
            <div className="p-2 bd-highlight browse-intro topic">
              FEATURED TOUR PACKAGES
            </div>
            <div className="bd-highlight browse-main topic">
              Make a Difference with Us!
            </div>
            <div className="p-2 bd-highlight text-center browse-btn-div">
            <Button
  variant="outline-light"
  href="tel:0117794556"  
  className="header-btn register browse-btn"
>
  Contact Us Now!
</Button>

            </div>
          </div>
        </div>

        {/* CAROUSEL */}
        <div className="container carousel">
        <Carousel activeIndex={index} onSelect={handleSelect} variant="dark">
    <Carousel.Item className="caro-item">
      <div className="testi-item" style={{ padding: '20px', textAlign: 'center' }}>
        <img src={caro1} alt="testimonial1"  />
        <h5 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Pathum Akila</h5>
        <p className="profession" style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Tech Lead</p>
        <div className="rating" style={{ marginBottom: '15px' }}>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star"></span>
        </div>
        <p className="review" style={{ fontSize: '1rem', lineHeight: '1.5', margin: '0 10px' }}>
          Beta has transformed our office management with its smart features and easy-to-use interface. It's been a game-changer for our team.
        </p>
      </div>
    </Carousel.Item>
    <Carousel.Item className="caro-item">
      <div className="testi-item" style={{ padding: '20px', textAlign: 'center' }}>
        <img src={caro2} alt="testimonial2"  />
        <h5 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Nethmi Amandi</h5>
        <p className="profession" style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Project Manager</p>
        <div className="rating" style={{ marginBottom: '15px' }}>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star"></span>
        </div>
        <p className="review" style={{ fontSize: '1rem', lineHeight: '1.5', margin: '0 10px' }}>
          With Beta, managing daily tasks and employee performance is a seamless experience. It’s made our workflow much more efficient.
        </p>
      </div>
    </Carousel.Item>
    <Carousel.Item className="caro-item">
      <div className="testi-item" style={{ padding: '20px', textAlign: 'center' }}>
        <img src={caro3} alt="testimonial3"  />
        <h5 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Shashini Wasana</h5>
        <p className="profession" style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Developer</p>
        <div className="rating" style={{ marginBottom: '15px' }}>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star"></span>
        </div>
        <p className="review" style={{ fontSize: '1rem', lineHeight: '1.5', margin: '0 10px' }}>
          Beta offers powerful tools that keep our office organized and our team on track. Highly recommend it for any modern workplace.
        </p>
      </div>
    </Carousel.Item>
  </Carousel>
        </div>

        <div ref={footerRef}>
          <Footer />
        </div>
      </div>
      <Login openPopup={openPopup} setOpenPopup={setOpenPopup}></Login>
    </>
  );
}
