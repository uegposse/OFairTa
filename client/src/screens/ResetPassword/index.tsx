import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { HeaderReturn } from "../../components/HeaderReturn";
import { styles } from "./styles";

export function ResetPassword() {
  const [isUpdated, setIsUpdated] = useState(false);
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
