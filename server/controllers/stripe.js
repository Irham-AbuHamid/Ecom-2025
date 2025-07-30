// ✅ server/controllers/stripe.js
const prisma = require("../config/prisma")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil",
})

const YOUR_DOMAIN = "http://localhost:3000"

exports.payment = async (req, res) => {
  try {
    const cart = await prisma.cart.findFirst({
      where: {
        orderedById: req.user.id,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!cart || cart.cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" })
    }

    const line_items = cart.cartItems.map((item) => ({
      price: item.product.stripePriceId,
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      // Use the mapped line_items from the cart
      line_items: line_items,
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/cancel`,
    })

    res.json({ sessionId: session.id, clientSecret: session.client_secret })
  } catch (err) {
    console.error("Stripe error:", err)
    res.status(500).json({ message: err.message })
  }
}
