import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import LogoImg from "../../assets/ofairta.png";

export const OrderItem = ({ order, onPress }) => {
  const moeda = order.total_value;
  var formatoMoeda = moeda.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const dataString = order.createdAt;
  const data = new Date(dataString);

  const nomesDosMeses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const dia = data.getDate();
  const mes = nomesDosMeses[data.getMonth()];
  const ano = data.getFullYear();
  const dataFormatada = `${dia} de ${mes} de ${ano}`;

  return (
    <Pressable
      onPress={onPress}
      key={order.id}
      style={[
        styles.requestCard,
        order.status === "OPEN"
          ? {
              backgroundColor: "#FFF1DC",
              borderColor: "#d46b71",
              borderLeftColor: "#d46b71",
              borderLeftWidth: 10,
            }
          : {
              backgroundColor: "#fff",
              borderLeftWidth: 10,
            },
      ]}
    >
      <View
        style={{
          height: 30,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomWidth: 0.5,
          paddingHorizontal: 15,
        }}
      >
        <Text
          style={{
            fontWeight: "900",
            fontSize: 13,
            color: "#343F4B",
          }}
        >
          Pedido em:
        </Text>
        <Text
          style={{
            fontWeight: "900",
            fontSize: 13,
            color: "#343F4B",
          }}
        >
          {dataFormatada}
        </Text>
      </View>
      <View style={styles.requestContent}>
        <Image style={styles.requestImage} source={LogoImg} />
        <View
          style={{
            paddingLeft: 10,
          }}
        >
          <Text style={styles.requestTitle}>Pedido do {order.buyer.name}</Text>
          <Text style={styles.requestAbout}>
            {order.status === "OPEN" ? "AGUARDANDO APROVAÇÃO" : "FINALIZADO"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 10,
    position: "relative",
  },
  loading: {
    alignContent: "center",
    marginTop: 50,
  },
  requestCard: {
    // padding: 10,
    margin: 10,
    elevation: 5,
    borderRadius: 6,
    flexDirection: "column",
    alignItems: "stretch",
    borderWidth: 1,
    borderColor: "#019972",
  },
  requestImage: {
    height: 70,
    width: 70,
    borderRadius: 6,
  },
  requestContent: {
    margin: 10,
    // marginTop: ,
    flexDirection: "row",
  },
  requestTitle: {
    fontWeight: "600",
    fontSize: 14,
    color: "#343F4B",
  },
  requestAbout: {
    fontWeight: "500",
    fontSize: 14,
    color: "#343F4B",
  },
});
