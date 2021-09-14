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

const initialLayout = {width: Dimensions.get('window').width};

const MenuTab = () => {
  const navigation = useNavigation();
  let route = useRoute();
  const params = route.params;
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
  const {menuPlanCategories} = useSelector(
    (state: RootState) => state.menuPlanCategories,
  );
  const menuPlansMenuItem = useSelector(
    (state: RootState) => state.menuItemPlanForYou.payload,
  );
  const dispatch: AppDispatch = useDispatch();
  const basketItem = useSelector(
    (state: RootState) => state.basketState.payload,
  );

  const menuPlan = async (id: any) => {
    setLoader(true);
    console.log(id, 'allplannnnnssss');
    const allPlan = await GetAllMenuPlanCategory(id);
    const mapPlan = allPlan?.map(
      (item: any) => {
        return {
          title: item.name,
          key: item.name,
          id: item.id,
        };
      },
      // routes.push({
      //   key: 'test',
      //   title: item.name,
      // }),
    );
    // await getMenuplanKart(1);
    setLoader(false);
    // console.log(allPlan, '====alllrplannnn=======');
    setRoutes1(mapPlan);
    // setRoutes(mapPlan);
    // console.log(
    //   mapPlan,
    //   params?.categoryId,
    //   'allplannnnnssssecccccccitemmmsss',
    // );
  };

  const getMenuplanKart = async (id) => {
    setLoader(true);
    const branch = await AsyncStorage.getItem('branchId');
    const newbranch = JSON.parse(branch);
    const menuplanscart = await getPlanCatId(newbranch, id);
    console.log(newbranch, 'useriddd');
    // setPlanCart(menuplanscart?.items);
    dispatch(getMenuItemsPlanForYou(menuplanscart));
    // setLoader(false);
    // console.log(menuplanscart, '=======planscategoryyyyyyyyy=========');
    setLoader(false);
    // console.log(all1, '=====all1======');
  };

  useEffect(() => {
    // console.log(routes1[0]?.id, 'indexxxx=====');
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
    // console.log(params.planId, '=====planid=====');
    getBranchId();
  }, []);

  const handleDataFilter = (categoryName: string, searchText?: string) => {
    if (searchText !== '') {
      return (
        menuPlans &&
        menuPlans?.filter(
          (plan: any) =>
            plan.MenuPlanCategory.name === categoryName &&
            plan.name.includes(searchText),
        )
      );
    } else {
      return (
        menuPlans &&
        menuPlans?.filter(
          (plan: any) => plan.MenuPlanCategory.name === categoryName,
        )
      );
    }
  };

  const onRefresh = () => {
    setLoader(true);
    getMenuplanKart(1);
    // menuPlan('82059935-89dc-4daf-aff3-adcf997d6859');
  };

  const FamilyRoute = (item, index) => {
    // console.log(item, '====itemsssss===');
    return (
      <View>
        <RefreshControl
          onRefresh={() => onRefresh()}
          refreshing={loader}
          enabled={loader}
          style={{marginTop: 30}}
        />
        {/* <ActivityIndicator color={'green'} size={'large'} animating={true} /> */}
        {menuPlansMenuItem ? (
          <View key={item?.id} style={styles.scene}>
            <FamilyMenu allFamilyMenuPlans={menuPlansMenuItem} />
          </View>
        ) : (
          <View style={styles.noData}>
            <Image
              style={{marginTop: 20}}
              source={require('../../assets/no-data.png')}
            />
            <Text style={styles.btnText}>No meal plan available.</Text>

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
      {/* <Spinner
        visible={loader}
        // textStyle={styles.spinnerTextStyle}
        overlayColor="rgba(66, 66, 66,0.6)"
        customIndicator={<BallIndicator color="white" />}
      /> */}
      {/* {menuPlansMenuItem ? ( */}
      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={loader} onRefresh={onRefresh} />
        }>
        <DynamicTabView
          data={routes1}
          renderTab={FamilyRoute}
          headerTextStyle={styles.headerText}
          onChangeTab={(index) => {
            getMenuplanKart(routes1[index].id);
          }}
          defaultIndex={params?.categoryId - 1 || routes1[0]?.id}
          containerStyle={{flex: 1}}
          headerBackgroundColor={'white'}
          // headerUnderlayColor={'blue'}
        />
        {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 35,
              borderColor: 'gray',
              borderWidth: 1,
              width: '90%',
              alignSelf: 'center',
              borderRadius: 7,
              marginTop: 25,
              marginBottom: 25,
            }}>
            <TextInput
              style={{height: 35, width: '90%', borderRadius: 7}}
              onChangeText={(text) => onChangeText(text)}
              value={value}
              onFocus={() => navigation.navigate('SearchMenuitemandPlan')}
            />
            <TouchableOpacity style={{marginTop: 10, marginRight: 10}}>
              <Image source={require('../../assets/searchIcon.png')} />
            </TouchableOpacity>
          </View>
          {/* {routes.length != 0 ? ( */}
        {/* <TabView
            renderTabBar={(routers) => (
              <TabBar
                {...routers}
                indicatorStyle={styles.indicatorStyle}
                style={styles.tabBar}
                tabStyle={{width: 'auto'}}
                scrollEnabled
                renderLabel={({route, focused}) => (
                  <Text style={focused ? styles.focused : styles.tabLabel}>
                    {route.title}
                  </Text>
                )}
              />
            )}
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
          />  */}
        {/* ) : null} */}
      </ScrollView>
      {/* ) : ( */}
      {/* <View style={styles.noData}> */}
      {/* </View> <Image
      //       style={{marginTop: 20}}
      //       source={require('../../assets/no-data.png')}
      //     />
      //     <Text style={styles.btnText}>No meal plan available.</Text>

      //     <View style={styles.btn}>
      //       <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14}}>
      //         FIND PLANS
      //       </Text>
      //     </View>
      //   </View>
      // )} */}
    </View>
  );
};

export default MenuTab;
