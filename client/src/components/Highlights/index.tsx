import { Image, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";

export function Highlights() {
  return (
    <>
      <Text style={styles.textHighlights}>Destaques</Text>
      <View style={{ height: 130, marginTop: 10 }}>
        <ScrollView
          snapToAlignment={"start"}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          decelerationRate="fast"
        >
          <View style={{ height: 120, paddingLeft: 15 }}>
            <View style={{ flex: 2 }}>
              <Image
                source={require("../../assets/slider1.jpeg")}
                style={styles.image}
              />
            </View>
          </View>
          <View style={{ height: 120, paddingHorizontal: 5 }}>
            <View style={{ flex: 2 }}>
              <Image
                source={require("../../assets/slider2.jpeg")}
                style={styles.image}
              />
            </View>
          </View>
          <View
            style={{
              height: 120,
              paddingHorizontal: 5,
              paddingRight: 15,
            }}
          >
            <View style={{ flex: 2 }}>
              <Image
                source={require("../../assets/slider3.jpeg")}
                style={styles.image}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
