import {StyleSheet} from 'react-native'; 

export const S = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    // backgroundColor: 'red', 
    // alignItems: 'center',
  },
 addressView: {
  marginBottom: 15,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 10,
  width: '100%',
  borderBottomColor: '#303030',
  borderBottomWidth: 0.5,
},
iconAndText: {
  flexDirection: 'row', 
  alignItems: 'center', 
  marginBottom: 4
},
iconEdit: {width: '15%', alignItems: 'flex-end'}
})