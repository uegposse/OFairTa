import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";
import { PlusCircle } from "phosphor-react-native";

export interface CardProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export function Card({ id, name, price, image }: CardProps) {
  const { navigate } = useNavigation();

  // Função para converter o preço para moeda real (BRL)
  const formatPrice = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

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
        <Text style={styles.cardInfoText}>{formatPrice(price)} / Kg</Text>
        {/* <PlusCircle color="#343F4B" size={30} weight="fill" /> */}
      </View>
    </TouchableOpacity>
  );
}
