import React from 'react';

function Contact() {
  return (
    <section id="contact">
        <h2>Get in touch with us here</h2>
        <form id="contact-form" action="submit_form.php" method="POST">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required placeholder="Your name" />
            </div>
            
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required placeholder="Your email" />
            </div>

            <div className="form-group">
                <label htmlFor="contact-reason">What is the reason for your inquiry?</label>
                <select id="contact-reason" name="contact-reason" required>
                    <option value="" disabled selected>Please select a reason</option>
                    <option value="Questions">Questions</option>
                    <option value="Pricing">Pricing</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Investment">Investment</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="3" placeholder="Any additional info for us (optional)"></textarea>
            </div>
            
            <div className="form-group">
                <button type="submit" className="cta-btn">Send</button>
            </div>
        </form>

        <div className="animation-container">
            <img src="./assets/potato_v2.png" alt="Potato" className="potato" id="potato1" />
            <img src="./assets/corn_v2.png" alt="Corn" className="corn" id="corn2" />
            <img src="./assets/potato_v2.png" alt="Potato" className="potato" id="potato3" />
            <img src="./assets/corn_v2.png" alt="Corn" className="corn" id="corn4" />
            <img src="./assets/potato_v2.png" alt="Potato" className="potato" id="potato5" />
            <img src="./assets/corn_v2.png" alt="Corn" className="corn" id="corn6" />
            <img src="./assets/factory.png" alt="Factory" className="factory" />
            <img src="./assets/shoes_v2.png" alt="Shoes" className="sweater" id="potato1" />
            <img src="./assets/tshirt_v2.png" alt="T-shirt" className="sweater" id="corn2" />
            <img src="./assets/dress_v2.png" alt="Dress" className="sweater" id="potato3" />
            <img src="./assets/shoes_v2.png" alt="Shoes" className="sweater" id="corn4" />
            <img src="./assets/hat_v2.png" alt="Hat" className="sweater" id="potato5" />
            <img src="./assets/socks_v2.png" alt="Socks" className="sweater" id="corn6" />
        </div>
    </section>
  );
}

export default Contact;
