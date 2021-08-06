import React, {useState, useEffect, FC} from 'react';
import {View, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import Card from '../menuCards/card';
import {cardDetails} from '../menuCards/cardInfo';

interface AllMenuPlanProps {
  allMenuPlans: [];
}

const AllMenu: FC<AllMenuPlanProps> = ({allMenuPlans}) => {
  const [refreshing] = useState(false);
  const [, setDataSource] = useState([]);

  const onRefresh = () => {
    //Clear old data of the list
    setDataSource([]);
    //Call the Service to get the latest data, thats the api call method
  };

  // console.log(allMenuPlans, 'allMenuPlans');

  return (
    <View style={{marginBottom: 250}}>
      {refreshing ? <ActivityIndicator /> : null}
      <FlatList
        data={allMenuPlans}
        keyExtractor={(item, index) => item.id}
        renderItem={({item}) => (
          <Card
            id={item.id}
            image={{uri: item.imageurl}}
            title={item?.name}
            cardStyle={{margin: 10}}
            // rating={item.rating}
            // star={item.star}
            description={item.description}
          />
        )}
        refreshControl={
          <RefreshControl
            //refresh control used for the Pull to Refresh
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        // keyExtractor={item => item.id}
      />
    </View>
  );
};

export default AllMenu;
