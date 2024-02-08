export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      SignIn: undefined;
      SignUp: undefined;
      Home: undefined;
      CreateProduct: undefined;
      Orders: undefined;
      DetailsOrders: { id: string };
      Settings: undefined;
      AddressProfile: undefined;
      Profile: undefined;
      ResetPassword: undefined;
      DeactivateAccount: undefined;
      CreateBanks: undefined;
      MyHistory: undefined;
      MyBanks: undefined;
      Dashboard: undefined;
      UpdateProduct: {
        id: string;
        name: string;
        description: string;
        price: number;
        quantity: number;
      };
    }
  }
}
