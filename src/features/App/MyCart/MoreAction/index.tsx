import React, {FC, useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import api from '../../../../api';
import {ShowMessage, type, Alert} from '../../../../components';
import {getMenuPlanCart, getMenuitemCart} from '../../../../FetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {basketStates} from '../../../../reducers/basket';
import {cartStates} from '../../../../reducers/cart';
import {AppDispatch, RootState} from '../../../../store';
import {SortCart} from '../../../../Utils/sortCart';

interface IProps {
  title: string;
  iconName: string;
  color?: string;
  count?: boolean;
  del?: boolean;
  onPress?: () => void;
  id?: any;
  cart?: any;
  editItems: any;
  params: any;
  addons: any;
  details: any;
  basket: any;
  gottenNewCart?: (item: any) => void;
}

const MoreAction: FC<IProps> = ({
  title,
  iconName,
  color,
  onPress,
  count,
  del,
  id,
  cart,
  editItems,
  params,
  addons,
  details,
  basket,
  gottenNewCart,
}) => {
  const [isCounter, setIsCounter] = useState(false);
  const [countValue, setCountValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch: AppDispatch = useDispatch();

  // console.log(id, cart, editItems, 'idforeditttttt');

  const getBasket = async () => {
    // const getMenuplanKart = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const branch = await AsyncStorage.getItem('branchId');
    const newbranch = JSON.parse(branch);
    console.log(userId, 'useriddd');

    const menuplanscart = await getMenuPlanCart(userId, newbranch);
    gottenNewCart(menuplanscart?.items);
    dispatch(basketStates(menuplanscart?.items));
    // console.log(menuplanscart, '=======planscarttttttt=========');
    const all = menuplanscart?.items.map((item: any) => item.MenuPlan);
    let all1 = all.map((item: any) => item.MenuPlanDetails);
    // console.log(all1, '=====all1======');
    // };
  };

  const getCart = async () => {
    const branch = await AsyncStorage.getItem('branchId');
    const newbranch = JSON.parse(branch);
    const userId = await AsyncStorage.getItem('userId');
    // console.log(userId, 'useriddd');
    // const gottenId = JSON.parse(userId);

    try {
      const menuICart = await getMenuitemCart(newbranch, userId);
      SortCart(menuICart?.items);
      dispatch(cartStates(menuICart?.items));
      gottenNewCart(menuICart?.items);
      // console.log(menuICart, 'cart ===value');
    } catch (error) {}
  };

  const deleteCart = async () => {
    setLoading(true);
    // console.log(cart, '===deltessss===');
    try {
      const carts = await api.delete(`/orders/cart`, {
        cartId: cart,
      });
      const addedCart = carts?.data;
      getCart();
      if (addedCart?.statusCode === 201) {
        setLoading(false);
        Alert('Item deleted successfully'); // dispatch(cartStates(addedCart));
      } else {
        setLoading(false);
        Alert('Could not delete item'); // dispatch(cartStates(addedCart));
      }
      // if (cart?.config?.response == 'Cart updated successfully') {
      // setCartItem(addedCart);
      // navigation.goBack('Mycart');
      // console.log(addedCart, 'deleteddddddartttt');
      // } else {
      //   ShowMessage(type.ERROR, 'Item could not be updated'); // dispatch(cartStates(addedCart));
      // }
    } catch (err) {
      setLoading(false);
      Alert('Could not delete item'); // dispatch(cartStates(addedCart));
      // console.log(err, 'cartError');
    }
  };

  const deleteBasket = async () => {
    setLoading(true);
    // console.log(cart, '===deltessss===');
    try {
      const carts = await api.delete(`/orders/basket`, {
        basketId: cart,
      });
      const addedCart = carts?.data;
      getBasket();
      if (addedCart?.statusCode === 201) {
        setLoading(false);
        Alert('Item deleted successfully'); // dispatch(cartStates(addedCart));
        // setCartItem(addedCart);
        navigation.navigate('Cart');
        // console.log(carts, 'deletedbasket');
      } else {
        setLoading(false);
        Alert('Cannot delete item, cart item already paid for'); // dispatch(cartStates(addedCart));
      }
    } catch (err) {
      setLoading(false);
      Alert('Unable to delete item');
      // console.log(err.response.data, 'cartError');
    }
  };

  const handleActions = () => {
    if (count) {
      setIsCounter(true);
    } else if (del) {
      if (params == 'deleteBasket') {
        deleteBasket();
      } else {
        deleteCart();
      }
      // Run delete function here
      // Alert.alert('No function to call');
    } else if (params == 'details') {
      navigation.navigate('OrderDetails', {
        basket: basket,
        id: id,
        cartId: cart,
        eachItem: editItems,
        editParams: 'editParams',
        addon: addons,
        itemDetails: details,
      });
    } else {
      navigation.navigate('Cart1', {
        id: id,
        cartId: cart,
        eachItem: editItems,
        editParams: 'editParams',
        addon: addons,
      });
    }
  };

  const handleDecrease = () => {
    if (countValue > 0) {
      setCountValue(countValue - 1);
    }
  };
  const handleIncrease = () => {
    setCountValue(countValue + 1);
  };

  return (
    <View style={styles.container}>
      {isCounter ? (
        <View style={styles.counterView}>
          <TouchableOpacity
            onPress={() => handleDecrease()}
            style={styles.counterMinus}>
            <Text style={styles.countIcon}>-</Text>
          </TouchableOpacity>
          <Text style={styles.countValue}>{countValue}</Text>
          <TouchableOpacity
            onPress={() => handleIncrease()}
            style={styles.counterPlus}>
            <Text style={styles.countIcon}>+</Text>
          </TouchableOpacity>
        </View>
      ) : loading ? (
        <ActivityIndicator size={'large'} color={'red'} animating={loading} />
      ) : (
        <TouchableOpacity onPress={() => handleActions()}>
          <Icon
            name={iconName}
            type="font-awesome-5"
            color={color ? color : '#000'}
            size={15}
          />
          <Text style={{color: color ? color : '#000'}}>{title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MoreAction;
