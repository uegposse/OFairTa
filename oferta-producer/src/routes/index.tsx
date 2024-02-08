import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import { AppRoutes } from "./app.routes";
import { TabRoutes } from "./tab.routes";

export function Routes() {
  const { token } = useAuth();
  return (
    <NavigationContainer>
      {token ? <TabRoutes /> : <AppRoutes />}
    </NavigationContainer>
  );
}
