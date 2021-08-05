import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
const {width: windowWidth} = Dimensions.get('window');

export const styles = StyleSheet.create({
  main: {
    width: windowWidth * 0.9,
    alignItems: 'flex-start',
    position: 'relative',
  },
  headerText: {
    color: '#0B6623',
    lineHeight: 23,
    letterSpacing: 1.5,
    textAlign: 'left',
  },
  btn: {
    backgroundColor: '#05944F',
    width: 208,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 2,
    alignSelf: 'center',
    zIndex: 5,
  },
  btnText: {
    color: 'white',
    textTransform: 'uppercase',
  },
  imageSection: {
    width: windowWidth * 0.9,
    height: '75%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img1: {
    position: 'absolute',
    zIndex: 2,
  },
  img2: {
    position: 'absolute',
  },
});
