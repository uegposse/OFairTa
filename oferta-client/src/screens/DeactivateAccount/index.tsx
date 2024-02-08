import { XCircle } from "phosphor-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HeaderReturn } from "../../components/HeaderReturn";

export function DeactivateAccount() {
  return (
    <View>
      <HeaderReturn title="Desativar minha conta" />

      <View style={styles.container}>
        <View style={styles.logoWhatsapp}>
          <XCircle color="#d46b71" size={200} weight="duotone" />
        </View>
        <Text style={styles.title}>
          Tem certeza que deseja desativar sua conta?
        </Text>
        <Text style={styles.text}>
          Lamentamos muito que você tenha que optar por excluir sua conta. Além
          disso, vale ressaltar que após a início do processso de exclusão, você
          não poderá reativar ou recuperar qualquer dado sobre a sua conta.
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerText}>Desativar Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    padding: 40,
  },
  logoWhatsapp: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#019972",
    paddingBottom: 15,
    paddingTop: 20,
  },
  text: {
    fontWeight: "300",
    fontSize: 18,
    color: "#019972",
    paddingBottom: 15,
  },
  footer: {
    paddingHorizontal: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  footerButton: {
    backgroundColor: "#019972",
    height: 60,
    width: "100%",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 18,
  },
});
