import { MagnifyingGlass, Microphone } from "phosphor-react-native";
import { Image, TextInput, View } from "react-native";

import LogoImg from "../../assets/ofairta.png";
import { styles } from "./styles";

export function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.headerInputGroup}>
        <View style={styles.headerInputGroupIcons}>
          <MagnifyingGlass size={20} weight="bold" color="#019972" />
          <TextInput
            style={styles.headerInput}
            placeholder="Procure aqui por produtos"
          />
          <Microphone size={20} weight="bold" color="#019972" />
        </View>
      </View>
      <Image source={LogoImg} style={styles.headerImg} />
    </View>
  );
}
