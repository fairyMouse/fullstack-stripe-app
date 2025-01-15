import {
  StripeProvider,
  StripeProviderProps,
} from "@stripe/stripe-react-native"
import Constants from "expo-constants"
import * as Linking from "expo-linking"

const merchantIdentifier = Constants.expoConfig?.plugins?.find(
  plugin => plugin[0] === "@stripe/stripe-react-native"
)?.[1].merchantIdentifier

if (!merchantIdentifier) {
  throw new Error("Merchant identifier not found in app.json")
}

export default function ExpoStripeProvider(
  props: Omit<
    StripeProviderProps,
    "publishableKey" | "merchantIdentifier" | "urlScheme"
  >
) {
  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      merchantIdentifier={merchantIdentifier}
      urlScheme={Linking.createURL("/")?.split(":")[0]}
      {...props}
    />
  )
}
