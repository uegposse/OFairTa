import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    marginHorizontal: 5,
    marginBottom: 15,
    padding: 15,
    height: 160,
    backgroundColor: "#DFEDE9",
    width: width / 3 - 20,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#019972",
  },
  cardImageView: {
    height: 80,
    alignItems: "center",
  },
  cardImage: {
    width: 80,
    height: 80,
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
    fontSize: 13,
    textTransform: "capitalize",
    color: "#019972",
  },
});
