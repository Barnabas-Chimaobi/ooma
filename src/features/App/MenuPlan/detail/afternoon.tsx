import React, {useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {cardDetails} from '../components/menuCards/cardInfo';
import {styles} from './styles';
import {EmptyList} from '../../../../components';
import Skeleton from '../../Home/skeleton';

type Props = {
  id: Number;
  image: any;
  title: String;
  amount: Number;
  oldPrice?: Number;
  planId: any;
  planTime: any;
  plandate: any;
  allplanTime: any;

  // times: any;
};

function percentageCalc(oldPrice: any, newPrice: any) {
  return (((oldPrice - newPrice) / oldPrice) * 100).toFixed(1);
}

const DetailCard: React.FC<Props> = (props: Props) => {
  const navigation = useNavigation();
  const discount = percentageCalc(props.oldPrice, props.amount);
  const afternoonTimes = async (id) => {
    console.log(props?.allplanTime, props?.id, 'plantimeeee==sss');
    const findAllTime = await props?.allplanTime?.filter(
      (a) => a?.MenuItem?.id == id,
    );
    const mapTime = findAllTime?.map(
      (item) => item?.deliveryTime,
      // console.log(
      //   {label: item?.deliveryTime, name: item?.deliveryTime},
      //   'deliveryTime===',
      // );
    );
    const sortTime = await mapTime?.sort();
    const mapSortTime = await sortTime?.map((item) => {
      return {
        label: item,
        value: item,
        amount: item,
        id: item,
      };
    });
    // console.log(mapSortTime, 'time=======');

    navigation.navigate('Dish', {
      id: props.id,
      menuPlan: 'menuPlan',
      planId: props.planId,
      planTime: mapSortTime,
      plandate: props.plandate,
      // rating: item?.item?.name,
    });
  };

  return (
    <TouchableNativeFeedback onPress={() => afternoonTimes(props.id)}>
      <View style={styles.itemWrapper}>
        <View>
          {props.oldPrice && (
            <View style={styles.disc}>
              <Text style={styles.discText}>{discount}% Off</Text>
            </View>
          )}
          <Image source={{uri: props.image}} style={styles.itemImg} />
        </View>
        <Text style={styles.foodName}>{props.title}</Text>

        <View style={styles.space} />
        {props.oldPrice && <Text style={styles.old}>{props.oldPrice} NGN</Text>}
        <Text style={styles.price}>{props.amount} NGN</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const Afternoon = (afternoon: any, planIds: any, times: any) => {
  // console.log(afternoon.times, 'cardafternoon');
  // console.log(afternoon.planIds, '======planIdd====');
  const navigation = useNavigation();

  const [refreshing] = useState(true);
  const [, setDataSource] = useState([]);

  const onRefresh = () => {
    setDataSource([]);
  };

  return (
    <View>
      {refreshing ? <ActivityIndicator /> : null}
      {afternoon?.afternoon === '' ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              tintColor={'green'}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
          <View>
            {/* <ActivityIndicator
            size={'large'}
            color={'green'}
            animating={refreshing}
            // style={{marginBottom: 30}}
          /> */}
            <Text
              style={{
                height: 150,
                paddingTop: 70,
                alignSelf: 'center',
                fontSize: 16,
                fontFamily: 'Montserrat',
              }}>
              Getting available meals
            </Text>
            {/* <EmptyList
              style={{height: 80, width: 80, marginTop: -120}}
              // image={require('../../../../assets/Images/emptyCart.png')}
              // title="FIND PLAN"
              message="Getting the meal ready in a moment.."
              onPress={() => navigation.goBack()}
            /> */}
          </View>
        </ScrollView>
      ) : (
        // <Skeleton />

        <FlatList
          data={afternoon.afternoon}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <DetailCard
              planId={afternoon.planIds}
              id={item?.MenuItem?.id}
              image={item?.MenuItem?.imageUrl}
              title={item?.MenuItem?.itemName}
              amount={item?.MenuItem?.amount}
              oldPrice={item?.oldPrice}
              planTime={afternoon.times}
              plandate={item?.plandate}
              allplanTime={afternoon.allTime}
            />
          )}
          ListEmptyComponent={
            <EmptyList
              style={{height: 80, width: 80, marginTop: -120}}
              image={require('../../../../assets/Images/emptyCart.png')}
              title="FIND PLAN"
              message="No Meal plan for this time!"
              onPress={() => navigation.goBack()}
            />
          }
        />
      )}
    </View>
  );
};

export default Afternoon;
