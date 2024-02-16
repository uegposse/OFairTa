import React from "react";
import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { HeaderReturn } from "../../components/HeaderReturn";

export function ProducerHistory() {
  return (
    <View>
      <HeaderReturn title="Historia do Produtor" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: "#3eb091",
            width: "100%",
            height: 250,
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Image
            style={{
              borderRadius: 90,
              width: 150,
              height: 150,
              borderWidth: 1,
              borderColor: "#FFF",
              top: -10,
            }}
            source={{
              uri: "https://github.com/Rodrigo322.png",
            }}
          />
          <Text
            style={{
              color: "#FFF",
              fontWeight: "700",
              fontSize: 18,
              top: -10,
            }}
          >
            Rodrigo Lucas
          </Text>
        </View>

        <View
          style={{
            width: "90%",
            backgroundColor: "#DFEDE9",
            alignSelf: "center",
            top: -25,
            borderRadius: 16,
            elevation: 5,
            padding: 10,
            alignItems: "center",
            gap: 5,
            marginBottom: 150,
          }}
        >
          <Text
            style={{
              color: "#019972",
              fontWeight: "500",
              fontSize: 18,
            }}
          >
            Historia do produtor
          </Text>

          <Text
            style={{
              color: "#111",
              fontWeight: "500",
              fontSize: 16,
              padding: 20,
              lineHeight: 25,
              textAlign: "justify",
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
