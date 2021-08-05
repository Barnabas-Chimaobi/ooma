import React, {FC} from 'react';
import {TextInput, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {colors} from '../../../colors';
import S from '../styles';

export enum KeyboardType {
  default = 'default',
  email = 'email-address',
  numeric = 'numeric',
  phone = 'phone-pad',
  number = 'number-pad',
  decimal = 'decimal-pad',
}

interface Props {
  name?: any;
  value?: string;
  label?: string;
  errorMsg?: string;
  rightIcon?: any;
  leftIcon?: any;
  keyboardType?: KeyboardType;
  containerStyles?: object;
  inputContainerStyles?: object;
  leftLabel?: string;
  onChangeText?: (text: string) => void;
  otherProps?: any;
  title?: string;
  titleStyle?: object;
  secureTextEntry?: boolean;
  maxLength?: number;
  placeholderTextColor?: string;
  iconName?: any;
  iconType?: string;
  iconColor?: string;
  iconSize?: number;
  rightIconPress?: () => void;
}

export const InputPrimary: FC<Props> = ({
  name,
  value,
  label,
  errorMsg,
  rightIcon,
  keyboardType,
  containerStyles,
  inputContainerStyles,
  leftLabel,
  title,
  secureTextEntry,
  titleStyle,
  onChangeText,
  maxLength,
  placeholderTextColor,
  iconName,
  iconType,
  iconColor,
  iconSize,
  rightIconPress,
  ...otherProps
}) => {
  return (
    <View style={containerStyles}>
      {title && <Text style={titleStyle}>{title}</Text>}
      <View
        style={[
          S.mainStyle,
          rightIcon && {paddingRight: 20, justifyContent: 'space-between'},
        ]}>
        <TextInput
          keyboardType={keyboardType}
          maxLength={maxLength}
          style={[S.inputContainerStyles, inputContainerStyles]}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          placeholder={leftLabel}
          placeholderTextColor={
            placeholderTextColor ? placeholderTextColor : '#0000003D'
          }
          // containerStyle={{...styles.container, ...inputContainerStyles}}
          // errorStyle={{color: 'red'}}
          // errorMessage={errorMsg}
          underlineColorAndroid="transparent"
          // inputContainerStyle={{
          //   ...styles.inputContainer,
          //   ...inputContainerStyles,
          // }}
          leftIcon={
            leftLabel ? (
              <Text style={{color: '#5e5e5e', marginRight: 19}}>{label}</Text>
            ) : null
          }
          {...otherProps}
        />
        {rightIcon && (
          <Icon
            name={iconName}
            type={iconType || 'font-awesome-5'}
            color={iconColor}
            size={iconSize}
            onPress={rightIconPress}
          />
        )}
      </View>
    </View>
  );
};
