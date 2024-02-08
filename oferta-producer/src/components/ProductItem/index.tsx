import { PencilLine, XCircle } from "phosphor-react-native";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ModalApp } from "../Modal";

export const ProductItem = ({ product, onDelete, onUpdate }) => {
  const [isModalDeleteProductVisible, setIsModalDeleteProductVisible] =
    useState(false);

  const moeda = product.price;
  var formatoMoeda = moeda.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <View style={styles.cartProduct}>
      <Image source={{ uri: product.image }} style={styles.cartProductImage} />
      <View style={styles.cartProductTextInfo}>
        <Text style={styles.cartProductText}>{product.name}</Text>
        <Text style={styles.cartProductText}>{formatoMoeda}</Text>
      </View>
      <View style={styles.cartProductButtons}>
        <Text style={styles.cartProductButtonsText}>
          QTD: {product.quantity}
        </Text>
      </View>
      <TouchableOpacity onPress={() => onUpdate(product)}>
        <PencilLine color="#075E55" size={25} weight="fill" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsModalDeleteProductVisible(true)}>
        <XCircle color="#d46b71" size={25} weight="fill" />
      </TouchableOpacity>
      <ModalApp
        isVisible={isModalDeleteProductVisible}
        onClose={() => setIsModalDeleteProductVisible(false)}
        title="Deseja realmente excluir o produto?"
        backgroundColor="#DFEDE9"
      >
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={() => {
              onDelete(product.id);
              setIsModalDeleteProductVisible(false);
            }}
            style={styles.modalButton}
          >
            <Text style={styles.modalButtonText}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsModalDeleteProductVisible(false)}
            style={[styles.modalButton, { backgroundColor: "#019972" }]}
          >
            <Text style={styles.modalButtonText}>Não</Text>
          </TouchableOpacity>
        </View>
      </ModalApp>
    </View>
  );
};

export const styles = StyleSheet.create({
  cartProduct: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#019972",
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: "#fff",
    width: "100%",
    elevation: 5,
    borderLeftColor: "#075E55",
    borderLeftWidth: 10,
  },
  cartProductImage: {
    width: 50,
    height: 50,
    borderRadius: 3,
  },
  cartProductTextInfo: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  cartProductText: {
    color: "#075E55",
  },
  cartProductButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartProductButtonsText: {
    padding: 10,
    color: "#075E55",
  },
  modalContent: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
  },
  modalButton: {
    width: "40%",
    height: 45,
    backgroundColor: "#d46b71",
    borderRadius: 6,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  modalButtonText: {
    color: "#FFF",
  },
});
