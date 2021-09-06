import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {HeaderBar, Logo} from '../../../../components';
import Modal from '../../../../components/Overlay';
import {
  notification,
  active,
  profile,
  direction,
  clock,
  filter,
  user,
  oomaNotify,
  profilePics,
  pointDown,
  nologo,
} from '../../../../assets';
import S from '../styles';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getRegion,
  getBranches,
  getMenuItemsByBranch,
  getMenuItemsSpecialOffer,
  getMenuItemsPopular,
  getMenuItemsNew,
  GetAllMenuItemCategory,
  SearchMenuItemByCategoryId,
  SearchMenuItemAndMenuPlan,
  GetAllMenuPlanCategory,
  getMenuPlansByBranch,
} from '../../../../FetchData';
import {getMenuItems} from '../../../../reducers/MenuItems';
import {getSpecialOffer} from '../../../../reducers/SpecialOffer';
import {getNewItem} from '../../../../reducers/NewMenuItem';
import {getPopularItem} from '../../../../reducers/PopularItem';
import {getMenuItemsForYou} from '../../../../reducers/MoreForYouMenu';
import {getGlutenMenuItems} from '../../../../reducers/GlutenFreeMenu';
import {getDrinkMenuItems} from '../../../../reducers/DrinkMenu';
import {getBreakFastMenuItems} from '../../../../reducers/BreakFastMenu';
import {useMenuItemCategory} from '../../../../reducers/ItemCategory';
import {useMenuPlanCategory} from '../../../../reducers/MenuPlanCategory';
import {getMenuItemsHistory} from '../../../../reducers/HistoryMenu';
import {getMenuItemsPlanForYou} from '../../../../reducers/MenuPlansForYou';
import {AppDispatch} from '../../../../store';
interface Props {
  closeModal: () => void;
}

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const [state, setState] = useState({country: ''});
  const [regionId, setRegionId] = useState(0);
  const [branchId, setBranchId] = useState('');
  const [modalData, setModalData] = useState([]);
  const [modalData2, setModalData2] = useState([]);
  const [asyncBranchId, setAsyncBranchId] = useState('');
  const [bName, setBname] = useState('');
  const [rName, setRname] = useState('');
  const [branch, setBranch] = useState('');
  const dispatch: AppDispatch = useDispatch();

  // const handleGetRegion = async () => {
  //   const allRegion = await getRegion();
  //   if (allRegion) {
  //     setModalData(allRegion);
  //   }
  // };

  const handleGetBranches = async () => {
    const regionIds = await AsyncStorage.getItem('regionId');
    const allBranches = await getBranches(regionIds);
    console.log(allBranches, '====alllbranchesss=====');

    if (allBranches) {
      console.log(allBranches, '====alllbranchesss=====');
      setModalData2(allBranches);
      setModalData(allBranches);
    }
  };

  const anyBranch = async () => {
    const branch = await AsyncStorage.getItem('branchId');
    const newbranch = JSON.parse(branch);
    setBranch(newbranch);
  };

  useEffect(() => {
    anyBranch();
    handleGetBranches();
    // const checkBranch = async () => {
    //   if (await AsyncStorage.getItem('branchId')) {
    //     const branchId = await AsyncStorage.getItem('branchId');
    //     branchId && getAllMenuItems(branchId, 1);
    //     // setShowModal(false);
    //   }
    // };
    console.log('connssssoollleedddd');
    const handleData = async () => {
      const branch = await AsyncStorage.getItem('branchId');
      const newbranch = JSON.parse(branch);
      // setBranch(newbranch);
      // const branchId = await AsyncStorage.getItem('branchId');
      // const regionIds = await AsyncStorage.getItem('regionId');
      const regionName = await AsyncStorage.getItem('regionName');
      const branchName = await AsyncStorage.getItem('branchName');

      setBname(branchName);
      setRname(regionName);
      // console.log(regionName, branchName, 'regionbranch');

      // setRegionId(Number(regionIds));
      // setAsyncBranchId(String(branchId));
      // if (Number(regionIds) === 0) {
      //   // handleGetRegion();
      //   // setShowModal(!showModal);
      // } else if (branchId != null) {
      //   // setShowModal(showModal);
      //   // showBranches(Number(regionIds));
      // } else {
      //   setRegionId(Number(regionIds));
      //   showBranches(Number(regionIds));
      // }

      // if (branch != null) {
      getAllMenuItems(newbranch, 1);
      // }
    };

    handleData();
    // checkBranch();
  }, []);

  // useEffect(() => {
  //   showBranches(regionId);
  // }, [regionId]);

  const showBranches = (id: number) => {
    handleGetBranches(id);
    setShowModal(!showModal);
  };

  const transformRegionData = () => {
    return regionId === 0
      ? modalData.map((data) => ({
          label: data?.name,
          value: data?.id,
          icon: () => <Icon name="flag" size={18} color="#900" />,
          hidden: false,
          type: 'region',
        }))
      : regionId !== 0
      ? modalData2.map((data) => ({
          label: data?.address,
          value: data?.id,
          icon: () => <Icon name="flag" size={18} color="#900" />,
          hidden: false,
          type: 'branch',
        }))
      : null;
  };

  // const getMenuItemsCategory = async(from: number, branchID: string, page:number) => {
  //   const menuItem =  await getMenuItemsByBranch(branchID, page)
  //   menuItem.length = 5
  //   console.log(menuItem.length, "wwwww")
  //   const removedMenu = menuItem.splice(from, 1)
  //   const newMenuItems =  menuItem.splice(0,0, removedMenu)
  //   console.log(newMenuItems, "aaaa")
  //   return newMenuItems
  // }

  const getMenuPlanCategory = async (branchID: string) => {
    const planCategories = await GetAllMenuPlanCategory(branchID);
    dispatch(useMenuPlanCategory(planCategories));
    // console.log(planCategories, '====plancategory==========' + branchID);
  };

  const getMenuPlansForYouCategory = async (branchID: string, page: number) => {
    const menuItem = await getMenuPlansByBranch(branchID, page);
    console.log(menuItem, 'menuplanforyouuuuu');
    dispatch(getMenuItemsPlanForYou(menuItem));
  };

  const getMenuItem = async (branchID: string, page: number) => {
    const menuItem = await getMenuItemsByBranch(branchID, page);
    dispatch(getMenuItems(menuItem));
    // console.log(menuItem, 'newmenuitemmmmsss=========================');
  };
  const getSpecial = async (branchID: string, page: number) => {
    const specialOffer = await getMenuItemsSpecialOffer(branchID, page);

    dispatch(getSpecialOffer(specialOffer));
    // console.log(menuItem?.data?.item, 'newmenuitemmmmsss');
  };
  const getPopular = async (branchID: string, page: number) => {
    const popularMenuItems = await getMenuItemsPopular(branchID, page);

    dispatch(getPopularItem(popularMenuItems));

    // console.log(menuItem?.data?.item, 'newmenuitemmmmsss');
  };
  const getNew = async (branchID: string, page: number) => {
    const newMenuItems = await getMenuItemsNew(branchID, page);

    dispatch(getNewItem(newMenuItems));
  };

  const getGlutenCategory = async (branchID: number, page: number) => {
    const menuItem = await SearchMenuItemByCategoryId(branchID, page);

    dispatch(getGlutenMenuItems(menuItem?.data?.items));
  };

  const getDrinkCategory = async (branchID: number, page: number) => {
    const menuItem = await SearchMenuItemByCategoryId(branchID, page);

    console.log(menuItem, 'drinks');
    dispatch(getDrinkMenuItems(menuItem?.data?.items));
  };

  const getBreakFastCategory = async (branchID: number, page: number) => {
    const menuItem = await SearchMenuItemByCategoryId(branchID, page);

    dispatch(getBreakFastMenuItems(menuItem?.data?.items));
  };

  const getHistoryCategory = async (branchID: number, page: number) => {
    const menuItem = await SearchMenuItemByCategoryId(branchID, page);
  };

  const getAllMenuItems = async (branchID: string, page: number) => {
    getMenuPlanCategory(branchID);
    getMenuPlansForYouCategory(branchID, page);
    getMenuItem(branchID, page);
    getNew(branchID, page);
    getPopular(branchID, page);
    getSpecial(branchID, page);
    const allCategory = await GetAllMenuItemCategory(branchID);
    console.log(allCategory, 'alllcategoryyyyyyy=====================');
    dispatch(useMenuItemCategory(allCategory));
    let shuffled = allCategory
      ?.map((a: any) => ({sort: Math.random(), value: a}))
      ?.sort((a: any, b: any) => a.sort - b.sort)
      ?.map((a: any) => a.value.id);
    console.log(shuffled, 'shuffleddd');
    // const moreForYou = await SearchMenuItemByCategoryId(shuffled[1], page);
    if (allCategory != null) {
      getGlutenCategory(shuffled[0], page);
      getBreakFastCategory(shuffled[1], page);
      getDrinkCategory(shuffled[2], page);
    }
    // getMenuPlanCategory(branchID);
  };

  const Drop = ({closeModal}: Props) => {
    return (
      <View style={styles.modalContent}>
        {/* {asyncBranchId != '' ? ( */}
        <DropDownPicker
          placeholder={regionId > 0 ? 'Select A Branch' : 'Select Region'}
          items={transformRegionData()}
          defaultValue={state.country}
          dropDownMaxHeight={250}
          containerStyle={{height: 40}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={async (item) => {
            if (item.type === 'region') {
              await AsyncStorage.setItem(
                'regionId',
                JSON.stringify(item.value),
              );
              setRegionId(item.value);
              showBranches(Number(item.value));
            } else {
              await AsyncStorage.setItem(
                'branchId',
                JSON.stringify(item.value),
              );
              setBranchId(item.value);
              getAllMenuItems(item.value, 1);
            }
            setState({
              country: item.label,
            });
            closeModal();
          }}
        />
        {/* ) : null} */}
      </View>
    );
  };

  return (
    <View style={S.header}>
      <View style={S.logoBar}>
        <Logo logoStyle={{width: 40, height: 40}} />
        <View style={S.notificationBar}>
          <Image source={oomaNotify} style={{height: 20, width: 20}} />
          <Image source={active} style={S.activenotifications} />
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => navigation.navigate('Profile')}>
            <Avatar
              size="small"
              rounded
              source={user}
              iconStyle={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={S.locationBar}>
        <HeaderBar
          onPressImg={() =>
            navigation.navigate('Branch', {branch: 'changeBranch'})
          }
          image1={pointDown}
          title={`${bName}, ${rName}`}
          image2={clock}
          otherTitle="Set Time"
        />
        <TouchableHighlight
          underlayColor=""
          onPress={() => navigation.navigate('Filter')}>
          <View
            style={{width: 60, height: 60, marginRight: -20, marginTop: 10}}>
            <Image source={filter} style={{height: 20, width: 20}} />
          </View>
        </TouchableHighlight>
        <Modal
          isVisible={showModal}
          child={<Drop closeModal={() => setShowModal(!showModal)} />}
          onBackdropPress={() => setShowModal(!showModal)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    width: 250,
    height: 300,
    position: 'relative',
    bottom: 0,
  },
});
