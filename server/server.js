const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order — called before opening Razorpay checkout
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert ₹ to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`, // ✅ Unique receipt per order
    });

    res.json(order);
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

//  Verify Payment — called after Razorpay checkout success
app.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  // Generate expected signature using HMAC SHA256
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    //  Payment is authentic
    console.log("Payment verified:", razorpay_payment_id);
    res.json({ status: "success", paymentId: razorpay_payment_id });
  } else {
    // Signature mismatch — possible tampering
    console.log("Payment verification failed");
    res.status(400).json({ status: "failure" });
  }
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
