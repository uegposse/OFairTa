import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  BackHandler,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { HeaderReturn } from "../../components/HeaderReturn";
import { styles } from "./styles";

export function ResetPassword() {
  const [isUpdated, setIsUpdated] = useState(false);
  const { navigate } = useNavigation();

  function handleBackPress() {
    navigate("Settings");
    return true;
  }

  useEffect(() => {
    const backButtonHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
    return () => backButtonHandler.remove();
  }, []);

  return (
    <View>
      <HeaderReturn title="Alterar senha" />
      <View style={styles.header}>
        <View />
        <TouchableOpacity onPress={() => setIsUpdated(!isUpdated)}>
          <Text style={styles.headerButtonText}>Alterar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.textGroup}>
          <Text style={styles.text}>Senha antiga</Text>
          <TextInput
            editable={isUpdated}
            style={styles.input}
            value="*************"
          />
        </View>

        <View style={styles.textGroup}>
          <Text style={styles.text}>Nova senha</Text>
          <TextInput
            editable={isUpdated}
            style={styles.input}
            value="*************"
          />
        </View>

        <View style={styles.textGroup}>
          <Text style={styles.text}>Confirme a nova senha</Text>
          <TextInput
            editable={isUpdated}
            style={styles.input}
            value="*************"
          />
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity disabled={!isUpdated} style={styles.button}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
