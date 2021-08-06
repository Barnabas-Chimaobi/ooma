import React, {useCallback} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import shortid from 'shortid';
import {menuHistoryData} from './menuHistoryData';
import {ProgressBar} from '../../../../../components/ProgressBar/index';
import {PopupMenu} from '../../../../../components/PopupMenu/index';
import {Alert} from 'react-native';

const {width: windowWidth} = Dimensions.get('window');

interface ListProps {
  imageUrl: any;
  itemName: string;
  pecentage: Number;
  time: string;
  status: string;
}

export const MenuHistory = () => {
  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: () => shortid.generate(),
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth * 0.9,
        offset: index * windowWidth * 0.9,
      }),
      [],
    ),
  };

  const onPopupEvent = (eventName: string, index: Number) => {
    if (eventName !== 'itemSelected') return;
    if (index === 0) Alert.alert('Full Details');
    else Alert.alert('Deleted');
  };

  const Item = ({imageUrl, itemName, pecentage, time, status}: ListProps) => {
    return (
      <View style={styles.innerListItemStyle}>
        <View style={styles.overlayStyle} />
        <Image source={imageUrl} />
        <View style={styles.itemTextArea}>
          <Text style={styles.itemNameStyle}>{itemName}</Text>
          <Text style={styles.timeStyle}>{time}</Text>
          <View>
            <Text style={styles.statusStyle}>{status}</Text>
            <ProgressBar progressValue={pecentage} />
          </View>
        </View>
        <View style={{marginLeft: 'auto', zIndex: 555, top: 10}}>
          <PopupMenu
            actions={['View Full Details', 'Delete']}
            onPressMenu={onPopupEvent}
          />
        </View>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={menuHistoryData}
        style={styles.listStyle}
        renderItem={({item}) => {
          return (
            <Item
              imageUrl={item.imageUrl}
              itemName={item.itemName}
              pecentage={item.pecentage}
              time={item.time}
              status={item.status}
            />
          );
        }}
        {...flatListOptimizationProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  locationStyle: {
    fontStyle: 'italic',
    opacity: 0.5,
  },
  overlayStyle: {
    backgroundColor: '#fff',
    height: '100%',
    width: '100%',
    position: 'absolute',
    alignSelf: 'center',
    right: 10,
    zIndex: 5,
    opacity: 0.6,
  },
  innerListItemStyle: {
    borderBottomColor: '#44444475',
    borderBottomWidth: 1,
    padding: 10,
    flexDirection: 'row',
  },
  listStyle: {},

  innerListStyle: {},
  itemTextArea: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  itemNameStyle: {fontWeight: 'bold', fontSize: 16},
  timeStyle: {opacity: 0.5, fontSize: 12},
  statusStyle: {color: 'gray'},
  pecentageStyle: {fontSize: 10, fontWeight: 'bold'},
  buttonContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
});
