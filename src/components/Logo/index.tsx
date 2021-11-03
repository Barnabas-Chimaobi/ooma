import React from 'react';
import {Image} from 'react-native';

const Logo = ({logoStyle, large}: any) => {
  return (
    <>
      {large ? (
        <Image
          resizeMode="contain"
          source={require('../../assets/Images/oomaNologo.png')}
          style={logoStyle}
        />
      ) : (
        <Image
          source={require('../../assets/Images/ooma.jpeg')}
          style={logoStyle}
          resizeMode="contain"
        />
      )}
    </>
  );
};

export default Logo;
