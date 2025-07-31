import React, { useEffect, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import useEcomStore from "../../store/ecom-store"
import { payment } from "../../api/stripe"
import CheckoutForm from "../../components/CheckoutForm"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK)

const Payment = () => {
  const token = useEcomStore((s) => s.token)
  const [clientSecret, setClientSecret] = useState(null)

  useEffect(() => {
    const fetchClientSecret = async () => {
      if (!token) {
        console.warn("❗ ยังไม่ได้ login หรือ token หายไป")
        return
      }

      try {
        const res = await payment(token)
        setClientSecret(res.data.clientSecret)
      } catch (err) {
        console.error("Error fetching clientSecret:", err)
      }
    }

    fetchClientSecret()
  }, [token])

  const options = {
    clientSecret: clientSecret,
    appearance: { theme: "stripe" },
  }

  if (!clientSecret) return <div>Loading payment...</div>

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  )
}

export default Payment
