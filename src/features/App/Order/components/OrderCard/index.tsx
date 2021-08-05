import React from 'react';
import {Pressable, View, Text} from 'react-native';
import {Divider} from 'react-native-elements';
import S from './styles';

interface IProps {
  dateTitle: string;
  titlePosition?: string;
  children?: any;
  mainStyle?: object;
  onPress?: () => void;
}

const OrderCard = ({
  dateTitle,
  titlePosition,
  children,
  onPress,
  mainStyle,
}: IProps) => {
  return (
    <Pressable onPress={onPress}>
      <View style={[S.main, mainStyle]}>
        <Text style={titlePosition == 'right' ? S.right : S.left}>
          {dateTitle}
        </Text>
        <Divider style={{marginBottom: 10}} />
        {children}
      </View>
    </Pressable>
  );
};

export default OrderCard;
