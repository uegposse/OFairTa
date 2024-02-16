import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  cartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    backgroundColor: "#3eb091",
  },
  cartHeaderText: {
    color: "#fff",
    fontWeight: "600",
  },
  cartHeaderTextFirst: {
    paddingHorizontal: 20,
  },
  cartHeaderValueTotal: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 15,
  },
  cartAddressesTitle: {
    fontWeight: "bold",
    paddingHorizontal: 15,
    fontSize: 18,
    color: "#019972",
    paddingBottom: 15,
    paddingTop: 20,
  },
  cartAddress: {
    paddingHorizontal: 15,
    flexDirection: "row",
    paddingBottom: 20,
  },
  cartAddressContent: {
    paddingHorizontal: 5,
  },
  cartAddressContentText: {
    color: "#019972",
  },
  cartEmpty: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  cartEmptyText: {
    fontSize: 18,
    color: "#019972",
  },

  cartScrollView: {
    height: "45%",
  },
  cartProduct: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#019972",
    borderRadius: 16,
    marginBottom: 10,
    backgroundColor: "#DFEDE9",
    width: "95%",
    elevation: 5,
  },
  cartProductImage: {
    width: 50,
    height: 50,
  },
  cartProductTextInfo: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  cartProductText: {
    color: "#019972",
  },
  cartProductButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartProductButtonsText: {
    padding: 10,
    color: "#019972",
  },
  cartContainerFooterButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 40,
  },
  cartFooterButton: {
    width: 100,
    height: 60,
    borderRadius: 7,
    backgroundColor: "#019972",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  cartFooterButtonText: {
    color: "#FFf",
  },
});
