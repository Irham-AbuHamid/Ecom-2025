const prisma = require("../config/prisma")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil",
})

const YOUR_DOMAIN = "http://localhost:3000"

exports.payment = async (req, res) => {
  try {
    //code
    const session = await stripe.checkout.sessions.create({
      ui_mode: "custom",
      line_items: [
        {
          // Provide the exact Price ID (e.g. price_1234) of the product you want to sell
          price: "price_1Rq4IpK1YGgbm2Sb3q27syYu",
          quantity: 1,
        },
      ],
      mode: "payment",
      return_url: `${YOUR_DOMAIN}/complete?session_id={CHECKOUT_SESSION_ID}`,
    })

    res.send({ clientSecret: session.client_secret })
  } catch (err) {
    console.error("Stripe error:", err)
    res.status(500).json({ message: err.message })
  }
}
