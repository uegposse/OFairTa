import { Plus } from "phosphor-react-native";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HeaderReturn } from "../../components/HeaderReturn";

import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ProductItem } from "../../components/ProductItem";
import { useAuth } from "../../contexts/AuthContext";
import { useTabContext } from "../../contexts/TabContext";
import { api } from "../../services/api";

interface ProductsResponse {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
}

export function Home() {
  const { userName } = useAuth();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { idBank, setIdBank, setShowTab } = useTabContext();
  const { navigate } = useNavigation();
  const [refreshing, setRefreshing] = useState(false); // Alterado o nome para evitar confusão

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/get-all-product/store/${idBank}`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      Alert.alert("Error", "Failed to fetch products.");
    } finally {
      setLoading(false);
      setRefreshing(false); // Ao concluir o carregamento, defina refreshing como false
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [idBank, refreshing]);

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await api.delete(`/delete-product/${id}`);
      if (response.status === 200) {
        Alert.alert("Produto excluído com sucesso!");
        setRefreshing(true); // Define refreshing como true para acionar a atualização
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Alert.alert("Error", "Failed to delete the product.");
    }
  };

  const handleUpdateProduct = (product: ProductsResponse) => {
    navigate("UpdateProduct", {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
    });
  };

  return (
    <View
      style={{
        flex: 1, // Use flex: 1 para ocupar toda a tela
        backgroundColor: "#DFEDE9",
      }}
    >
      <HeaderReturn title={`Olá, ${userName}`} />
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 20,
          flex: 1, // Use flex: 1 para ocupar toda a tela
          gap: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setIdBank("");
              setShowTab(false);
            }}
            style={{
              flex: 1,
              padding: 15,
              backgroundColor: "#075E55",
              borderRadius: 6,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                textTransform: "uppercase",
              }}
            >
              Alterar banca
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate("CreateProduct")}
            style={{
              flex: 1,
              padding: 15,
              backgroundColor: "#019972",
              borderRadius: 6,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <Plus color="#FFF" size={16} weight="regular" />
            <Text
              style={{
                color: "#fff",
                textTransform: "uppercase",
              }}
            >
              produto
            </Text>
          </TouchableOpacity>
        </View>
        {loading && <ActivityIndicator color="#019972" size="large" />}
        {!loading && (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProductItem
                product={item}
                onDelete={handleDeleteProduct}
                onUpdate={handleUpdateProduct}
              />
            )}
            ListEmptyComponent={() => <Text>Esta banca está sem produtos</Text>}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={fetchProducts} // A função de atualização
                colors={["#019972"]} // Cor do indicador de carregamento
              />
            }
          />
        )}
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  cartProduct: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#019972",
    borderRadius: 16,
    marginBottom: 10,
    backgroundColor: "#fff",
    width: "100%",
    elevation: 5,
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
  button: {
    width: "100%",
    height: 60,
    backgroundColor: "#019972",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    bottom: 0,
    position: "absolute",
  },

  buttonText: {
    fontSize: 18,
    color: "#fff",
  },
});
