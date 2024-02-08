import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { api } from "../services/api";
import { checkInternetConnection } from "../utils/netInfo";
import { useTabContext } from "./TabContext";

interface Token {
  token?: string | null;
}

interface AuthContextType {
  token: Token | null;
  userName: string;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  userName: undefined,
  loading: false,
  login: async () => {},
  logout: () => {},
});

function isTokenValid(token: string | null): boolean {
  if (token == null) {
    return false;
  }

  const decodedToken = jwtDecode<JwtPayload>(token);
  const currentTime = Date.now() / 1000;

  if (decodedToken && decodedToken.exp) {
    return decodedToken.exp > currentTime;
  }

  return false;
}

async function fetchUserData(token: string) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const user = await api.get("/unique-user");
  return user.data.name;
}

export function AuthProvider({ children }: any) {
  const [token, setToken] = useState<Token | null>(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const { setIdBank, setShowTab } = useTabContext();

  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    const isConnected = await checkInternetConnection();
    if (!isConnected) {
      return;
    }
    const storageToken = await AsyncStorage.getItem("@storage:token");

    if (isTokenValid(storageToken)) {
      setToken({ token: storageToken });
      const userName = await fetchUserData(storageToken);
      setUserName(userName);
    } else {
      Alert.alert("Atenção", "Sua sessão  expirou faça login novamente");
      await logout();
    }
  };

  async function login(email: string, password: string) {
    try {
      setLoading(true);
      const isConnected = await checkInternetConnection();
      if (!isConnected) {
        Alert.alert("Sem conexão", "Você está sem conexão com a internet.");
        return;
      }
      const response = await api.post("/sign-in", {
        email,
        password,
      });

      if (response.status !== 200) {
        return Alert.alert("Erro", "Falha no login");
      }

      const { token } = response.data;

      setToken(token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await AsyncStorage.setItem("@storage:token", token);
      const userName = await fetchUserData(token);
      setUserName(userName);
      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Erro no login",
        "Não foi possível realizar o login. Verifique suas credenciais e tente novamente."
      );
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);
    setToken(null);
    delete api.defaults.headers.common["Authorization"];
    await AsyncStorage.removeItem("@storage:token");
    setLoading(false);
    setUserName("");
    setIdBank("");
    setShowTab(false);
  }

  const authContextValue: AuthContextType = {
    token,
    loading,
    login,
    logout,
    userName,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
