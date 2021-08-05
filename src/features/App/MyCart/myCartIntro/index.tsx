import React from 'react';
import {StyleSheet, FlatList, Text, View} from 'react-native';

import Slide from '../../MenuPlan/components/menuIntro';
import {data} from './introData';

const CartPlanIntro = () => {
  return (
    <View style={styles.main}>
      <Text style={styles.headerText}>Wallet</Text>
      <FlatList
        data={data}
        style={styles.listStyle}
        renderItem={({item}) => {
          return <Slide data={item} />;
        }}
        pagingEnabled
        horizontal
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    color: 'white',
  },
  headerText: {
    color: '#0B6623',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 12,
    marginBottom: 8,
  },
  listStyle: {
    flex: 1,
  },
});

export default CartPlanIntro;
