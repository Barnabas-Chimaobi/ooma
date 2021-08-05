import React from 'react';
import {Button, Icon, Text} from 'react-native-elements';
import {Image} from 'react-native';

export enum Type {
  solid = 'solid',
  outline = 'outline',
  clear = 'clear',
}

interface IProps {
  title?: string;
  type?: Type;
  buttonStyle?: object;
  titleStyle?: object;
  onPress?: () => any;
  iconContainerStyle?: object;
  containerStyle?: object;
  iconRight?: boolean;
  disabled?: any;
  loading?: any;
  info?: string;
  iconName?: any;
  iconType?: string;
  iconColor?: string;
  iconSize?: number;
  imageIcon?: any;
  ViewComponent?: any;
  linearGradientProps?: any;
}

const ButtonComponent: React.FC<IProps> = ({
  title,
  type,
  buttonStyle,
  titleStyle,
  onPress,
  iconContainerStyle,
  containerStyle,
  iconRight,
  disabled,
  loading,
  info,
  iconName,
  iconType,
  iconColor,
  iconSize,
  imageIcon,
  ViewComponent,
  linearGradientProps,
}) => {
  return (
    <>
      <Text>{info}</Text>
      <Button
        // linearGradientProps={linearGradientProps}
        // ViewComponent={ViewComponent}
        title={title}
        titleStyle={titleStyle}
        buttonStyle={buttonStyle}
        containerStyle={containerStyle}
        onPress={onPress}
        type={type}
        icon={
          imageIcon ? (
            <Image source={imageIcon} />
          ) : (
            <Icon
              name={iconName}
              type={iconType || 'font-awesome-5'}
              color={iconColor}
              size={iconSize}
            />
          )
        }
        iconContainerStyle={iconContainerStyle}
        iconRight={iconRight}
        disabled={disabled}
        loading={loading}
      />
    </>
  );
};

export {ButtonComponent as Button};
