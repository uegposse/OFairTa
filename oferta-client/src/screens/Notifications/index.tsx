import { Image, StyleSheet, Text, View } from "react-native";
import { HeaderReturn } from "../../components/HeaderReturn";

import Fazenda from "../../assets/Fazenda_renascer.png";

export function Notifications() {
  return (
    <View>
      <HeaderReturn title="Notificações" />
      <View style={styles.notificationContainer}>
        <View style={styles.notificationCard}>
          <Image source={Fazenda} style={styles.notificationImage} />
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>Fazenda Renascer</Text>
            <Text style={styles.notificationAbout}>
              Aqui você encontra tomates de apenas R$ 4.99 kg.
            </Text>
          </View>
        </View>
        <View style={styles.notificationCard}>
          <Image source={Fazenda} style={styles.notificationImage} />
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>Fazenda Renascer</Text>
            <Text style={styles.notificationAbout}>
              Aqui você encontra tomates de apenas R$ 4.99 kg.
            </Text>
          </View>
        </View>
        <View style={styles.notificationCard}>
          <Image source={Fazenda} style={styles.notificationImage} />
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>Fazenda Renascer</Text>
            <Text style={styles.notificationAbout}>
              Aqui você encontra tomates de apenas R$ 4.99 kg.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  notificationContainer: {
    paddingTop: 40,
  },
  notificationCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: "#DFEDE9",
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  notificationImage: {
    height: 80,
    width: 80,
  },
  notificationContent: {
    height: 100,
    marginLeft: 10,
    paddingVertical: 20,
    flex: 1,
  },
  notificationTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#343F4B",
  },
  notificationAbout: {
    fontSize: 12,
    color: "#343F4B",
  },
});
