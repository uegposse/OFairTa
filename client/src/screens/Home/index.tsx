import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Card, CardProps } from "../../components/CardProduct";
import { Header } from "../../components/Header";
import { Highlights } from "../../components/Highlights";
import { api } from "../../services/api";
import { useTabContext } from "../../contexts/TabContext";
import { checkInternetConnection } from "../../utils/netInfo";
import { styles } from "./styles";

export function Home() {
  const [products, setProducts] = useState<CardProps[]>([]);
  const { idBank, setShowTab } = useTabContext();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { navigate } = useNavigation();

  async function fetchProducts() {
    setLoading(true);
    if (!idBank) {
      Alert.alert("Atenção", "Por favor, selecione uma banca!");
      setLoading(false);
      navigate("SelectBank");
      return;
    }

    checkInternetConnection().then((isConnected) => {
      if (!isConnected) {
        Alert.alert("Sem conexão", "Você está sem conexão com a internet.");
        setLoading(false);
        return;
      }

      api
        .get<CardProps[]>(`/get-all-product/store/${idBank}`)
        .then(({ data }) => {
          setProducts(data);
          setLoading(false);
        });
    });
  }

  useEffect(() => {
    fetchProducts();
  }, [idBank, refreshing]);

  function handleSelectBank() {
    setShowTab(false);
    navigate("SelectBank");
  }

  return (
    <View style={styles.container}>
      <Header />

      <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
        <Highlights />
        <View style={styles.Header}>
          <Text style={styles.infoHomeText}>Frutas, Verduras</Text>
          <TouchableOpacity onPress={handleSelectBank}>
            <Text style={styles.HeaderText}>Selecionar banca</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listHomeProduct}>
          <FlatList
            numColumns={2}
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Card
                key={item.id}
                image={item.image}
                name={item.name}
                id={item.id}
                price={item.price}
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
        </View>
      </SafeAreaView>
    </View>
  );
}
