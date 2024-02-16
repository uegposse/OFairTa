import { useNavigation } from "@react-navigation/native";
import { WhatsappLogo } from "phosphor-react-native";
import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CartContext } from "../../contexts/CartContext";

import { HeaderReturn } from "../../components/HeaderReturn";

import { api } from "../../services/api";
import { checkInternetConnection } from "../../utils/netInfo";
import { styles } from "./styles";

interface saleProps {
  id: string;
  quantity: number;
}

export function BuyFinalized() {
  const { navigate } = useNavigation();
  const { cart, removeAllFromCart, getCartTotal } = useContext(CartContext);

  const [loading, setLoading] = useState(false);

  let products = [];

  products = cart.products.map((product) => {
    return {
      nome: product.name,
      preço: product.price,
      quantidade: product.quantity,
      valor_total: product.price * product.quantity,
    };
  });

  let sale: saleProps[] = [];

  sale = cart.products.map((product) => {
    return {
      id: product.id,
      quantity: product.quantity,
    };
  });

  async function handleSaleProducts() {
    setLoading(true);
    checkInternetConnection().then((isConnected) => {
      if (!isConnected) {
        Alert.alert("Sem conexão", "Você está sem conexão com a internet.");
        return;
      }
      api
        .post("/create-sale", {
          products: sale,
          userSellerId: cart.products[0].userId,
        })
        .then((response) => {
          handleLinkToWhatsapp();
          setLoading(false);
        });
    });
  }

  const requestBody = {
    products: JSON.stringify(products, null, 3),
  };

  function handleLinkToWhatsapp() {
    Linking.openURL(
      `whatsapp://send?text=Olá! Desejo comprar esses produtos!
        ${requestBody.products}
        total da compra: *${getCartTotal().toFixed(2)}*
      &phone=+5562998256593`
    );
    removeAllFromCart();
    navigate("Home");
  }
  return (
    <View>
      <HeaderReturn title="Início" />
      <View style={styles.container}>
        <View style={styles.logoWhatsapp}>
          <WhatsappLogo color="#019972" size={200} weight="duotone" />
        </View>
        <Text style={styles.title}>
          Sua compra será finalizada pelo Whatsapp!
        </Text>
        <Text style={styles.text}>
          Todos os produtos escolhidos por você serão enviados para o vendedor
          para que a compra seja confirmada!
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          disabled={loading}
          onPress={handleSaleProducts}
          style={styles.footerButton}
        >
          {loading && <ActivityIndicator color="#fff" size="large" />}

          {!loading && <Text style={styles.footerText}>Finalizar compra</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}
