import React, {useState, FC, useEffect} from 'react';
import {View, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import Card from '../menuCards/card';
import {cardDetails} from '../menuCards/cardInfo';
import {EmptyList} from '../../../../../components';
interface AllFamilyMenuPlanProps {
  allFamilyMenuPlans?: [];
}

const AllFamilyMenu: FC<AllFamilyMenuPlanProps> = ({allFamilyMenuPlans}) => {
  const [refreshing] = useState(false);
  const [, setDataSource] = useState([]);

  useEffect(() => {
    console.log(allFamilyMenuPlans, '=====allfamilyplansss======');
  }, []);
  const onRefresh = () => {
    //Clear old data of the list
    setDataSource([]);
    //Call the Service to get the latest data, thats the api call method
  };
  return (
    <View style={{}}>
      {refreshing ? <ActivityIndicator /> : null}
      <FlatList
        contentContainerStyle={{flexGrow: 1, marginBottom: 300}}
        data={allFamilyMenuPlans}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Card
            id={item?.id}
            image={{uri: item?.imageurl}}
            title={item?.name}
            // rating={item.rating}
            // star={item.star}
            description={item?.description}
          />
        )}
        refreshControl={
          <RefreshControl
            //refresh control used for the Pull to Refresh
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListEmptyComponent={
          <View style={{marginTop: '-10%', flex: 1}}>
            <EmptyList
              image={require('../../../../../assets/Images/emptyCart.png')}
              // title="FIND MEAL"
              message="Oops! No meal plan for this category"
              // onPress={() => navigation.goBack()}
            />
          </View>
        }
        // keyExtractor={item => item.id}
      />
    </View>
  );
};

export default AllFamilyMenu;
