import React, { useCallback } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { CheckoutProvider } from "@stripe/react-stripe-js"
import useEcomStore from "../../store/ecom-store"
import { payment } from "../../api/stripe"
import CheckoutForm from "../../components/CheckoutForm"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK)

const Payment = () => {
  const token = useEcomStore((s) => s.token)

  const fetchClientSecret = useCallback(async () => {
    const res = await payment(token)
    return res.data.clientSecret
  }, [token])

  const appearance = { theme: "stripe" }

  return (
    <CheckoutProvider
      stripe={stripePromise}
      options={{
        fetchClientSecret,
        elementsOptions: { appearance },
      }}
    >
      <CheckoutForm />
    </CheckoutProvider>
  )
}

export default Payment
