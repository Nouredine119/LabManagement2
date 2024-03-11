import React, { useState } from 'react';

const Contact = () => {
  const [message, setMsg] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setMsg({ ...message, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Data:", message);

    try {
      const res = await fetch('/message', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
      });

      if (res.ok) {
        window.alert("Message sent Successfully");
        setMsg({
          name: "",
          email: "",
          message: ""
        });
      } else {
        const errorMessage = await res.text();
        console.error("Sending failed:", errorMessage);
        window.alert(`Sending failed:${errorMessage}`);
      }
    } catch (err) {
      console.error("Error during sending:", err);
      window.alert("An error occurred during sending. Please try again.");
    }
  };

  return (
    <div>
      <section id="contact">
        <div className="container my-5 py-5">
          <div className="row mb-5">
            <div className="col-12">
              <h3 className="fs-5 text-center mb-0">Contact Us</h3>
              <h1 className="display-6 text-center mb-4">
                Have Some <b>Questions?</b>
              </h1>
              <hr className="w-25 mx-auto" />
              <div className="row">
                <div className="col-md-6">
                  <img src="/assets/contact.png" alt="contact" className="w-75" />
                </div>
                <div className="col-md-6">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Your Name</label>
                      <input type="text" className="form-control" id="name" name="name"
                        value={message.name} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Your Email</label>
                      <input type="text" className="form-control" id="email" name="email"
                        value={message.email} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">Your Message</label>
                      <textarea className="form-control" id="message" name="message" rows="5"
                        value={message.message} onChange={handleChange}></textarea>
                    </div>
                    <button type="submit" className="btn btn-outline-primary">Send Message
                      <i className="fa fa-paper-plane ms-2"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;