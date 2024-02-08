import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HeaderReturn } from "../../components/HeaderReturn";
import { api } from "../../services/api";
import { SaleProductItem } from "../../components/SaleProductItem";

interface RouteParams {
  id: string;
}

interface SaleProduct {
  product: {
    id: string;
    image: string;
    name: string;
    price: number;
  };
  quantity: number;
}

interface DetailsSalesResponse {
  id: string;
  total_value: number;
  saleProducts: SaleProduct[];
  status: string;
}

export function DetailsOrders() {
  const [detailsSale, setDetailsSale] = useState<DetailsSalesResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { id } = route.params as RouteParams;
  const { goBack } = useNavigation();

  useEffect(() => {
    async function fetchDetailsSale() {
      try {
        setLoading(true);
        const response = await api.get(`get-details-sale-by-user/${id}`);
        setDetailsSale(response.data);
      } catch (error) {
        console.error("Error fetching details sale:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDetailsSale();
  }, [id]);

  async function updateDetailsOrder() {
    setLoading(true);
    try {
      await api.put(`/update-closed-sale-by-owner/${id}`, {
        status: "CLOSED",
      });
      Alert.alert("Pedido aprovado!");
      goBack();
    } catch (error) {
      console.error("Error updating details order:", error);
      setLoading(false);
    }
  }
  let total_value = 0;
  if (detailsSale?.total_value != null) {
    total_value = detailsSale.total_value;
  }

  var formatoMoeda = total_value?.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <View>
      <HeaderReturn title="Detalhes da compra" />

      {loading ? (
        <ActivityIndicator
          style={{ paddingTop: 50 }}
          size={50}
          color="#019972"
        />
      ) : (
        detailsSale && (
          <>
            <View style={styles.saleHeader}>
              <Text style={[styles.saleHeaderText, styles.saleHeaderTextFirst]}>
                {detailsSale.saleProducts?.length} Itens
              </Text>
              <View style={styles.saleHeaderValueTotal}>
                <Text style={styles.saleHeaderText}>Valor total:</Text>
                <Text style={styles.saleHeaderText}>{formatoMoeda}</Text>
              </View>
            </View>

            <Text
              style={{
                color: "#019972",
                fontSize: 18,
                paddingHorizontal: 20,
                paddingVertical: 20,
                lineHeight: 20,
              }}
            >
              Aqui estão todos os produtos comprados
            </Text>
            <ScrollView>
              <View style={styles.scrollProducts}>
                {detailsSale.saleProducts?.map((saleProduct) => (
                  <SaleProductItem
                    key={saleProduct.product.id}
                    saleProduct={saleProduct}
                  />
                ))}
                <View style={{ alignItems: "center", width: "100%", gap: 20 }}>
                  <TouchableOpacity
                    disabled={detailsSale.status === "OPEN"}
                    style={styles.button}
                    onPress={updateDetailsOrder}
                  >
                    <Text style={styles.labelButton}>
                      {detailsSale.status === "OPEN"
                        ? "Aprovar Pedido"
                        : "Pedido Aprovado"}
                    </Text>
                  </TouchableOpacity>

                  {detailsSale.status === "CLOSED" && (
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: "#FFF159" }]}
                    >
                      <Text style={[styles.labelButton, { color: "#075E55" }]}>
                        Notificar cliente
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </ScrollView>
          </>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  saleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
    backgroundColor: "#3eb091",
  },
  saleHeaderText: {
    color: "#fff",
    fontWeight: "600",
  },
  saleHeaderTextFirst: {
    paddingHorizontal: 20,
  },
  saleHeaderValueTotal: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 15,
  },
  scrollProducts: {
    paddingTop: 20,
    alignItems: "center",
    paddingBottom: 400,
  },
  saleProduct: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#019972",
    marginBottom: 10,
    backgroundColor: "#DFEDE9",
    width: "90%",
    elevation: 5,
    borderRadius: 6,
    borderLeftWidth: 10,
  },
  saleProductImage: {
    width: 50,
    height: 50,
  },
  saleProductTextInfo: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  saleProductText: {
    color: "#019972",
  },
  saleProductButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  saleProductButtonsText: {
    padding: 10,
    color: "#019972",
  },
  labelButton: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  button: {
    width: "90%",
    height: 60,
    backgroundColor: "#075E55",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
});
