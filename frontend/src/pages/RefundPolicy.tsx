import { useNavigate } from 'react-router-dom';

const RefundPolicy = () => {
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
          <h1 className="heading">Refund Policy</h1>
          <p className="text">Last updated: 01 April 2023</p>

          <p className="subheading">Thank you for shopping at www.balainfotech.com.</p>
          <p className="text">
            If for any reason you are not completely satisfied with a purchase, we invite you to review our policy on refunds and returns.
          </p>

          <p className="text">
            The following terms are applicable to any products that you’ve purchased from us.
          </p>

          <h2 className="subheading">Interpretation and Definitions</h2>
          <h3 className="subheading">Interpretation</h3>
          <p className="text">
            The words in which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in the plural.
          </p>

          <h3 className="subheading">Definitions</h3>
          <p className="text">For the purposes of this Return and Refund Policy:</p>
          <p className="text">
            • <span className="bold">Company</span> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Bala Infotech.
          </p>
          <p className="text">
            • <span className="bold">Goods</span> refers to the items offered for sale.
          </p>
          <p className="text">
            • <span className="bold">Orders</span> means a request by you to purchase goods from us.
          </p>
          <p className="text">
            • <span className="bold">Website</span> refers to www.balainfotech.com, accessible from https://www.balainfotech.com/
          </p>
          <p className="text">
            • <span className="bold">You</span> means the individual accessing or using the service, or the company, or other legal entity on behalf of which such individual is accessing or using the service, as applicable.
          </p>

          <h2 className="subheading">Your Order Cancellation Rights</h2>
          <p className="text">1. There is no return or exchange encouraged for our products.</p>
          <p className="text">2. In case our product is received by you in a damaged condition, we will do the exchange for which the unboxing video of the product received is mandatory.</p>
          <p className="text">3. If the product received by you has any technical issues, the warranty for our product is for a month. Try to reach the product to our office address within the warranty period.</p>
          <p className="text">4. The issue of the received product will be rectified by Us within a week’s time and returned to you. In case of delay after the specified period, we will suggest other products as per your requirements.</p>
          <p className="text">5. In case, if you couldn't go with the suggestions of purchasing from the choices given, We will reimburse you no later than 14 days from the day on which your confirmation is given for a refund. We will use the same means of payment as you used for the Order, and you will not incur any fees for such reimbursement.</p>

          <h2 className="subheading">Conditions for Returns</h2>
          <p className="text">In order for the Goods to be eligible for a return, please make sure that:</p>
          <p className="text">• The goods are in the original packaging</p>
          <p className="text">The following goods cannot be returned:</p>
          <p className="text">• The supply of goods made to your specifications or clearly personalized.</p>
          <p className="text">• The supply of goods which according to their nature are not suitable to be returned, deteriorate rapidly, or where the date of expiry is over.</p>
          <p className="text">• The supply of goods that are not suitable for return due to health protection or hygiene reasons and were unsealed after delivery.</p>
          <p className="text">• The supply of goods which are, after delivery, according to their nature, inseparably mixed with other items.</p>
          <p className="text">
            We reserve the right to refuse returns of any merchandise that does not meet the above return conditions at our sole discretion.
          </p>

          <h2 className="subheading">Returning Goods</h2>
          <p className="text">
            You are responsible for the cost and risk of returning the goods to Us. You should send the goods to the following address:
          </p>
          <p className="text">
            Bala Infotech, [Your Office Address].
          </p>
          <p className="text">
            We cannot be held responsible for goods damaged or lost in return shipment. Therefore, we recommend an insured and trackable mail service. We are unable to issue a refund without actual receipt of the goods or proof of received return delivery.
          </p>

          <h2 className="subheading">Contact Us</h2>
          <p className="text">
            If you have any questions about our Returns and Refunds Policy, please contact us:
          </p>
          <p className="text">
            • <span className="bold">Contact Details</span>: Ph - [Your Phone Number] Email - [Your Email Address]
          </p>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
