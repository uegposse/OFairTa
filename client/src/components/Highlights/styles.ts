import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {},
  textHighlights: {
    fontSize: 16,
    fontWeight: "700",
    paddingHorizontal: 15,
    color: "#343F4B",
  },
  image: {
    flex: 1,
    width: width * 0.7 - 20,
    height: width / 9,
    marginBottom: 10,
    borderRadius: 12,
    resizeMode: "cover",
  },
});
