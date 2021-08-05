import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../../colors';

export default StyleSheet.create({
  title: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    margin: 10,
    fontWeight: '400',
    marginBottom: 13,
    textAlign: 'left'
  },
  imageBackground: {
    // width: 160,
    width: Dimensions.get('window').width/2.3,
    height: 122,
    margin: 5
    
  },
  imageMaskBackground: {
    // width: 160,
    flex:1,
    backgroundColor:colors.black,
    opacity: 0.6,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:3
  },
  backTopButtonStyle: {
    width: 85,
    height: 26,
    padding: 6,
    borderColor: colors.green,
    borderWidth: 1,
    alignSelf: 'center',
    marginVertical: 30,
    marginBottom: 50,
  },
  backtopTitleStyle: {
    fontSize: 11,
    color: colors.primary,
  },
  sdImage: {
    height: 323,
    width: '100%',
  },
  sdMain: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'white',
    marginTop: -20,
    flex: 1,
  },
  sdHold: {
    paddingHorizontal: 12,
    paddingVertical: 20,
    borderBottomColor: '#E8E4E4',
    borderBottomWidth: 1,
  },
  sdContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sdRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  sdDelivery: {
    marginTop: 15,
  },
  sdButtonBar: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 20,
    alignItems: 'center',
  },
  cdDescription: {
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: 15,
    paddingVertical: 16,
  },
  exploreMain: {
    marginHorizontal: 10,
    marginVertical: 10,
    marginBottom: 10,
    flex:1
  },
  exploreInput: {
    backgroundColor: 'white',
    borderColor: colors.blackGrey,
    borderWidth: 1,
    borderRadius: 4
  },
  exploreCard: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'space-around',
  },
});
