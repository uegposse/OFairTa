import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const { width } = Dimensions.get("window");

import { api } from "../../services/api";

import logoImg from "../../assets/Logo4.png";
import { HeaderReturn } from "../../components/HeaderReturn";
import { CartContext } from "../../contexts/CartContext";
import { useTabContext } from "../../contexts/TabContext";

interface BankingResponse {
  id: string;
  name: string;
}

export function SelectBank() {
  const [banking, setBanking] = useState<BankingResponse[]>([]);
  const { setShowTab, setIdBank } = useTabContext();
  const { removeAllFromCart } = useContext(CartContext);

  const { navigate } = useNavigation();

  useEffect(() => {
    api.get<BankingResponse[]>("/stores").then((response) => {
      setBanking(response.data);
    });
  }, []);

  async function handlerSelectedBank(id: string) {
    setIdBank(id);
    navigate("Home");
    setShowTab(true);
    removeAllFromCart();
  }

  return (
    <View>
      <HeaderReturn title="Selecione uma banca!" />
      <View style={styles.listHomeProduct}>
        {banking.map((bank) => (
          <TouchableOpacity
            onPress={() => handlerSelectedBank(bank.id)}
            key={bank.id}
            style={styles.cardBanking}
          >
            <Image style={styles.cardBankingImg} source={logoImg} />
            <Text style={styles.cardBankingTitle}>{bank.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  listHomeProduct: {
    marginLeft: 15,
    marginTop: 20,
    marginRight: 15,
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
