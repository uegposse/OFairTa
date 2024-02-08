import { createStackNavigator } from "@react-navigation/stack";
import { SignIn } from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";

const { Screen, Navigator } = createStackNavigator();

export function AppRoutes() {
  return (
    <Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUp" component={SignUp} />
    </Navigator>
  );
}
