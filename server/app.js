const express = require("express");
const cors = require("cors");
const {v4:uuidv4} = require("uuid");
const stripe = require("stripe")("sk_test_51PwRaRElGfOXsG9dXHcat72iFSMXLDIsL5hC54vaj0eDCGZ71lkl3mYY0CSZ6hFtCnlknFJ7aw3d2VnzM1OlnWRg00mAqnRZKN");
const nodemailer = require("nodemailer");
const app = express();

app.use(cors());
app.use(express.json());

// Set up SMTP configuration (this example uses Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use any SMTP provider here
  auth: {
    user: "balasystems24@gmail.com", // Your email here
    pass: "muni hvih rqfm szzt", // Your email password or app password
  },
});

// Send email function
const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: "balasystems24@gmail.com", // sender address
      to, // recipient address
      subject, // Subject line
      text, // plain text body
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Route to handle the sending of emails
app.post("/send-email", async (req, res) => {
  const { email, action } = req.body;
  let subject = "";
  let text = "";

  // Determine the subject and text based on action
  switch (action) {
    case "accept":
      subject = "Your Request Has Been Accepted!";
      text = "Dear user, your request has been accepted. We will proceed with the process.";
      break;
    case "decline":
      subject = "Your Request Has Been Declined!";
      text = "Dear user, unfortunately, your request has been declined. Please contact support for further assistance.";
      break;
    case "deliver":
      subject = "Your Request Is Ready for Delivery!";
      text = "Dear user, your request is ready for delivery. Please check the details and confirm.";
      break;
    default:
      subject = "Action Required";
      text = "Please check your request status.";
  }

  await sendEmail(email, subject, text);

  res.status(200).json({ message: "Email sent successfully!" });
});

app.get("/",(req,res)=>{
    res.send("server working...");
});

app.post("/payment",(req,res)=>{
    const {tprice,token} = req.body;
    const txnKey =uuidv4;

    return stripe.customers.create({
        email:token.email,
        source:token.id
    }).then((customer)=>{
        stripe.charges.create({
            amount:tprice,
            currency:"inr",
            customer:customer.id,
            receipt_email:token.email,
            description:"Products form Balasystems"
        }).then((result)=>{
            res.json(result);
        }).catch((err)=>{
            console.log(err);
        })
    })
});

app.listen(5000,()=>{
    console.log("server running on port 5000...");
});
