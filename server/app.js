const express = require("express");
const cors = require("cors");
const {v4:uuidv4} = require("uuid");
const stripe = require("stripe")("sk_test_51PwRaRElGfOXsG9dXHcat72iFSMXLDIsL5hC54vaj0eDCGZ71lkl3mYY0CSZ6hFtCnlknFJ7aw3d2VnzM1OlnWRg00mAqnRZKN");

const app = express();

app.use(cors());
app.use(express.json());

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