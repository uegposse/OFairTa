import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { api } from "../services/api";
import { checkInternetConnection } from "../utils/netInfo";

interface Token {
  token?: string | null;
}

interface AuthContextType {
  token: Token | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
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

export function AuthProvider({ children }: any) {
  const [token, setToken] = useState<Token | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadStoredData = async () => {
      const isConnected = await checkInternetConnection();
      if (!isConnected) {
        Alert.alert("Sem conexão", "Você está sem conexão com a internet.");
        return;
      }
      const storageToken = await AsyncStorage.getItem("@storage:token");

      if (isTokenValid(storageToken)) {
        setToken({ token: storageToken });
        api.defaults.headers.common["Authorization"] = `Bearer ${storageToken}`;
      } else {
        await logout();
      }
    };

    loadStoredData();
  }, [token]);

  async function login(email: string, password: string) {
    try {
      const isConnected = await checkInternetConnection();
      if (!isConnected) {
        Alert.alert("Sem conexão", "Você está sem conexão com a internet.");
        return;
      }
      setLoading(true);
      const response = await api.post("/sign-in", {
        email,
        password,
      });

      if (response.status !== 200) {
        throw new Error("Falha no login");
        setLoading(false);
      }

      const { token } = response.data;

      setToken(token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await AsyncStorage.setItem("@storage:token", token);
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
    await AsyncStorage.clear();
    setLoading(false);
  }

  const authContextValue: AuthContextType = {
    token,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
