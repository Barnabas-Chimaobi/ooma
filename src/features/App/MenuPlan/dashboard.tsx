import React, {useState, useEffect, useRef} from 'react';
import {Image, TouchableNativeFeedback} from 'react-native';

import SearchTab from './components/homeSearchComp';
import {SafeAreaView, StyleSheet, ActivityIndicator, View} from 'react-native';
import {Basket} from '../../../components/Basket/index';
import {useNavigation} from '@react-navigation/native';
import {getMenuPlanCart} from '../../../FetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {basketStates} from '../../../reducers/basket';
import {AppDispatch, RootState} from '../../../store';

const App = () => {
  const [refreshing, setRefreshing] = useState(true);
  const [, setDataSource] = useState([]);
  const [tabState, setTabState] = useState(0);
  const [planCart, setPlanCart] = useState('');
  const tabRef = useRef(null);

  const navigation = useNavigation();
  const dispatch: AppDispatch = useDispatch();
  const basketItem = useSelector(
    (state: RootState) => state.basketState.payload,
  );

  useEffect(() => {
    const getMenuplanKart = async () => {
      const branch = await AsyncStorage.getItem('branchId');
      const newbranch = JSON.parse(branch);
      const userId = await AsyncStorage.getItem('userId');
      console.log(userId, 'useriddd');

      const menuplanscart = await getMenuPlanCart(userId, newbranch);
      setPlanCart(menuplanscart?.items);
      dispatch(basketStates(menuplanscart?.items));
      // console.log(menuplanscart, '=======planscarttttttt=========');
      const all = menuplanscart?.items?.map((item: any) => item.MenuPlan);
      let all1 = all?.map((item: any) => item.MenuPlanDetails);
      setRefreshing(false);
      // console.log(all1, '=====all1======');
    };
    const unsubscribe = navigation.addListener('focus', () => {
      getMenuplanKart();
    });
    getMenuplanKart();
    // console.log('consoleddddddddd');
    getData();
  }, []);
  const getData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        setRefreshing(false);
        setDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // console.warn({tabState});

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        {/* {refreshing ? (
          <ActivityIndicator
            animating={refreshing}
            color={'green'}
            size={'large'}
          />
        ) : null} */}
        <View style={styles.nav}>
          <Basket
            counts={basketItem?.length}
            onBasketPress={(itemCount) =>
              navigation.navigate('Cart', {
                cartItems: planCart,
              })
            }
            otherStyles={{
              left: 2,
              top: 4,
              position: 'relative',
            }}
          />
          {tabState === 0 ? null : (
            <TouchableNativeFeedback
              onPress={() => navigation.navigate('MenuHistory')}>
              <Image source={require('./assets/history-1.png')} />
            </TouchableNativeFeedback>
          )}
        </View>
        <SearchTab ref={tabRef} getIndex={(index) => setTabState(+index)} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 10,
  },
  itemStyle: {
    fontSize: 20,
    padding: 10,
  },
  basket: {
    backgroundColor: 'white',
    borderRadius: 100,
    width: 35,
    height: 35,
    marginBottom: 10,
    marginLeft: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default App;
