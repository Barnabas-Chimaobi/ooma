import 'react-native-gesture-handler';
import * as React from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
  DefaultTheme,
  DarkTheme,
  RouteProp,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../store';
import {signIn, signOut} from '../reducers';
import Slash from '../navigation/AuthNavigation/splash';
import {Register, Region, Branch, Login} from '../features/Auth';
import {
  DetailsScreen,
  SplashScreen,
  Home,
  HomeScreen,
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
import Explore from './ExploreNavigation';
import MenuPlan from './MenuNavigation';
import Splash from '../navigation/AuthNavigation/splash';
// import MyCart from './MyCartNavigation';
// import More from './MoreNavigation';

const theme = {
  colors,
};

export type MainStackParamList = {
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
};

const MainStack = createStackNavigator<MainStackParamList>();

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
          theme={scheme === 'light' ? defaultTheme : darkTheme}>
          {/* <Loader /> */}
          <NetworkManager />
          {/* {branch != '' ? ( */}
          <MainStack.Navigator
            initialRouteName="Splash"
            headerMode="none"
            screenOptions={{
              headerStyle: {elevation: 0},
              cardStyle: {backgroundColor: 'white'},
            }}>
            <MainStack.Screen name="Splash" component={Splash} />
            <MainStack.Screen
              name="BottomNavigator"
              component={BottomNavigator}
            />
            <MainStack.Screen name="Region" component={Region} />
            <MainStack.Screen name="Branch" component={Branch} />
            <MainStack.Screen name="Login" component={Login} />
            <MainStack.Screen name="Payment" component={Payment} />
            <MainStack.Screen
              name="SearchMenuitemandPlan"
              component={SearchMenuitemandPlan}
            />
            <MainStack.Screen name="Register" component={Register} />
            {/* <MainStack.Screen name="Splash" component={SplashScreen} /> */}
            <MainStack.Screen name="Explore" component={Explore} />
            <MainStack.Screen name="Dish" component={Dish} />
            <MainStack.Screen name="Order" component={Order} />
            <MainStack.Screen name="OrderDetails" component={OrderDetails} />
            <MainStack.Screen name="MenuPlanByCategory" component={Menu} />
            <MainStack.Screen name="Detail" component={Detail} />
            <MainStack.Screen
              name="SelectedCategory"
              component={SelectedCategory}
            />
            <MainStack.Screen name="Filter" component={Filter} />
            <MainStack.Screen name="CartIntro" component={CartIntro} />
            <MainStack.Screen name="MyCart" component={MyCart} />
            <MainStack.Screen name="Checkout" component={Checkout} />
            <MainStack.Screen name="Wallet" component={Wallet} />

            <MainStack.Screen name="More" component={More} />
            <MainStack.Screen name="RateUs" component={RateUs} />
            <MainStack.Screen name="Favourites" component={Favourites} />
            <MainStack.Screen name="WalletIntro" component={WalletIntro} />
            <MainStack.Screen
              name="PromotionsIntro"
              component={PromotionsIntro}
            />
            <MainStack.Screen name="Menu" component={Menu} />
            <MainStack.Screen name="Cart" component={Cart} />
            <MainStack.Screen name="Cart1" component={Cart1} />
            <MainStack.Screen name="Promotions" component={Promotions} />
            <MainStack.Screen name="Voucher" component={Voucher} />

            <MainStack.Screen name="Profile" component={Profile} />
            <MainStack.Screen
              name="ViewAllAddresses"
              component={ViewAllAddresses}
            />
            <MainStack.Screen name="EditProfile" component={EditProfile} />
            <MainStack.Screen
              name="UpdatePassword"
              component={UpdatePassword}
            />
            <MainStack.Screen
              name="AddNewAddressForm"
              component={AddNewAddressForm}
            />
            <MainStack.Screen name="Home" component={Home} />
            <MainStack.Screen name="HomeNav" component={HomeNav} />
            {/* <MainStack.Screen name="Explore" component={ExploreNavigation} /> */}
            <MainStack.Screen name="Details" component={DetailsScreen} />
            <MainStack.Screen
              name="MyCartNavigation"
              component={MyCartNavigation}
            />
            <MainStack.Screen
              name="MenuNavigation"
              component={MenuNavigation}
            />

            {/* <MainStack.Screen name="SignIn" component={SignInScreen} /> */}
          </MainStack.Navigator>
          {/* ) : ( */}
          {/* <AuthNavigation /> */}
          {/* )} */}
          {/* </Loader> */}
        </NavigationContainer>
      </ThemeProvider>
    </AppearanceProvider>
  );
}
