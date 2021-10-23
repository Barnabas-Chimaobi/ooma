import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {
  Button,
  ButtonType,
  PriceTag,
  EmptyList,
  SimpleHeader,
} from '../../../components';
import Card from './Card';
import shortid from 'shortid';
import MessageModal from '../../../components/CartMessagesModal';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getMenuitemCart, getOrderById} from '../../../FetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {cartStates} from '../../../reducers/cart';
import {AppDispatch, RootState} from '../../../store';
import {ShowMessage, type, Alert} from '../../../components';
import Skeleton from '../Home/skeleton';
import {FunctionSelectItem} from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';
import {StyleFoot} from '../../../navigation/styles';
import Footer from '../../../navigation/footer';
import {colors} from '../../../colors';
import {SortCart} from '../../../Utils/sortCart';

const MyCart = () => {
  const [mycart, setMyCart] = useState('cart');
  const [state, setState] = useState({toggle: false});
  const [carts, setCart] = useState();
  const [cartParams, setParams] = useState();
  const [total, setTotal] = useState('');
  let [reload, setReload] = useState(false);
  const [states, setStates] = useState({totals: ''});
  const navigation = useNavigation();
  const route = useRoute();
  const [refreshing, setRefreshing] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const cartItem = useSelector((state: RootState) => state.addedCart.payload);
  console.log('=====cart length========', cartItem?.length);
  console.log(cartItem?.length, route?.params, '=====length=====');

  const cart = async () => {
    getCart();
    {
      cartItem?.length === 0 ? setRefreshing(true) : null;
    }
    const branch = await AsyncStorage.getItem('branchId');
    const newbranch = JSON.parse(branch);
    const userId = await AsyncStorage.getItem('userId');
    console.log(userId, 'useriddd');
    // const gottenId = JSON.parse(userId);
    try {
      // console.log(newsum, 'cartttttt');

      const menuICart = await getMenuitemCart(newbranch, userId);
      setCart(menuICart?.items);
      SortCart(menuICart?.items);
      await dispatch(cartStates(menuICart?.items));

      console.log(menuICart, 'cart ===value');
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
    }
  };

  const toggleReload = () => setReload((prevstate) => !prevstate);

  const getCart = async () => {
    // setTimeout(() => {
    const sum = await cartItem?.map((v) => v?.amount);
    console.log(sum, cartItem?.length, '====summm====summ===');
    if (cartItem?.length !== 0) {
      let newsum = sum?.reduce(
        (sum: any, current: any) => parseInt(sum) + parseInt(current),
      );
      setTotal(newsum);
      setStates({totals: newsum});
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
      setReload(true);
      setParams(getEachItem);
    }
    setReload(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    cart();
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('adlistennerrrsss=====ssss=====');
      cart();
    });

    cart();
    // getMenuplanKart();

    return unsubscribe;
  }, [cartItem !== undefined && cartItem?.length]);

  const moreAction = (item: any) => {
    console.log(item, 'deletededddd======ssss====');
  };

  // cartItem.length === 0 ? cartItem : reload === true ? cartItem : null;

  return (
    <View style={{flex: 1}}>
      <View style={{marginLeft: 10}}>
        <SimpleHeader />
      </View>
      {refreshing !== true ? (
        <View style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{}}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => onRefresh()}
              />
            }>
            {/* {cartItem?.length !== undefined ? ( */}
            <View style={{flex: 1, marginBottom: 250}}>
              <FlatList
                data={cartItem}
                keyExtractor={() => shortid.generate()}
                // style={styles.listStyle}
                renderItem={({item}) => {
                  // console.log(item, 'addonssss====stringgg');
                  return (
                    cartItem?.length >= 1 && (
                      <Card
                        newMenu={(item) => moreAction(item)}
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
                ListFooterComponent={<></>}
                ListEmptyComponent={
                  <EmptyList
                    image={require('../../../assets/Images/emptyCart.png')}
                    title="FIND MEAL"
                    message="Oops! Your cart is empty"
                    onPress={() => navigation.navigate('Explore')}
                  />
                }
              />
            </View>

            {/* ) : ( */}

            {/* )} */}
          </ScrollView>
          {cartItem?.length >= 1 && (
            <View
              style={{
                width: '95%',
                alignSelf: 'center',
                // marginVertical: 20,
                bottom: '7%',
                // marginTop: '10%',
                position: 'absolute',
                // top: 0,
                backgroundColor: colors.white,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text>Total :</Text>
                {total !== '' && (
                  <PriceTag
                    price={Number(route?.params?.editTotal || total)}
                    clear
                  />
                )}
              </View>
              <Button
                title="CHECKOUT"
                type={ButtonType.solid}
                containerStyle={{
                  marginVertical: 5,
                  bottom: 10,
                }}
                buttonStyle={{backgroundColor: '#303030'}}
                onPress={() => {
                  total === ''
                    ? Alert('Please wait while we calculate your total')
                    : navigation.navigate('Checkout', {
                        params: cartParams,
                        subTotal: route?.params?.editTotal || total,
                      });
                }}
              />
            </View>
          )}
        </View>
      ) : (
        <View style={{marginTop: '20%'}}>
          <ActivityIndicator
            animating={refreshing}
            color={'green'}
            size={'large'}
          />
          <Text
            style={{textAlign: 'center', top: 120, fontFamily: 'Montserrat'}}>
            Getting your cart items ready..
          </Text>
        </View>
        // <View style={{marginTop: '20%'}}>
        //   <Skeleton />
        // </View>
      )}
      <View style={StyleFoot.footer}>
        <Footer navigation={navigation} mycart={mycart} />
      </View>
    </View>
  );
};

export default MyCart;
