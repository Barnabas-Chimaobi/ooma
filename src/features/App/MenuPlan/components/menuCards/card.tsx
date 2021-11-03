import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {square} from '../../../../../assets/index';

type Props = {
  id: string;
  image: any;
  cardStyle: any;
  title: String;
  rating?: Number;
  star?: any;
  description: String;
};
const MenuCard: React.FC<Props> = (props: Props) => {
  const navigation = useNavigation();

  return (
    <View style={[props.cardStyle]}>
      <TouchableOpacity
        onPress={() => {
          console.log(props.id, 'props.id');
          navigation.navigate('Detail', {planId: props.id});
        }}>
        <View style={styles.container} key={props.image}>
          <Image source={props.image} style={styles.menuImage} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.ratingContainer}>
              <Text>{props.rating}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', left: 5}}>
            {/* <Image source={square} style={styles.ratingStar} /> */}
            <Text style={styles.description}>{props.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MenuCard;
