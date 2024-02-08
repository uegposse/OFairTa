import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 30,
  },
  product: {
    borderWidth: 1,
    borderColor: "#019972",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#DFEDE9",
  },
  productImage: {
    width: 200,
    height: 200,
  },
  productTitle: {
    color: "#019972",
    fontSize: 18,
    fontWeight: "800",
  },
  cartProductButtons: {
    paddingTop: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  cartProductButtonsText: {
    fontSize: 50,
    padding: 10,
    paddingHorizontal: 50,
    color: "#019972",
  },
  footer: {
    height: 80,
    borderTopWidth: 1,
    borderColor: "#019972",
    marginTop: 20,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  footerText: {
    color: "#019972",
    fontWeight: "500",
    fontSize: 15,
  },
  footerButton: {
    height: 40,
    width: 150,
    backgroundColor: "#019972",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
  },
  footerButtonText: {
    color: "#FFF",
    fontWeight: "500",
    fontSize: 15,
  },
});
