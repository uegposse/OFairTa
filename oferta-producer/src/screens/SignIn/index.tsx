import { useNavigation } from "@react-navigation/native";
import { Envelope, Eye, EyeClosed, LockKey } from "phosphor-react-native";
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

import LogoImg from "../../assets/ofairta.png";
import { useAuth } from "../../contexts/AuthContext";
import { styles } from "./styles";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(true);
  const { navigate } = useNavigation();
  const { login, loading } = useAuth();

  function handleSignIn() {
    try {
      const data = {
        email: email.toLocaleLowerCase().trim(),
        password: password.trim(),
      };
      if (data.email === "" || data.password === "") {
        return Alert.alert(
          "Atenção",
          "Por favor preencha todos os campos corretamente."
        );
      }
      login(data.email, data.password);
    } catch (error) {
      console.log(error);
      Alert.alert("Algo deu errado! Tente novamente!");
    }
  }

  return (
    <ScrollView style={styles.containerScroll}>
      <View style={styles.container}>
        <Image style={styles.logoImg} source={LogoImg} />
        <View style={styles.inputArea}>
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
            onPress={handleSignIn}
            style={styles.buttonSignIn}
          >
            {loading && <ActivityIndicator size="large" color="#fff" />}
            {!loading && <Text style={styles.buttonSignInText}>Entrar</Text>}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          disabled={loading}
          onPress={() => navigate("SignUp")}
          style={styles.signMessage}
        >
          <Text style={styles.signMessageText}>
            Ainda não possui uma conta?
          </Text>
          <Text style={styles.signMessageTextBold}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
