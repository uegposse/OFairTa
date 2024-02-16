import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    backgroundColor: "#019972",
    height: 115,
    borderTopWidth: 0,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 20,
  },
  headerImg: {
    width: 70,
    height: 70,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
});
