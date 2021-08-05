import React, {FC} from 'react';
import {TouchableHighlight, View, Text, Image} from 'react-native';
import Swipeout from 'react-native-swipeout';
import {styles} from './styles';

interface TProps {
  title: string;
  date: string;
  amount: string;
  time: string;
  index?: any;
  onPress?: () => void;
}

const Button = () => {
  return (
    <View>
      <Image
        source={require('../../../../assets/Images/deleteTransaction.png')}
      />
    </View>
  );
};
const TransactionCard: FC<TProps> = (props: TProps) => {
  let swipeBtns = [
    {
      text: (
        <Image
          source={require('../../../../assets/Images/deleteTransaction.png')}
        />
      ),
      //   component: <Button />,
      backgroundColor: 'white',
      onPress: () => console.log(props.title),
    },
  ];

  return (
    <Swipeout
      left={swipeBtns}
      autoClose={true}
      buttonWidth={60}
      backgroundColor="white"
      sensitivity={20}>
      <View style={{marginBottom: 20}}>
        <View style={styles.cardContainer}>
          <View style={styles.cardDateContainer}>
            <Text style={styles.date}>{props.date}</Text>
          </View>
          <View
            style={{
              ...styles.card,
              borderLeftColor: props.index % 2 !== 0 ? 'green' : 'red',
            }}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.time}>{props.time}</Text>
            <Text>{props.amount}</Text>
          </View>
        </View>
      </View>
    </Swipeout>
  );
};

export default TransactionCard;
