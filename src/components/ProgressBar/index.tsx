import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Animated} from 'react-native';

interface Props {
  progressValue: Number;
}

export const ProgressBar = ({progressValue}: Props) => {
  const [progressStatusValue, setProgressStatusValue] = useState(0);
  const [pValue, setPValue] = useState(0);

  const animation = new Animated.Value(0);

  useEffect(() => {
    setPValue(+progressValue);
  });

  useEffect(() => {
    onAnimation();
  }, [setProgressStatusValue]);

  const onAnimation = () => {
    animation.addListener(({value}) => {
      setProgressStatusValue(parseInt(value.toString(), 10));
    });
    Animated.timing(animation, {
      toValue: pValue,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={progressStyles.containerStyle}>
      <Animated.View
        style={[
          progressStyles.innerStyle,
          {
            width: progressStatusValue + '%',
            backgroundColor:
              progressStatusValue === 100 ? '#44444455' : 'green',
          },
        ]}
      />
      <Animated.Text style={progressStyles.label}>
        {progressStatusValue}%
      </Animated.Text>
    </View>
  );
};

const progressStyles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    height: 10,
    backgroundColor: '#44444455',
    borderRadius: 100,

    justifyContent: 'center',
  },
  innerStyle: {
    width: '100%',
    height: 9,
    borderRadius: 16,
  },
  label: {
    fontSize: 9,
    color: 'black',
    position: 'absolute',
    zIndex: 1,
    right: -22,
    fontWeight: 'bold',
  },
});
