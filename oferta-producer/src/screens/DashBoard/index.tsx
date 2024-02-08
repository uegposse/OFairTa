import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import { HeaderReturn } from "../../components/HeaderReturn";
import { useAuth } from "../../contexts/AuthContext";

const data = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      data: [2.0, 4.5, 2.8, 8.0, 9.9],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: "#075E55",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#075E55",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

export const Dashboard: React.FC = () => {
  const { userName } = useAuth();
  return (
    <View style={styles.container}>
      <HeaderReturn title={`Olá, ${userName}`} />

      <View
        style={{
          padding: 10,
        }}
      >
        <Text
          style={{
            paddingTop: 15,
            fontWeight: "bold",
            fontSize: 18,
            color: "#075E55",
          }}
        >
          Total em vendas por mês
        </Text>
        <BarChart
          data={data}
          width={Dimensions.get("window").width - 20} // from react-native
          height={220}
          yAxisLabel="R$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#075E55",
            backgroundGradientFrom: "#075E55",
            backgroundGradientTo: "#075E55",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          style={{
            marginVertical: 8,
            borderRadius: 6,
          }}
        />
      </View>

      <View
        style={{
          padding: 10,
        }}
      >
        <Text
          style={{
            paddingTop: 5,
            fontWeight: "bold",
            fontSize: 18,
            color: "#075E55",
          }}
        >
          Total em vendas desta semana
        </Text>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43],
                strokeWidth: 2,
              },
            ],
          }}
          width={Dimensions.get("window").width - 16}
          height={220}
          chartConfig={{
            backgroundColor: "#075E55",
            backgroundGradientFrom: "#075E55",
            backgroundGradientTo: "#075E55",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DFEDE9",
  },
});
