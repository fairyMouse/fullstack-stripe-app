import { stripe } from "@/stripe-server"

export async function POST(req: Request) {
  const { amount } = await req.json()
  console.log("amount:", amount)
  const customer = await stripe.customers.create()

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2024-12-18.acacia" }
  )

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount ? Math.floor(amount) : 10000,
    currency: "usd",
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  })

  return Response.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
  })
}
