import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    marginHorizontal: 2,
    marginBottom: 5,
    padding: 15,
    height: 200,
    backgroundColor: "#DFEDE9",
    width: width / 2 - 20,
  },
  cardImageView: {
    height: 100,
    alignItems: "center",
  },
  cardImage: {
    width: 100,
    height: 100,
  },
  cardTitleText: {
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 10,
    textTransform: "capitalize",
    color: "#343F4B",
  },
  cardInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  cardInfoText: {
    fontWeight: "bold",
    fontSize: 15,
    textTransform: "capitalize",
    color: "#343F4B",
  },
});
