import React, {useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

const Skeleton = () => {
  const [isloading1, setIsloading1] = useState(true);
  return (
    <View style={{flex: 1, marginTop: 15}}>
      {/* <View style={{flexDirection: 'row'}}> */}
      <SkeletonContent
        containerStyle={{flex: 1, width: '70%'}}
        isLoading={isloading1}
        animationType="shiver"
        boneColor="rgba(225, 225, 225,0.3)"
        highlightColor="rgba(225, 225, 225,0.3)"
        layout={[
          {
            key: 'someId',
            width: '70%',
            height: Dimensions.get('window').width / 12,
            marginBottom: 6,
            marginLeft: 5,
            backgroundColor: 'rgba(225, 225, 225,0.3)',
            borderRadius: 10,
          },
        ]}></SkeletonContent>
      <SkeletonContent
        containerStyle={{flex: 1, width: '100%'}}
        isLoading={isloading1}
        animationType="shiver"
        boneColor="rgba(225, 225, 225,0.3)"
        highlightColor="rgba(225, 225, 225,0.3)"
        layout={[
          {
            key: 'someId',
            width: '145%',
            // marginLeft: '-50%',
            height: Dimensions.get('window').width / 12,
            marginBottom: 6,
            marginLeft: 5,
            backgroundColor: 'rgba(225, 225, 225,0.3)',
          },
        ]}></SkeletonContent>
      {/* </View> */}
      {/* <View style={{flexDirection: 'row'}}> */}
      <SkeletonContent
        containerStyle={{flex: 1, width: '100%'}}
        isLoading={isloading1}
        animationType="shiver"
        boneColor="rgba(225, 225, 225,0.3)"
        highlightColor="rgba(225, 225, 225,0.3)"
        layout={[
          {
            key: 'someId',
            width: '145%',
            height: Dimensions.get('window').width / 1.5,
            marginBottom: 6,
            marginLeft: 5,
            backgroundColor: 'rgba(225, 225, 225,0.3)',
            borderRadius: 10,
          },
        ]}></SkeletonContent>
      <SkeletonContent
        containerStyle={{flex: 1, width: '70%'}}
        isLoading={isloading1}
        animationType="shiver"
        boneColor="rgba(225, 225, 225,0.3)"
        highlightColor="rgba(225, 225, 225,0.3)"
        layout={[
          {
            key: 'someId',
            width: '70%',
            height: Dimensions.get('window').width / 12,
            marginBottom: 6,
            // marginLeft: '-50%',
            marginLeft: 5,
            backgroundColor: 'rgba(225, 225, 225,0.3)',
          },
        ]}></SkeletonContent>
      {/* </View> */}
      {/* <View style={{flexDirection: 'row'}}> */}
      <SkeletonContent
        containerStyle={{flex: 1, width: '85%'}}
        isLoading={isloading1}
        animationType="shiver"
        boneColor="rgba(225, 225, 225,0.3)"
        highlightColor="rgba(225, 225, 225,0.3)"
        layout={[
          {
            key: 'someId',
            width: '85%',
            height: Dimensions.get('window').width / 12,
            marginBottom: 6,
            marginLeft: 5,
            backgroundColor: 'rgba(225, 225, 225,0.3)',
            borderRadius: 10,
          },
        ]}></SkeletonContent>
      <SkeletonContent
        containerStyle={{flex: 1, width: '95%'}}
        isLoading={isloading1}
        animationType="shiver"
        boneColor="rgba(225, 225, 225,0.3)"
        highlightColor="rgba(225, 225, 225,0.3)"
        layout={[
          {
            key: 'someId',
            width: '95%',
            height: Dimensions.get('window').width / 12,
            marginBottom: 6,
            // marginLeft: '-50%',
            marginLeft: 5,
            backgroundColor: 'rgba(225, 225, 225,0.3)',
          },
        ]}></SkeletonContent>
      {/* </View> */}
    </View>
  );
};

export default Skeleton;
