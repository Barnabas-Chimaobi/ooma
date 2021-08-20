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
} from '../../../../../FetchData';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from './../../../../../store';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';

const initialLayout = {width: Dimensions.get('window').width};

const MenuTab = () => {
  const navigation = useNavigation();
  let route = useRoute();
  const params = route.params;
  const [index, setIndex] = React.useState(0);
  const [value, onChangeText] = useState('');
  const [] = useState([]);
  const [routes, setRoutes] = React.useState([
    {key: 'all', title: 'All'},
    {key: 'familyandkids', title: 'Yam'},
    {key: 'test', title: 'beans'},
    {key: 'testing', title: 'rice'},
    {key: 'vegan', title: 'beans'},
    {key: 'office', title: 'rice'},
  ]);
  const [routes1, setRoutes1] = useState();
  let [scenes, setScenes] = useState({});
  const [branchId, setBranchId] = useState('');
  const [menuPlans, setMenuPlans]: any = useState();
  const [menuPlans1, setMenuPlans1] = useState();
  const [menuPlan2, setMenuPlan2] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const {menuPlanCategories} = useSelector(
    (state: RootState) => state.menuPlanCategories,
  );
  const menuPlansMenuItem = useSelector(
    (state: RootState) => state.menuItemPlanForYou.payload,
  );

  const menuPlan = async (id: any) => {
    console.log(id, 'allplannnnnssss');
    const allPlan = await GetAllMenuPlanCategory(id);
    const mapPlan = allPlan?.map(
      (item: any) => {
        return {
          key: item.name,
          title: item.name,
        };
      },
      // routes.push({
      //   key: 'test',
      //   title: item.name,
      // }),
    );
    setRoutes1(mapPlan);
    // setRoutes(mapPlan);
    console.log(routes1, 'allplannnnnsssseccccccc');
    console.log(mapPlan, 'allplannnnnsssseccccccc');
  };

  // const mapScenes = () => {
  //   params?.items.forEach((category: any) => {
  //     routes1.push({
  //       key: category.key,
  //       title: category.title,
  //     });
  //   });
  //   let scenes = {};
  //   params?.items.forEach((category) => {
  //     if (category.key != '') {
  //       const FirstRoute = () => (
  //         <View style={[{backgroundColor: '#ff4081'}]} />
  //       );
  //       setScenes((scenes[category.key] = FirstRoute));

  //       // scenes[category.key] = FirstRoute;
  //     }
  //   });
  // };

  useEffect(() => {
    // mapScenes();
    // console.log(params?.items, 'itemmmssss');
    const getBranchId = async () => {
      const id: any = await AsyncStorage.getItem('branchId');
      setBranchId(id);

      menuPlan('82059935-89dc-4daf-aff3-adcf997d6859');
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

  const onRefresh = () => {};

  const AllRoute = () => (
    <View style={styles.scene}>
      <AllMenu allMenuPlans={menuPlansMenuItem} />
    </View>
  );

  const OfficeRoute = () => (
    <View style={styles.scene}>
      <OfficeMenu allOfficeMenuPlans={menuPlansMenuItem} />
    </View>
  );

  const VeganRoute = () => (
    <View style={styles.scene}>
      <VeganMenu allVeganMenuPlans={menuPlansMenuItem} />
    </View>
  );

  const FamilyRoute = () => (
    <View style={styles.scene}>
      <FamilyMenu allFamilyMenuPlans={menuPlansMenuItem} />
    </View>
  );
  let test = {
    all: AllRoute,
    office: OfficeRoute,
    vegan: VeganRoute,
    familyandkids: FamilyRoute,
    test: FamilyRoute,
    testing: FamilyRoute,
  };
  const renderScene = SceneMap(test);

  return (
    <View style={{flex: 1}}>
      <StatusBar
        hidden={false}
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      {menuPlansMenuItem ? (
        <ScrollView
          style={{flex: 1}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View
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
          <TabView
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
          />
          {/* ) : null} */}
        </ScrollView>
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

export default MenuTab;
