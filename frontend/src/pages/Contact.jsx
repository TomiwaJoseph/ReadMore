import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const formRef = useRef();
  const modalRef = useRef();
  const containerRef = useRef();
  const [openModal, setOpenModal] = useState(false);
  const [sendButtonClicked, setSendButtonClicked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (openModal) {
      document.body.style["overflow-y"] = "hidden";
    } else {
      document.body.style["overflow-y"] = "auto";
    }
  }, [openModal]);

  const closeModal = (e) => {
    if (modalRef.current === e.target || containerRef.current === e.target) {
      setOpenModal(false);
    }
  };

  const validateInput = (name, email, message) => {
    if (name.length === 0) {
      return false;
    }
    if (message.length < 10) return false;
    if (
      !/^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9/-]+\.)+[A-Za-z]{2,4}$/i.test(email)
    ) {
      return false;
    }
    return true;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    let name = data.get("name");
    let email = data.get("email");
    let message = data.get("message");
    let validate = validateInput(name, email, message);
    if (validate) {
      setSendButtonClicked(true);
      emailjs
        .sendForm(
          "service_zmd8dcn",
          "template_gv6q2f6",
          formRef.current,
          "hun951qpYgepyST8-"
        )
        .then(
          (result) => {
            if (result.status === 200) {
              let icon = document.getElementById("modalIcon");
              icon.classList.remove("fa-times-circle");
              icon.classList.add("fa-check-circle");
              let modalHTwo = document.getElementById("modalHTwo");
              let modalP = document.getElementById("modalP");
              modalHTwo.innerHTML = "Message sent!";
              modalP.innerHTML =
                "You will receive a response pretty soon. Thank you.";
              setOpenModal(true);
              setSendButtonClicked(false);
              e.target.reset();
            }
          },
          (error) => {
            let icon = document.getElementById("modalIcon");
            icon.classList.remove("fa-check-circle");
            icon.classList.add("fa-times-circle");
            let modalHTwo = document.getElementById("modalHTwo");
            let modalP = document.getElementById("modalP");
            modalHTwo.innerHTML = "Message not sent!";
            modalP.innerHTML =
              "Please check your internet connection and try again.";
            setSendButtonClicked(false);
            setOpenModal(true);
          }
        );
    }
  };

  return (
    <div className="contact-container container">
      <h1>Contact</h1>
      <div
        onClick={closeModal}
        ref={containerRef}
        className={openModal ? "contactModal" : "contactModal hidden"}
      >
        <div ref={modalRef} className="modalContainer">
          <div className="modalBody">
            <i id="modalIcon" className="fa"></i>
            <h2 id="modalHTwo">Status</h2>
            <p id="modalP">Message</p>
            <button
              type="button"
              onClick={() => setOpenModal((prev) => !prev)}
              className="btn"
            >
              close
            </button>
          </div>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-md-6 contact-info">
          <div className="about-us">
            <h3>About Us</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus hic vero praesentium facilis ex esse totam accusamus
              vel consequuntur optio.
            </p>
          </div>
          <div className="each-info">
            <i className="fa fa-phone"></i>
            <div>
              <h6>Phone</h6>
              <span>+234 567 8901</span>
            </div>
          </div>
          <div className="each-info">
            <i className="fa fa-envelope"></i>
            <div>
              <h6>Email</h6>
              <span>readmore@gmail.com</span>
            </div>
          </div>
          <div className="each-info">
            <i className="fa fa-envelope"></i>
            <div>
              <h6>Website</h6>
              <span>tomiwajoseph.vercel.app</span>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-12">
              <form ref={formRef} onSubmit={sendEmail} className="contact-form">
                <div className="row">
                  <div className="col-12">
                    <input
                      type="text"
                      name="name"
                      required
                      className="form-control"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="col-12">
                    <input
                      type="text"
                      name="email"
                      required
                      className="form-control"
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      className="form-control"
                      name="message"
                      id="message"
                      rows="7"
                      required
                      placeholder="Your message to the developer."
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button
                      disabled={sendButtonClicked}
                      type="submit"
                      className="btn"
                    >
                      {sendButtonClicked ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
