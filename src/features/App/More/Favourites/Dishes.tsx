import React from 'react';
import shortid from 'shortid';
import {Text, View, FlatList, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Card} from '../../../../components';
import {CardItem} from '../../Explore/SelectedCategory';
const carouselItems = [
  {
    labelText: 'Up to -15% off',
    title: 'Egg Salad and sprinkled cheese',
    rating: 1,
    dish1: 'Vegan',
    dish2: 'Continental',
    dish3: 'Gluten',
    img: require('../../../../assets/MockImages/ib.png'),
    price: 4000,
    ratingCount: '4.5',
  },
  {
    labelText: 'Up to -15% off',
    title: 'Abacha; Ugba with Fish and Cow Hide',
    rating: 1,
    dish1: 'Vegan',
    dish2: 'Continental',
    dish3: 'Gluten',
    img: require('../../../../assets/MockImages/special.png'),
    price: 800,
    ratingCount: '4.5',
  },
  {
    labelText: 'Up to -15% off',
    title: 'Egg Salad and sprinkled cheese',
    rating: 1,
    dish1: 'Vegan',
    dish2: 'Continental',
    dish3: 'Gluten',
    img: require('../../../../assets/MockImages/ib.png'),
    price: 4000,
    ratingCount: '4.5',
  },
  {
    labelText: 'Up to -15% off',
    title: 'Egg Salad and sprinkled cheese',
    rating: 1,
    dish1: 'Vegan',
    dish2: 'Continental',
    dish3: 'Gluten',
    img: require('../../../../assets/MockImages/ib.png'),
    price: 4000,
    ratingCount: '4.5',
  },
  {
    labelText: 'Up to -15% off',
    title: 'Egg Salad and sprinkled cheese',
    rating: 1,
    dish1: 'Vegan',
    dish2: 'Continental',
    dish3: 'Gluten',
    img: require('../../../../assets/MockImages/ib.png'),
    price: 4000,
    ratingCount: '4.5',
  },
];
 
const index = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={carouselItems}
        renderItem={({item}) => (
          <CardItem
            item={item}
            onPress={() => navigation.navigate('Dish')} 
          />
        )}
        keyExtractor={() => shortid.generate()}
      />
    </View>
  );
};

export default index;
