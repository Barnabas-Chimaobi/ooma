import {StyleSheet} from 'react-native'; 

export const S = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 18,
    // backgroundColor: 'red', 
    // alignItems: 'center',
  },
  first: {
    flex: 0.5,
    
    // backgroundColor: 'pink',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  containerStyle: {
    // marginTop: -10,
    // height: 34,
     width: '50%', 
    borderColor: "#303030",
    //  marginBottom: -150,
    },
    second: {
      flex: 0.3,
      justifyContent: 'space-around', 
      marginVertical: 5,
      top: -50
    },
    top: {
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      // bottom: -20
    },
    addressView: {
      fontWeight: 'bold', 
      fontSize: 16
    },
    boldText: {
      fontWeight: 'bold'
    },
    addressText: {
      flexDirection: 'row', 
      alignItems: 'center'
    },
    third: {
      // backgroundColor: 'blue',
      flex: 1.2, 
      justifyContent: 'space-around'
    },
    fourth: { 
      flex: 1,
      // backgroundColor: 'red'
    },
})