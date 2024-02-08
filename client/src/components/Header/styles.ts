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
  },
  headerImg: {
    width: 60,
    height: 70,
  },
  headerInputGroup: {
    width: 250,
    backgroundColor: "#3eb091",
    padding: 7,
    borderRadius: 7,
  },
  headerInputGroupIcons: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  headerInput: {
    backgroundColor: "#fff",
    color: "#111",
    borderRadius: 7,
    height: 30,
    paddingHorizontal: 10,
  },
});
