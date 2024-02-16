import { useNavigation, useRoute } from "@react-navigation/native";
import { MinusCircle, PlusCircle } from "phosphor-react-native";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import LogoImg from "../../assets/ofairta.png";
import { HeaderReturn } from "../../components/HeaderReturn";
import { CartContext } from "../../contexts/CartContext";
import { api } from "../../services/api";
import { checkInternetConnection } from "../../utils/netInfo";
import { styles } from "./styles";

interface RouteParams {
  id: string;
}

interface DetailsProductProps extends RouteParams {
  name: string;
  image: string;
  price: number;
  store: {
    userId: string;
  };
}

export function DetailsProduct() {
  const [product, setProduct] = useState<DetailsProductProps>(
    {} as DetailsProductProps
  );
  const [counterProduct, setCounterProduct] = useState(1);
  const route = useRoute();
  const { id } = route.params as RouteParams;
  const { addToCart } = useContext(CartContext);
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    checkInternetConnection().then((isConnected) => {
      if (!isConnected) {
        Alert.alert("Sem conexão", "Você está sem conexão com a internet.");
        return;
      }
      api
        .get<DetailsProductProps>(`/get-unique-product/${id}`)
        .then((response) => {
          setProduct(response.data);
          setLoading(false);
        });
    });
  }, [id]);

  const handleAddCartProduct = () => {
    addToCart({
      id,
      image: product.image,
      name: product.name,
      price: product.price,
      quantity: counterProduct,
      userId: product.store.userId,
    });
    navigate("Cart");
  };

  function handleRemoveCounterProduct() {
    if (counterProduct === 1) {
      setCounterProduct(1);
    } else {
      setCounterProduct(counterProduct - 1);
    }
  }

  return (
    <View>
      <HeaderReturn title="Início" />
      {loading && (
        <ActivityIndicator style={styles.loading} size={50} color="#019972" />
      )}
      {!loading && (
        <>
          {product && (
            <View style={styles.container}>
              <TouchableOpacity
                style={{
                  marginBottom: 30,
                  alignItems: "center",
                  gap: 2,
                }}
                onPress={() => navigate("ProduceHistory")}
              >
                <Image style={styles.image} source={LogoImg} />
                <Text
                  style={{
                    color: "#019972",
                    fontWeight: "400",
                  }}
                >
                  Clique para ver mais detalhes do produtor
                </Text>
              </TouchableOpacity>
              <View style={styles.product}>
                <Image
                  style={styles.productImage}
                  source={
                    product.image === null ? LogoImg : { uri: product.image }
                  }
                />
                <Text style={styles.productTitle}>{product.name}</Text>
              </View>

              <View style={styles.cartProductButtons}>
                <TouchableOpacity onPress={handleRemoveCounterProduct}>
                  <MinusCircle color="#019972" size={60} weight="duotone" />
                </TouchableOpacity>
                <Text style={styles.cartProductButtonsText}>
                  {counterProduct}
                </Text>

                <TouchableOpacity
                  onPress={() => setCounterProduct(counterProduct + 1)}
                >
                  <PlusCircle color="#019972" size={60} weight="duotone" />
                </TouchableOpacity>
              </View>
              <View style={styles.footer}>
                <Text style={styles.footerText}>Valor: R$ {product.price}</Text>
                <TouchableOpacity
                  onPress={handleAddCartProduct}
                  style={styles.footerButton}
                >
                  <Text style={styles.footerButtonText}>Add no carrinho</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
}
