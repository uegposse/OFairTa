import { useNavigation } from "@react-navigation/native";
import {
  AddressBook,
  Envelope,
  Eye,
  EyeClosed,
  LockKey,
} from "phosphor-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";

import LogoImg from "../../assets/ofairta.png";
import { styles } from "./styles";
import { api } from "../../services/api";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [isPassword, setIsPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const { navigate } = useNavigation();

  async function handleCreateUser() {
    setLoading(true);

    const response = await api.post("/create-user", {
      name: name.toLocaleLowerCase().trim(),
      email: email.toLocaleLowerCase().trim(),
      password: password.trim(),
      cpf: cpf.trim(),
      accessLevelName: "Vendedor",
    });

    if (response.status === 201) {
      Alert.alert("Usuário cadastrado com sucesso!");
      navigate("SignIn");
      setLoading(false);
    }
    setLoading(false);
  }

  return (
    <ScrollView style={styles.containerScroll}>
      <View style={styles.container}>
        <Image style={styles.logoImg} source={LogoImg} />
        <View style={styles.inputArea}>
          <View style={styles.inputGroup}>
            <AddressBook color="#fff" size={32} weight="light" />
            <TextInput
              placeholderTextColor="#fff"
              style={styles.input}
              placeholder="Digite seu nome"
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputGroup}>
            <Envelope color="#fff" size={32} weight="light" />
            <TextInput
              placeholderTextColor="#fff"
              style={styles.input}
              placeholder="Digite seu e-mail"
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Envelope color="#fff" size={32} weight="light" />
            <TextInputMask
              type="cpf"
              placeholderTextColor="#fff"
              style={styles.input}
              placeholder="Digite seu CPF"
              onChangeText={setCpf}
            />
          </View>

          <View style={styles.inputGroup}>
            <LockKey color="#fff" size={32} weight="light" />
            <TextInput
              secureTextEntry={isPassword}
              placeholderTextColor="#fff"
              style={styles.input}
              placeholder="Digite sua password"
              onChangeText={setPassword}
            />
            <Pressable onPress={() => setIsPassword(!isPassword)}>
              {isPassword && (
                <EyeClosed color="#fff" size={32} weight="light" />
              )}
              {!isPassword && <Eye color="#fff" size={32} weight="light" />}
            </Pressable>
          </View>

          <TouchableOpacity
            disabled={loading}
            style={styles.buttonSignIn}
            onPress={handleCreateUser}
          >
            {loading && <ActivityIndicator size="large" color="#fff" />}
            {!loading && (
              <Text style={styles.buttonSignInText}>Criar Conta</Text>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigate("SignIn")}
          style={styles.signMessage}
        >
          <Text style={styles.signMessageText}>Já possui uma conta?</Text>
          <Text style={styles.signMessageTextBold}>Entre aqui</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
