import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
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
import {getMenuItemOrders} from '../../../FetchData';
import Footer from '../../../navigation/footer';
import {StyleFoot} from '../../../navigation/styles';
import {setUserDetails} from '../../../reducers';
import Modal from 'react-native-modal';
import {colors} from '../../../colors';
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
  // {
  //   name: 'Favourites',
  //   icon: <FontAwesome name="heart-o" size={18} />,
  //   borderBottom: true,
  //   routeTo: 'Order',
  // },
  // {
  //   name: 'Promotions/rewards',
  //   icon: <Octicons name="tag" size={18} />,
  //   borderBottom: false,
  //   routeTo: 'Order',
  // },
  // {
  //   name: 'Voucher',
  //   icon: (
  //     <MaterialCommunityIcons name="ticket-confirmation-outline" size={18} />
  //   ),
  //   borderBottom: false,
  //   routeTo: 'Order',
  // },
  // {
  //   name: 'Wallet',
  //   icon: <Ionicons name="wallet-outline" size={18} />,
  //   borderBottom: false,
  //   routeTo: `'MyCartNavigation', { screen: 'Wallet' }`,
  // },
  // {
  //   name: 'Rate Us',
  //   icon: <Feather name="star" size={18} />,
  //   borderBottom: true,
  //   routeTo: 'RateUs',
  // },
  // {
  //   name: 'Invite a friend',
  //   icon: '',
  //   borderBottom: false,
  //   routeTo: 'Order',
  // },
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
  const [more, setMore] = useState('more');
  const [visible, setVisible] = useState(false);
  const [dish, setDish] = useState(false);
  const [menuPlan, setMenuPlan] = useState(false);
  const [order, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [number, setNumber] = useState(null);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const backAction = async () => {
    navigation.navigate('Register', {route: 'login'});
    // setLoading(true);
    dispatch(reset());
    dispatch(setUserDetails({number: number}));
    await AsyncStorage.removeItem('intro');
    await AsyncStorage.removeItem('token');
    setModalVisible(!isModalVisible);
    // setLoading(false);
  };

  useEffect(() => {
    // getOrders();
  }, []);

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

      case 'Help':
        navigation.navigate('Help', {screen: 'Help'});
        break;

      case 'Logout':
        toggleModal();
        // dispatch(reset());
        // dispatch(signOut());
        break;

      default:
        console.log('hii');
    }
  };
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, paddingHorizontal: 10}}>
        <SimpleHeader hasBottomBorder />
        {/* <RefreshControl refreshing={loading} /> */}
        {/* <ActivityIndicator size={'large'} color={'green'} animating={loading} /> */}
        <ScrollView
        // refreshControl={
        //   <RefreshControl
        //     onRefresh={onrefresh}
        //     size={20}
        //     refreshing={loading}
        //   />
        // }
        >
          {items?.map(({icon, name, borderBottom, routeTo}, idx) => (
            <TouchableOpacity
              onPress={() => handleNavigate(name)}
              key={idx}
              style={[S.items, borderBottom && S.borderStyle]}>
              {icon ? icon : null}
              <Text style={{marginLeft: 15}}>{name}</Text>
            </TouchableOpacity>
          ))}

          <Modal
            style={{
              maxHeight: '30%',
              width: '80%',
              alignSelf: 'center',
              backgroundColor: colors.logout,
              borderRadius: 12,
              marginTop: '50%',
            }}
            // onBackdropPress={() => toggleModal()}
            isVisible={isModalVisible}>
            <View style={{flex: 1, height: '50%'}}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: colors.white,
                  marginTop: 15,
                  fontFamily: 'Poppins-SemiBold',
                }}>
                Logout
              </Text>
              <Text
                style={{
                  alignSelf: 'center',
                  color: colors.white,
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 11,
                  marginTop: 30,
                }}>
                Are you sure? you will be required to
              </Text>
              <Text
                style={{
                  alignSelf: 'center',
                  color: colors.white,
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 11,
                }}>
                sign in again
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableHighlight
                  style={{width: '15%', marginTop: 35, marginLeft: 35}}
                  onPress={() => toggleModal()}>
                  <Text
                    style={{
                      color: colors.white,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.white,
                      fontFamily: 'Poppins-SemiBold',
                    }}>
                    cancel
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{width: '20%', marginTop: 35, marginRight: 35}}
                  onPress={() => {
                    backAction();
                  }}>
                  <View
                    style={{
                      backgroundColor: colors.activeTintColor,
                      borderRadius: 5,
                      padding: 3,
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        color: colors.white,
                        paddingLeft: 3,
                        paddingRight: 3,
                        fontFamily: 'Poppins-SemiBold',
                        textAlign: 'center',
                      }}>
                      Logout
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>

          <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <View>
              <CheckBox1
                checked={dish}
                circle
                title="Make instant order"
                containerStyle={{backgroundColor: 'transparent'}}
                onPress={() => {
                  toggleOverlay();
                  navigation.navigate('Explore');
                  setDish(!dish);
                }}
              />
              <CheckBox1
                checked={menuPlan}
                circle
                title="Create meal Plan"
                containerStyle={{backgroundColor: 'transparent'}}
                onPress={() => {
                  toggleOverlay();
                  navigation.navigate('Menu');
                  setMenuPlan(!menuPlan);
                }}
              />
            </View>
          </Overlay>
        </ScrollView>
      </View>
      <View style={StyleFoot.footer}>
        <Footer navigation={navigation} more={more} />
      </View>
    </View>
  );
};

export default More;
