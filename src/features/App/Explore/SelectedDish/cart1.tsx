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
} from '../../../../components';
import {Icon, Divider} from 'react-native-elements';
import CollapsibleView from '../Components/Collapsible';
import S from '../styles';
import {StackScreenProps} from '@react-navigation/stack';
import {MainStackParamList} from '../../../../navigation';
import {useNavigation} from '@react-navigation/native';
import {
  getMenuItemsById,
  getDeliveryAddress,
  createOrder,
  createmenuplanorderDetail,
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
import {check} from '../../../../assets';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import s from '../../../App/Checkout/DeliveryOptions/styles';
import {add} from 'react-native-reanimated';

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
    addon,
  } = route.params;

  const navigation = useNavigation();
  const [value, setValue] = useState(null);
  const [menuItem, setMenuItem] = useState(menu);
  const [prices, setPrice] = useState(eachItem?.amount);
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
  const [itemQtyAddons, setItemqtyAddons] = useState(addon);
  const [total, setTotal] = useState(menuItem?.amount);
  const [addsTotal, setAddsTotal] = useState('');
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
  const [time, setTime] = useState('');
  const [items, setItems] = useState([]);
  const [addressId, setAddressId] = useState(0);
  const [myAddress, setMyAddress] = useState('');
  const [deliveryCharges, setDeliveryCharges] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cartid, setCartId] = useState('');
  const [showTime, setShowTime] = useState(false);
  const [newItem, setNewItem] = useState([]);
  const [branch, setBranch] = useState('');

  const visibility = () => {
    setVisible((previousState) => !previousState);
    // setShowEndDate(true);
  };

  const toggleFriend = () => setSwitchs((prevstate) => !prevstate);

  const visibility1 = () => {
    setVisible1((previousState) => !previousState);
    // setShowEndDate(true);
  };

  const optionsForDelivery = () => {
    setShow((prevstate) => !prevstate);
    setDeliveryOptions(`${bName}, ${rName}`);
  };
  const optionsForDelivery1 = () => {
    setShow1((prevstate) => !prevstate);
  };

  const text = (item: any) => {
    setTime(item);
    console.log(item?.toDateString(), 'datedsssss');
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
    console.log(allAdress?.data?.data?.rows, 'alladress');
  };

  const modal = () => {
    if (menuPlan == 'menuPlan') {
      setOpenModal(true);
    }
  };

  let eachItems = JSON.parse(eachItem?.addons);
  useEffect(() => {
    // const pushtoadds = () => {
    //   JSON.parse(addon)?.map((item) =>
    //     adds.push({
    //       id: item?.id,
    //       name: item?.name,
    //       price: item?.price,
    //       quantity: item?.quantity,
    //       totalPrice: item?.totalPrice,
    //       initialPrice: item?.price,
    //       isExtra: item?.isExtra == true ? true : false,
    //       originalQuantity: 1,
    //     }),
    //   );
    // };

    // pushtoadds();
    // console.log(pushtoadds, '====pushhhhttooooaaadddssss ====');
    console.log(eachItem, eachItem, addon, '====eachitemmm ====');
    const handleData = async () => {
      const regionName = await AsyncStorage.getItem('regionName');
      const branchName = await AsyncStorage.getItem('branchName');
      const branch = await AsyncStorage.getItem('branchId');
      const newbranch = JSON.parse(branch);
      setBranch(newbranch);

      setBname(branchName);
      setRname(regionName);
      console.log(regionName, branchName, 'regionbranch');
    };

    handleData();
    getAddress();
    console.log(id, cartId, planId, planTime, eachItem, 'paramssssmmm');
    getItemDetail();
  }, []);

  const body = {
    branchId: menuItem?.branchId,
    menuitemid: menuItem?.id,
    quantity: itemQty,
    amount: parseInt(total) * parseInt(itemQty) + parseInt(addsTotal),
    addons: JSON.stringify(adds),
    Preferences: JSON.stringify(Preferences),
    specialInstruction: value,
    menuplanid: planId,
  };

  const editCart = async () => {
    let newbody = {
      cartId: cartId,
      quantity: body.quantity,
      amount: prices,
      addons: JSON.stringify(body.addons),
      specialInstruction: body.specialInstruction,
    };
    console.log(newbody, 'bodyyy====');
    try {
      const cart = await api.put('/orders/cart', newbody);
      const addedCart = cart?.data?.data;
      ShowMessage(type.DONE, 'Item edited successfully'); // dispatch(cartStates(addedCart));
      setCartItem(addedCart);
      navigation.goBack();
      console.log(cart, 'editedcartttt======');
    } catch (err) {
      console.log(err, 'cartError');
    }
  };

  const getItemDetail = async () => {
    const item = await getMenuItemsById(id);
    console.log(item.amount, 'itemssssss');
    setTotal(eachItem?.amount);
    setPrice(eachItem?.amount);
    setMenuItem(eachItem);
  };

  let Image_Http_URL = {uri: menuItem?.MenuItem.imageUrl};

  const count = menuItem?.rating / menuItem?.ratingCount;

  const changeFirst = (newValue: any) => {
    setQuantity(newValue);
    console.log(quantity, 'quantity');
  };

  const getAddons = () => {};
  const getPreference = () => {};

  const getQuantity = (item: any) => {
    console.log('=====quantity====', item);
    // console.log(item, 'itemss');
    setItemqty(item);
    // parseInt(total) * parseInt(item) + parseInt(addsTotal);
    let newPrice = parseInt(item) * parseInt(eachItem?.amount);
    // console.log(newPrice, prices1, prices, 'newpricess');
    newPrice != 0 ? setPrice(newPrice) : null;
  };

  const submitProp = (item: any) => {
    // console.log(item, 'quantity');
    // setFirstProps(item);
    setAdqunty(item);
  };

  //add item in addons
  const processAddons = (item: any) => {
    console.log(item, 'itemmmprocessss====');
    let previousItem: any = getSelectedItemFromAddons(item.id);
    if (previousItem) {
      previousItem['quantity'] = parseInt(previousItem.quantity + 1);
      console.log(previousItem.quantity + 1, 'itemmmprocessss====');

      previousItem['totalPrice'] =
        parseFloat(previousItem['totalPrice']) +
        parseFloat(previousItem.initialPrice);
    } else {
      let addonInitial = buildInitialAddonObject(item);
      adds.push(addonInitial);
    }

    const sum = adds?.map((v) => v?.totalPrice);
    let newsum = sum.reduce(
      (sum: any, current: any) => parseInt(sum) + parseInt(current),
    );

    setAddsTotal(newsum);
    setPrice(parseInt(newsum) + parseInt(total));
    setPrice1(parseInt(newsum) + parseInt(total));
    console.log(newsum, 'newsummmmmssssss');
    // console.log(prices, 'pricesss');
  };

  //remove item from addons
  const removeAddon = (item: any) => {
    console.log(item, 'itemaddons=======');
    let previousItem: any = getSelectedItemFromAddons(item.id);
    //remove item entirely from the array;
    if (previousItem['quantity'] >= 1) {
      for (let i = 0; i < adds.length; i++) {
        if (adds[i].id == item.id) {
          adds.splice(i, 1);
          break;
        }
      }
      calculateItemSumTotalFromWithAddons();
      return;
    }
    if (previousItem) {
      previousItem['quantity'] = parseInt(previousItem.quantity - 1);
      previousItem['totalPrice'] =
        parseFloat(previousItem['totalPrice']) -
        parseFloat(previousItem.initialPrice);
    }
    calculateItemSumTotalFromWithAddons();
  };

  const calculateItemSumTotalFromWithAddons = () => {
    const sum = adds?.map((v) => v?.totalPrice);
    console.log('====total sum===', sum);
    if (sum.length > 0) {
      let newsum = sum.reduce(
        (sum: any, current: any) => parseInt(sum) + parseInt(current),
      );
      console.log(newsum, '===price total ===' + total);
      setAddsTotal(newsum);
      setPrice(parseInt(newsum) + parseInt(total));
      setPrice1(parseInt(newsum) + parseInt(total));
    } else {
      setPrice(parseInt(total));
      setPrice1(parseInt(total));
    }
  };

  const buildInitialAddonObject = (addon: any) => {
    console.log(addon, 'initialllladdonss=======');
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

  const deliveryTime = () => {
    setShowTime(true);
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={S.sdImage}
        source={route.params.img || Image_Http_URL}
      />
      <View style={S.sdContainer}>
        <Text>{menuItem?.MenuItem.itemName}</Text>
        <PriceTag price={prices} />
      </View>
      <ScrollView style={S.sdMain}>
        <View style={S.sdHold}>
          <View style={S.sdRating}>
            <Rating rating={count} />
            <Icon
              name="share-alt"
              type="font-awesome-5"
              color="#000"
              size={18}
            />
          </View>
          <DishTypes
            categories={menuItem?.menuItemCategories}
            dish1="Chinese"
            dish2="Continental"
            dish3="Gluten"
          />
          <Text style={S.sdDelivery}>Delivery fee applies</Text>
        </View>
        <OmaCard
          title="Description"
          titleStyle={S.cdDescription}
          subTitle={menuItem?.MenuItem.description}
          subStyle={{paddingBottom: 13}}
          mainStyle={{paddingHorizontal: 12}}
        />
        <Divider />
        {/* <CollapsibleView
          itemPreferences={menuItem?.menuItemPreferences}
          addOns={menuItem?.addons}
          title="Add-Ons"
        /> */}
        <Divider />

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
              {/* {console.log(
                JSON.parse(itemQtyAddons)?.map((item) => item),
                '===consolleedddd====',
              )} */}
              {JSON.parse(itemQtyAddons)?.map((addons: any) => {
                console.log(
                  JSON.parse(itemQtyAddons)?.map((item) => item),
                  '===consolleedddd====',
                );

                return (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      console.log('==do nothing==');
                    }}>
                    <View key={addons?.id}>
                      <Adjust
                        itemEdit
                        quantity={addons?.quantity}
                        isAddon
                        itemAddon={addons}
                        processAddons={processAddons}
                        removeAddon={removeAddon}
                        props={(item: any) => submitProp(item)}
                        mainStyle={{paddingVertical: 10}}
                        title={
                          addons?.isExtra == true
                            ? `Extra ${addons?.name} `
                            : addons?.name
                        }
                        price={Number(addons?.totalPrice).toFixed(2)}
                        titleStyle={ss.adjustTitleStyle}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </>
          </Collapsible>
        </View>

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
              {menuItem?.menuItemPreferences?.map((preference: any) => (
                <TouchableWithoutFeedback
                  onPress={() => {
                    console.log(preference?.Preference?.name, 'preefereeeenn');
                    JSON.stringify(
                      Preferences.push(preference?.Preference?.name),
                    );
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <CheckBox
                      key={preference?.Preference?.id}
                      title={preference?.Preference?.name}
                      props={(item: any) => Preferences.push(item)}
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
        {/* <CollapsibleView
          itemPreferences={menuItem?.menuItemPreferences}
          addOns={menuItem?.addons}
          title="Preference"
        /> */}

        <Divider />
        <Adjust
          itemEdit
          edit={eachItem?.quantity}
          props1={(item: any) => getQuantity(item)}
          mainStyle={{paddingVertical: 20}}
          title="Adjust Quantity"
        />
        <Divider />
        <OmaCard
          title="Special Instructions"
          titleStyle={{fontSize: 15}}
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
                borderColor: 'rgba(48, 48, 48, 0.85)',
                borderWidth: 1,
              }}
            />
          }
        />
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
                    underlayColor="rgba(0, 0, 0, 0.2)"
                    activeOpacity={1}
                    onPress={() => setOpenModal(false)}>
                    <Text
                      style={{fontSize: 16, color: 'rgba(31, 31, 31, 0.45)'}}>
                      Cancel
                    </Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor="rgba(0, 0, 0, 0.2)"
                    onPress={() => deliveryTime()}>
                    <Text style={{fontSize: 16}}>Select Time</Text>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={() => orderNow()}>
                    <Text style={{fontSize: 16, color: '#05944F'}}>Done</Text>
                  </TouchableHighlight>
                </View>

                <View
                  style={{
                    borderBottomWidth: 1,
                    borderColor: 'rgba(196, 196, 196, 0.35);',
                    marginTop: 15,
                  }}
                />
                <View style={{backgroundColor: '#FFFFFF'}}>
                  <View style={{backgroundColor: 'rgba(246, 246, 246, 0.75)'}}>
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
                        optionsForDelivery(), showCheck();
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
                          // borderWidth: 0.5,
                          backgroundColor: 'rgba(246, 246, 246, 0.7)',
                          height: 45,
                          marginRight: 5,
                        }}>
                        <TextInput
                          style={{
                            backgroundColor: 'rgba(246, 246, 246, 0.7)',
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
                            setAddressId(value.id);
                            setMyAddress(value?.label);
                            console.log(value, 'amountt');
                          }}
                        />
                      </View>
                    </View>
                  ) : null}
                </View>

                {showTime == true ? (
                  <View>
                    <Button
                      titleStyle={s.buttonTitle}
                      type={ButtonType.clear}
                      title={planTime}
                      containerStyle={{alignSelf: 'center'}}
                      onPress={() => {
                        setShowTime(false), setTime(planTime);
                      }}
                    />
                  </View>
                ) : null}
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
            <Button
              title="Add To Basket"
              type={ButtonType.solid}
              containerStyle={{alignSelf: 'center', height: 40}}
              buttonStyle={{backgroundColor: '#303030', paddingVertical: 12}}
              iconColor="#FFF"
              iconName="cart-plus"
              iconSize={18}
              titleStyle={{color: 'white', marginHorizontal: 20}}
              onPress={() => {
                createCart();
              }}
            />
          </View>
        ) : (
          <View style={S.sdButtonBar}>
            <Button
              title="Add to cart"
              type={ButtonType.solid}
              containerStyle={{width: '65%'}}
              buttonStyle={{backgroundColor: '#303030', paddingVertical: 12}}
              iconColor="#FFF"
              iconName="cart-plus"
              iconSize={18}
              titleStyle={{color: 'white', marginHorizontal: 20}}
              onPress={() => {
                createCart();
              }}
            />
            <Button
              title="Buy now"
              type={ButtonType.solid}
              containerStyle={{width: '30%'}}
              buttonStyle={{backgroundColor: '#EEE'}}
              titleStyle={{color: 'black', fontWeight: 'bold'}}
              onPress={() => {
                navigation.navigate('Checkout', {
                  branchId: menuItem?.branchId,
                  amount: menuItem?.amount,
                });
              }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CardItem;
