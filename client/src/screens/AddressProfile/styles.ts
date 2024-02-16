import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
  header: {
    paddingHorizontal: 40,
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerButtonText: {
    color: "#019972",
    fontWeight: "bold",
    fontSize: 18,
  },
  cartAddress: {
    padding: 40,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  cartAddresses: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartAddressContent: {
    paddingHorizontal: 5,
  },
  cartAddressContentText: {
    color: "#019972",
  },
  input: {
    width: "100%",
    height: 60,
    borderBottomWidth: 1,
    borderColor: "#019972",
    fontSize: 16,
  },
  textGroup: {
    marginBottom: 15,
  },
  text: {
    color: "#019972",
    fontWeight: "600",
    fontSize: 16,
  },
  footer: {
    paddingHorizontal: 40,
    paddingVertical: 40,
  },
  button: {
    height: 60,
    marginBottom: 150,
    backgroundColor: "#019972",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});
