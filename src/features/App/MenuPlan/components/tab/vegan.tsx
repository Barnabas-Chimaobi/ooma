import React, {useState, FC} from 'react';
import {View, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import Card from '../menuCards/card';
import {cardDetails} from '../menuCards/cardInfo';

interface AllVeganMenuPlanProps {
  allVeganMenuPlans?: [];
}

const AllVeganMenu: FC<AllVeganMenuPlanProps> = ({allVeganMenuPlans}) => {
  const [refreshing] = useState(false);
  const [, setDataSource] = useState([]);

  const onRefresh = () => {
    //Clear old data of the list
    setDataSource([]);
    //Call the Service to get the latest data, thats the api call method
  };
  return (
    <View style={{marginBottom: 250}}>
      {refreshing ? <ActivityIndicator /> : null}
      <FlatList
        data={allVeganMenuPlans}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Card
            id={item.id}
            image={{uri: item.imageurl}}
            title={item?.name}
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

export default AllVeganMenu;
