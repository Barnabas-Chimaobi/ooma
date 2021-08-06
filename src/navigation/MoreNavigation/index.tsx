import React from 'react';
import {
  More,
  RateUs,
  Promotions,
  Favourites,
  Wallet,
  PromotionsIntro,
  WalletIntro,
  Voucher,
} from '../../features/App';
import {createStackNavigator} from '@react-navigation/stack';
const {Navigator, Screen} = createStackNavigator();

const index = () => (
  <Navigator headerMode="none" initialRouteName="More">
    <Screen name="More" component={More} />
    <Screen name="RateUs" component={RateUs} />
    <Screen name="Favourites" component={Favourites} />
    <Screen name="Wallet" component={Wallet} />
    <Screen name="WalletIntro" component={WalletIntro} />
    <Screen name="PromotionsIntro" component={PromotionsIntro} />
    <Screen name="Promotions" component={Promotions} />
    <Screen name="Voucher" component={Voucher} />
  </Navigator>
);

export default index;
