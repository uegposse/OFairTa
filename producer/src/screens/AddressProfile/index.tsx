import { useNavigation } from "@react-navigation/native";
import { MapPin, PencilLine, X } from "phosphor-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { HeaderReturn } from "../../components/HeaderReturn";
import { api } from "../../services/api";
import { styles } from "./styles";

interface AddressProfileResponse {
  id: string;
  street: string;
  city: string;
  CEP: string;
  state: string;
  neighborhood: string;
}

export function AddressProfile() {
  const [addressProfile, setAddressProfile] = useState<
    AddressProfileResponse[]
  >([]);
  const [street, setStreet] = useState("");
  const [id, setId] = useState("");
  const [city, setCity] = useState("");
  const [CEP, setCEP] = useState("");
  const [state, setState] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoadingUpdated, setIsLoadingUpdated] = useState(false);

  const [isCreate, setIsCreate] = useState(false);

  const { navigate } = useNavigation();

  function handleBackPress() {
    setIsCreate(false);
    navigate("Settings");
    return true;
  }

  useEffect(() => {
    const backButtonHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
    return () => backButtonHandler.remove();
  }, []);

  useEffect(() => {
    loadingAddress();
  }, []);

  async function loadingAddress() {
    setLoading(true);
    const response = await api.get("/get-address");
    setAddressProfile(response.data);
    setLoading(false);
  }

  async function handleUpdateAddress(addressId: string) {
    setIsLoadingUpdated(true);
    console.log("id do endereço ", addressId);
    api
      .put(`/update-address/${addressId}`, {
        street,
        CEP,
        neighborhood,
        state,
        city,
      })
      .then((response) => {
        console.log(response);
        loadingAddress();
        setIsCreate(false);
        setIsLoadingUpdated(false);
      })
      .finally(() => {
        setIsLoadingUpdated(false);
      });
  }

  function handleUpdateAddressAddTextInput({
    id,
    street,
    CEP,
    neighborhood,
    state,
    city,
  }) {
    setId(id);
    setStreet(street);
    setCEP(CEP);
    setNeighborhood(neighborhood);
    setState(state);
    setCity(city);
    setIsCreate(!isCreate);
  }

  async function handleCreateAddress() {
    try {
      setLoading(true);
      api
        .post("/create-address", {
          street,
          city,
          CEP,
          state,
          neighborhood,
        })
        .then((response) => {
          console.log(response);
          loadingAddress();
          setIsCreate(false);
          setLoading(false);
          return Alert.alert("Sucesso!", "Endereço adicionado!");
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      return Alert.alert(
        "Error!",
        "Parece que ocorreu algum erro! Tente novamente."
      );
    }
  }

  return (
    <SafeAreaView>
      <HeaderReturn title="Meu endereço" />
      {loading && (
        <ActivityIndicator
          color="#019972"
          style={{
            paddingTop: 50,
          }}
          size={50}
        />
      )}
      {!loading && (
        <ScrollView>
          {addressProfile.length === 0 && (
            <View
              style={{
                paddingTop: 20,
                paddingRight: 40,
                paddingLeft: 40,
                gap: 20,
              }}
            >
              <Text
                style={{
                  color: "#019972",
                  fontSize: 18,
                  fontWeight: "500",
                }}
              >
                Parece que você ainda não tem nenhum endereço cadastrado!
              </Text>
              <TouchableOpacity
                onPress={() => setIsCreate(!isCreate)}
                style={[
                  styles.button,
                  {
                    marginBottom: 0,
                  },
                  isCreate && { backgroundColor: "#d46b71" },
                ]}
              >
                {isCreate && <Text style={styles.buttonText}>Cancelar </Text>}
                {!isCreate && (
                  <Text style={styles.buttonText}>
                    Cadastrar novo endereço{" "}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}
          {addressProfile.map((address) => (
            <View key={address.id} style={styles.cartAddress}>
              <View style={styles.cartAddresses}>
                <MapPin color="#019972" size={32} weight="thin" />
                <View style={styles.cartAddressContent}>
                  <Text style={styles.cartAddressContentText}>
                    {address.city}, {address.state}
                  </Text>
                  <Text style={styles.cartAddressContentText}>
                    {address.street}, Setor {address.neighborhood}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() =>
                  handleUpdateAddressAddTextInput({
                    CEP: address.CEP,
                    city: address.city,
                    neighborhood: address.neighborhood,
                    state: address.state,
                    street: address.street,
                    id: address.id,
                  })
                }
              >
                {!isCreate && (
                  <PencilLine color="#019972" size={32} weight="thin" />
                )}
                {isCreate && <X color="#d46b71" size={32} weight="bold" />}
              </TouchableOpacity>
            </View>
          ))}

          {isCreate && (
            <>
              <View style={styles.container}>
                <View style={styles.textGroup}>
                  <Text style={styles.text}>Rua, Av, Fazenda</Text>
                  <TextInput
                    value={street}
                    onChangeText={setStreet}
                    style={styles.input}
                  />
                </View>

                <View style={styles.textGroup}>
                  <Text style={styles.text}>Setor, Bloco, Povoado</Text>
                  <TextInput
                    value={neighborhood}
                    onChangeText={setNeighborhood}
                    style={styles.input}
                  />
                </View>

                <View style={styles.textGroup}>
                  <Text style={styles.text}>Cidade</Text>
                  <TextInput
                    value={city}
                    onChangeText={setCity}
                    style={styles.input}
                  />
                </View>

                <View style={styles.textGroup}>
                  <Text style={styles.text}>Estado</Text>
                  <TextInput
                    value={state}
                    onChangeText={setState}
                    style={styles.input}
                  />
                </View>

                <View style={styles.textGroup}>
                  <Text style={styles.text}>CEP</Text>
                  <TextInputMask
                    value={CEP}
                    onChangeText={setCEP}
                    type={"zip-code"}
                    style={styles.input}
                  />
                </View>
              </View>
              <View style={styles.footer}>
                <TouchableOpacity
                  onPress={
                    addressProfile.length === 0
                      ? handleCreateAddress
                      : () => handleUpdateAddress(id)
                  }
                  style={styles.button}
                >
                  {isLoadingUpdated && (
                    <ActivityIndicator size="large" color="#FFF" />
                  )}
                  {!isLoadingUpdated && (
                    <Text style={styles.buttonText}>
                      {addressProfile.length === 0
                        ? "Criar novo endereço"
                        : "Atualizar meu endereço"}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
