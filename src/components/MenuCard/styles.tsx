import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../colors';

export default StyleSheet.create({
  main: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    height: 300,
    width: '100%',
    // width: Dimensions.get('window').width / 1,

    borderRadius: 10,
    overflow: 'hidden',
  },

  imageBackground3: {
    flex: 1,
    height: 300,
    width: '100%',
    // width: Dimensions.get('window').width / 1,
    marginLeft: 2,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  imageBackground2: {
    flex: 1,
    height: 250,
    // width: 300,
    width: Dimensions.get('window').width / 1.07,

    borderRadius: 10,
    overflow: 'hidden',
  },
  labelMain: {
    height: 30,
    // width: '40%',
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#05944F',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    color: 'white',
    padding: 3,
  },
  flex: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likeImage: {
    marginEnd: 12,
  },
  textBar: {
    marginTop: 14,
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 13,
    justifyContent: 'space-between',
  },
  ratingImage: {
    width: 15,
    height: 15,
    marginRight: 6,
  },
  dishType: {
    color: colors.fadeGreen,
    fontSize: 11,
    padding: 5,
  },

  mainRow: {
    backgroundColor: colors.white,
    marginBottom: 5,
  },
  rowMain: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 15,
    elevation: 10,
  },
  imageBackgroundRow: {
    width: 130,
    height: 110,
    marginTop: 15,
  },
  flexRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likeImageRow: {
    marginEnd: 12,
  },
  textBarRow: {
    marginStart: 10,
    flexWrap: 'wrap',
    paddingTop: 10,
  },
});
