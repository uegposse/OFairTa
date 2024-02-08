import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTabContext } from "../../contexts/TabContext";
import { api } from "../../services/api";
import { HeaderReturn } from "../../components/HeaderReturn";
import { BankList } from "../../components/BankList";
import { Plus } from "phosphor-react-native";

const { width } = Dimensions.get("window");

const COLORS = {
  primary: "#019972",
  background: "#E5E5E5",
  cardBackground: "#ccc",
  cardBorder: "#075E55",
  cardText: "#075E55",
};

export const MyBanks = () => {
  const [loading, setLoading] = useState(false);
  const [banking, setBanking] = useState([]);
  const { setShowTab, setIdBank } = useTabContext();
  const { navigate } = useNavigation();
  const [refresh, setRefresh] = useState(false);

  async function fetchStores() {
    setLoading(true);
    try {
      const response = await api.get("/get-all-store-by-owner");
      if (response.status === 200) {
        setBanking(response.data);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Alerta!", "Houve um erro ao carregar as bancas!");
    } finally {
      setLoading(false);
      setRefresh(false);
    }
  }

  useEffect(() => {
    fetchStores();
  }, [refresh]);

  const handleSelectedBank = async (id: string) => {
    try {
      setIdBank(id);
      setShowTab(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBank = async (id: string) => {
    try {
      const response = await api.delete(`/delete-store/${id}`);
      if (response.status === 200) {
        Alert.alert("Banca excluída com sucesso!");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Alert.alert("Error", "Failed to delete the product.");
    }
  };

  return (
    <View style={styles.container}>
      <HeaderReturn title="Minhas Bancas" />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={fetchStores}
            colors={["#019972"]}
          />
        }
      >
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <BankList
            onDelete={handleDeleteBank}
            banking={banking}
            handleSelectedBank={handleSelectedBank}
          />
        )}
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigate("CreateBanks")}
        style={styles.button}
      >
        <Plus color="#FFF" weight="bold" />
      </TouchableOpacity>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  refreshButton: {
    height: 60,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  buttonText: {
    fontSize: 30,
    color: "#fff",
  },
  cardContainer: {
    marginLeft: 15,
    marginTop: 20,
    marginRight: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cardBanking: {
    borderRadius: 10,
    marginHorizontal: 2,
    marginBottom: 5,
    padding: 15,
    height: 200,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: COLORS.cardBackground,
    width: width / 2 - 20,
    elevation: 5,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  cardBankingImg: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  cardBankingTitle: {
    fontWeight: "600",
    fontSize: 14,
    color: COLORS.cardText,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    // left: 40,
    right: 20,
    bottom: 20,
    position: "absolute",
  },
  buttonRemove: {
    borderRadius: 5,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRemoveText: {
    color: "#FFF",
  },

  footerButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  textEmpty: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 14,
    color: COLORS.cardText,
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
