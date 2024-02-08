import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DFEDE9",
  },
  settingsContainerOptions: {
    marginTop: 10,
  },
  settingOptionTitle: {
    fontWeight: "bold",
    paddingHorizontal: 15,
    fontSize: 18,
    color: "#019972",
    paddingBottom: 15,
  },
  settingOptionTitleSecond: {
    paddingTop: 20,
  },
  settingContainerOptionsGroupFirst: {
    borderTopWidth: 1,
  },
  settingContainerOptionsGroup: {
    borderColor: "#019972",
    borderWidth: 1,
    borderRadius: 6,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    width: "95%",
  },
  settingContainerOptionsIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingOptionsText: {
    color: "#019972",
    paddingLeft: 15,
    fontSize: 17,
  },
  settingOptionsTextEnd: {
    color: "#d46b71",
  },

  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    width: "40%",
    height: 45,
    backgroundColor: "#d46b71",
    borderRadius: 16,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
