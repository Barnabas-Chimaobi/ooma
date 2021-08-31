import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {Button, ButtonType, PriceTag, EmptyList} from '../../../components';
import Card from './Card';
import shortid from 'shortid';
import MessageModal from '../../../components/CartMessagesModal';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getMenuitemCart, getOrderById} from '../../../FetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {cartStates} from '../../../reducers/cart';
import {AppDispatch, RootState} from '../../../store';
import {ShowMessage, type} from '../../../components';

const MyCart = () => {
  const [state, setState] = useState({toggle: false});
  const [carts, setCart] = useState();
  const [cartParams, setParams] = useState();
  const [total, setTotal] = useState('');
  let [reload, setReload] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const [refreshing, setRefreshing] = useState(true);

  const dispatch: AppDispatch = useDispatch();
  const cartItem = useSelector((state: RootState) => state.addedCart.payload);

  const cart = async () => {
    const userId = await AsyncStorage.getItem('userId');
    console.log(userId, 'useriddd');
    // const gottenId = JSON.parse(userId);

    try {
      // console.log(newsum, 'cartttttt');

      const menuICart = await getMenuitemCart(userId);
      setCart(menuICart?.items);
      await dispatch(cartStates(menuICart?.items));

      console.log(menuICart?.items?.length, 'cart ===value');
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
    }
  };

  const toggleReload = () => setReload((prevstate) => !prevstate);

  const getCart = async () => {
    await cart();
    // setTimeout(() => {
    const sum = cartItem?.map((v) => v?.amount);
    console.log(sum, cartItem.length, '====summm====');
    if (cartItem.length !== 0) {
      let newsum = sum?.reduce(
        (sum: any, current: any) => parseInt(sum) + parseInt(current),
      );
      setTotal(newsum);
      console.log(newsum, 'cartttttt');
      console.log(total, 'totalllss');

      const getEachItem = cartItem?.map((item: any) => {
        return {
          menuplanid: item.menuplanid,
          menuitemid: item.menuitemid,
          branchid: item.branchId,
          cartId: item.id,
        };
      });
      setParams(getEachItem);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getCart();
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // this.componentDidMount();
      getCart();
    });

    getCart();
    // getMenuplanKart();

    return unsubscribe;
  }, [cartItem !== undefined && cartItem?.length]);
  // cartItem.length === 0 ? cartItem : reload === true ? cartItem : null;

  return (
    <ScrollView
      contentContainerStyle={{}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <FlatList
        data={cartItem}
        keyExtractor={() => shortid.generate()}
        // style={styles.listStyle}
        renderItem={({item}) => {
          return (
            cartItem?.length >= 1 && (
              <Card
                item={item}
                id={shortid.generate()}
                title={item?.MenuItem?.itemName}
                price={item?.amount}
                quantity={item?.quantity}
                image={item?.MenuItem?.imageUrl}
                description={item?.MenuItem?.description}
                itemId={item?.MenuItem?.id}
                cartId={item?.id}
                addons={JSON.parse(item?.addons)}
              />
            )
          );
        }}
        ListFooterComponent={
          <>
            {cartItem?.length >= 1 && (
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  marginVertical: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>Total :</Text>
                  {total !== '' && <PriceTag price={total} clear />}
                </View>
                <Button
                  title="CHECKOUT"
                  type={ButtonType.solid}
                  containerStyle={{
                    marginVertical: 20,
                  }}
                  buttonStyle={{backgroundColor: '#303030'}}
                  onPress={() => {
                    total === ''
                      ? ShowMessage(
                          type.ALERT,
                          'Please wait while we calculate your total',
                        )
                      : navigation.navigate('Checkout', {
                          params: cartParams,
                          subTotal: total,
                        });
                  }}
                />
              </View>
            )}
          </>
        }
        ListEmptyComponent={
          <EmptyList
            image={require('../../../assets/Images/emptyCart.png')}
            title="FIND MEAL"
            message="Oops! Your cart is empty"
            onPress={() => navigation.navigate('Explore')}
          />
        }
      />
    </ScrollView>
  );
};

export default MyCart;
