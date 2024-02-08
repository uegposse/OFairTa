import { useNavigation } from "@react-navigation/native";
import { WhatsappLogo } from "phosphor-react-native";
import { useContext } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";

import { CartContext } from "../../contexts/CartContext";

import { HeaderReturn } from "../../components/HeaderReturn";

import { styles } from "./styles";

export function BuyFinalized() {
  const { navigate } = useNavigation();
  const { cart, removeAllFromCart } = useContext(CartContext);

  let products = [];

  products = cart.products.map((product) => {
    return {
      nome: product.name,
      proço: product.price,
      quantidade: product.quantity,
      valor_total: product.price * product.quantity,
    };
  });

  const requestBody = {
    products: JSON.stringify(products, null, 3),
  };
  function handleLinkToWhatsapp() {
    Linking.openURL(
      `whatsapp://send?text=Olá! Desejo comprar esses produtos!
        ${requestBody.products}
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
          onPress={handleLinkToWhatsapp}
          style={styles.footerButton}
        >
          <Text style={styles.footerText}>Finalizar compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
