import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Overlay} from 'react-native-elements';
import {SimpleHeader, CheckBox1} from '../../../components';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {S} from './styles';
import {reset, signOut} from '../../../reducers';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';

interface itemProp {
  name: string;
  icon: any | undefined;
  borderBottom: boolean;
  routeTo: string;
}
const items: itemProp[] = [
  {
    name: 'My Order',
    icon: <Feather name="shopping-bag" size={18} />,
    borderBottom: true,
    routeTo: 'Order',
  },
  {
    name: 'Order for a friend',
    icon: <Feather name="users" size={18} />,
    borderBottom: false,
    routeTo: 'Explore',
  },
  {
    name: 'Favourites',
    icon: <FontAwesome name="heart-o" size={18} />,
    borderBottom: true,
    routeTo: 'Order',
  },
  {
    name: 'Promotions/rewards',
    icon: <Octicons name="tag" size={18} />,
    borderBottom: false,
    routeTo: 'Order',
  },
  {
    name: 'Voucher',
    icon: (
      <MaterialCommunityIcons name="ticket-confirmation-outline" size={18} />
    ),
    borderBottom: false,
    routeTo: 'Order',
  },
  {
    name: 'Wallet',
    icon: <Ionicons name="wallet-outline" size={18} />,
    borderBottom: false,
    routeTo: `'MyCartNavigation', { screen: 'Wallet' }`,
  },
  {
    name: 'Rate Us',
    icon: <Feather name="star" size={18} />,
    borderBottom: true,
    routeTo: 'RateUs',
  },
  {
    name: 'Invite a friend',
    icon: '',
    borderBottom: false,
    routeTo: 'Order',
  },
  {
    name: 'Help',
    icon: '',
    borderBottom: false,
    routeTo: 'Order',
  },
  {
    name: 'Logout',
    icon: '',
    borderBottom: false,
    routeTo: 'Order',
  },
];
interface Props {
  navigation: any;
}
const rout = `'MyCartNavigation', { screen: 'Wallet' }`;
const More: React.FC<Props> = ({navigation}) => {
  const dispatch: AppDispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [dish, setDish] = useState(false);
  const [menuPlan, setMenuPlan] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const handleNavigate = async (name: string) => {
    switch (name) {
      case 'My Order':
        navigation.navigate('Order', {screen: 'Order'});
        break;

      case 'Order for a friend':
        toggleOverlay();
        break;

      case 'Favourites':
        navigation.navigate('Favourites');
        break;

      case 'Promotions/rewards':
        navigation.navigate('PromotionsIntro');
        break;

      case 'Voucher':
        navigation.navigate('Voucher');
        break;

      case 'Wallet':
        navigation.navigate('WalletIntro');
        break;

      case 'Rate Us':
        navigation.navigate('RateUs');
        break;

      case 'Logout':
        await AsyncStorage.removeItem('token');
        dispatch(reset());
        dispatch(signOut());
        break;

      default:
        console.log('hii');
    }
  };
  return (
    <View style={{flex: 1, paddingHorizontal: 10}}>
      <SimpleHeader hasBottomBorder />
      <ScrollView>
        {items.map(({icon, name, borderBottom, routeTo}, idx) => (
          <TouchableOpacity
            onPress={() => handleNavigate(name)}
            key={idx}
            style={[S.items, borderBottom && S.borderStyle]}>
            {icon ? icon : null}
            <Text style={{marginLeft: 15}}>{name}</Text>
          </TouchableOpacity>
        ))}

        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <View>
            <CheckBox1
              checked={dish}
              circle
              title="Dish"
              containerStyle={{backgroundColor: 'transparent'}}
              onPress={() => {
                toggleOverlay();
                navigation.navigate('Explorer');
                setDish(!dish);
              }}
            />
            <CheckBox1
              checked={menuPlan}
              circle
              title="Menu Plan"
              containerStyle={{backgroundColor: 'transparent'}}
              onPress={() => {
                toggleOverlay();
                navigation.navigate('MenuNavigation', {Screen: 'Menu'});
                setMenuPlan(!menuPlan);
              }}
            />
          </View>
        </Overlay>
      </ScrollView>
    </View>
  );
};

export default More;
