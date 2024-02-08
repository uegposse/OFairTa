import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { HeaderReturn } from "../../components/HeaderReturn";
import { useState } from "react";
import { Plus } from "phosphor-react-native";
import { useTabContext } from "../../contexts/TabContext";
import { api } from "../../services/api";
import { useNavigation } from "@react-navigation/native";

export function CreateProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photos, setPhotos] = useState<string>();
  const { idBank } = useTabContext();
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Eitá, precisamos de acesso ás suas fotos..");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setPhotos(result.assets[0].uri);
    }
  }

  async function handleCreateProduct() {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      if (photos) {
        formData.append("image", {
          name: `image-${Math.random}.jpeg`,
          uri: photos,
          type: "image/jpeg",
        } as any);
      }
      const response = await api.post(`/create-product/${idBank}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setName("");
      setDescription("");
      setPrice("");
      setQuantity("");
      Alert.alert("Cadastro", "Produto cadastrado com sucesso! ");
      navigation.navigate("Home");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <View>
      <HeaderReturn title="Cadastro de produtos" />
      <ScrollView>
        <View style={styles.containerInput}>
          <View style={styles.inputGroup}>
            <Text style={styles.labelInput}>Nome</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholder="Ex: Batata"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.labelInput}>Descrição</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              style={styles.input}
              placeholder="Ex: Batata Inglesa"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.labelInput}>Preço</Text>
            <TextInput
              value={price}
              onChangeText={setPrice}
              style={styles.input}
              placeholder="Ex: 8.99"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.labelInput}>Quantidade</Text>
            <TextInput
              value={quantity}
              onChangeText={setQuantity}
              style={styles.input}
              placeholder="Ex: 200"
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.labelInput}>Imagens do produto</Text>

          <View style={styles.uploadedImagesContainer}>
            <Image
              key={photos}
              source={{ uri: photos }}
              style={styles.uploadedImage}
            />
            <TouchableOpacity
              style={styles.imagesInput}
              onPress={handleSelectImages}
            >
              <Plus color="#075E55" size={32} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            disabled={loading}
            onPress={handleCreateProduct}
            style={styles.button}
          >
            {loading && <ActivityIndicator size="large" color="#fff" />}
            {!loading && <Text style={styles.labelButton}>Cadastrar</Text>}
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
    // marginTop: 20,
    // marginBottom: 20,
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
    // marginTop: 15,
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
