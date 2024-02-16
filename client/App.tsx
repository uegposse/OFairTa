import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "./src/contexts/AuthContext";
import { CartProvider } from "./src/contexts/CartContext";
import { TabProvider } from "./src/contexts/TabContext";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#3eb091" style="light" translucent />
      <AuthProvider>
        <CartProvider>
          <TabProvider>
            <Routes />
          </TabProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}
