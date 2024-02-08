import { CaretRight } from "phosphor-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../screens/settings/styles";
import React from "react";

export function SettingOption({ title, onPress, icon, textColor = "#019972" }) {
  return (
    <TouchableOpacity
      style={[
        styles.settingContainerOptionsGroup,
        title === "Sair" && {
          backgroundColor: "#d46b71",
          borderColor: "transparent",
        },
        title === "Alterar banca" && {
          backgroundColor: "#075E55",
          borderColor: "transparent",
        },
      ]}
      onPress={onPress}
    >
      <View style={styles.settingContainerOptionsIcon}>
        {React.cloneElement(icon, {
          color: textColor,
          size: 32,
          weight: "thin",
        })}
        <Text
          style={[
            styles.settingOptionsText,
            title === "Sair" && { color: "#FFF" },
            title === "Alterar banca" && { color: "#FFF" },
          ]}
        >
          {title}
        </Text>
      </View>
      <CaretRight color={textColor} size={32} weight="thin" />
    </TouchableOpacity>
  );
}
