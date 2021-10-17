import 'react-native-gesture-handler';
import * as React from 'react';
import {
  NavigationContainer,
  NavigatorNavigatorParams,
  DefaultTheme,
  DarkTheme,
  RouteProp,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {createStackNavigator} from '@react-navigation/Stack';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../store';
import {signIn, signOut} from '../reducers';
import Slash from '../navigation/AuthNavigation/splash';
import {Register, Region, Branch, Login, PhoneNo} from '../features/Auth';
import {
  DetailsNavigator,
  SplashNavigator,
  Home,
  HomeNavigator,
  AddNewAddressForm,
  Profile,
  UpdatePassword,
  ViewAllAddresses,
  EditProfile,
  Dish,
  Order,
  OrderDetails,
  SelectedCategory,
  Filter,
  Checkout,
  MyCart,
  CartIntro,
  Wallet,
  RateUs,
  Promotions,
  Favourites,
  PromotionsIntro,
  WalletIntro,
  Voucher,
  More,
  AllMenuPlanByCategory,
  Detail,
  SearchMenuitemandPlan,
  Menu,
  Cart,
  Cart1,
  Payment,
  OrderDetails1,
  Help,
  Explore,
  MenuHistory,
} from '../features/App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance';
import {Provider as PaperProvider} from 'react-native-paper';
import {ThemeProvider} from 'react-native-elements';
import AuthNavigation from './AuthNavigation';
import {colors} from '../colors';
// import HomeNavigation from './HomeNavigation';
import BottomNavigator from './BottomTabNavigator';
import MyCartNavigation from './MyCartNavigation';
import MenuNavigation from './MenuNavigation';
import HomeNav from './HomeNavigation';
import ExploreNavigation, {ExploreStackParamList} from './ExploreNavigation';
import {NetworkManager, Loader} from '../components';
// import Home from './HomeNavigation';
// import Explore from './ExploreNavigation';
import MenuPlan from './MenuNavigation';
import Splash from '../navigation/AuthNavigation/splash';
import {navigationRef} from '../../src/api/filter';
// import {Stack} from 'native-base';
// import MyCart from './MyCartNavigation';
// import More from './MoreNavigation';

const theme = {
  colors,
};

export type StackParamList = {
  Home: undefined;
  Details: undefined;
  Splash: undefined;
  Auth: undefined;
  BottomNavigator: undefined;
  MyCartNavigation: undefined;
  MenuNavigation: undefined;
  SignIn: undefined;
  Explore: undefined;
  Profile: undefined;
  ViewAllAddresses: undefined;
  EditProfile: undefined;
  UpdatePassword: undefined;
  AddNewAddressForm: undefined;
  Dish: undefined;
  Order: undefined;
  SelectedCategory: undefined;
  OrderDetails: undefined;
  Filter: undefined;
  Checkout: undefined;
  MyCart: undefined;
  CartIntro: undefined;
  Wallet: undefined;
  More: undefined;
  RateUs: undefined;
  Promotions: undefined;
  Favourites: undefined;
  PromotionsIntro: undefined;
  WalletIntro: undefined;
  Voucher: undefined;
  AllMenuPlanByCategory: undefined;
  Detail: undefined;
  SearchMenuitemandPlan: undefined;
  Cart: undefined;
  Cart1: undefined;
  OrderDetails1: undefined;
};

const Stack = createStackNavigator();
// const Stack = createStackNavigator<StackParamList>();

const defaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

export default function App() {
  const {token} = useSelector((state: RootState) => state.auth);
  const [userToken, settoken] = React.useState('');
  const [branch, setBranch] = React.useState('');
  const scheme = useColorScheme();
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    console.log(token, 'token');
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken: any;

      try {
        userToken = await AsyncStorage.getItem('token');
        const branchId = await AsyncStorage.getItem('branchId');
        const asyncBranch = JSON.parse(branchId);
        setBranch(asyncBranch);
        console.log(asyncBranch, 'asyncbranchhh');
        console.log(userToken, 'user');
        userToken && dispatch(signIn());
      } catch (e) {
        // Restoring token failed
      }
    };

    // bootstrapAsync();
  }, []);

  const state = false;

  return (
    <AppearanceProvider>
      <ThemeProvider theme={theme}>
        <NavigationContainer
          ref={navigationRef}
          theme={scheme === 'light' ? defaultTheme : darkTheme}>
          {/* <Loader /> */}
          <NetworkManager />
          {/* {branch != '' ? ( */}
          <Stack.Navigator
            initialRouteName="Splash"
            headerMode="none"
            NavigatorOptions={{
              headerStyle: {elevation: 0},
              cardStyle: {backgroundColor: 'white'},
            }}>
            <Stack.Screen name="Splash" component={Splash} />
            {/* <Stack.Screen name="BottomNavigator" component={BottomNavigator} /> */}
            <Stack.Screen name="Region" component={Region} />
            <Stack.Screen name="Branch" component={Branch} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Payment" component={Payment} />
            <Stack.Screen name="Help" component={Help} />
            <Stack.Screen
              name="SearchMenuitemandPlan"
              component={SearchMenuitemandPlan}
            />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="PhoneNo" component={PhoneNo} />
            {/* <Stack.Screen name="Splash" component={SplashNavigator} /> */}
            <Stack.Screen name="Explore" component={Explore} />
            <Stack.Screen name="Dish" component={Dish} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="OrderDetails" component={OrderDetails} />
            <Stack.Screen name="OrderDetails1" component={OrderDetails1} />
            <Stack.Screen name="MenuPlanByCategory" component={Menu} />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen
              name="SelectedCategory"
              component={SelectedCategory}
            />
            <Stack.Screen name="Filter" component={Filter} />
            <Stack.Screen name="CartIntro" component={CartIntro} />
            <Stack.Screen name="MyCart" component={MyCart} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="Wallet" component={Wallet} />

            {/* <Stack.Screen name="More" component={More} /> */}
            <Stack.Screen name="RateUs" component={RateUs} />
            <Stack.Screen name="Favourites" component={Favourites} />
            <Stack.Screen name="WalletIntro" component={WalletIntro} />
            <Stack.Screen name="PromotionsIntro" component={PromotionsIntro} />
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Cart1" component={Cart1} />
            <Stack.Screen name="Promotions" component={Promotions} />
            <Stack.Screen name="Voucher" component={Voucher} />
            <Stack.Screen name="More" component={More} />

            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen
              name="ViewAllAddresses"
              component={ViewAllAddresses}
            />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
            <Stack.Screen
              name="AddNewAddressForm"
              component={AddNewAddressForm}
            />
            <Stack.Screen name="MenuHistory" component={MenuHistory} />
            <Stack.Screen name="Home" component={Home} />
            {/* <Stack.Screen name="HomeNav" component={HomeNav} /> */}
            {/* <Stack.Screen name="Explore" component={ExploreNavigation} /> */}
            {/* <Stack.Screen name="Details" component={Detail} /> */}
            {/* <Stack.Screen
              name="MyCartNavigation"
              component={MyCartNavigation}
            /> */}
            {/* <Stack.Screen name="MenuNavigation" component={MenuNavigation} /> */}
            {/* <Stack.Screen name="SignIn" component={SignInNavigator} /> */}
          </Stack.Navigator>
          {/* ) : ( */}
          {/* <AuthNavigation /> */}
          {/* )} */}
          {/* </Loader> */}
        </NavigationContainer>
      </ThemeProvider>
    </AppearanceProvider>
  );
}
