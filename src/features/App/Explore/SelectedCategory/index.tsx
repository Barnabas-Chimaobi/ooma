import React, {useState, useEffect, FC} from 'react';
import {View, ScrollView, FlatList, Pressable} from 'react-native';
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

interface selectedProps {
  route: any;
}

const SelectedCategory: FC<selectedProps> = ({route}) => {
  const {categoryId} = route.params;
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState('');
  const [truth, setTruth] = useState(false);

  const {payload} = useSelector(
    (state: RootState) => state.menuItemsByCategory,
  );

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setLoader(true);
    const getItemByCategoryId = async () => {
      const newData = categoryId
        ? await SearchMenuItemByCategoryId(categoryId, 1)
        : [];
      setData(newData);
      if (newData.length == 0) {
        setTruth(true);
      }
      dispatch(useMenuItemByCategory(newData.data.items));
      setLoader(false);
    };
    setLoader(false);
    getItemByCategoryId();
  }, [categoryId]);

  const navigation = useNavigation();
  const [state, setstate] = useState({gridView: false});
  const [input, setInput] = useState('');
  const {gridView} = state;
  const toggleGrid = () => setstate({gridView: !gridView});
  return (
    <View style={S.exploreMain}>
      <SimpleHeader gridView gridToggle={toggleGrid} />
      <BaseInput
        value=""
        onfocus={() => navigation.navigate('SearchMenuitemandPlan')}
        onChangeText={(text) => setInput(text)}
        rightIcon={<Icon name="search" color={colors.blackGrey} size={18} />}
        style={S.exploreInput}
        inputStyle={{padding: 1, flex: 1}}
      />
      <FilterBar />
      {/* {payload.length < 0 ? ( */}
      <Spinner
        visible={loader}
        // textStyle={styles.spinnerTextStyle}
        overlayColor="rgba(66, 66, 66,0.6)"
        customIndicator={<BallIndicator color="white" />}
      />
      {/* ) : ( */}
      <FlatList
        renderItem={({item}) => (
          <CardItem
            item={item}
            onPress={() => navigation.navigate('Dish', {id: item?.id})}
            gridView={gridView}
          />
        )}
        data={payload}
        keyExtractor={() => shortid.generate()}
        ListEmptyComponent={
          payload.length != 0 ? null : (
            <EmptyList
              image={emptyCart}
              title="Find Meal"
              message="Oops! Your Menu is empty"
              // onPress={() => navigation.navigate('Explore')}
            />
          )
        }
        ListFooterComponent={
          <>
            {truth == true && (
              <Button
                title="BACK TO TOP"
                type={ButtonType.outline}
                buttonStyle={S.backTopButtonStyle}
                titleStyle={S.backtopTitleStyle}
                onPress={() => {}}
              />
            )}
          </>
        }
      />
      {/* )} */}
      {/* </View> */}
    </View>
  );
};

export default SelectedCategory;

export const CardItem = ({item, onPress, gridView}: any) => {
  const navigation = useNavigation();
  let Image_Http_URL = {uri: item.imageUrl};
  const mainRating = item.rating / item.ratingCount;
  return (
    <Pressable onPress={onPress}>
      <Card
        diff={'plan'}
        categories={item.MenuItemCategories}
        img={Image_Http_URL}
        labelText={item.caption}
        title={item.itemName}
        rating={mainRating}
        dish1={'Vegan'}
        dish2={'Vegan'}
        dish3={'Vegan'}
        price={item.amount}
        ratingCount={mainRating}
        dishType={item.menuItemType}
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
