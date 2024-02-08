import { useNavigation } from "@react-navigation/native";
import {
  Envelope,
  IdentificationBadge,
  IdentificationCard,
  LockKey,
} from "phosphor-react-native";
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
import { api } from "../../services/api";
import { styles } from "./styles";

export function SignUp() {
  const { navigate } = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [isPassword, setIsPassword] = useState("");

  function handleCreateUser() {
    api
      .post("/user", {
        name,
        email,
        password,
        cpf,
        accessLevelName: "Comprador",
      })
      .then((response) => {
        if (response.status === 201) {
          Alert.alert("Success", "Usuário criado com sucesso!");
          navigate("SignIn");
        } else {
          Alert.alert(
            "Error",
            "Ocorreu um erro ao criar o usuário tente novamente"
          );
        }
      })
      .catch((Error) => {
        console.log(Error);
        Alert.alert(
          "Error",
          "Ocorreu um erro ao criar o usuário tente novamente"
        );
      });
  }

  return (
    <View style={styles.container}>
      <Image source={LogoImg} />
      <View style={styles.inputArea}>
        <View style={styles.inputGroup}>
          <IdentificationBadge color="#fff" size={32} weight="duotone" />
          <TextInput
            placeholderTextColor="#fff"
            style={styles.input}
            placeholder="Digite seu name"
            onChangeText={setName}
          />
        </View>

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
          <IdentificationCard color="#fff" size={32} weight="duotone" />
          <TextInput
            placeholderTextColor="#fff"
            style={styles.input}
            placeholder="Digite seu CPF"
            onChangeText={setCpf}
          />
        </View>

        <View style={styles.inputGroup}>
          <LockKey
            color={password !== isPassword ? "#d46b71" : "#fff"}
            size={32}
            weight="duotone"
          />
          <TextInput
            placeholderTextColor="#fff"
            style={styles.input}
            placeholder="Digite uma password"
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputGroup}>
          <LockKey
            color={password !== isPassword ? "#d46b71" : "#fff"}
            size={32}
            weight="duotone"
          />
          <TextInput
            placeholderTextColor="#fff"
            style={styles.input}
            placeholder="Confirme a password"
            onChangeText={setIsPassword}
          />
        </View>
        <TouchableOpacity
          onPress={handleCreateUser}
          style={styles.buttonSignIn}
        >
          <Text style={styles.buttonSignInText}>Criar conta</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigate("SignIn")}
        style={styles.signMessage}
      >
        <Text style={styles.signMessageText}>Já possui uma conta?</Text>
        <Text style={styles.signMessageTextBold}>Faça Login</Text>
      </TouchableOpacity>
    </View>
  );
}
