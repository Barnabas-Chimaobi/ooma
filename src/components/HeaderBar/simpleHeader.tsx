import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {grid} from '../../assets';
import {AnyIfEmpty} from 'react-redux';

interface Props {
  onPress?: () => void;
  style?: object;
  hasBottomBorder?: boolean;
  gridView?: boolean;
  gridToggle?: () => void;
  icon?: any;
  color: any;
}
const SimpleHeader: React.FC<Props> = ({
  onPress,
  style,
  hasBottomBorder,
  gridView,
  gridToggle,
  icon,
  color,
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...style,
      }}>
      <TouchableOpacity
        style={{
          height: 50,
          justifyContent: 'center',
        }}
        onPress={() => (onPress ? onPress : navigation.goBack())}>
        {icon ? icon : <AntDesign color={color} name="arrowleft" size={28} />}
      </TouchableOpacity>
      {gridView && (
        <TouchableOpacity onPress={gridToggle}>
          <Image source={grid} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SimpleHeader;
