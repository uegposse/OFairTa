import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  myRequestContainer: {
    padding: 40,
  },
  loading: {
    alignContent: "center",
    marginTop: 50,
  },
  RequestCard: {
    height: 100,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "#DFEDE9",
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#019972",
  },
  RequestImage: {
    height: 80,
    width: 80,
    borderRadius: 10,
  },
  RequestContent: {
    height: 100,
    marginLeft: 10,
    paddingVertical: 20,
    flex: 1,
  },
  RequestTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#343F4B",
  },
  RequestAbout: {
    fontSize: 18,
    color: "#343F4B",
  },
});
