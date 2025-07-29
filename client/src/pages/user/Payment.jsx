import React, { useState, useEffect, useMemo } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { CheckoutProvider } from "@stripe/react-stripe-js"
import { payment } from "../../api/stripe"
import useEcomStore from "../../store/ecom-store"
import CheckoutForm from "../../components/CheckoutForm"
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK)

const Payment = () => {
  const token = useEcomStore((s) => s.token)
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    payment(token)
      .then((res) => {
        console.log(res)
        setClientSecret(res.data.clientSecret)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const appearance = {
    theme: "stripe",
  }
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto"

  return (
    <CheckoutProvider
      stripe={stripePromise}
      options={{
        fetchClientSecret: () => promise,
        elementsOptions: { appearance },
      }}
    >
      <CheckoutForm />
    </CheckoutProvider>
  )
}

export default Payment
