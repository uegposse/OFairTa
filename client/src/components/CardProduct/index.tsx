import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

export interface CardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export function Card({ id, name, price, image }: CardProps) {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigate("DetailsProduct", { id })}
    >
      <View style={styles.cardImageView}>
        <Image style={styles.cardImage} source={{ uri: image }} />
      </View>
      <Text style={styles.cardTitleText}>{name}</Text>
      <View style={styles.cardInfoContainer}>
        <Text style={styles.cardInfoText}>R$ {price}Kg</Text>
        {/* <PlusCircle color="#343F4B" size={30} weight="fill" /> */}
      </View>
    </TouchableOpacity>
  );
}
