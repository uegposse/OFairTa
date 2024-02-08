import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { HeaderReturn } from "../../components/HeaderReturn";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { api } from "../../services/api";

interface ProductsResponse {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
}

export function UpdateProduct() {
  const route = useRoute();
  const {
    id,
    name: UpdateName,
    description: UpdateDescription,
    price: UpdatePrice,
    quantity: UpdateQuantity,
  } = route.params as ProductsResponse;

  const [name, setName] = useState(UpdateName);
  const [description, setDescription] = useState(UpdateDescription);
  const [price, setPrice] = useState(UpdatePrice.toString());
  const [quantity, setQuantity] = useState(UpdateQuantity.toString());
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  async function handleUpdateProduct() {
    setLoading(true);
    const response = await api.put(`/update-product/${id}`, {
      name,
      description,
      price: parseFloat(price),
      quantity: parseFloat(quantity),
    });
    setLoading(false);
    if (response.data.error) {
      alert(response.data.error);
    } else {
      alert("Produto atualizado com sucesso!");
      navigation.goBack();
    }
  }

  useEffect(() => {
    setName(UpdateName);
    setDescription(UpdateDescription);
    setPrice(UpdatePrice.toString());
    setQuantity(UpdateQuantity.toString());
  }, [id]);

  const handleTextChangePrice = (text) => {
    setPrice(text);
  };

  const handleTextChangeQuantity = (text) => {
    setQuantity(text);
  };

  return (
    <View>
      <HeaderReturn title="Atualizar Produto" />
      <ScrollView>
        <View style={styles.containerInput}>
          <View style={styles.inputGroup}>
            <Text style={styles.labelInput}>Nome</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.labelInput}>Descrição</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              style={styles.input}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.labelInput}>Preço</Text>
            <TextInput
              value={price}
              onChangeText={handleTextChangePrice}
              style={styles.input}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.labelInput}>Quantidade</Text>
            <TextInput
              value={quantity}
              onChangeText={handleTextChangeQuantity}
              style={styles.input}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity
            disabled={loading}
            onPress={handleUpdateProduct}
            style={styles.button}
          >
            {loading && <ActivityIndicator size="large" color="#fff" />}
            {!loading && <Text style={styles.labelButton}>Atualizar</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export const styles = StyleSheet.create({
  containerInput: {
    marginBottom: 200,
    width: "100%",
    padding: 20,
    gap: 20,
  },
  inputGroup: {
    gap: 10,
  },
  labelInput: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#075E55",
  },
  labelButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    width: "100%",
    height: 60,
    paddingLeft: 10,
    color: "#075E55",
    fontWeight: "700",
    borderWidth: 1,
    borderColor: "#075E55",
    borderRadius: 10,
    paddingHorizontal: 15,
  },

  uploadedImagesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 9,
    marginRight: 8,
  },
  imagesInput: {
    // backgroundColor: "#ccc",
    borderStyle: "dashed",
    borderColor: "#00875F",
    borderWidth: 1.4,
    borderRadius: 9,
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    height: 60,
    backgroundColor: "#019972",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
});
