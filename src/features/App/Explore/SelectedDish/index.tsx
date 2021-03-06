import React, {FC, useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
} from 'react-native';
import {
  PriceTag,
  Rating,
  DishTypes,
  ButtonType,
  Button,
  OmaCard,
  BaseInput,
  Adjust,
  ShowMessage,
  type,
  CheckBox,
  Alert,
} from '../../../../components';
import {Icon, Divider} from 'react-native-elements';
import CollapsibleView from '../Components/Collapsible';
import S from '../styles';
import {StackScreenProps} from '@react-navigation/stack';
import {MainStackParamList} from '../../../../navigation';
import {useNavigation} from '@react-navigation/native';
import {SimpleHeader, CheckBox1} from '../../../../components';
import {
  getMenuItemsById,
  getDeliveryAddress,
  createOrder,
  createmenuplanorderDetail,
  createMenuPlanOrder,
  getMenuitemCart,
  getProfile,
} from '../../../../FetchData';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../../../../store';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import {number, object} from 'yup/lib/locale';
import Message from '../../../../components/toaster/ShowMessage';
import api from '../../../../api';
import Collapsible from 'react-native-collapsible';
import ss from '../Components/Collapsible/styles';
import Modal from 'react-native-modal';
import ToggleSwitch from 'toggle-switch-react-native';
import {check, clock, clockNew, info} from '../../../../assets';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import s from '../../../App/Checkout/DeliveryOptions/styles';
import {colors} from '../../../../colors';
import {StyleFoot} from '../../../../navigation/styles';
import Footer from '../../../../navigation/footer';
import {cartStates} from '../../../../reducers/cart';
import Toast from 'react-native-toast-message';
import {SortCart} from '../../../../Utils/sortCart';
import {color} from 'react-native-reanimated';

type ExploreNavigationProps = StackScreenProps<MainStackParamList, 'Explore'>;

interface IProps {
  navigation: ExploreNavigationProps;
  route: any;
  menu: any;
}

