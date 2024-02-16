import { fetch } from "@react-native-community/netinfo";

export const checkInternetConnection = async (): Promise<boolean> => {
  const netInfo = await fetch();
  return netInfo.isConnected;
};
