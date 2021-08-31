import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

interface BasketProps {
  counts: any;
  onBasketPress(count: any): any;
  otherStyles?: {};
}

export const Basket = ({counts, onBasketPress, otherStyles}: BasketProps) => (
  <Pressable
    onPress={() => onBasketPress(counts)}
    style={{...styles.basket, ...otherStyles}}>
    <View style={styles.counter}>
      <Text style={styles.counterText}>
        {counts === undefined ? 0 : counts}
      </Text>
    </View>
    <Image
      style={styles.basketImg}
      source={require('../../features/App/MenuPlan/assets/shoppingBasket.png')}
    />
  </Pressable>
);

const styles = StyleSheet.create({
  basket: {
    position: 'absolute',
    right: 25,
    top: -18,
    height: 40,
    width: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20,
    borderRadius: 50,
  },
  counter: {
    position: 'absolute',
    zIndex: 5,
    height: 15,
    width: 15,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    left: 6,
    top: 13,
  },
  counterText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  basketImg: {
    height: 22,
    width: 22,
  },
});
