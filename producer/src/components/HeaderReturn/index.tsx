import { Image, Text, View } from "react-native";

import LogoImg from "../../assets/ofairta.png";
import { styles } from "./styles";

interface HeaderReturnProps {
  title: string;
}

export function HeaderReturn(props: HeaderReturnProps) {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.headerText}>{props.title}</Text>
      </View>
      <Image source={LogoImg} style={styles.headerImg} />
    </View>
  );
}
