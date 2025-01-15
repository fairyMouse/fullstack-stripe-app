import { Image, StyleSheet, Platform, Button } from "react-native"

import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import Slider from "@react-native-community/slider"
import { useState } from "react"
import CheckoutForm from "@/components/checkout-form.native"

export default function HomeScreen() {
  const [donationAmount, setDonationAmount] = useState(50)
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedText type="title">
        Donation amount: {Math.floor(donationAmount)}
      </ThemedText>
      <Slider
        style={{ width: "100%" }}
        minimumValue={0}
        maximumValue={100}
        value={donationAmount}
        onValueChange={setDonationAmount}
        minimumTrackTintColor="#FF0000"
        maximumTrackTintColor="#000000"
      />

      <CheckoutForm amount={donationAmount} />

      {/* <Button
        title="Donate"
        onPress={() => alert(`Donated $${donationAmount}`)}
      /> */}
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
})
