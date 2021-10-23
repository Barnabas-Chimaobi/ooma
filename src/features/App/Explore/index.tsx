import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from 'react-native';
import {BaseInput} from '../../../components';
import S from './styles';
import Card from './ExploreCard';
import {Button, ButtonType} from '../../../components';
import Filter from './FilterPage';
import {Icon} from 'react-native-elements';
import {colors} from '../../../colors';
import {
  GetAllMenuItemCategory,
  GetAllMenuPlanCategory,
  getMenuItemsCategories,
  SearchMenuItemAndMenuPlan,
} from '../../../FetchData';
import {useSelector, useDispatch} from 'react-redux';
import Dish from './SelectedDish';
import SelectedCategory from './SelectedCategory';
import SearchMenuitemandPlan from './search';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {debounce, throttle} from 'throttle-debounce';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {RootState, AppDispatch} from './../../../store';
import {shuffleArray} from './../../../Utils/Helper';
import {useMenuItemCategory} from '../../../reducers/ItemCategory';
import {useMenuPlanCategory} from '../../../reducers/MenuPlanCategory';
import Footer from '../../../navigation/footer';
import {StyleFoot} from '../../../navigation/styles';
import {scroll} from '../../../assets';

const Explore = () => {
  const scrollRef = useRef<ScrollView>();
  const [explore, setExplore] = useState('explore');
  const [branchId, setBranchId] = useState('');
  const [allMenuOtherCategory, setAllMenuCategory] = useState();
  const [input, setInput] = useState('');
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const {categories} = useSelector((state: RootState) => state.itemCategory);
  const {menuPlanCategories} = useSelector(
    (state: RootState) => state.menuPlanCategories,
  );

  useEffect(() => {
    const getBranchId = async () => {
      const branchId: any = await AsyncStorage.getItem('branchId');
      setBranchId(branchId);
    };
    getBranchId();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getAllCategories();
  };

  const getAllCategories = async () => {
    const branch = await AsyncStorage.getItem('branchId');
    const newbranch = JSON.parse(branch);
    Promise.all([
      GetAllMenuItemCategory(newbranch),
      GetAllMenuPlanCategory(newbranch),
    ])
      .then((values) => {
        let [itemCategories, planCategories] = values;
        itemCategories.length > 0 &&
          dispatch(useMenuItemCategory(itemCategories));
        planCategories.length > 0 &&
          dispatch(useMenuPlanCategory(planCategories));
        setRefreshing(false);
      })
      .catch((err) => {
        setRefreshing(false);
      });
  };

  const search = async () => {
    const branch = await AsyncStorage.getItem('branchId');
    const newbranch = JSON.parse(branch);
    const getSearch = await SearchMenuItemAndMenuPlan(input, newbranch);
    // console.log(getSearch, 'searchresultsssss');
  };

  const onFabPress = () => {
    console.log('scroll');
    scrollRef.current?.scrollTo({
      y: 30,
      animated: true,
    });
  };

  const debouncefunc = debounce(500, () => {
    search();
  });

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <View style={S.exploreMain}>
        {/* <BaseInput
        value={input}
        onfocus={() => navigation.navigate('SearchMenuitemandPlan')}
        onChangeText={(text) => {
          setInput(text);
          debouncefunc();
        }}
        rightIcon={<Icon name="search" color={colors.blackGrey} size={18} />}
        style={styles.exploreInput}
        inputStyle={{padding: 1}}
      /> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 10,
            marginRight: 10,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>Explore</Text>
          <TouchableHighlight
            underlayColor=""
            onPress={() => navigation.navigate('SearchMenuitemandPlan')}>
            <Icon name="search" color={colors.blackGrey} size={25} />
          </TouchableHighlight>
        </View>

        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={S.exploreCard}>
            {/* <Card
              title="Hot categories"
              categories={shuffleArray(categories)}
            /> */}
            <Card
              title="Top Meal Plans"
              categories={shuffleArray(menuPlanCategories)}
              compType={'menuPlan'}
            />
            <Card title="Others" categories={shuffleArray(categories)} />
          </View>
          {/* <Button
            title="BACK TO TOP"
            type={ButtonType.outline}
            buttonStyle={S.backTopButtonStyle}
            titleStyle={S.backtopTitleStyle}
            onPress={() => {}}
          /> */}
        </ScrollView>
        <View
          style={{
            zIndex: 1,
            height: 90,
            width: 70,
            alignSelf: 'flex-end',
            position: 'absolute',
            bottom: 40,
            right: 10,
            // borderRadius: 70,
          }}>
          <TouchableOpacity onPressIn={onFabPress}>
            <Image
              style={{
                height: 90,
                width: 70,

                borderRadius: 70,
              }}
              source={scroll}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={StyleFoot.footer}>
        <Footer navigation={navigation} explore={explore} />
      </View>
    </View>
  );
};

const styles = {
  exploreInput: {
    backgroundColor: 'white',
    borderColor: colors.blackGrey,
    borderWidth: 1,
    borderRadius: 4,
  },
};
export default Explore;
export {Dish, SelectedCategory, Filter, SearchMenuitemandPlan};
