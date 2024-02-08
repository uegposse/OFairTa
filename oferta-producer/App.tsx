import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "./src/contexts/AuthContext";
import { TabProvider } from "./src/contexts/TabContext";
import { Routes } from "./src/routes";

export default function App() {
  return (
    <>
      <AuthProvider>
        <TabProvider>
          <Routes />
          <StatusBar style="light" backgroundColor="#005047" />
        </TabProvider>
      </AuthProvider>
    </>
  );
}
