import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
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
} from '../../../components';
import {check} from '../../../assets';
import S from './styles';
import s from '../../App/Checkout/DeliveryOptions/styles';
import DeliveryOptions from './DeliveryOptions';
import RadioSelect from './RadioSelect';
import {useNavigation, useRoute} from '@react-navigation/native';
import ModalMessage from '../../../components/CartMessagesModal';
import {
  createOrder,
  getDeliveryAddress,
  createMenuItemOrderDetail,
} from '../../../FetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import {parse, types} from '@babel/core';
import ToggleSwitch from 'toggle-switch-react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Checkout = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params;
  const [deliveryOption, setDeliveryOptions] = useState('');
  const [myAddress, setMyAddress] = useState('');
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [deliveryCharges, setDeliveryCharges] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [date, setDate] = useState(new Date());
  const [addressId, setAddressId] = useState(0);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [switchs, setSwitchs] = useState(false);
  const [friendName, setFriendName] = useState('');
  const [friendPhone, setFriendPhone] = useState('');
  const [bName, setBname] = useState('');
  const [rName, setRname] = useState('');
  const [checks, setChecks] = useState(false);
  const [checks1, setChecks1] = useState(false);

  const getAddress = async () => {
    const adress = await AsyncStorage.getItem('branchId');
    const parseAddress = JSON.parse(adress);
    // console.log(parseAddress);
    const allAdress = await getDeliveryAddress(parseAddress);
    const mapping = allAdress?.data?.data?.rows?.map((item: any) =>
      items.push({
        label: item?.address,
        value: item?.address,
        amount: item?.amount,
        id: item?.id,
      }),
    );
    // setItems(mapping);
    // items.push(mapping);
    console.log(allAdress?.data?.data?.rows, 'alladress');
  };
  let a = 50;
  let b = 60;
  useEffect(() => {
    const handleData = async () => {
      const regionName = await AsyncStorage.getItem('regionName');
      const branchName = await AsyncStorage.getItem('branchName');

      setBname(branchName);
      setRname(regionName);
      console.log(regionName, branchName, 'regionbranch');
    };

    console.log(params, a + b, 'paramssss');
    handleData();
    getAddress();
  }, []);

  const body = {
    isMenuPlan: false,
    branchId: '82059935-89dc-4daf-aff3-adcf997d6859',
    subTotal: params?.subTotal,
    total: parseInt(deliveryCharges) + parseInt(params?.subTotal),
    paymentMethod: paymentMethod,
    paymentType: 'FullPayment',
    deliveryCharge: deliveryCharges,
    deliveryAddId: addressId,
    cartIds: params?.params?.map((item: any) => item?.cartId),
    deliveryTime: date?.toLocaleDateString(),
    deliveryAddress: myAddress,
    deliveryOption: deliveryOption,
    orderForFriend: switchs,
    friendName: friendName,
    friendPhoneNumber: friendPhone,
  };

  const orderNow = async () => {
    console.log(body, 'idddddddd');
    if (myAddress == '' && deliveryOption == '') {
      ShowMessage(
        type.INFO,
        'please select either a pick-up location or enter your delivery address or location',
      ); // dispatch(cartStates(addedCart));
    } else {
      const cart = await createOrder(body);
      const orderNow = await createMenuItemOrderDetail(body, cart?.id);
      ShowMessage(type.DONE, 'Order Placed successfully'); // dispatch(cartStates(addedCart));
      console.log(cart, 'cart');
      console.log(orderNow, 'cart');
      navigation.navigate('RateUs');
    }
  };

  const radio1 = (item: any) => [console.log(item, 'eacvaueee')];

  const radio2 = (item: any) => {
    setPaymentMethod(item);
    console.log(item, 'eachvalue');
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

  const optionsForDelivery = () => {
    setShow((prevstate) => !prevstate);
    setDeliveryOptions(`${bName}, ${rName}`);
  };
  const optionsForDelivery1 = () => {
    setShow1((prevstate) => !prevstate);
  };

  const toggleFriend = () => setSwitchs((prevstate) => !prevstate);

  const text = (item: any) => {
    setDate(item);
    console.log(item?.toDateString(), 'datedsssss');
  };

  const showCheck = () => {
    setChecks((prevstate) => !prevstate);
  };
  const showCheck1 = () => {
    setChecks1((prevstate) => !prevstate);
  };

  return (
    <ScrollView style={S.main}>
      <View style={S.header}>
        <HeaderBar
          image1={require('../../../assets/Images/clock.png')}
          title="Set Time"
          image2={require('../../../assets/Images/clock.png')}
          rejig
          // rejigTitle="4:30 pm"
          // otherTitle = date
          modes={(item: any) => text(item)}
          onPressImg={() => {}}
        />
      </View>
      {/* <DeliveryOptions title="Delivery Options" /> */}
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
              optionsForDelivery(), showCheck();
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
            onPress={() => setDeliveryOptions(`${bName}, ${rName}`)}
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
              optionsForDelivery1(), showCheck1();
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
                // borderWidth: 0.5,
                backgroundColor: '#fff',
                height: 45,
                marginRight: 5,
              }}>
              <TextInput
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 5,
                }}
                placeholder="12 ooma street Enugu"
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
                  setDeliveryCharges(value.amount);
                  setAddressId(value.id);
                  setMyAddress(value?.label);
                  console.log(value, 'amountt');
                }}
              />
            </View>
          </View>
        ) : null}
      </View>
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
      <View style={{backgroundColor: '#FFFFFF', marginTop: 10}}>
        <RadioSelect
          title="Payment Method"
          title1="Card"
          title2="Cash"
          type="Payment Method"
          props={(item: any) => radio2(item)}
        />
      </View>

      <View
        style={{backgroundColor: '#FFFFFF', marginTop: 10, marginBottom: 10}}>
        <TouchableHighlight>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              justifyContent: 'space-between',
              marginRight: 15,
            }}>
            <Text style={{marginLeft: 15, fontWeight: 'bold', fontSize: 17}}>
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
              value={friendPhone}
              placeholder="Friend's Phone No"
              onChangeText={(text) => setFriendPhone(text)}
            />
          </View>
        ) : null}
      </View>
      <Total
        subTotal={params?.subTotal || params?.amount}
        deliveryCharges={deliveryCharges}
        total={
          parseInt(deliveryCharges) +
          parseInt(params?.subTotal || params?.amount)
        }
        mainStyle={S.totalStyle}
      />
      {/* <ModalMessage
        route="Wallet"
        message="Oops! You do not have sufficient funds for this transaction."
        openButtonTitle="ORDER NOW"
        closeButtonTitle="Fund Wallet"
      /> */}
      <View style={S.footerStyle}>
        <Button
          onPress={() => {
            orderNow();
          }}
          title="ORDER NOW"
          type={ButtonType.solid}
          containerStyle={S.buttonStyle}
        />
      </View>
    </ScrollView>
  );
};

export default Checkout;
