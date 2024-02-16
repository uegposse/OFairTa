import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { HeaderReturn } from "../../components/HeaderReturn";
import { api } from "../../services/api";

interface RouteParams {
  id: string;
}

interface DetailsSalesResponse {
  id: string;
  total_value: number;
  saleProducts: Array<{
    product: {
      id: string;
      image: string;
      name: string;
      price: number;
    };
    quantity: number;
  }>;
}

export function DetailsSales() {
  const [detailsSale, setDetailsSale] = useState<DetailsSalesResponse>(
    {} as DetailsSalesResponse
  );
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { id } = route.params as RouteParams;

  useEffect(() => {
    setLoading(true);
    api.get(`get-details-sale-by-user/${id}`).then((response) => {
      console.log(JSON.stringify(response.data, null, 2));
      setDetailsSale(response.data);
      setLoading(false);
    });
  }, [id]);

  return (
    <View>
      <HeaderReturn title="Detalhes da compra" />

      {loading && (
        <ActivityIndicator
          style={{ paddingTop: 50 }}
          size={50}
          color="#019972"
        />
      )}

      {!loading && (
        <>
          {detailsSale && (
            <>
              <View style={styles.saleHeader}>
                <Text
                  style={[styles.saleHeaderText, styles.saleHeaderTextFirst]}
                >
                  {detailsSale.saleProducts?.length} Itens
                </Text>
                <View style={[styles.saleHeaderValueTotal]}>
                  <Text style={styles.saleHeaderText}>Valor total:</Text>
                  <Text style={styles.saleHeaderText}>
                    R$ {detailsSale.total_value?.toFixed(2)}
                  </Text>
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
                    <View
                      key={saleProduct.product.id}
                      style={styles.saleProduct}
                    >
                      <Image
                        style={styles.saleProductImage}
                        source={{ uri: saleProduct.product.image }}
                      />
                      <View style={styles.saleProductTextInfo}>
                        <Text style={styles.saleProductText}>
                          {saleProduct.product.name}
                        </Text>
                        <Text style={styles.saleProductText}>
                          R$ {saleProduct.product.price * saleProduct.quantity}
                        </Text>
                      </View>

                      <View style={styles.saleProductButtons}>
                        <Text style={styles.saleProductButtonsText}>
                          Quantidade {saleProduct.quantity}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </>
          )}
        </>
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
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
    borderRadius: 16,
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
});
