import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, FlatList, Text, View, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width: windowWidth} = Dimensions.get('window');

import Slide from './components/menuIntro';
import {data} from './components/menuIntro/introData';
interface Props {
  title?: string;
  externalRoute?: string;
}
const MenuPlanIntro: React.FC<Props> = ({title, externalRoute}) => {
  const [index, setIndex] = useState(0);
  const [intros, setIntro] = useState('');
  const indexRef = useRef(index);
  indexRef.current = index;
  const onScroll = useCallback((event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const cardIndex = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(cardIndex);

    const distance = Math.abs(roundIndex - cardIndex);
    const isNoMansLand = distance > 0.4;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);

  const disableIntro = async () => {
    let intro = 'disable';
    const newAsync = await AsyncStorage.setItem('intro', intro);
    // const getIntro = await AsyncStorage.getItem('intro')
    // setIntro(getIntro)
  };

  useEffect(() => {
    disableIntro();
    console.log('indexxxxxxxxssssss');
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback((e) => e.title, []),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth * 0.9,
        offset: index * windowWidth * 0.9,
      }),
      [],
    ),
  };
  return (
    <View style={styles.main}>
      <Text style={styles.headerText}>{title || 'Meal Plan'}</Text>
      <FlatList
        data={data}
        style={styles.listStyle}
        renderItem={({item}) => {
          return (
            <Slide
              data={{
                ...item,
                externalRoute: externalRoute ? externalRoute : '',
              }}
            />
          );
        }}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        {...flatListOptimizationProps}
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

export default MenuPlanIntro;
