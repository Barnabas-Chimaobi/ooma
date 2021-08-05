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
    flex: 1.3, 
    // backgroundColor: 'pink',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerStyle: {
    marginTop: -10,
    height: 34,
     width: '50%', 
     borderColor: "#303030"
    },
    second: {
      flex: 1.3,
      justifyContent: 'space-around', 
      marginVertical: 5
    },
    top: {
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-between',
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