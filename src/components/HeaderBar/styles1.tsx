import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  location: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    width: '90%',
    padding: 9,
    borderRadius: 20,
  },
  locationDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationImage: {
    marginRight: 2,
    height: 20,
    width: 20,
    marginLeft: -5,
  },
  rejig: {
    paddingRight: 10,
    borderRightWidth: 3,
    borderRightColor: 'rgba(0, 0, 0, 0.15)',
    padding: 6,
  },
  timerBar: {
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
    width: '30%',
  },
});