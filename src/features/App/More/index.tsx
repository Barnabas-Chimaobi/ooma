import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
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

  const [visible, setVisible] = useState(false);
  const [dish, setDish] = useState(false);
  const [menuPlan, setMenuPlan] = useState(false);
  const [order, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const getOrders = async () => {
    setLoading(true);
    const userId = await AsyncStorage.getItem('userId');
    console.log(userId, 'useriddd');
    let basketData: any = [];
    // const gottenId = JSON.parse(userId);

    try {
      // console.log(newsum, 'cartttttt');
      const orders = await getMenuItemOrders(userId);

      orders?.items?.forEach((item: any) => {
        groupByDate(item, basketData);
      });
      basketData.forEach((item: any) => {
        //replace the already exist data with the grouped plan data
        item['data'] = groupByPlanTypeDate(item.data);
      });

      await setOrders(basketData);
      //  await dispatch(cartStates(menuICart?.items));
      // console.log(basketData, 'cart ===value');
      // console.log(orders?.items, 'cart ===value');
      setLoading(false);
      return basketData;
      // setRefreshing(false);
    } catch (error) {
      console.log(error, '====errorrsss====');
      // setRefreshing(false);
    }
  };

  const groupByDate = (itemData: any, basketItems: any) => {
    // console.log(basketItems, 'basketitems====');
    for (const item of basketItems) {
      // console.log(item, 'iiiiiiiiiitems====');
      if (itemData?.menuitemorders?.deliveryTime == item?.deliveryTime) {
        item.data.push({
          planType: itemData?.menuitemorders?.deliveryTime,
          itemData,
        });

        return;
      }
    }
    // if the basket item date doesnt exist before
    basketItems.push({
      deliveryTime: itemData?.menuitemorders?.deliveryTime,
      status: itemData?.menuitemorders?.status,
      data: [{itemData}],
    });
  };

  const groupByPlanTypeDate = (basketItems: any) => {
    let planTypeData: any = [];
    let planTypeArray: any = [];
    for (const item of basketItems) {
      if (planTypeData?.length == 0) {
        planTypeData.push({
          planType: item?.planType,
          data: [{itemData: item?.itemData}],
        });
        planTypeArray.push(item?.planType);
      } else {
        for (const planData of planTypeData) {
          if (planData.planType == item?.planType) {
            if (!checkIfPlanExist(item, planData?.data)) {
              planData.data.push({itemData: item?.itemData});
            }
            break;
          }
          //Ensure that unique plantype exist
          if (!planTypeArray.includes(item?.planType)) {
            planTypeData.push({
              planType: item?.planType,
              data: [{itemData: item?.itemData}],
            });
            planTypeArray.push(item?.planType);
          }
        }
      }
    }
    return planTypeData;
  };

  const checkIfPlanExist = (item: any, plans: any) => {
    for (const plan of plans) {
      if (plan?.itemData?.id == item?.itemData?.id) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    getOrders();
  }, []);

  const onrefresh = () => {
    setLoading(true);
    getOrders();
  };
  const handleNavigate = async (name: string) => {
    switch (name) {
      case 'My Order':
        navigation.navigate('Order', {screen: 'Order', itemOrder: order});
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
        await AsyncStorage.removeItem('intro');
        await AsyncStorage.removeItem('token');
        navigation.navigate('Splash');
        // dispatch(reset());
        // dispatch(signOut());
        break;

      default:
        console.log('hii');
    }
  };
  return (
    <View style={{flex: 1, paddingHorizontal: 10}}>
      <SimpleHeader hasBottomBorder />
      {/* <RefreshControl refreshing={loading} /> */}
      {/* <ActivityIndicator size={'large'} color={'green'} animating={loading} /> */}
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={onrefresh}
            size={20}
            refreshing={loading}
          />
        }>
        {items?.map(({icon, name, borderBottom, routeTo}, idx) => (
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
