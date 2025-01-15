import * as Linking from "expo-linking"
import { useStripe } from "@stripe/stripe-react-native"
import React, { useState } from "react"
import { Alert, Button } from "react-native"

async function fetchPaymentSheetParams(amount: number): Promise<{
  paymentIntent: string
  ephemeralKey: string
  customer: string
}> {
  const response = await fetch("/api/payment-sheet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  })
  return await response.json()
}

export default function CheckoutForm({ amount }: { amount: number }) {
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const [loading, setLoading] = useState(false)

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams(amount)

    const res = await initPaymentSheet({
      merchantDisplayName: "Example Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,

      defaultBillingDetails: {
        name: "Hans",
        email: "1065915112@qq.com",
        phone: "1234567890",
      },
      returnURL: Linking.createURL("stripe-redirect"),
      applePay: {
        merchantCountryCode: "US",
      },
    })

    console.log("initPaymentSheet", res)
  }

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet()
    if (error) {
      console.log(error)
    } else {
      Alert.alert("Payment successful", "Thank you for your purchase!")
    }
  }

  return (
    <React.Fragment>
      <Button title="Initialize Payment" onPress={initializePaymentSheet} />
      <Button title="openPaymentSheet" onPress={openPaymentSheet} />
    </React.Fragment>
  )
}
