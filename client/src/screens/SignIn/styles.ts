import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
  containerScroll: {
    backgroundColor: "#019972",
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
    backgroundColor: "#53bda2",
    marginBottom: 15,
    borderRadius: 7,
    alignItems: "center",
  },
  buttonSignIn: {
    height: 60,
    backgroundColor: "#DFEDE9",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  buttonSignInText: {
    fontSize: 18,
    color: "#019972",
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
