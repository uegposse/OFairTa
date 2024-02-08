import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
  containerScroll: {
    backgroundColor: "#075E55",
    flex: 1,
  },
  container: {
    marginTop: 100,
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImg: {
    width: 170,
    height: 170,
    borderRadius: 16,
  },
  inputArea: {
    width: "100%",
    padding: 40,
  },
  input: {
    width: "75%",
    height: 60,
    paddingLeft: 10,
    color: "#fff",
  },
  inputGroup: {
    elevation: 2,
    flexDirection: "row",
    paddingHorizontal: 10,
    backgroundColor: "#005047",
    marginBottom: 15,
    borderRadius: 6,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#019972",
  },
  buttonSignIn: {
    height: 60,
    backgroundColor: "#019972",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  buttonSignInText: {
    fontSize: 18,
    color: "#fff",
  },
  signMessage: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 20,
  },
  signMessageText: {
    fontSize: 16,
    color: "#FFF",
  },
  signMessageTextBold: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
    marginLeft: 5,
  },
});
