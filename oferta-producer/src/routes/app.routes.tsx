import { createStackNavigator } from "@react-navigation/stack";
import { TransitionSpec } from "@react-navigation/stack/lib/typescript/src/types";
import { SignIn } from "../screens/SignIn";
import { SignUp } from "../screens/SignUp";

const { Screen, Navigator } = createStackNavigator();

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export function AppRoutes() {
  return (
    <Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        options={{ cardStyleInterpolator: forFade }}
        name="SignIn"
        component={SignIn}
      />
      <Screen
        options={{ cardStyleInterpolator: forFade }}
        name="SignUp"
        component={SignUp}
      />
    </Navigator>
  );
}