const CardItem: FC<IProps> = ({route, menu}) => {
  const {
    id,
    cartId,
    menuPlan,
    planId,
    planTime,
    eachItem,
    editParams,
    plandate,
  } = route.params;
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation();
  const [meal, setMeal] = useState('meal');
  const [value, setValue] = useState('');
  const [menuItem, setMenuItem] = useState(menu);
  const [prices, setPrice] = useState(menuItem?.amount);
  const [prices1, setPrice1] = useState(menuItem?.amount);
  const [quantity, setQuantity] = useState(number);
  const [cartItem, setCartItem] = useState('');
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [firstProps, setFirstProps] = useState('');
  let [adds, setAdds] = useState([]);
  const [addQunty, setAdqunty] = useState(1);
  const [Preferences, setPreference] = useState([]);
  const [itemQty, setItemqty] = useState(1);
  const [total, setTotal] = useState(menuItem?.amount);
  const [addsTotal, setAddsTotal] = useState(0);
  const [switchs, setSwitchs] = useState(false);
  const [friendName, setFriendName] = useState('');
  const [friendPhone, setFriendPhone] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [bName, setBname] = useState('');
  const [rName, setRname] = useState('');
  const [checks, setChecks] = useState(false);
  const [checks1, setChecks1] = useState(false);
  const [deliveryOption, setDeliveryOptions] = useState('');
  const [time, setTime] = useState(null);
  const [items, setItems] = useState([]);
  const [addressId, setAddressId] = useState(null);
  const [myAddress, setMyAddress] = useState(null);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cartid, setCartId] = useState('');
  const [showTime, setShowTime] = useState(false);
  const [prefAmount, setPrefAmount] = useState(0);
  const [myId, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [branch, setBranch] = useState('');
  const [editPre, setEditPref] = useState([]);
  const [profile, setProfile] = useState('');
  const [load, setLoad] = useState(false);
  let grandsum;
  let [newgrand, setNewgrand] = useState('');

  const visibility = () => {
    setVisible((previousState) => !previousState);
    // setShowEndDate(true);
  };

  const toggleFriend = () => setSwitchs((prevstate) => !prevstate);

  const visibility1 = () => {
    setVisible1((previousState) => !previousState);
    // setShowEndDate(true);
  };

  const optionsForDelivery = (item: any) => {
    setShow((prevstate) => !prevstate);
    setDeliveryOptions(item);
  };
  const optionsForDelivery1 = (item: any) => {
    setShow1((prevstate) => !prevstate);
    setDeliveryOptions(item);
  };

  const text = (item: any) => {
    setTime(item);
    // console.log(item?.toDateString(), 'datedsssss');
  };

  const showCheck = () => {
    setChecks((prevstate) => !prevstate);
  };
  const showCheck1 = () => {
    setChecks1((prevstate) => !prevstate);
  };

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
    // console.log(allAdress?.data?.data?.rows, 'alladress');
  };

  const modal = () => {
    if (menuPlan == 'menuPlan') {
      setOpenModal(true);
    }
  };

  const userId = async () => {
    const userId = await AsyncStorage.getItem('userId');
    setId(userId);
    // console.log(userId, '======= = =useriddd');
  };

  const getItemDetail = async () => {
    setLoad(true);
    const userId = await AsyncStorage.getItem('userId');
    const item = await getMenuItemsById(route?.params?.id);
    const user = await getProfile(userId);
    const discount = item?.discount;
    const currentAmount = discount
      ? (item?.amount - discount).toFixed(2)
      : item?.amount;
    setTotal(currentAmount);
    setPrice(currentAmount);
    setPrice1(currentAmount);
    setMenuItem(item);
    console.log(userId, 'useriddd');

    console.log(user, 'uerrrrr=======');
    setProfile(user?.data);
    setMyAddress(user?.data?.address);
    setLoad(false);
  };

  const carts = async () => {
    const branch = await AsyncStorage.getItem('branchId');
    const newbranch = JSON.parse(branch);
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

  useEffect(() => {
    console.log(route.params, 'cartttttt');
    const unsubscribe = navigation.addListener('focus', () => {
      getItemDetail();
    });
    userId();
    const handleData = async () => {
      const regionName = await AsyncStorage.getItem('regionName');
      const branchName = await AsyncStorage.getItem('branchName');
      const branch = await AsyncStorage.getItem('branchId');
      const newbranch = JSON.parse(branch);
      setBranch(newbranch);
      setBname(branchName);
      setRname(regionName);
      // console.log(regionName, branchName, 'regionbranch');
    };

    handleData();
    getAddress();
    optionsForDelivery('Pick-Up'), toggleCheckOptions('Pick-Up');
  }, [route?.params?.id]);

  const body = {
    branchId: menuItem?.branchId,
    menuitemid: menuItem?.id,
    quantity: itemQty,
    amount: prices,
    addons: JSON.stringify(adds),
    Preferences: JSON.stringify(editPre),
    specialInstruction: value,
    menuplanid: planId,
    createdBy: myId,
    deliveryCharge: deliveryCharges,
    deliveryAddId: addressId,
    deliveryTime: time,
    deliveryAddress:
      deliveryOption === 'Pick-Up' ? `${bName}, ${rName}` : myAddress,
    deliveryOption: deliveryOption,
    orderForFriend: switchs,
    friendName: friendName,
    friendPhoneNumber: friendPhone,
    deliveryDate: new Date(),
  };

  const createCart = async (item: any) => {
    console.log(body, 'addingonnn===');
    setLoading(true);
    try {
      const cart = await api.post(`/orders/cart`, {
        branchId: body.branchId,
        menuitemid: body.menuitemid,
        quantity: body.quantity,
        amount: body.amount,
        addons: JSON.stringify(body.addons),
        preferences: body.Preferences,
        specialInstruction: body.specialInstruction,
        menuplanid: planId,
        createdBy: myId,
      });
      const addedCart = await cart?.data?.data;
      if (body?.amount === 'NaN') {
        Alert('Please wait as the item details load');
      } else {
        if (item == 'Buy now' && addedCart?.amount !== undefined) {
          setLoading(false);
          navigation.navigate('Checkout', {
            branchId: menuItem?.branchId,
            params: addedCart,
            paramsBuynow: 'buynow',
            // amount: menuItem?.amount,
          });
        } else if (addedCart?.amount !== undefined) {
          setLoading(false);
          Alert('Item added to cart successfully');
          setCartItem(addedCart);
          setCartId(addedCart?.id);
          // if (menuPlan != 'menuPlan') {
          navigation.goBack();
          carts();
          // }
          // console.log(addedCart, 'addedcaart');
        } else {
          setLoading(false);
          Alert('Sorry we could not process your order at this time');
        }
      }
    } catch (err) {
      setLoading(false);
      Alert('Sorry we could not process your order at this time');

      // console.log(err, 'cartError');
    }
  };

  const createBasket = async () => {
    setLoading(true);
    // console.log(addsTotal, 'bodyyyquntyyss');
    // console.log(body, 'bodyyy');
    console.log(myAddress, deliveryOption, time, addressId, 'idddddddssss====');
    try {
      if (addressId === null && deliveryOption === 'Delivery') {
        // ShowMessage('Hello', 'completed processing', 'successs');
        Alert(
          'please check if you have selected a delivery location, time and enter your delivery address',
        );
        // ShowMessage(
        //   type.INFO,
        //   'please check if you have selected a delivery location, time and enter your delivery address',
        // ); // dispatch(cartStates(addedCart));
        setLoading(false);
      } else if (time === null && deliveryOption === 'Delivery') {
        // ShowMessage('Hello', 'completed processing', 'successs');
        Alert(
          'please check if you have selected a delivery location, time and enter your delivery address',
        );

        // ShowMessage(
        //   type.INFO,
        //   'please check if you have selected a delivery location, time and enter your delivery address',
        // ); // dispatch(cartStates(addedCart));
        setLoading(false);
      } else if (myAddress === null && deliveryOption === 'Delivery') {
        // ShowMessage('Hello', 'completed processing', 'successs');
        Alert(
          'please check if you have selected a delivery location, time and enter your delivery address',
        );

        // ShowMessage(
        //   type.INFO,
        //   'please check if you have selected a delivery location, time and enter your delivery address',
        // ); // dispatch(cartStates(addedCart));
        setLoading(false);
      } else if (deliveryOption == 'Pick-Up' && time === null) {
        // ShowMessage('Hello', 'completed processing', 'successs');
        Alert('please check if you have selected time of meal');

        // ShowMessage(
        //   type.INFO,
        //   'please check if you have selected time of meal',
        // );
        setLoading(false);
      } else {
        const cart = await api.post(`orders/basket`, {
          branchId: body.branchId,
          menuitemid: body.menuitemid,
          quantity: body.quantity,
          amount: parseInt(body.amount) + parseInt(deliveryCharges),
          addons: JSON.stringify(body.addons),
          preferences: body.Preferences,
          specialInstruction: body.specialInstruction,
          menuplanid: planId,
          deliveryCharge: deliveryCharges,
          deliveryAddId: addressId,
          deliveryTime: time,
          deliveryAddress:
            deliveryOption === 'Pick-Up' ? `${bName}, ${rName}` : myAddress,
          deliveryOption: deliveryOption,
          orderForFriend: switchs,
          friendName: friendName,
          friendPhoneNumber: friendPhone,
          deliveryDate: plandate,
          createdBy: myId,
        });
        const addedCart = cart?.data?.data;
        if (menuPlan == 'menuPlan' && addedCart?.id !== undefined) {
          setLoading(false);
          setCartItem(addedCart);
          setCartId(addedCart?.id);
          // ShowMessage(type.DONE, 'Item added to basket successfully');
          navigation.goBack();
        } else if (addedCart?.id !== undefined) {
          setLoading(false);
          // ShowMessage(type.DONE, 'Item added to cart successfully'); // dispatch(cartStates(addedCart));
        }
        // console.log(addedCart, 'addedcaart');
      }
    } catch (err) {
      if (menuPlan == 'menuPlan' && err) {
        setLoading(false);
        // ShowMessage(
        //   type.ERROR,
        //   'An Error occured while adding your item to basket. Please ensure you supplied all the required details and try again',
        // );
      } else {
        setLoading(false);
        // ShowMessage(
        //   type.ERROR,
        //   'An Error occured while adding your item to cart. please ensure you supplied all the required details and try again',
        // ); // dispatch(cartStates(addedCart));
      }
      console.log(err, 'cartError');
    }
  };

  const editCart = async () => {
    try {
      const cart = await api.put(`/orders/cart`, {
        cartId: cartId,
        quantity: body.quantity,
        amount: total * body.quantity,
        addons: JSON.stringify(body.addons),
        Preferences: body.Preferences,
        specialInstruction: body.specialInstruction,
      });
      const addedCart = cart?.data?.data;
      // if (cart?.config?.response == 'Cart updated successfully') {
      Alert('Item edited successfully');
      setCartItem(addedCart);
      navigation.goBack();
    } catch (err) {
      console.log(err, 'cartError');
    }
  };

  let Image_Http_URL = {uri: menuItem?.imageUrl};

  const count = menuItem?.rating / menuItem?.ratingCount;

  const changeFirst = (newValue: any) => {
    setQuantity(newValue);
    // console.log(quantity, 'quantity');
  };

  const getQuantity = (item: any) => {
    setItemqty(item);
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [itemQty]);

  const submitProp = (item: any) => {
    setAdqunty(item);
  };

  //add item in addons
  const processAddons = (item: any) => {
    let previousItem: any = getSelectedItemFromAddons(item.id);
    if (previousItem) {
      previousItem['quantity'] = parseInt(previousItem.quantity + 1);
      previousItem['totalPrice'] =
        parseFloat(previousItem['totalPrice']) +
        parseFloat(previousItem.initialPrice);
    } else {
      let addonInitial = buildInitialAddonObject(item);
      adds.push(addonInitial);
    }

    calculateTotalAmount();
  };

  const removeAddon = (item: any) => {
    console.log(item, 'itemooo');
    let previousItem: any = getSelectedItemFromAddons(item.id);
    //remove item entirely from the array;
    if (previousItem['quantity'] == 1) {
      for (let i = 0; i < adds.length; i++) {
        if (adds[i].id == item.id) {
          adds.splice(i, 1);
          break;
        }
      }
      calculateTotalAmount();
      return;
    }
    if (previousItem) {
      previousItem['quantity'] = parseInt(previousItem.quantity - 1);
      previousItem['totalPrice'] =
        parseFloat(previousItem['totalPrice']) -
        parseFloat(previousItem.initialPrice);
    }
    calculateTotalAmount();
  };

  const calculateTotalAmount = () => {
    let totalPrefSum = 0;
    editPre.forEach((val: any) => {
      totalPrefSum += parseFloat(val.price);
    });

    let totalAddonSum = 0;
    adds.forEach((val: any) => {
      totalAddonSum += parseFloat(val.initialPrice) * parseFloat(val.quantity);
    });

    console.log(totalAddonSum, 'addons value');
    let totalItemAmount =
      (totalAddonSum + parseFloat(total) + parseFloat(totalPrefSum)) * itemQty;
    !isNaN(totalItemAmount) && setPrice(totalItemAmount);
  };

  const buildInitialAddonObject = (addon: any) => {
    return {
      id: addon?.id,
      name: addon?.Inventory?.itemName,
      price: addon?.price,
      quantity: 1,
      totalPrice: addon?.price,
      initialPrice: addon?.price,
      isExtra: addon?.isExtra == true ? true : false,
      originalQuantity: 1,
    };
  };

  const getSelectedItemFromAddons = (id: any) => {
    for (let i = 0; i < adds.length; i++) {
      if (adds[i].id == id) {
        return adds[i];
      }
    }
    return null;
  };

  const buildInitialPreference = (pref: any) => {
    return {
      id: pref?.id,
      name: pref?.name,
      price: pref?.unitPrice,
    };
  };

  const processPreference = (item: any) => {
    if (editPre?.length !== 0) {
      for (let i = 0; i < editPre.length; i++) {
        console.log(editPre[i], item, 'editedprffffcomparerrrr====');

        if (editPre[i]?.id !== item?.id) {
          let addonInitial = buildInitialPreference(item);
          editPre.push(addonInitial);
          console.log(editPre, 'editedprffffsss==hhhjg==');
          break;
        }
      }
    } else {
      let addonInitial = buildInitialPreference(item);
      editPre.push(addonInitial);
      console.log(editPre, 'editedprffffsss====');
    }
    calculateTotalAmount();
  };

  const removePreference = (item: any) => {
    for (let i = 0; i < editPre.length; i++) {
      console.log(editPre[i], item, 'editedprffffcomparerrrr====');

      if (editPre[i]?.id === item?.id) {
        editPre.splice(i, 1);
        console.log(editPre, item, 'editedprffffssminussss====');
        // break;
      }
    }
    calculateTotalAmount();
  };

  const deliveryTime = () => setShowTime((prev) => !prev);

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
      setShow(false);
      setChecks1(true);
    } else {
      setChecks1(false);
    }
  };

  const editProfile = () => {
    navigation.navigate('Profile'), setOpenModal(false);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ImageBackground
          style={S.sdImage}
          source={route.params.img || Image_Http_URL}>
          <View style={{marginLeft: 10}}>
            <SimpleHeader color={colors.white} />
          </View>
        </ImageBackground>
        <View style={S.sdContainer}>
          <Text style={{fontSize: 16, fontWeight: 'bold', maxWidth: '70%'}}>
            {menuItem?.itemName}
          </Text>
          <PriceTag
            itemPrice={'itemprice'}
            price={parseInt(Number(prices)) + parseInt(Number(deliveryCharges))}
          />
        </View>
        <ScrollView
          refreshControl={<RefreshControl refreshing={load} />}
          style={S.sdMain}>
          <View style={S.sdHold}>
            <View style={S.sdRating}>
              {/* <Rating rating={count} /> */}
              {/* <Icon
                name="share-alt"
                type="font-awesome-5"
                color="#000"
                size={18}
              /> */}
            </View>
            <DishTypes
              categories={menuItem?.menuItemCategories}
              dish1="Chinese"
              dish2="Continental"
              dish3="Gluten"
            />
            {/* <Text style={S.sdDelivery}>Delivery fee applies</Text> */}
          </View>
          <View style={{borderWidth: 1.5, borderColor: colors.t}} />

          <OmaCard
            title="Description"
            titleStyle={S.cdDescription}
            subTitle={menuItem?.description}
            subStyle={{paddingBottom: 13}}
            mainStyle={{paddingHorizontal: 12}}
          />

          <View style={{borderWidth: 1.5, borderColor: colors.t}} />

          <View style={{paddingHorizontal: 12, width: '100%'}}>
            <Button
              type={ButtonType.solid}
              title={'Add -Ons'}
              iconRight={true}
              iconName={!visible ? 'plus' : 'minus'}
              iconColor="rgba(48, 48, 48, 0.85)"
              iconSize={16}
              buttonStyle={ss.buttonStyle}
              titleStyle={ss.titleStyle}
              onPress={() => visibility()}
            />
            <Collapsible collapsed={!visible} style={{width: '100%'}}>
              <>
                {menuItem?.addons
                  ? menuItem?.addons.map((addon: any) => {
                      // console.log(addon, 'addonsss');
                      return (
                        <TouchableWithoutFeedback
                          onPress={() => {
                            // console.log('==do nothing==');
                          }}>
                          <View key={addon?.id}>
                            <Adjust
                              isAddon
                              itemAddon={addon}
                              processAddons={processAddons}
                              removeAddon={removeAddon}
                              props={(item: any) => submitProp(item)}
                              mainStyle={{
                                paddingVertical: 10,
                              }}
                              title={
                                addon?.isExtra == true
                                  ? `Extra ${addon?.Inventory?.itemName}`
                                  : addon?.Inventory?.itemName
                              }
                              price={addon?.price}
                              titleStyle={ss.adjustTitleStyle}
                            />
                            {/* <AddOns /> */}
                          </View>
                        </TouchableWithoutFeedback>
                      );
                    })
                  : null}
              </>
            </Collapsible>
          </View>
          <View style={{borderWidth: 1.5, borderColor: colors.t}} />

          {menuItem?.menuItemPreferences?.length !== 0 && (
            <View style={{paddingHorizontal: 12, width: '100%'}}>
              <Button
                type={ButtonType.solid}
                title={'Preferences'}
                iconRight={true}
                iconName={!visible1 ? 'plus' : 'minus'}
                iconColor="rgba(48, 48, 48, 0.85)"
                iconSize={16}
                buttonStyle={ss.buttonStyle}
                titleStyle={ss.titleStyle}
                onPress={() => visibility1()}
              />
              <Collapsible collapsed={!visible1} style={{width: '100%'}}>
                <>
                  {menuItem?.menuItemPreferences.map((preference: any) => (
                    <TouchableWithoutFeedback onPress={() => {}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <CheckBox
                          prefCheck={'pref'}
                          id={preference?.Preference?.id}
                          value={preference?.Preference?.unitPrice}
                          key={preference?.Preference?.id}
                          title={preference?.Preference?.name}
                          preferencAdd={() =>
                            processPreference(preference?.Preference)
                          }
                          prefRemove={() =>
                            removePreference(preference?.Preference)
                          }
                        />
                        <Text style={{paddingTop: 20}}>
                          {preference?.Preference?.unitPrice}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  ))}
                </>
              </Collapsible>
            </View>
          )}
          <View style={{borderWidth: 1.5, borderColor: colors.t}} />
          <Adjust
            mainquanty="main"
            props1={(item: any) => getQuantity(item)}
            mainStyle={{paddingVertical: 20}}
            title="Adjust Quantity"
          />
          <Divider />
          <View style={{borderWidth: 1.5, borderColor: colors.t}} />

          <OmaCard
            title="Special Instructions"
            titleStyle={{fontSize: 15, fontFamily: 'Montserrat'}}
            mainStyle={{paddingHorizontal: 12}}
            otherProps={
              <BaseInput
                value={value}
                onChangeText={(text) => setValue(text)}
                multiline={true}
                numberOfLines={5}
                inputStyle={{textAlignVertical: 'top'}}
                style={{
                  borderRadius: 4,
                  borderColor: colors.greyShade,
                  borderWidth: 1.5,
                  top: 15,
                }}
              />
            }
          />

          <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
            <Image source={clockNew} style={{height: 18, width: 18, top: 18}} />
            <Text
              style={{
                padding: 10,
                width: '90%',
                fontFamily: 'Montserrat',
                fontSize: 12,
              }}>
              Pre-order ends{' '}
              <Text style={{fontWeight: 'bold', color: colors.green}}>
                45mins
              </Text>{' '}
              before delivery time, as all our meals are prepared fresh.
            </Text>
          </View>
          {openModal == true ? (
            <Modal
              style={{
                backgroundColor: '#fff',
                marginTop: '100%',
                marginBottom: -20,
                width: '100%',
                alignSelf: 'center',
                borderTopEndRadius: 25,
                borderTopStartRadius: 25,
              }}
              isVisible={true}>
              <View
                style={{
                  flex: 1,
                  marginBottom: 30,
                }}>
                <ScrollView>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 15,
                      marginLeft: 15,
                      marginRight: 15,
                    }}>
                    <TouchableHighlight
                      underlayColor=""
                      activeOpacity={1}
                      onPress={() => {
                        setDeliveryCharges(0), setOpenModal(false);
                      }}>
                      <Text
                        style={{fontSize: 16, color: 'rgba(31, 31, 31, 0.45)'}}>
                        Cancel
                      </Text>
                    </TouchableHighlight>

                    {loading ? (
                      <ActivityIndicator
                        color="green"
                        size="large"
                        animating={loading}
                      />
                    ) : (
                      <TouchableHighlight
                        underlayColor=""
                        onPress={() => createBasket()}>
                        <Text style={{fontSize: 16, color: '#05944F'}}>
                          Done
                        </Text>
                      </TouchableHighlight>
                    )}
                  </View>

                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderColor: 'rgba(196, 196, 196, 0.35);',
                      marginTop: 15,
                    }}
                  />
                  <View style={{backgroundColor: '#FFFFFF'}}>
                    <View
                      style={{backgroundColor: 'rgba(246, 246, 246, 0.75)'}}>
                      <Text
                        style={{
                          fontFamily: 'Poppins',
                          fontSize: 16,
                          marginLeft: 15,
                          marginTop: 15,
                          marginBottom: 15,
                        }}>
                        {'Delivery Options'}
                      </Text>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                      <Button
                        title="Pick-up"
                        type={ButtonType.clear}
                        imageIcon={require('../../../../assets/Images/shipping.png')}
                        containerStyle={s.buttonContainer}
                        titleStyle={s.buttonTitle}
                        onPress={() => {
                          optionsForDelivery('Pick-Up'),
                            toggleCheckOptions('Pick-Up');
                          // showCheck()
                        }}
                      />
                      {checks == true ? (
                        <Image
                          style={{
                            height: 15,
                            width: 15,
                            marginTop: 10,
                            marginLeft: 10,
                          }}
                          source={check}
                        />
                      ) : null}
                    </View>

                    {show == true ? (
                      <TouchableOpacity
                        onPress={() => {
                          setDeliveryOptions('Pick-Up'),
                            toggleCheckOptions('Pick-Up');
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
                          // showCheck1(),
                          // setChecks(false);
                        }}
                        style={{marginLeft: 10, marginBottom: 10}}>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                          <Image
                            style={{marginLeft: 10}}
                            source={require('../../../../assets/Images/truck.png')}
                          />
                          <Text style={{marginLeft: 15}}>Delivery</Text>
                        </View>
                      </TouchableOpacity>
                      {checks1 == true ? (
                        <Image
                          style={{
                            height: 15,
                            width: 15,
                            marginTop: 10,
                            marginLeft: 10,
                          }}
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
                            borderWidth: 1,
                            backgroundColor: 'rgba(246, 246, 246, 0.7)',
                            height: 45,
                            marginRight: 5,
                            borderColor: colors.grey,
                          }}>
                          <TextInput
                            // onFocus={() =>
                            //   myAddress === null ? editProfile() : null
                            // }
                            value={myAddress}
                            style={{
                              backgroundColor: 'rgba(246, 246, 246, 0.7)',
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
                            source={require('../../../../assets/Images/edit.png')}
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
                              // setPrice(+value?.amount + +prices);
                              // setPrice1(+value?.amount + +prices);
                              setAddressId(value.id);
                              // setMyAddress(value?.label);
                              console.log(value, 'amountt');
                            }}
                          />
                        </View>
                      </View>
                    ) : null}
                  </View>

                  <View style={{marginTop: -50}}>
                    <Button
                      titleStyle={s.buttonTitle}
                      type={ButtonType.clear}
                      title={planTime}
                      containerStyle={{alignSelf: 'center'}}
                      onPress={() => {
                        setShowTime(false), setTime(planTime);
                      }}
                    />

                    <DropDownPicker
                      zIndex={0.5}
                      placeholder="Select time"
                      // open={open}
                      // value={value}
                      items={planTime}
                      // setOpen={setOpen}
                      setValue={value}
                      setItems={planTime}
                      onChangeItem={(value) => {
                        setShowTime(false), setTime(value.label);
                      }}
                    />
                  </View>

                  <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
                    <Image
                      source={info}
                      style={{height: 18, width: 18, top: 18}}
                    />
                    <Text
                      style={{
                        padding: 10,
                        width: '90%',
                        fontFamily: 'Montserrat',
                        fontSize: 12,
                      }}>
                      Delivery time
                      <Text style={{fontWeight: 'bold', color: colors.black}}>
                        <Text> </Text>
                        (Mon-Sat 8am-7pm), (Sun 10am-7pm).
                      </Text>
                      <Text> </Text>
                      Pick-up
                      <Text> </Text>
                      <Text style={{fontWeight: 'bold', color: colors.black}}>
                        (Mon-Sat 8am-7pm), (Sun 10am-9.30pm).
                      </Text>
                    </Text>
                  </View>
                </ScrollView>
              </View>
            </Modal>
          ) : null}

          {menuPlan == 'menuPlan' ? (
            <View
              style={{
                backgroundColor: '#FFFFFF',
                marginTop: 10,
                marginBottom: 10,
              }}>
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

          {cartId != undefined ? (
            <View style={{marginBottom: 20}}>
              <Button
                title="Edit"
                type={ButtonType.solid}
                containerStyle={{width: '35%', alignSelf: 'center'}}
                buttonStyle={{backgroundColor: '#303030', paddingVertical: 12}}
                iconColor="#FFF"
                iconName="cart-plus"
                iconSize={18}
                titleStyle={{color: 'white', marginHorizontal: 20}}
                onPress={() => {
                  editCart();
                }}
              />
            </View>
          ) : menuPlan == 'menuPlan' ? (
            <View style={{marginBottom: 20}}>
              {loading ? (
                <ActivityIndicator
                  color="green"
                  size="large"
                  animating={loading}
                />
              ) : (
                <Button
                  title="Add To Basket"
                  type={ButtonType.solid}
                  containerStyle={{
                    alignSelf: 'center',
                    height: 35,
                    width: 325,
                  }}
                  buttonStyle={{
                    backgroundColor: '#303030',
                    paddingVertical: 5,
                  }}
                  iconColor="#FFF"
                  iconName="cart-plus"
                  iconSize={18}
                  titleStyle={{
                    color: 'white',
                    marginHorizontal: 20,
                  }}
                  onPress={() => {
                    setOpenModal(true);
                  }}
                />
              )}
            </View>
          ) : (
            <View>
              {loading ? (
                <ActivityIndicator
                  color="green"
                  size="large"
                  animating={loading}
                />
              ) : (
                <View style={S.sdButtonBar}>
                  <Button
                    title="Add to cart"
                    type={ButtonType.solid}
                    containerStyle={{width: '65%'}}
                    buttonStyle={{
                      backgroundColor: '#303030',
                      paddingVertical: 12,
                    }}
                    iconColor="#FFF"
                    iconName="cart-plus"
                    iconSize={18}
                    titleStyle={{color: 'white', marginHorizontal: 20}}
                    onPress={() => {
                      createCart('Add to cart');
                    }}
                  />
                  <Button
                    title="Buy now"
                    type={ButtonType.solid}
                    containerStyle={{width: '30%'}}
                    buttonStyle={{backgroundColor: '#EEE'}}
                    titleStyle={{color: 'black', fontWeight: 'bold'}}
                    onPress={() => {
                      createCart('Buy now');
                    }}
                  />
                </View>
              )}
            </View>
          )}
        </ScrollView>
        {/* <View style={StyleFoot.footer}>
          <Footer navigation={navigation} meal={meal} />
        </View> */}
      </View>
    </KeyboardAvoidingView>
  );
};

export default CardItem;
