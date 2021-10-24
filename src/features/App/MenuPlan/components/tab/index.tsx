import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import AllMenu from './all';
import OfficeMenu from './office';
import VeganMenu from './vegan';
import FamilyMenu from './family_kids';
import Search from '../homeSearchComp/search';
import {
  getMenuPlansByBranch,
  GetAllMenuPlanCategory,
  getPlanCatId,
  getMenuPlanCart,
  getMenuitemCart,
} from '../../../../../FetchData';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from './../../../../../store';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import {NativeBaseProvider, Box} from 'native-base';
import DynamicTabView from 'react-native-dynamic-tab-view';
import {getMenuItemsPlanForYou} from '../../../../../reducers/MenuPlansForYou';
import {getFindPlan} from '../../../../../reducers';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import {latest} from 'immer/dist/internal';
import {colors} from '../../../../../colors';
import {EmptyList} from '../../../../../components';

const initialLayout = {width: Dimensions.get('window').width};

const MenuTab = () => {
  const navigation = useNavigation();
  let route = useRoute();
  const params = route?.params;
  const [index, setIndex] = React.useState(0);
  const [value, onChangeText] = useState('');
  const [] = useState([]);
  const [routes1, setRoutes1] = useState([]);
  let [scenes, setScenes] = useState({});
  const [branchId, setBranchId] = useState('');
  const [menuPlans, setMenuPlans]: any = useState();
  const [menuPlans1, setMenuPlans1] = useState();
  const [menuPlan2, setMenuPlan2] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(true);
  const [param, setparam] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const {menuPlanCategories} = useSelector(
    (state: RootState) => state?.menuPlanCategories,
  );
  const menuPlansMenuItem = useSelector(
    (state: RootState) => state?.menuItemPlanForYou?.payload,
  );
  const findPlansItem = useSelector(
    (state: RootState) => state?.findPlanState?.payload,
  );
  const dispatch: AppDispatch = useDispatch();
  const basketItem = useSelector(
    (state: RootState) => state?.basketState?.payload,
  );

  const menuPlan = async (id: any) => {
    setLoader(true);
    console.log(id, 'allplannnnnssss');
    const allPlan = await GetAllMenuPlanCategory(id);
    const mapPlan = allPlan?.map((item: any) => {
      return {
        title: item.name,
        key: item.name,
        id: item.id,
      };
    });
    // await getMenuplanKart(1);
    setLoader(false);
    // console.log(allPlan, '====alllrplannnn=======');
    if (mapPlan !== undefined) {
      setRoutes1(mapPlan);
    }
  };

  const getMenuplanKart = async (id, param) => {
    console.log(id, 'plannnnniiiiidddddsssss=====');
    setLoader(true);
    const branch = await AsyncStorage.getItem('branchId');
    const newbranch = JSON.parse(branch);
    const menuplanscart = await getPlanCatId(newbranch, id);
    console.log(newbranch, menuplanscart, 'useriddd');
    // setPlanCart(menuplanscart?.items);
    // dispatch(getMenuItemsPlanForYou(menuplanscart));
    dispatch(getFindPlan(menuplanscart));
    // setLoader(false);
    // console.log(menuplanscart, '=======planscategoryyyyyyyyy=========');
    setLoader(false);
    setparam('param');
    // console.log(all1, '=====all1======');
  };

  let array = [
    {title: 'Tab1', key: 'item1'},
    {title: 'Tab2', key: 'item2'},
    {title: 'Tab3', key: 'item3'},
  ];

  useEffect(() => {
    console.log(routes1?.length, 'indexxxx=====');
    if (params?.eachCat === 'eachCat') {
      getMenuplanKart(params?.categoryId);
    } else {
      getMenuplanKart(1);
    }
    // mapScenes();
    // console.log(params?.items, 'itemmmssss');
    const getBranchId = async () => {
      const branch = await AsyncStorage.getItem('branchId');
      const newbranch = JSON.parse(branch);
      setBranchId(newbranch);

      menuPlan(newbranch);
    };
    setRefresh(false);
    // return findPlansItem;
    // console.log(params.planId, '=====planid=====');
    getBranchId();
  }, [refresh]);

  const handleDataFilter = (categoryName: string, searchText?: string) => {
    if (searchText !== '') {
      return (
        menuPlans &&
        menuPlans?.filter(
          (plan: any) =>
            plan?.MenuPlanCategory?.name === categoryName &&
            plan?.name?.includes(searchText),
        )
      );
    } else {
      return (
        menuPlans &&
        menuPlans?.filter(
          (plan: any) => plan?.MenuPlanCategory?.name === categoryName,
        )
      );
    }
  };

  const onRefresh = () => {
    setLoader(true);
    getMenuplanKart(1);
    setRefresh(true);
    // menuPlan('82059935-89dc-4daf-aff3-adcf997d6859');
  };

  const FamilyRoute = (item, index) => {
    // console.log(item, '====itemsssss===');
    return (
      <View style={{paddingBottom: 40}}>
        {/* <ActivityIndicator color={'green'} size={'large'} animating={true} /> */}
        {!loader ? (
          <View key={item?.id} style={styles.scene}>
            <FamilyMenu allFamilyMenuPlans={findPlansItem} />
          </View>
        ) : (
          // <EmptyList />
          <View style={styles.noData}>
            <Image
              style={{marginTop: 20}}
              source={require('../../assets/no-data.png')}
            />
            <Text style={styles.btnText}>Getting available meal plans.</Text>

            <View style={styles.btn}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
                FIND PLANS
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        hidden={false}
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={loader} onRefresh={onRefresh} />
        }>
        {!loader && findPlansItem?.length === undefined ? (
          <View style={{}}>
            <EmptyList
              image={require('../../../../../assets/Images/emptyCart.png')}
              // title="FIND MEAL"
              message="Oops! No meal plan Available now"
              // onPress={() => navigation.goBack()}
            />
          </View>
        ) : (
          <DynamicTabView
            data={routes1}
            renderTab={FamilyRoute}
            headerTextStyle={styles.headerText}
            onChangeTab={(index) => {
              getMenuplanKart(routes1[index].id);
              setparam('param');
            }}
            defaultIndex={params?.categoryId - 1 || routes1[0]?.id}
            containerStyle={{flex: 1}}
            headerBackgroundColor={colors.white}
            headerUnderlayColor={colors.white}
          />
        )}

        {!param && loader ? (
          <View style={{alignSelf: 'center', position: 'absolute', top: '20%'}}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Montserrat',
                // zIndex: 5,
              }}>
              Loading meals for you...
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default MenuTab;
