import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  getMenuPlansByBranch,
  GetAllMenuPlanCategory,
} from '../../../../../FetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {styles} from './styles';

interface DataProps {
  data: {
    title: string;
    imgUrl_1: any;
    imgUrl_2: any;
    route: string;
    externalRoute?: string;
  };
}

const Slide = ({data}: DataProps): any => {
  const [routes, setRoutes] = useState('key');
  const navigation = useNavigation();

  const menuPlan = async (id: any) => {
    console.log(id, 'allplannnnnssss');
    const allPlan = await GetAllMenuPlanCategory(id);
    const mapPlan = allPlan?.map(
      (item: any) => {
        return {
          key: item.name,
          title: item.name,
        };
      },
      // routes.push({
      //   key: item.name,
      //   title: item.name,
      // }),
    );
    setRoutes(mapPlan);
    console.log(mapPlan, 'allplannnnnsssseccccccc');
  };

  useEffect(() => {
    const getBranchId = async () => {
      const branch = await AsyncStorage.getItem('branchId');
      const newbranch = JSON.parse(branch);
      //  setBranch(newbranch);
      // setBranchId(id);

      menuPlan(newbranch);
    };
    console.log('allplannnnnsssseccccccc');

    getBranchId();
  }, []);

  console.log('======external route========', data.route);
  return (
    <View style={styles.main}>
      <Text style={styles.headerText}>{data.title}</Text>
      <View style={styles.imageSection}>
        <Image source={data.imgUrl_1} style={styles.img1} />
        <Image source={data.imgUrl_2} style={styles.img2} />
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() =>
          navigation.navigate(
            data.externalRoute ? data.externalRoute : data.route,
            {items: routes},
          )
        }>
        <View>
          <Text style={styles.btnText}>Find Plan</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Slide;
