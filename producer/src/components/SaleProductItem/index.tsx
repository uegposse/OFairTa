import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface SaleProductItemProps {
  saleProduct: {
    product: {
      id: string;
      image: string;
      name: string;
      price: number;
    };
    quantity: number;
  };
}

export const SaleProductItem = ({ saleProduct }: SaleProductItemProps) => {
  const total_value = saleProduct.product.price * saleProduct.quantity;
  var formatoMoeda = total_value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return (
    <View style={styles.saleProduct}>
      <Image
        style={styles.saleProductImage}
        source={{ uri: saleProduct.product.image }}
      />
      <View style={styles.saleProductTextInfo}>
        <Text style={styles.saleProductText}>{saleProduct.product.name}</Text>
        <Text style={styles.saleProductText}> {formatoMoeda}</Text>
      </View>
      <View style={styles.saleProductButtons}>
        <Text style={styles.saleProductButtonsText}>
          Quantidade {saleProduct.quantity}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  saleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    backgroundColor: "#3eb091",
  },
  saleHeaderText: {
    color: "#fff",
    fontWeight: "600",
  },
  saleHeaderTextFirst: {
    paddingHorizontal: 20,
  },
  saleHeaderValueTotal: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 15,
  },
  scrollProducts: {
    paddingTop: 20,
    alignItems: "center",
    paddingBottom: 400,
  },
  saleProduct: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#019972",
    marginBottom: 10,
    backgroundColor: "#DFEDE9",
    width: "90%",
    elevation: 5,
    borderRadius: 6,
    borderLeftWidth: 10,
  },
  saleProductImage: {
    width: 50,
    height: 50,
  },
  saleProductTextInfo: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  saleProductText: {
    color: "#019972",
  },
  saleProductButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  saleProductButtonsText: {
    padding: 10,
    color: "#019972",
  },
  labelButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  button: {
    width: "90%",
    height: 60,
    backgroundColor: "#075E55",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
});
