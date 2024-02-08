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
import { useState } from "react";
import { api } from "../../services/api";
import { useNavigation } from "@react-navigation/native";

export function CreateBanks() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  async function handleCreateBanks() {
    setLoading(true);
    const response = await api.post("/create-store", { name, description });
    console.log(response.data);
    setLoading(false);
    navigation.navigate("MyBanks");
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#DFEDE9",
      }}
    >
      <HeaderReturn title="Cadastro de Bancas" />
      <View style={styles.containerInput}>
        <View style={styles.inputGroup}>
          <Text style={styles.labelInput}>Nome</Text>
          <TextInput
            onChangeText={setName}
            style={styles.input}
            placeholder="Ex: Banca do José"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.labelInput}>Descrição</Text>
          <TextInput
            onChangeText={setDescription}
            style={[styles.input, styles.inputDescription]}
            placeholder="Ex: Vendemos hortaliças"
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          disabled={loading}
          onPress={handleCreateBanks}
          style={styles.button}
        >
          {loading && <ActivityIndicator size="small" color="#FFF" />}
          {!loading && <Text style={styles.labelButton}>Cadastrar</Text>}
        </TouchableOpacity>
      </View>
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
    paddingVertical: 15,
  },
  inputDescription: {
    height: 120,
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
