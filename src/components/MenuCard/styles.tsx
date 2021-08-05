import { StyleSheet } from 'react-native';
import { colors } from '../../colors';

export default StyleSheet.create({
  main: {
    flex: 1
  },
  imageBackground: {
    flex: 1,
    height: 172,
    borderRadius: 5
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
  },
  imageBackgroundRow: {
    width: 130,
    height: 150,
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
