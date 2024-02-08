import { MapPin } from "phosphor-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { HeaderReturn } from "../../components/HeaderReturn";
import { styles } from "./styles";

export function AddressProfile() {
  return (
    <View>
      <HeaderReturn title="Meu endereço" />
      <View style={styles.header}>
        <View />
        <TouchableOpacity>
          <Text style={styles.headerButtonText}>Alterar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cartAddress}>
        <MapPin color="#019972" size={32} weight="thin" />
        <View style={styles.cartAddressContent}>
          <Text style={styles.cartAddressContentText}>Posse, Goiás</Text>
          <Text style={styles.cartAddressContentText}>
            Rua Santa Lucia, Quadra 06, Lote 17. Santa Luzia.
          </Text>
        </View>
      </View>
    </View>
  );
}
