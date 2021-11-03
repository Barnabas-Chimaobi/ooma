import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  BackHandler,

  // Alert,
} from 'react-native';
import {
  HeaderBar,
  OmaCard,
  InputPrimary,
  Total,
  ButtonType,
  Button,
  ShowMessage,
  type,
  Alert,
  SimpleHeader,
} from '../../../components';
import {check, info} from '../../../assets';
import S from './styles';
import s from '../../App/Checkout/DeliveryOptions/styles';
import DeliveryOptions from './DeliveryOptions';
import RadioSelect from './RadioSelect';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
  NavigationAction,
  CommonActions,
} from '@react-navigation/native';
import ModalMessage from '../../../components/CartMessagesModal';
import {
  createMenuItemOrder,
  getDeliveryAddress,
  createMenuItemOrderDetail,
  createMenuPlanOrder,
  getMenuitemCart,
  getProfile,
} from '../../../FetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import {parse, types} from '@babel/core';
import ToggleSwitch from 'toggle-switch-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import index from '../Settings/Profile/second';
import {cartStates} from '../../../reducers/cart';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../../../store';
import {instantSuccess, mealSuccess} from '../../../assets';
import {colors} from '../../../colors';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SortCart} from '../../../Utils/sortCart';

const Checkout = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const params = route?.params;
  const [deliveryOption, setDeliveryOptions] = useState('');
  const [myAddress, setMyAddress] = useState(null);
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [date, setDate] = useState(new Date());
  const [addressId, setAddressId] = useState(null);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [switchs, setSwitchs] = useState(false);
  const [friendName, setFriendName] = useState('');
  const [friendPhone, setFriendPhone] = useState('');
  const [bName, setBname] = useState('');
  const [rName, setRname] = useState('');
  const [checks, setChecks] = useState(false);
  const [checks1, setChecks1] = useState(false);
  const [cartId, setCartId] = useState('');
  const [orderChannel, setOrderChannel] = useState('');
  const [orderName, setOrderName] = useState('');
  const [branch, setBranch] = useState('');
  const [payState, setPayState] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [exitHome, setExitHome] = useState(false);

  const carts = async () => {
    const branch = await AsyncStorage.getItem('branchId');
    const newbranch = await JSON.parse(branch);
    const userId = await AsyncStorage.getItem('userId');
    console.log(userId, 'useriddd');
    // const gottenId = JSON.parse(userId);

    try {
      // console.log(newsum, 'cartttttt');

      const menuICart = await getMenuitemCart(newbranch, userId);
      SortCart(menuICart?.items);
      await dispatch(cartStates(menuICart?.items));
    } catch (error) {}
  };

  const getAddress = async () => {
    const adress = await AsyncStorage.getItem('branchId');
    const userId = await AsyncStorage.getItem('userId');
    const parseAddress = JSON.parse(adress);
    // console.log(parseAddress);
    const allAdress = await getDeliveryAddress(parseAddress);
    const user = await getProfile(userId);
    const mapping = allAdress?.data?.data?.rows?.map((item: any) =>
      items.push({
        label: item?.address,
        value: item?.address,
        amount: item?.amount,
        id: item?.id,
      }),
    );
    setMyAddress(user?.data?.address);
    console.log(user, 'uerrrrr=======');

    // setItems(mapping);
    // items.push(mapping);
    console.log(allAdress?.data?.data?.rows, 'alladress');
  };
  let a = 50;
  let b = 60;

  //   const onBackPress = () => {
  //   navigation.reset({
  //     index: 0,
  //     routes: [{name: 'Home'}],
  //   });
  // };

  const onBackPress = () => {
    setExitHome(true);
    console.log(success, 'success==sss====');
    if (success === true) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Home'}, {name: 'Home'}],
        }),
      );
      setSuccess(false);
      // setExitHome(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [success]),
  );

  useEffect(() => {
    // BackHandler.addEventListener('hardwareBackPress', backHandler);
    const unsubscribe = navigation?.addListener('focus', () => {
      getAddress();
    });

    // console.log(params, a + b, 'paramssss');
    // console.log(params?.paramsBuynow?.amount, a + b, 'paramssss');

    const handleData = async () => {
      const regionName = await AsyncStorage.getItem('regionName');
      const branchName = await AsyncStorage.getItem('branchName');
      const newBranchId: any = await AsyncStorage.getItem('branchId');
      const branchs = await JSON.parse(newBranchId);
      setBranch(branchs);
      console.log(branchs, 'branchiddddd');

      setBname(branchName);
      setRname(regionName);
      console.log(regionName, branchName, 'regionbranch');
    };

    optionsForDelivery('Pick-Up'), toggleCheckOptions('Pick-Up');
    handleData();
    // getAddress();
    // return () =>
    //   BackHandler.removeEventListener('hardwareBackPress', backHandler);
  }, []);

  const body = {
    isMenuPlan: !params?.planOrder
      ? false
      : params?.paramsBuynow === 'buynow'
      ? false
      : true,
    branchId: branch,
    subTotal: params?.subTotal || params?.params?.amount,
    total:
      params?.paramsBuynow === 'buynow'
        ? parseInt(deliveryCharges) + parseInt(params?.params?.amount)
        : parseInt(deliveryCharges) + parseInt(params?.subTotal),
    paymentMethod: paymentMethod,
    paymentType: 'FullPayment',
    deliveryCharge: deliveryCharges,
    deliveryAddId: addressId,
    cartIds:
      params?.paramsBuynow === 'buynow'
        ? params?.params?.id?.toString()
        : !params?.planOrder
        ? params?.params?.map((item: any) => item?.cartId)?.toString()
        : params?.params?.map((item: any) => item.id)?.toString(),
    deliveryTime: date,
    deliveryAddress:
      deliveryOption == 'Pick-Up' ? `${bName}, ${rName}` : myAddress,
    deliveryOption: deliveryOption,
    orderForFriend: switchs,
    friendName: friendName,
    friendPhoneNumber: friendPhone,
    orderChannel: 'MOBILE',
    orderName: params?.planOrder ? params?.planOrderName : orderName,
  };

  const totalAmount =
    params?.paramsBuynow === 'buynow'
      ? parseInt(deliveryCharges) + parseInt(params?.params?.amount)
      : parseInt(deliveryCharges) + parseInt(params?.subTotal);

  const orderNow = async () => {
    setLoading(true);
    console.log(body, '===iddddddddconfirmedd=====');
    if (deliveryOption === 'Delivery' && !addressId) {
      Alert('please select a pick-up location and enter your delivery address');
      // ShowMessage(
      //   type.INFO,
      //   'please select a pick-up location and enter your delivery address',
      // ); // dispatch(cartStates(addedCart));
      setLoading(false);
    } else if (deliveryOption === 'Delivery' && !myAddress) {
      Alert('please select a pick-up location and enter your delivery address');
      // ShowMessage(
      //   type.INFO,
      //   'please select a pick-up location and enter your delivery address',
      // ); // dispatch(cartStates(addedCart));
      setLoading(false);
    } else if (paymentMethod === '') {
      Alert('please select a payment method to proceed with your order');
      // ShowMessage(
      //   type.INFO,
      //   'please select a payment method to proceed with your order',
      // ); // dispatch(cartStates(addedCart));
      setLoading(false);
    } else {
      const cart = await createMenuItemOrder(body);
      carts();
      console.log(cart, 'cartttttt=====');
      if (cart?.statusCode === 201) {
        // if (payState !== 'CARD') {
        //   ShowMessage(type.DONE, 'Order Placed successfully'); // dispatch(cartStates(addedCart));
        // }
        setLoading(false);
        if (payState === 'CARD') {
          navigation?.navigate('Payment', {
            planOrderState: params?.planOrder,
            amount: totalAmount,
            branchId: branch,
            orderId: cart?.data?.data?.id,
            paymentMethod: payState,
          });
        } else {
          setLoading(false);
          setSuccess(true);
          // navigation.navigate('Home');
        }
      } else {
        setLoading(false);
        Alert('An error occured while placing your orders. Please try again');
        // ShowMessage(
        //   type.ERROR,
        //   'An error occured while placing your orders. Please try again',
        // ); // dispatch(cartStates(addedCart));
      }
    }
  };

  const PlanOrder = async () => {
    setLoading(true);
    // console.log(body, 'idddddddd');
    // if (myAddress == '' && deliveryOption == '') {
    //   ShowMessage(
    //     type.INFO,
    //     'please select either a pick-up location or enter your delivery address or location',
    //   ); // dispatch(cartStates(addedCart));
    // } else {
    const cart = await createMenuPlanOrder(body);
    // const orderNow = await createMenuItemOrderDetail(body, cart?.id);
    if (paymentMethod === '') {
      Alert('please select a payment method to proceed with your order');
      // ShowMessage(
      //   type.INFO,
      //   'please select a payment method to proceed with your order',
      // ); // dispatch(cartStates(addedCart));
      setLoading(false);
    } else {
      if (cart?.statusCode === 201) {
        setLoading(false);
        // if (payState !== 'CARD') {
        //   ShowMessage(type.DONE, 'Order Placed successfully'); // dispatch(cartStates(addedCart));
        // }
        if (payState === 'CARD') {
          navigation?.navigate('Payment', {
            planOrderState: params?.planOrder,
            amount: totalAmount,
            branchId: branch,
            orderId: cart?.data?.data?.id,
            paymentMethod: payState,
          });
        } else {
          setLoading(false);
          setSuccess(true);
          // navigation.navigate('Home');
        }
      } else {
        setLoading(false);
        Alert('An error occured while placing your orders. Please try again');
        // ShowMessage(
        //   type.ERROR,
        //   'An error occured while placing your orders. Please try again',
        // ); // dispatch(cartStates(addedCart));
      }
    }

    // console.log(cart, 'cart');
    // console.log(orderNow, 'cart');
    // }
  };

  const radio1 = (item: any) => [console.log(item, 'eacvaueee')];

  const radio2 = (item: any) => {
    setPaymentMethod(item);
    console.log(item, 'eachvalue');
    setPayState(item);
  };

  const radio3 = (item: any) => {
    setOrderChannel(item);
    console.log(item, 'eachvalue3333');
  };

  //    const setOpen = (open) =>  {
  //     this.setState({
  //       open
  //     });
  //   }

  const changeText = (callback: any) => {
    console.log(callback, 'callbackkkk');
  };

  //   const setItems = (callback: any) => {

  //     this.setState(state => ({
  //       items: callback(state.items)
  //     }));
  //   }

  const optionsForDelivery = (item) => {
    setShow((prevstate) => !prevstate);
    // setDeliveryOptions(`${bName}, ${rName}`);
    setDeliveryOptions(item);
  };
  const optionsForDelivery1 = (item) => {
    setDeliveryOptions(item);
    setShow1((prevstate) => !prevstate);
  };

  const toggleFriend = () => setSwitchs((prevstate) => !prevstate);

  const text = (item: any) => {
    setDate(item);
    console.log(item, 'datedsssss');
  };

  const showCheck = () => {
    setChecks((prevstate) => !prevstate);
  };
  const showCheck1 = () => {
    setChecks1((prevstate) => !prevstate);
  };

  const toggleCheckOptions = (item: any) => {
    if (item === 'Pick-Up') {
      setChecks(true);
      setShow1(false);
      setDeliveryCharges(0);
      setAddressId(null);
      setMyAddress(null);
    } else {
      setChecks(false);
    }

    if (item === 'Delivery') {
      setChecks1(true);
      setShow(false);
    } else {
      setChecks1(false);
    }
  };
  const editProfile = () => {
    navigation.navigate('Profile');
  };

  return success ? (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <ImageBackground
          style={{width: '100%', height: Dimensions.get('screen').height}}
          source={params?.planOrder ? mealSuccess : instantSuccess}>
          {/* <ActivityIndicator
            color={colors.green}
            size="large"
            animating={exitHome}
            style={{zIndex: 5}}
          /> */}
          <View
            style={{
              top: Dimensions.get('screen').height / 1.125,
              // height: Dimensions.get('screen').height,
              width: Dimensions.get('screen').width / 2.3,
              alignSelf: 'center',
              // zIndex: 5,
              flex: 1,
              // backgroundColor: colors.black,
            }}>
            {/* <TouchableHighlight
              style={{top: Dimensions.get('screen').height / 1.125}}
              underlayColor=""
              onPress={() => {
                setSuccess(false), navigation.navigate('Home');
              }}>
              <Text style={{color: colors.white}}>Go to Home</Text>
            </TouchableHighlight> */}

            <Button
              onPress={() => {
                setSuccess(false), navigation.navigate('Home');
              }}
              title="Go to home"
              titleStyle={{
                fontFamily: 'Montserrat',
                fontWeight: 'bold',
                fontSize: 18,
              }}
              buttonStyle={{borderRadius: 15}}
            />
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  ) : (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <View style={{marginLeft: 10}}>
        <SimpleHeader />
      </View>
      <ScrollView style={S.main}>
        {!params?.planOrder && (
          <View style={S.header}>
            <HeaderBar
              checkout="checkout"
              image1={require('../../../assets/Images/clock.png')}
              title="Schedule order"
              image2={require('../../../assets/Images/clock.png')}
              rejig
              // rejigTitle="4:30 pm"
              // otherTitle = date
              modes={(item: any) => text(item)}
              onPressImg={() => {}}
            />
          </View>
        )}

        {/* <DeliveryOptions title="Delivery Options" /> */}
        {/* {!params?.planOrder && ( */}
        <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
          <Image source={info} style={{height: 18, width: 18, top: 18}} />
          <Text
            style={{
              padding: 10,
              width: '90%',
              fontFamily: 'Montserrat',
              fontSize: 12,
            }}>
            Delivery time <Text style={{fontWeight: 'bold'}}> 8am - 7pm</Text>.
            Pick-up time <Text style={{fontWeight: 'bold'}}>8am - 9:30pm</Text>.
          </Text>
        </View>

        {!params?.planOrder && (
          <View style={{backgroundColor: '#FFFFFF'}}>
            <Text
              style={{
                fontFamily: 'Poppins',
                fontSize: 16,
                fontWeight: 'bold',
                marginLeft: 15,
                marginTop: 15,
              }}>
              {'Delivery Options'}
            </Text>

            <View style={{flexDirection: 'row'}}>
              <Button
                title="Pick-up"
                type={ButtonType.clear}
                imageIcon={require('../../../assets/Images/shipping.png')}
                containerStyle={s.buttonContainer}
                titleStyle={s.buttonTitle}
                onPress={() => {
                  optionsForDelivery('Pick-Up'), toggleCheckOptions('Pick-Up');
                }}
              />
              {checks == true ? (
                <Image
                  style={{height: 15, width: 15, marginTop: 10, marginLeft: 10}}
                  source={check}
                />
              ) : null}
            </View>

            {show == true ? (
              <TouchableOpacity
                onPress={() => {
                  optionsForDelivery('Pick-Up'), toggleCheckOptions('Pick-Up');
                }}
                style={{marginVertical: 10}}>
                <View>
                  <Text
                    style={{
                      borderWidth: 0.5,
                      padding: 5,
                      width: '70%',
                      alignSelf: 'flex-start',
                      marginLeft: 20,
                      borderRadius: 5,
                    }}>{`${bName}, ${rName}`}</Text>
                </View>
              </TouchableOpacity>
            ) : null}

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  optionsForDelivery1('Delivery'),
                    toggleCheckOptions('Delivery');
                }}
                style={{marginLeft: 10, marginBottom: 10}}>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <Image
                    style={{marginLeft: 10}}
                    source={require('../../../assets/Images/truck.png')}
                  />
                  <Text style={{marginLeft: 15}}>Delivery</Text>
                </View>
              </TouchableOpacity>
              {checks1 == true ? (
                <Image
                  style={{height: 15, width: 15, marginTop: 10, marginLeft: 10}}
                  source={check}
                />
              ) : null}
            </View>
          </View>
        )}

        {/* )} */}
        <View style={{marginTop: 10}}>
          {show1 == true ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 10,
                marginLeft: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '50%',
                  borderRadius: 5,
                  borderWidth: 1,
                  backgroundColor: '#fff',
                  height: 45,
                  marginRight: 5,
                  borderColor: colors.grey,
                }}>
                <TextInput
                  // onFocus={() => (myAddress === null ? editProfile() : null)}
                  value={myAddress}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 5,
                  }}
                  placeholder="enter address"
                  onChangeText={(text) => setMyAddress(text)}
                  multiline={true}
                />
                <Image
                  style={{
                    // marginLeft: 5,
                    height: 15,
                    width: 15,
                    top: 15,
                    marginRight: 0,
                  }}
                  source={require('../../../assets/Images/edit.png')}
                  resizeMode="contain"
                />
              </View>

              <View style={{width: '50%'}}>
                <DropDownPicker
                  placeholder="Select location"
                  // open={open}
                  // value={value}
                  items={items}
                  // setOpen={setOpen}
                  setValue={value}
                  setItems={items}
                  onChangeItem={(value) => {
                    setDeliveryCharges(value?.amount);
                    setAddressId(value?.id);
                    // setMyAddress(value?.label);
                    console.log(value, 'amountt');
                  }}
                />
              </View>
            </View>
          ) : null}
        </View>
        {/* {!params?.planOrder && (
        <View style={{backgroundColor: '#FFFFFF'}}>
          <RadioSelect
            title="I Will Pay"
            title1="Now"
            title2="On Delivery"
            defaultTitle="title1"
            type="I Will Pay"
            props={(item: any) => radio1(item)}
          />
        </View>
      )} */}
        <View style={{backgroundColor: '#FFFFFF', marginTop: 10}}>
          {params?.planOrder && (
            <RadioSelect
              amount={
                parseInt(deliveryCharges) +
                parseInt(
                  params?.subTotal || params?.amount || params?.params?.amount,
                )
              }
              orderId={cartId}
              branchId={branch}
              title="Payment Method"
              title1="CARD"
              type="Payment Method"
              props={(item: any) => radio2(item)}
            />
          )}

          {!params?.planOrder && (
            <View>
              <View style={{borderWidth: 1.5, borderColor: colors.t}} />
              <RadioSelect
                amount={
                  parseInt(deliveryCharges) +
                  parseInt(
                    params?.subTotal ||
                      params?.amount ||
                      params?.params?.amount,
                  )
                }
                orderId={cartId}
                branchId={branch}
                title="Payment Method"
                title1="CARD"
                title2="CASH"
                type="Payment Method"
                props={(item: any) => radio2(item)}
              />
            </View>
          )}
        </View>

        {!params?.planOrder ? (
          <View
            style={{
              backgroundColor: '#FFFFFF',
              marginTop: 10,
              marginBottom: 10,
            }}>
            <View style={{borderWidth: 1.5, borderColor: colors.t}} />
            <TouchableHighlight>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 10,
                  justifyContent: 'space-between',
                  marginRight: 15,
                }}>
                <Text
                  style={{marginLeft: 15, fontWeight: 'bold', fontSize: 17}}>
                  Order For a friend
                </Text>
                <ToggleSwitch
                  isOn={switchs}
                  onColor="#fff"
                  offColor="rgba(196, 196, 196, 0.15);"
                  trackOnStyle={{
                    borderRadius: 50,
                    backgroundColor: 'rgba(196, 196, 196, 0.15)',
                  }}
                  trackOffStyle={{borderRadius: 50}}
                  thumbOnStyle={{borderRadius: 50, backgroundColor: 'green'}}
                  thumbOffStyle={{
                    borderRadius: 50,
                    backgroundColor: 'grey',
                  }}
                  labelStyle={{color: 'black', fontWeight: '900'}}
                  size="small"
                  onToggle={(isOn: any) => {
                    toggleFriend(), console.log('changed to : ', isOn);
                  }}
                />
              </View>
            </TouchableHighlight>

            {switchs == true ? (
              <View style={{backgroundColor: 'white', marginBottom: 20}}>
                <TextInput
                  style={{
                    backgroundColor: 'rgba(196, 196, 196, 0.15);',
                    width: '90%',
                    alignSelf: 'center',
                    marginTop: 20,
                    borderRadius: 15,
                    padding: 5,
                  }}
                  value={friendName}
                  placeholder="Friend's Name"
                  onChangeText={(text) => setFriendName(text)}
                />

                <TextInput
                  style={{
                    backgroundColor: 'rgba(196, 196, 196, 0.15);',
                    width: '90%',
                    alignSelf: 'center',
                    marginTop: 20,
                    borderRadius: 15,
                    padding: 5,
                  }}
                  keyboardType={'phone-pad'}
                  value={friendPhone}
                  placeholder="Friend's Phone No"
                  onChangeText={(text) => setFriendPhone(text)}
                />
              </View>
            ) : null}
          </View>
        ) : null}

        <View style={{}}>
          <View style={{borderWidth: 1.5, borderColor: colors.t}} />

          <Total
            checkout={'checkout'}
            subTotal={Number(
              params?.subTotal || params?.amount || params?.params?.amount,
            )}
            deliveryCharges={
              !params?.planOrder ? Number(deliveryCharges) : undefined
            }
            total={Number(
              parseInt(deliveryCharges) +
                parseInt(
                  params?.subTotal || params?.amount || params?.params?.amount,
                ),
            )}
            mainStyle={S.totalStyle}
          />
        </View>
        <View style={{flexDirection: 'row', paddingHorizontal: 10, top: -20}}>
          <Image source={info} style={{height: 18, width: 18, top: 18}} />
          <Text
            style={{
              padding: 10,
              width: '90%',
              fontFamily: 'Montserrat',
              fontSize: 12,
            }}>
            This is a daily instant order. You can schedule this meal and more
            for other days, weeks or months from meal plan.
          </Text>
        </View>
      </ScrollView>
      {params?.planOrder ? (
        <View style={S.footerStyle}>
          {loading ? (
            <ActivityIndicator color="green" size="large" animating={loading} />
          ) : (
            <Button
              onPress={() => {
                PlanOrder();
              }}
              title="SUBSCRIBE NOW"
              type={ButtonType.solid}
              containerStyle={S.buttonStyle}
            />
          )}
        </View>
      ) : (
        <View style={S.footerStyle}>
          {loading ? (
            <ActivityIndicator color="green" size="large" animating={loading} />
          ) : (
            <Button
              onPress={() => {
                orderNow();
              }}
              title="ORDER NOW"
              type={ButtonType.solid}
              containerStyle={S.buttonStyle}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default Checkout;
