import React from 'react';
import {Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button} from '../../../../../components';
import {styles} from './styles';
const text = [
  'Extra lunch pack',
  'Free Delivery',
  'Free extra Desserts',
  'Extra Add-ons',
];
const index = () => {
  console.log(LinearGradient, 'll');
  return (
    <LinearGradient
      colors={['#D30000', '#FCAE1E', '#05944F']}
      start={{x: 0.0, y: 1.0}}
      end={{x: 1.0, y: 1.0}}
      style={styles.linearGradient}>
      <View style={styles.buttonContainer}>
        <View style={styles.titleView}>
          <Text style={styles.title}>Office Park</Text>
        </View>
        <View style={styles.btnWrapper}>
          <Button
            containerStyle={{marginVertical: 20}}
            ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
              colors: ['#FCAE1E', '#D30000'],
              start: {x: 0, y: 0.5},
              end: {x: 1, y: 0.5},
            }}
            title="14,999.99 NGN"
          />
        </View>
        <View style={{paddingHorizontal: 20}}>
          {text.map((item) => (
            <View style={{flexDirection: 'row', marginBottom: 15}}>
              <AntDesign name="check" size={20} />
              <Text style={{marginLeft: 15, fontSize: 15}}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.btnWrapper}>
          <Button
            containerStyle={{marginVertical: 10, marginBottom: 20}}
            title="BUY NOW"
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default index;
