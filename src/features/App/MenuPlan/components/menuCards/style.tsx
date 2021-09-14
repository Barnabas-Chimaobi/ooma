import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'rgba(255, 255,255, 1.0)',
    backgroundColor: 'white',
    marginBottom: 10,
  },
  menuImage: {
    height: 183,
    width: '100%',
    borderRadius: 5,
  },
  title: {
    // width: 129,
    height: 18,
    marginLeft: 7,
    marginTop: 7,
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
  },

  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 7,
  },

  ratingStar: {
    width: 14,
    height: 14,
    marginTop: 6,
  },
  description: {
    textAlign: 'left',
    padding: 4,
    marginBottom: 10,
  },
});
