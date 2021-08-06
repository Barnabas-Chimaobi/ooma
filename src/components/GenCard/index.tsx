import React from 'react';
import {View, Text} from 'react-native';

interface IProps {
  title?: string;
  otherProps?: any;
  mainStyle?: object;
  titleStyle?: object;
  bodyStyle?: object;
  overStyle?: object;
  subStyle?: object;
  overTitle?: string;
  subTitle?: string;
}

const Card = ({
  title,
  otherProps,
  mainStyle,
  titleStyle,
  bodyStyle,
  overStyle,
  subStyle,
  overTitle,
  subTitle,
}: IProps) => {
  return (
    <View style={[mainStyle, {paddingTop: 15}]}>
      {overTitle && <Text style={overStyle}>{overTitle}</Text>}
      {title && <Text style={titleStyle}>{title}</Text>}
      {subTitle && <Text style={subStyle}>{subTitle}</Text>}
      {otherProps && <View style={bodyStyle}>{otherProps}</View>}
    </View>
  );
};

export default Card;
