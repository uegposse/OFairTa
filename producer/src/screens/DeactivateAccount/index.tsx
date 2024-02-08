import { useNavigation } from "@react-navigation/native";
import { XCircle } from "phosphor-react-native";
import { useEffect, useState } from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HeaderReturn } from "../../components/HeaderReturn";
import { ModalApp } from "../../components/Modal";

export function DeactivateAccount() {
  const { navigate } = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.footerButton}
        >
          <Text style={styles.footerText}>Desativar Conta</Text>
        </TouchableOpacity>
      </View>

      <ModalApp
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Confirma o desativamento da conta?"
        backgroundColor="#DFEDE9"
      >
        <View
          style={{
            height: 200,
            alignItems: "center",
            justifyContent: "center",
            gap: 25,
          }}
        >
          <TouchableOpacity
            style={{
              width: "40%",
              height: 45,
              backgroundColor: "#d46b71",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
              elevation: 5,
            }}
          >
            <Text style={{ color: "#FFF" }}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "40%",
              height: 45,
              backgroundColor: "#019972",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
              elevation: 5,
            }}
          >
            <Text style={{ color: "#FFF" }}>Não</Text>
          </TouchableOpacity>
        </View>
      </ModalApp>
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
    elevation: 5,
  },
  footerText: {
    color: "#fff",
    fontSize: 18,
  },
});
