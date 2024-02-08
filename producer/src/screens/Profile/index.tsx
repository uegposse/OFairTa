import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { HeaderReturn } from "../../components/HeaderReturn";

import { api } from "../../services/api";
import { checkInternetConnection } from "../../utils/netInfo";
import { styles } from "./styles";

interface UserResponse {
  name: string;
  email: string;
  cpf: string;
}

export function Profile() {
  const [isUpdated, setIsUpdated] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const { goBack } = useNavigation();
  const [loading, setLoading] = useState(false);

  function handleBackPress() {
    setIsUpdated(false);
    goBack();
    return true;
  }

  useEffect(() => {
    const backButtonHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
    return () => backButtonHandler.remove();
  }, []);

  function handleGetUser() {
    setLoading(true);
    checkInternetConnection().then((isConnected) => {
      if (!isConnected) {
        Alert.alert("Sem conexão", "Você está sem conexão com a internet.");
        setLoading(false);
        return;
      }
      api.get<UserResponse>("/unique-user").then((response) => {
        setName(response.data.name);
        setEmail(response.data.email);
        setCpf(response.data.cpf);
        setLoading(false);
      });
    });
  }

  useEffect(() => {
    handleGetUser();
  }, []);

  function handleUpdateUser() {
    api
      .put("/update-user", {
        name,
        email,
        cpf,
      })
      .then((response) => {
        // console.log(response.data);
        setIsUpdated(false);
        handleGetUser();
      });
    setIsUpdated(false);
  }

  return (
    <View>
      <HeaderReturn title="Dados Pessoais" />
      {loading && (
        <ActivityIndicator style={styles.loading} size={50} color="#019972" />
      )}

      {!loading && (
        <ScrollView>
          <View style={styles.header}>
            <View />
            <TouchableOpacity onPress={() => setIsUpdated(!isUpdated)}>
              <Text style={styles.headerButtonText}>Alterar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={styles.textGroup}>
              <Text style={styles.text}>E-mail</Text>
              <TextInput
                editable={isUpdated}
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.textGroup}>
              <Text style={styles.text}>Nome</Text>
              <TextInput
                editable={isUpdated}
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.textGroup}>
              <Text style={styles.text}>CPF</Text>
              <TextInputMask
                type="cpf"
                editable={isUpdated}
                style={styles.input}
                value={cpf}
                onChangeText={setCpf}
              />
            </View>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={handleUpdateUser}
              disabled={!isUpdated}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
