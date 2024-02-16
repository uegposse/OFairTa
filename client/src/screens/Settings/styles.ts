import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {},
  settingUserName: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 15,
    fontSize: 18,
    color: "#019972",
  },
  settingsContainerOptions: {},
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
    borderRadius: 16,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#DFEDE9",
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
});
