import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalContent: {
    width: "100%",
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: 60,
    elevation: 3,
    backgroundColor: "#075E55",
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
});
