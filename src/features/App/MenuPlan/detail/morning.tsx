import {NavigationContainer, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
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
  allplanTime: any;
  plandate: any;
  // times: any;
};

function percentageCalc(oldPrice: any, newPrice: any) {
  return (((oldPrice - newPrice) / oldPrice) * 100).toFixed(1);
}

const DetailCard: React.FC<Props> = (props: Props) => {
  // console.log(props.planTime, '====plantimessss===========');
  const discount = percentageCalc(props.oldPrice, props.amount);
  const navigation = useNavigation();
  const morningTimes = async (id) => {
    console.log(props.allplanTime, props?.id, 'plantimeeee==sss');
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
    console.log(mapSortTime, 'time=======');

    navigation.navigate('Dish', {
      id: props.id,
      menuPlan: 'menuPlan',
      planId: props.planId,
      planTime: mapSortTime,
      plandate: props.plandate,
      // rating: item?.item?.name,
    });
  };

  useEffect(() => {
    // morningTimes();
  }, []);

  return (
    <TouchableNativeFeedback
      onPress={() => {
        morningTimes(props.id);
      }}>
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
        {props.oldPrice && (
          <Text style={styles.old}>{props.oldPrice}.00 NGN</Text>
        )}
        <Text style={styles.price}>{props.amount}.00 NGN</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const Morning = (morning: any, planIds: any, times: any) => {
  const navigation = useNavigation();
  // console.log(morning, times, 'cardmorning');
  // console.log(morning.planIds, '=======planidsss======');
  const [refreshing, setRefreshing] = useState(true);
  const [, setDataSource] = useState([]);

  const onRefresh = () => {
    setDataSource([]);
  };

  return (
    <View style={{flex: 1}}>
      {refreshing ? <ActivityIndicator /> : null}
      {morning.morning === '' ? (
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
            <Text style={{height: 150, paddingTop: 70, alignSelf: 'center'}}>
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
          data={morning.morning}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            // console.log(item, 'itemmmmmmmmsss'),
            <DetailCard
              planId={morning.planIds}
              id={item?.MenuItem?.id}
              image={item?.MenuItem?.imageUrl}
              title={item?.MenuItem?.itemName}
              amount={item?.MenuItem?.amount}
              oldPrice={item?.oldPrice}
              allplanTime={morning.allTime}
              planTime={[
                {
                  label: item.deliveryTime,
                  value: item?.deliveryTime,
                  amount: item?.deliveryTime,
                  id: item.deliveryTime,
                },
              ]}
              plandate={item?.plandate}
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

export default Morning;
