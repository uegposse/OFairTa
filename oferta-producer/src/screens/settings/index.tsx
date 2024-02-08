import { useNavigation } from "@react-navigation/native";
import {
  AddressBook,
  Article,
  CaretRight,
  Database,
  Door,
  Envelope,
  EnvelopeOpen,
  HouseSimple,
  IdentificationBadge,
  LockKey,
  MapPin,
  Phone,
  Question,
  SignOut,
  WhatsappLogo,
  XSquare,
} from "phosphor-react-native";
import React, { useState } from "react";
import { TouchableOpacity, ScrollView, View, Text } from "react-native";

import { HeaderReturn } from "../../components/HeaderReturn";
import { ModalApp } from "../../components/Modal";
import { useAuth } from "../../contexts/AuthContext";
import { styles } from "./styles";
import { useTabContext } from "../../contexts/TabContext";
import { SettingOption } from "../../components/SettingOption";

export function Settings() {
  const { logout, userName } = useAuth();
  const { navigate } = useNavigation();
  const { setIdBank, setShowTab } = useTabContext();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalHelpVisible, setIsModalHelpVisible] = useState(false);
  const [isModalSignOutVisible, setIsModalSignOutVisible] = useState(false);

  function handleSignOut() {
    setIdBank(""), setShowTab(false), logout();
  }

  return (
    <View style={styles.container}>
      <HeaderReturn title="Configurações" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: "90%", marginBottom: 200 }}
      >
        <View style={styles.settingsContainerOptions}>
          <Text style={styles.settingOptionTitle}>Minha Conta</Text>
          <View style={{ alignItems: "center", gap: 10 }}>
            <SettingOption
              title="Meus Endereços"
              onPress={() => navigate("AddressProfile")}
              icon={<MapPin />}
            />
            <SettingOption
              title="Dados pessoais"
              onPress={() => navigate("Profile")}
              icon={<IdentificationBadge />}
            />
            <SettingOption
              title="Alterar senha"
              onPress={() => navigate("ResetPassword")}
              icon={<LockKey />}
            />
            <SettingOption
              title="Desativar conta"
              onPress={() => navigate("DeactivateAccount")}
              icon={<XSquare />}
            />
            <SettingOption
              title="Minha Historia"
              onPress={() => navigate("MyHistory")}
              icon={<AddressBook />}
            />
          </View>
        </View>
        <Text
          style={[styles.settingOptionTitle, styles.settingOptionTitleSecond]}
        >
          Geral
        </Text>
        <View style={{ alignItems: "center", gap: 10, paddingBottom: 200 }}>
          <SettingOption
            title="Alterar banca"
            onPress={() => {
              setIdBank("");
              setShowTab(false);
            }}
            icon={<Database />}
            textColor="#fff"
          />
          <SettingOption
            title="Sobre o OFairTa"
            onPress={() => setIsModalVisible(true)}
            icon={<Article />}
          />
          <SettingOption
            title="Preciso de ajuda?"
            onPress={() => setIsModalHelpVisible(!isModalHelpVisible)}
            icon={<Question />}
          />
          <SettingOption
            title="Sair"
            onPress={() => setIsModalSignOutVisible(!isModalSignOutVisible)}
            icon={<Door />}
            textColor="#fff"
          />
        </View>
      </ScrollView>

      <ModalApp
        title="Sobre o OFairTa"
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        backgroundColor="#DFEDE9"
      >
        <View
          style={{
            width: "100%",
            height: 400,
            padding: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#019972",
              fontWeight: "600",
              lineHeight: 28,
              textAlign: "justify",
              padding: 5,
            }}
          >
            O "OFairTa" tem por objetivo proporcionar facilidade na compra e
            venda de produtos oriundos dos pequenos produtores rurais da
            microrregião do Vão do Paranã. O aplicativo será disponibilizado na
            loja virtual de aplicativos Google Play Store de forma gratuita e
            será alimentado com dados de pequenos produtores da região alvo
            através de um banco de dados gerado pelo cadastro de produtores e
            produtos ofertados no próprio aplicativo.
          </Text>
        </View>
      </ModalApp>

      <ModalApp
        title="Entre em um dos nossos canais"
        isVisible={isModalHelpVisible}
        onClose={() => setIsModalHelpVisible(!isModalHelpVisible)}
        backgroundColor="#DFEDE9"
      >
        <View
          style={{
            gap: 15,
            padding: 20,
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: 80,
              backgroundColor: "#fff",
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: 25,
              gap: 10,
              borderRadius: 16,
              elevation: 3,
            }}
          >
            <WhatsappLogo color="#019972" size={50} weight="duotone" />
            <Text
              style={{
                color: "#019972",
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              Whatsapp
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: "100%",
              height: 80,
              backgroundColor: "#fff",
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: 25,
              gap: 10,
              borderRadius: 16,
              elevation: 3,
            }}
          >
            <Envelope color="#019972" size={50} weight="duotone" />
            <Text
              style={{
                color: "#019972",
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              E-mail
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: "100%",
              height: 80,
              backgroundColor: "#fff",
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: 25,
              gap: 10,
              borderRadius: 16,
              elevation: 3,
            }}
          >
            <Phone color="#019972" size={50} weight="duotone" />
            <Text
              style={{
                color: "#019972",
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              Telefone
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: "100%",
              height: 80,
              backgroundColor: "#fff",
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: 25,
              gap: 10,
              borderRadius: 16,
              elevation: 3,
            }}
          >
            <EnvelopeOpen color="#019972" size={50} weight="duotone" />
            <Text
              style={{
                color: "#019972",
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              Envie uma sugestão
            </Text>
          </TouchableOpacity>
        </View>
      </ModalApp>

      <ModalApp
        isVisible={isModalSignOutVisible}
        onClose={() => setIsModalSignOutVisible(false)}
        title="Deseja realmente sair?"
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
            onPress={handleSignOut}
            style={{
              width: "40%",
              height: 45,
              backgroundColor: "#d46b71",
              borderRadius: 6,
              elevation: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#FFF" }}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsModalSignOutVisible(!isModalSignOutVisible)}
            style={{
              width: "40%",
              height: 45,
              backgroundColor: "#019972",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 6,
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
