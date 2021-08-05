import React from 'react';
import {Input} from 'react-native-elements';
import {  Text} from 'react-native';
import propTypes from 'prop-types';
import {useField} from 'formik'; 
export const InputPrimary = ({
  name,
  value,
  label,
  errorMsg,
  rightIcon,
  keyboardType,
  containerStyles,
  inputContainerStyles,
  leftLabel,
  handleChange,
  ...otherProps
}) => {
  return (
    <>
      <Input
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={leftLabel ? null : label}
        placeholderTextColor="#0000003D"
        inputContainerStyle={{...styles.inputContainer, ...containerStyles}}
        containerStyle={{...styles.container, ...inputContainerStyles}}
        errorStyle={{color: 'red'}}
        errorMessage={errorMsg}
        underlineColorAndroid="transparent"
        leftIcon={
          leftLabel ? (
            <Text style={{color: '#5e5e5e', marginRight: 19}}>{label}</Text>
          ) : null
        }
        rightIcon={rightIcon || null}
        {...otherProps}
      />
    </>
  );
};


// Wrap a Formik Field around Input
export const InputField = (props) => {
  const {
    name,
    value,
    label,
    errorMsg,
    keyboardType,
    multiline,
    numberOfLines,
    containerStyles,
    inputContainerStyles,
    leftLabel,
    handleChange,
    rightIcon,
    ...otherProps
  } = props;
  const [field, meta, helpers] = useField(props);

  return (
    <React.Fragment>
      <Input
        name={name}
        id={[label, name].join('-')}
        value={value[name]}
        onChange={handleChange}
        placeholder={leftLabel ? null : label}
        multiline={multiline}
        numberOfLines={numberOfLines}
        placeholderTextColor="#00000080"
        keyboardType={keyboardType}
        inputContainerStyle={{
          ...styles.inputContainer,
          ...inputContainerStyles,
        }}
        containerStyle={{...styles.container, ...containerStyles}}
        errorStyle={{color: 'red', marginTop: 0}}
        errorMessage={errorMsg}
        underlineColorAndroid="transparent"
        leftIcon={
          leftLabel ? (
            <Text style={{color: '#fff', marginRight: 5}}>{leftLabel}</Text>
          ) : null
        }
        rightIcon={rightIcon}
        {...field[name]}
        {...props}
        {...otherProps}
      />
      <Text style={styles.errorMessage}>{meta.touched && meta.error}</Text>
    </React.Fragment>
  );
};


// Plain Input
export const InputPlain = (props) => {
  const {
    name,
    value,
    label,
    errorMsg,
    keyboardType,
    multiline,
    numberOfLines,
    containerStyles,
    inputContainerStyles,
    leftLabel,
    handleChange,
    rightIcon,
    ...otherProps
  } = props;

  return (
    <React.Fragment>
      <Input
        name={name}
        id={[label, name].join('-')}
        value={value[name]}
        onChange={handleChange}
        placeholder={leftLabel ? null : label}
        multiline={multiline}
        numberOfLines={numberOfLines}
        placeholderTextColor="#00000080"
        keyboardType={keyboardType}
        inputContainerStyle={{
          ...styles.inputContainer,
          ...inputContainerStyles,
        }}
        containerStyle={{...styles.container, ...containerStyles}}
        errorStyle={{color: 'red', marginTop: 0}}
        errorMessage={errorMsg}
        underlineColorAndroid="transparent"
        leftIcon={
          leftLabel ? (
            <Text style={{color: '#fff', marginRight: 5}}>{leftLabel}</Text>
          ) : null
        }
        rightIcon={rightIcon}
  
        {...props}
        {...otherProps}
      />
    
    </React.Fragment>
  );
};


InputField.propTypes = {
  label: propTypes.string,
  name: propTypes.string,
  keyboardType: propTypes.string,
  errorMsg: propTypes.string,
  containerStyles: propTypes.object,
  inputContainerStyles: propTypes.object,
  // leftLabel: propTypes.bool,
};
