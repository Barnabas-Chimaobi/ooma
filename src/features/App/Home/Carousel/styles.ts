import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    // flex:1,
    marginLeft: -6,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'rgba(255, 255,255, 1.0)',
    backgroundColor: 'white',
    // marginBottom: 10,
  },
  menuImage: {
    height: 300,
    width: Dimensions.get('window').width / 1.18,
    borderRadius: 8,
    overflow: 'hidden',
        // width: Dimensions.get('window').width/1.15,
  },
  title: {
    // width: 129,
    height: 18,
    marginLeft: 7,
    marginTop: 3,
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 21,
    letterSpacing: 0.04,
    color: '#303030',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    marginBottom: 10,
    top: 5,
    left: -5
  },

  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 7,
  },

  ratingStar: {
    width: 14,
    height: 14,
    marginTop: 6,
  },
  description: {
    // textAlign: 'left',
    padding: 4,
    paddingBottom: 0,
    // marginTop: -5,
    fontSize: 12,
    marginLeft: -2,
    fontFamily: 'Montserrat',
    fontWeight: '900'

  },
});