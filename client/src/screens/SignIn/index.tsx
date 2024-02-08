import { useNavigation } from "@react-navigation/native";
import { Envelope, LockKey } from "phosphor-react-native";
import { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import LogoImg from "../../assets/Logo4.png";
import { useAuth } from "../../contexts/AuthContext";
import { styles } from "./styles";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { navigate } = useNavigation();
  const { login } = useAuth();

  function handleSignIn() {
    try {
      login(email, password);
    } catch (error) {
      console.log(error);
      Alert.alert("Algo deu errado! Tente novamente!");
    }
  }

  return (
    <View style={styles.container}>
      <Image source={LogoImg} />
      <View style={styles.inputArea}>
        <View style={styles.inputGroup}>
          <Envelope color="#fff" size={32} weight="duotone" />
          <TextInput
            placeholderTextColor="#fff"
            style={styles.input}
            placeholder="Digite seu e-mail"
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputGroup}>
          <LockKey color="#fff" size={32} weight="duotone" />
          <TextInput
            placeholderTextColor="#fff"
            style={styles.input}
            placeholder="Digite sua password"
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity onPress={handleSignIn} style={styles.buttonSignIn}>
          <Text style={styles.buttonSignInText}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.signMessage}
        onPress={() => navigate("SignUp")}
      >
        <Text style={styles.signMessageText}>Ainda não possui uma conta?</Text>
        <Text style={styles.signMessageTextBold}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}
