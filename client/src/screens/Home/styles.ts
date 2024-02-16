import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  scrollHome: {
    width: "100%",
  },
  Header: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  HeaderText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#019972",
  },
  infoHomeText: {
    fontSize: 16,
    fontWeight: "700",
    paddingHorizontal: 15,
    color: "#343F4B",
  },
  listHomeProduct: {
    marginLeft: 15,
    marginTop: 10,
    marginRight: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollCardList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cardBanking: {
    borderRadius: 10,
    marginHorizontal: 2,
    marginBottom: 5,
    padding: 15,
    height: 200,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#DFEDE9",
    width: width / 2 - 20,
  },
  cardBankingImg: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  cardBankingTitle: {
    fontWeight: "600",
    fontSize: 14,
  },
});
