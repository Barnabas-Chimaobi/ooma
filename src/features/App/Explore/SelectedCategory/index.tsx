import React, {useState, useEffect, FC} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Pressable,
  RefreshControl,
} from 'react-native';
import {BaseInput} from '../../../../components';
import S from '../styles';
import {
  Button,
  ButtonType,
  Card,
  EmptyList,
  SimpleHeader,
} from '../../../../components';
import FilterBar from '../Components/FilterBar';
import {Icon, Text} from 'react-native-elements';
import {colors} from '../../../../colors';
import {emptyCart, ib, special} from '../../../../assets';
import shortid from 'shortid';
import {
  SearchMenuItemByCategoryId,
  filterMenuItems,
} from '../../../../FetchData';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState, AppDispatch} from '../../../../store';
import {useMenuItemByCategory} from '../../../../reducers';
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
import Footer from '../../../../navigation/footer';
import {StyleFoot} from '../../../../navigation/styles';

interface selectedProps {
  route: any;
}

const SelectedCategory: FC<selectedProps> = ({route}) => {
  const {categoryId} = route?.params;
  const [explore, setExplore] = useState('explore');
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState('');
  const [truth, setTruth] = useState(false);

  const {payload} = useSelector(
    (state: RootState) => state.menuItemsByCategory,
  );

  const dispatch: AppDispatch = useDispatch();

  const getItemByCategoryId = async () => {
    setLoader(true);
    const newData = categoryId
      ? await SearchMenuItemByCategoryId(categoryId, 1)
      : [];
    setData(newData);
    if (newData?.length == 0) {
      setTruth(true);
    }
    dispatch(useMenuItemByCategory(newData?.data?.items));
    setLoader(false);
  };

  useEffect(() => {
    console.log(categoryId, route.params, 'iddcategoryyy====');
    if (route?.params?.filter !== 'filter') {
      getItemByCategoryId();
    }
  }, [categoryId]);

  const navigation = useNavigation();
  const [state, setstate] = useState({gridView: false});
  const [input, setInput] = useState('');
  const {gridView} = state;
  const toggleGrid = () => setstate({gridView: !gridView});

  const refreshing = () => {
    getItemByCategoryId();
  };
  return (
    <View style={{flex: 1, width: '100%'}}>
      <View style={S.exploreMain}>
        <View style={{marginLeft: 10, marginRight: 10}}>
          <SimpleHeader gridView gridToggle={toggleGrid} />

          <BaseInput
            value=""
            onfocus={() => navigation.navigate('SearchMenuitemandPlan')}
            onChangeText={(text) => setInput(text)}
            rightIcon={
              <Icon name="search" color={colors.blackGrey} size={18} />
            }
            style={S.exploreInput}
            inputStyle={{padding: 1, flex: 1}}
          />
        </View>
        <View style={{marginLeft: 5, marginRight: 5}}>
          <FilterBar />
        </View>
        {/* {payload.length < 0 ? ( */}
        {/* <Spinner
        visible={loader}
        // textStyle={styles.spinnerTextStyle}
        overlayColor="rgba(66, 66, 66,0.6)"
        customIndicator={<BallIndicator color="white" />}
      /> */}
        {/* ) : ( */}
        <View style={{paddingBottom: 200}}>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={loader} onRefresh={refreshing} />
            }
            renderItem={({item}) => (
              <View>
                <View style={{paddingHorizontal: 10}}>
                  <CardItem
                    item={item}
                    onPress={() => navigation.navigate('Dish', {id: item?.id})}
                    gridView={gridView}
                  />
                </View>

                <View
                  style={{
                    borderWidth: 2,
                    borderColor: colors.t,
                    marginTop: 10,
                    marginBottom: 10,
                    width: '100%',
                    marginRight: -10,
                  }}
                />
              </View>
            )}
            data={payload}
            keyExtractor={() => shortid.generate()}
            ListEmptyComponent={
              payload?.length !== undefined && (
                <EmptyList
                  image={emptyCart}
                  title="Find Meal"
                  message="Oops! Your Menu is empty"
                  // onPress={() => navigation.navigate('Explore')}
                />
              )
            }
            // ListFooterComponent={
            //   <>
            //     {truth == true && (
            //       <Button
            //         title="BACK TO TOP"
            //         type={ButtonType.outline}
            //         buttonStyle={S.backTopButtonStyle}
            //         titleStyle={S.backtopTitleStyle}
            //         onPress={() => {}}
            //       />
            //     )}
            //   </>
            // }
          />
        </View>

        {/* )} */}
        {/* </View> */}
      </View>
      <View style={StyleFoot.footer}>
        <Footer navigation={navigation} explore={explore} />
      </View>
    </View>
  );
};

export default SelectedCategory;

export const CardItem = ({item, onPress, gridView}: any) => {
  const discount = item?.discount;
  const currentAmount = discount
    ? (item?.amount - discount).toFixed(2)
    : item?.amount;

  const navigation = useNavigation();
  let Image_Http_URL = {uri: item?.imageUrl};
  const mainRating = item?.rating / item?.ratingCount;
  return (
    <Pressable onPress={onPress}>
      <Card
        oldPrice={discount ? item?.amount : null}
        diff={'plan'}
        categories={item?.MenuItemCategories}
        img={Image_Http_URL}
        labelText={item?.caption}
        title={item?.itemName}
        rating={mainRating}
        dish1={'Vegan'}
        dish2={'Vegan'}
        dish3={'Vegan'}
        price={currentAmount}
        ratingCount={mainRating}
        dishType={item?.menuItemType}
        gridView={gridView}
        cardStyle={cardStylse}
        onPress={() =>
          navigation.navigate('Dish', {id: item?.id, rating: mainRating})
        }
      />
    </Pressable>
  );
};
const cardStylse = {
  flex: 1,
  marginHorizontal: 1,
  marginVertical: 5,
};
