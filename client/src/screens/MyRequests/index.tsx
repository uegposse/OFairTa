import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { HeaderReturn } from "../../components/HeaderReturn";
import { api } from "../../services/api";

import { useNavigation } from "@react-navigation/native";
import LogoImg from "../../assets/ofairta.png";
import { styles } from "./styles";

interface RequestResponseProps {
  id: string;
  total_value: number;
  seller: {
    name: string;
  };
}

export function MyRequests() {
  const [request, setRequest] = useState<RequestResponseProps[]>([]);
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();

  useEffect(() => {
    setLoading(true);
    api
      .get<RequestResponseProps[]>("/get-all-sale-by-user")
      .then((response) => {
        setRequest(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Ops!", "Algo deu errado!");
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <View>
      <HeaderReturn title="Meus Pedidos" />
      {loading && (
        <ActivityIndicator style={styles.loading} size={50} color="#019972" />
      )}

      {!loading && (
        <ScrollView>
          {request.map((req) => (
            <Pressable
              onPress={() => navigate("DetailsSales", { id: req.id })}
              key={req.id}
              style={styles.RequestCard}
            >
              <Image source={LogoImg} style={styles.RequestImage} />
              <View style={styles.RequestContent}>
                <Text style={styles.RequestTitle}>
                  Compra com {req.seller.name}
                </Text>
              </View>
              <Text style={styles.RequestAbout}>
                R$ {req.total_value.toFixed(2)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
