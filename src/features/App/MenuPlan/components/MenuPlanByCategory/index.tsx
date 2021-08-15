import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, FC} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Text,
} from 'react-native';
import Card from '../menuCards/card';
import {cardDetails} from '../menuCards/cardInfo';
import {getMenuPlansByBranchAndCategory} from '../../../../../FetchData';

interface selectedProps {
  route: any;
}

const AllMenuPlanByCategory: FC<selectedProps> = ({route}) => {
  const [refreshing] = useState(false);
  const [, setDataSource] = useState([]);
  const {categoryId, categoryName} = route.params;
  const [branchId, setBranchId] = useState('');
  const [menuPlans, setMenuPlans] = useState([]);

  const onRefresh = () => {
    //Clear old data of the list
    setDataSource([]);
    //Call the Service to get the latest data, thats the api call method
  };

  useEffect(() => {
    console.log(categoryId, 'catiddddd');
    const getBranchId = async () => {
      const id: any = await AsyncStorage.getItem('branchId');
      setBranchId(id);
    };

    getBranchId();
  }, []);

  useEffect(() => {
    console.log('planssssss');
    const getMenuPlans = async () => {
      // Remember to set real branch value
      const menuPlans = await getMenuPlansByBranchAndCategory(
        '82059935-89dc-4daf-aff3-adcf997d6859',
        1,
        categoryId,
      );

      setMenuPlans(menuPlans);
    };

    getMenuPlans();
  }, []);

  return (
    <View style={{marginBottom: 20}}>
      <Text
        style={{
          alignSelf: 'center',
          marginBottom: 10,
          marginTop: 10,
          fontWeight: 'bold',
          fontSize: 20,
        }}>
        Meal Plans For {categoryName}{' '}
      </Text>

      {refreshing ? <ActivityIndicator /> : null}
      <FlatList
        data={menuPlans}
        keyExtractor={(item, index) => item.id}
        renderItem={({item}) => (
          <Card
            id={item.id}
            image={{uri: item.imageurl}}
            title={item?.name}
            // rating={item.rating}
            // star={item.star}
            description={item.description}
            compType={'menuPlanDetail'}
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

export default AllMenuPlanByCategory;
