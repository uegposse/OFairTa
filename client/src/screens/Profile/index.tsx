import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { HeaderReturn } from "../../components/HeaderReturn";
import { api } from "../../services/api";
import { styles } from "./styles";

interface UserResponse {
  name: string;
  email: string;
  cpf: string;
}

export function Profile() {
  const [isUpdated, setIsUpdated] = useState(false);
  const [user, setUser] = useState<UserResponse>({} as UserResponse);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [cpf, setCpf] = useState(user.cpf);

  function handleGetUser() {
    api.get<UserResponse>("/unique-user").then((response) => {
      setUser(response.data);
    });
  }

  useEffect(() => {
    handleGetUser();
  }, []);

  function handleUpdateUser() {
    api
      .post("/update/user", {
        name,
        email,
        cpf,
      })
      .then((response) => {
        console.log(response.data);
        setIsUpdated(false);
        handleGetUser();
      });
  }

  return (
    <View>
      <HeaderReturn title="Dados Pessoais" />
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
              value={isUpdated ? email : user.email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.textGroup}>
            <Text style={styles.text}>Nome</Text>
            <TextInput
              editable={isUpdated}
              style={styles.input}
              value={isUpdated ? name : user.name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.textGroup}>
            <Text style={styles.text}>CPF</Text>
            <TextInput
              editable={isUpdated}
              style={styles.input}
              value={isUpdated ? cpf : user.cpf}
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
    </View>
  );
}
