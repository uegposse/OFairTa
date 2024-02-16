import { useNavigation } from "@react-navigation/native";
import {
  MapPin,
  PlusCircle,
  ShoppingBag,
  ShoppingCart,
  WhatsappLogo,
  XCircle,
} from "phosphor-react-native";
import { useContext } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { HeaderReturn } from "../../components/HeaderReturn";
import { CartContext } from "../../contexts/CartContext";
import { styles } from "./styles";

export function Cart() {
  const { navigate, goBack } = useNavigation();
  const { cart, removeFromCart, getCartTotal } = useContext(CartContext);

  function handleBuy() {
    if (cart.products.length === 0) {
      Alert.alert("Aviso", "Não existem itens no carrinho para compra!");
    } else {
      navigate("BuyFinalized");
    }
  }

  return (
    <View>
      <HeaderReturn title="Carrinho de compras" />
      <View style={styles.cartHeader}>
        <Text style={[styles.cartHeaderText, styles.cartHeaderTextFirst]}>
          {cart.products.length} Item
        </Text>
        <View style={[styles.cartHeaderValueTotal]}>
          <Text style={styles.cartHeaderText}>Valor total:</Text>
          <Text style={styles.cartHeaderText}>
            R$ {getCartTotal().toFixed(2)}
          </Text>
        </View>
      </View>
      <Text style={styles.cartAddressesTitle}>Entregar em:</Text>
      <View style={styles.cartAddress}>
        <MapPin color="#019972" size={32} weight="thin" />
        <View style={styles.cartAddressContent}>
          <Text style={styles.cartAddressContentText}>Posse, Goiás</Text>
          <Text style={styles.cartAddressContentText}>
            Rua Santa Lucia, Quadra 06, Lote 17. Santa Luzia.
          </Text>
        </View>
      </View>
      <ScrollView
        style={styles.cartScrollView}
        showsVerticalScrollIndicator={false}
      >
        {cart.products.length === 0 ? (
          <View style={styles.cartEmpty}>
            <ShoppingCart color="#3eb091" size={100} weight="duotone" />
            <Text style={styles.cartEmptyText}>
              Nenhum produto adicionado no carrinho
            </Text>
          </View>
        ) : (
          cart.products.map((product) => (
            <View key={product.id} style={{ alignItems: "center" }}>
              <View style={styles.cartProduct}>
                <Image
                  style={styles.cartProductImage}
                  source={{ uri: product.image }}
                />
                <View style={styles.cartProductTextInfo}>
                  <Text style={styles.cartProductText}>{product.name}</Text>
                  <Text style={styles.cartProductText}>
                    R$ {product.price * product.quantity}
                  </Text>
                </View>

                <View style={styles.cartProductButtons}>
                  <Text style={styles.cartProductButtonsText}>
                    Quantidade {product.quantity}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => removeFromCart(product.id)}>
                  <XCircle color="#d46b71" size={32} weight="fill" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
      <View style={styles.cartContainerFooterButtons}>
        <TouchableOpacity
          onPress={() => goBack()}
          style={styles.cartFooterButton}
        >
          <PlusCircle color="#fff" size={32} weight="duotone" />
          <Text style={styles.cartFooterButtonText}>Produtos</Text>
        </TouchableOpacity>
        <WhatsappLogo
          style={{ elevation: 5 }}
          color="#019972"
          size={60}
          weight="duotone"
        />
        <TouchableOpacity
          disabled={cart.products.length === 0 ? true : false}
          onPress={handleBuy}
          style={styles.cartFooterButton}
        >
          <ShoppingBag color="#FFF" size={32} weight="duotone" />
          <Text style={styles.cartFooterButtonText}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
