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
import {useNavigation} from '@react-navigation/native';
import {getMenuitemCart} from '../../../FetchData';

const MyCart = () => {
  const [state, setState] = useState({toggle: false});
  const [carts, setCart] = useState();
  const [cartParams, setParams] = useState();
  const [total, setTotal] = useState();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(true);

  const cart = async () => {
    try {
      const menuICart = await getMenuitemCart();
      setCart(menuICart?.items);
      const getEachItem = menuICart.items.map((item: any) => {
        return {
          menuplanid: item.menuplanid,
          menuitemid: item.menuitemid,
          branchid: item.branchId,
          cartId: item.id,
        };
      });
      setParams(getEachItem);
      const sum = menuICart?.items?.map((v) => v?.amount);
      let newsum = sum.reduce(
        (sum: any, current: any) => parseInt(sum) + parseInt(current),
      );
      setTotal(newsum);
      console.log(menuICart, 'cartttttt');
      console.log(menuICart.length, 'cart ===value');
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    cart();
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // this.componentDidMount();
      cart();
    });
    return unsubscribe;
    // cart();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <FlatList
        data={carts}
        keyExtractor={() => shortid.generate()}
        // style={styles.listStyle}
        renderItem={({item}) => {
          // console.log(item?.MenuItem?.id);
          return (
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
            />
          );
        }}
        ListFooterComponent={
          <>
            {carts && (
              <View
                style={{width: '90%', alignSelf: 'center', marginVertical: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text>Total :</Text>
                  <PriceTag price={total} clear />
                </View>
                <Button
                  title="CHECKOUT"
                  type={ButtonType.solid}
                  containerStyle={{
                    marginVertical: 20,
                  }}
                  buttonStyle={{backgroundColor: '#303030'}}
                  onPress={() =>
                    navigation.navigate('Checkout', {
                      params: cartParams,
                      subTotal: total,
                    })
                  }
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
