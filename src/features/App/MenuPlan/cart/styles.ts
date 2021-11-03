import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  root: {
    // padding: 10,
    flex: 1,
    flexDirection: 'column',
  },
  currentDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 10,
    borderBottomColor: '#444444',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
  currentDateVal: {
    textTransform: 'uppercase',
  },
  calendar: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    width: '35%',
    borderStyle: 'solid',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  date: {
    padding: 20,
  },
  hour: {
    textAlign: 'right',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 10,
  },
  listView: {marginBottom: 10, paddingLeft: 5, paddingRight: 5,},
  listStyle: {flex: 1},
  itemStyle: {
    flexDirection: 'row',
    marginBottom: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 7,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
  },

  itemNameStyle: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 16,
    color: '#303030',
    width: 130,
  },
  textViewStyles: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginLeft: -30,
    
    height: '100%',
  },
  countStyles: {
    fontWeight: '100',
    color: 'green',
    fontSize: 12,
    paddingLeft: 15
  },
  timeStyle: {
    color: 'green',
    fontSize: 12,
    marginTop: 40
  },
  deliveryStyle: {
    color: 'green',
    fontSize: 11,
    letterSpacing: 0.5,
    fontWeight: '100',
  },
  priceStyle: {
    fontSize: 13,
    color: '#303030',
  },
  listFooter: {
    marginTop: '5%',
    padding: 5,
    backgroundColor: 'white',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10
  },
  totalPrice: {
    fontWeight: '100',
  },
  totalText: {
    fontWeight: 'bold',
  },
  btn: {
    alignItems: 'center',
    backgroundColor: '#303030',
    height: 44,
    justifyContent: 'center',
    borderRadius: 5,
  },
  btnText: {fontWeight: 'bold', color: 'white'},
  cardView: {justifyContent: 'flex-end'},
  btnClose: {
    backgroundColor: '#05944F',
    width: '93%',
    alignSelf: 'center',
  },
  modalView: {
    alignItems: 'flex-start',
    backgroundColor: '#F8F8F8',
  },
  btnStyles: {
    alignItems: 'center',
    backgroundColor: '#303030',
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
    width: '95%',
  },
  radioSection: {
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 'auto',
    padding: 20,
  },
  paymentText: {marginBottom: 25, fontSize: 25, fontWeight: 'bold'},
  priceSection: {
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 'auto',
    padding: 20,
    height: '37%',
    justifyContent: 'space-evenly',
  },

  accordionToggle: {
    borderBottomColor: '#44444435',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  accordionText: {
    marginBottom: 5,
    marginTop: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    color: '#555',
  },
});
