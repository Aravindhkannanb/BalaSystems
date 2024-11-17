import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };


  return (
    <div className="container">
      <div className="popup">
        <button onClick={handleClose} className="closeButton">
          <span className="closeButtonText">X</span>
        </button>
        <div className="contentContainer">
          <h1 className="heading">Privacy Policy</h1>
          <p className="text">Last updated: 01 April 2023</p>

          <p className="subheading">Thank you for choosing to be part of our community at Bala Infotech. We are committed to protecting your personal information and your right to privacy.</p>
          
          <p className="text">
            If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at [Your Email Address].
          </p>

          <h2 className="subheading">1. Information We Collect</h2>
          <p className="text">
            We may collect personal information that you provide directly to us, such as when you create an account, make a purchase, or contact us. This information may include your name, email address, phone number, and payment information.
          </p>

          <h2 className="subheading">2. How We Use Your Information</h2>
          <p className="text">
            We use the information we collect to:
          </p>
          <ul className="text">
            <li>Process and manage your orders and payments.</li>
            <li>Send you updates, newsletters, and promotional materials.</li>
            <li>Respond to your inquiries and provide customer support.</li>
            <li>Improve our services and website functionality.</li>
          </ul>

          <h2 className="subheading">3. Sharing Your Information</h2>
          <p className="text">
            We do not sell or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business, as long as those parties agree to keep this information confidential.
          </p>

          <h2 className="subheading">4. Data Security</h2>
          <p className="text">
            We implement a variety of security measures to maintain the safety of your personal information. Despite our efforts, no system can be completely secure. We cannot guarantee the absolute security of your data.
          </p>

          <h2 className="subheading">5. Your Rights</h2>
          <p className="text">
            You have the right to access, correct, or delete your personal information. You may also have the right to object to or restrict certain processing of your data. To exercise these rights, please contact us at [Your Email Address].
          </p>

          <h2 className="subheading">6. Changes to This Privacy Policy</h2>
          <p className="text">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this Privacy Policy periodically.
          </p>

          <h2 className="subheading">7. Contact Us</h2>
          <p className="text">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="text">
            • <span className="bold">Email</span>: [Your Email Address] <br />
            • <span className="bold">Phone</span>: [Your Phone Number]
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
