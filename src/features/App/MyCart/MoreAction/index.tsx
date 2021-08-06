import React, {FC, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import api from '../../../../api';
import {ShowMessage, type} from '../../../../components';

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
}) => {
  const [isCounter, setIsCounter] = useState(false);
  const [countValue, setCountValue] = useState(0);
  const navigation = useNavigation();

  console.log(id, cart, editItems, 'idforeditttttt');

  const deleteCart = async () => {
    try {
      const carts = await api.delete(`/orders/cart`, {
        cartId: cart,
      });
      const addedCart = carts?.data?.data;
      // if (cart?.config?.response == 'Cart updated successfully') {
      ShowMessage(type.DONE, 'Item deleted successfully'); // dispatch(cartStates(addedCart));
      // setCartItem(addedCart);
      navigation.goBack('Mycart');
      console.log(carts, 'editedcartttt');
      // } else {
      //   ShowMessage(type.ERROR, 'Item could not be updated'); // dispatch(cartStates(addedCart));
      // }
    } catch (err) {
      console.log(err, 'cartError');
    }
  };

  const handleActions = () => {
    if (count) {
      setIsCounter(true);
    } else if (del) {
      deleteCart();
      // Run delete function here
      // Alert.alert('No function to call');
    } else {
      navigation.navigate('Cart1', {
        id: id,
        cartId: cart,
        eachItem: editItems,
        editParams: 'editParams',
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
