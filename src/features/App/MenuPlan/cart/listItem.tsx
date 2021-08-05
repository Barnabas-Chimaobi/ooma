import React, {FC, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import shortid from 'shortid';

import {List} from './innerListItem';
import {EmptyList} from '../../../../components';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

interface IProps {
  list: any;
  styles: any;
  hour: any;
  date: any;
}

export const ListItems: FC<IProps> = ({list, styles, hour, date}) => {
  const [open, setOpen] = useState(true);
  let newdate = new Date(date).toDateString();
  const navigation = useNavigation();
  console.log(hour, date, '===hourssdatesss=====');
  return (
    <View>
      <TouchableWithoutFeedback
        onPress={() => setOpen(!open)}
        style={styles.accordionToggle}>
        {/* <Text style={styles.accordionText}>{newdate}</Text> */}
        <Icon
          name={!open ? 'angle-down' : 'angle-right'}
          size={20}
          color="#444"
        />
      </TouchableWithoutFeedback>

      {open && (
        <View style={styles.listView}>
          {/* <Text style={styles.hour}>{hour}</Text> */}
          <FlatList
            data={list}
            style={styles.listStyle}
            renderItem={({item}) => {
              return (
                <View>
                  <List
                    styles={styles}
                    imageUrl={item?.MenuPlan?.imageurl}
                    itemName={item?.MenuPlan?.name}
                    price={item?.amount}
                    delivery={item?.deliveryAddress}
                    count={item?.quantity}
                    time={item.time}
                  />
                </View>
              );
            }}
            // pagingEnabled
            keyExtractor={() => shortid.generate()}
            ListEmptyComponent={
              <EmptyList
                image={require('../../../../assets/Images/emptyCart.png')}
                title="FIND PLAN"
                message="Oops! Your basket is empty"
                onPress={() => navigation.goBack()}
              />
            }
          />
        </View>
      )}
    </View>
  );
};
