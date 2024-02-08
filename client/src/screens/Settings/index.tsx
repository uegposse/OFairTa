import { useNavigation } from "@react-navigation/native";
import {
  Article,
  CaretRight,
  Door,
  IdentificationBadge,
  LockKey,
  MapPin,
  Question,
  SignOut,
  XSquare,
} from "phosphor-react-native";
import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { HeaderReturn } from "../../components/HeaderReturn";
import { useAuth } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";
import { useTabContext } from "../../contexts/TabContext";
import { styles } from "./styles";

export function Settings() {
  const { logout } = useAuth();
  const { setShowTab, setIdBank } = useTabContext();
  const { removeAllFromCart } = useContext(CartContext);
  const { navigate } = useNavigation();

  function handleSignOut() {
    logout();
    setShowTab(false);
    setIdBank("");
    removeAllFromCart();
  }

  return (
    <View style={styles.container}>
      <HeaderReturn title="Configurações" />
      <Text style={styles.settingUserName}>Olá, Rodrigo Lucas!</Text>
      <View style={styles.settingsContainerOptions}>
        <Text style={styles.settingOptionTitle}>Minha Conta</Text>

        <TouchableOpacity
          style={[
            styles.settingContainerOptionsGroup,
            styles.settingContainerOptionsGroupFirst,
          ]}
          onPress={() => navigate("AddressProfile")}
        >
          <View style={styles.settingContainerOptionsIcon}>
            <MapPin color="#019972" size={32} weight="thin" />
            <Text style={styles.settingOptionsText}>Endereço de entrega</Text>
          </View>
          <CaretRight color="#019972" size={32} weight="thin" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("Profile")}
          style={styles.settingContainerOptionsGroup}
        >
          <View style={styles.settingContainerOptionsIcon}>
            <IdentificationBadge color="#019972" size={32} weight="thin" />
            <Text style={styles.settingOptionsText}>Dados pessoais</Text>
          </View>
          <CaretRight color="#019972" size={32} weight="thin" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("ResetPassword")}
          style={styles.settingContainerOptionsGroup}
        >
          <View style={styles.settingContainerOptionsIcon}>
            <LockKey color="#019972" size={32} weight="thin" />
            <Text style={styles.settingOptionsText}>Alterar senha</Text>
          </View>
          <CaretRight color="#019972" size={32} weight="thin" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("DeactivateAccount")}
          style={styles.settingContainerOptionsGroup}
        >
          <View style={styles.settingContainerOptionsIcon}>
            <XSquare color="#019972" size={32} weight="thin" />
            <Text style={styles.settingOptionsText}>Desativar conta</Text>
          </View>
          <CaretRight color="#019972" size={32} weight="thin" />
        </TouchableOpacity>
      </View>
      <Text
        style={[styles.settingOptionTitle, styles.settingOptionTitleSecond]}
      >
        Geral
      </Text>
      <TouchableOpacity
        style={[
          styles.settingContainerOptionsGroup,
          styles.settingContainerOptionsGroupFirst,
        ]}
      >
        <View style={styles.settingContainerOptionsIcon}>
          <Article color="#019972" size={32} weight="thin" />
          <Text style={styles.settingOptionsText}>Sobre o OFairTa</Text>
        </View>
        <CaretRight color="#019972" size={32} weight="thin" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingContainerOptionsGroup}>
        <View style={styles.settingContainerOptionsIcon}>
          <Question color="#019972" size={32} weight="thin" />
          <Text style={styles.settingOptionsText}>Preciso de ajuda?</Text>
        </View>
        <CaretRight color="#019972" size={32} weight="thin" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.settingContainerOptionsGroup}
      >
        <View style={styles.settingContainerOptionsIcon}>
          <Door color="#d46b71" size={32} weight="thin" />
          <Text
            style={[styles.settingOptionsText, styles.settingOptionsTextEnd]}
          >
            Sair
          </Text>
        </View>
        <SignOut color="#d46b71" size={32} weight="thin" />
      </TouchableOpacity>
    </View>
  );
}
