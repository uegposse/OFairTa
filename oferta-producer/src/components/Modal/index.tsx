import { X } from "phosphor-react-native";
import { Modal, Pressable, Text, View } from "react-native";
import { styles } from "./styles";

export function ModalApp({
  isVisible,
  title,
  children,
  onClose,
  backgroundColor,
}) {
  return (
    <Modal
      animationType="slide"
      transparent
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.2)",
      }}
      visible={isVisible}
    >
      <View
        style={[
          styles.modalContent,
          {
            backgroundColor: backgroundColor,
          },
        ]}
      >
        <View style={[styles.titleContainer]}>
          <Text style={styles.title}>{title}</Text>
          <Pressable onPress={onClose}>
            <X size={25} weight="bold" color="#fFF" />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
}
