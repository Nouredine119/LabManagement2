import React from 'react';

const Contact = () => {
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
              <hr className='w-25 mx-auto' />
              <div className="row">
                <div className="col-md-6">
                  <img src="/assets/contact.jpg" alt="contact" className='w-75' />
                </div>
                <div className="col-md-6">
                  <form>
                    <div class="mb-3">
                      <label for="name" class="form-label">Your Name</label>
                      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div class="mb-3">
                      <label for="email" class="form-label">Your Email</label>
                      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div class='mb-3'>
                      
                    <label for="message" class='form-label'>Your Message</label>
                    <textarea class='form-control' name="" id="" rows="5">

                    </textarea>

                    </div>
                   
                    <button type="submit" class="btn btn-outline-primary">Send Message
                    <i className="fa fa-paper-plane ms-2"></i></button>
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