import React, {useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {cardDetails} from '../components/menuCards/cardInfo';
import {styles} from './styles';
import {EmptyList} from '../../../../components';

type Props = {
  id: Number;
  image: any;
  title: String;
  amount: Number;
  oldPrice?: Number;
  planId: any;
  planTime: any;
  plandate: any;
  // times: any;
};

function percentageCalc(oldPrice: any, newPrice: any) {
  return (((oldPrice - newPrice) / oldPrice) * 100).toFixed(1);
}

const DetailCard: React.FC<Props> = (props: Props) => {
  const navigation = useNavigation();
  const discount = percentageCalc(props.oldPrice, props.amount);
  return (
    <TouchableNativeFeedback
      onPress={() =>
        navigation.navigate('Dish', {
          id: props.id,
          menuPlan: 'menuPlan',
          planId: props.planId,
          planTime: props.planTime,
          plandate: props.plandate,
          // rating: item?.item?.name,
        })
      }>
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
  console.log(afternoon.times, 'cardafternoon');
  console.log(afternoon.planIds, '======planIdd====');
  const navigation = useNavigation();

  const [refreshing] = useState(false);
  const [, setDataSource] = useState([]);

  const onRefresh = () => {
    setDataSource([]);
  };

  return (
    <View>
      {refreshing ? <ActivityIndicator /> : null}
      {afternoon?.afternoon === undefined ? (
        <EmptyList
          style={{height: 80, width: 80, marginTop: -120}}
          image={require('../../../../assets/Images/emptyCart.png')}
          title="FIND PLAN"
          message="Please wait while we load the plan for this date!"
          onPress={() => navigation.goBack()}
        />
      ) : (
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
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

export default Afternoon;
