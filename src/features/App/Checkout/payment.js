import React, {useState, useEffect, useRef, Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  BackHandler,
} from 'react-native';
import {color, colors} from '../../../colors';
import {paystack, flutter, forward, arrow} from '../../../assets';
import {PayWithFlutterwave} from 'flutterwave-react-native';
// import Paystack from 'react-native-paystack-webview';
import {Paystack, paystackProps} from 'react-native-paystack-webview';
import {useNavigation, useRoute} from '@react-navigation/native';
import {verifyPayment, generatePaymentRef} from '../../../FetchData';
import {ref} from 'yup';
import {
  HeaderBar,
  OmaCard,
  InputPrimary,
  Total,
  ButtonType,
  Button,
  ShowMessage,
  type,
} from '../../../components';
import Modal from 'react-native-modal';

// const navigation = useNavigation();
// const route = useRoute();
export class State extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pubkey: '',
      refdata: '',
      amount: this.props.route.params?.amount,
      branch: this.props.route.params?.branchId,
      order: this.props.route.params?.orderId,
      paymentMethod: this.props.route.params?.paymentMethod,
      modalVisible: false,
    };
    this.paystackWebViewRef = React.createRef(null);
  }
  genrateRef = async (method, openStack) => {
    // const {amount, branchId, orderId, paymentMethod} = this.props.route.params;
    let body = {
      amount: this.state.amount,
      branchId: this.state.branch,
      orderId: this.state.order,
      paymentMethod: this.state.paymentMethod,
      gateWayType: method,
    };

    const genRef = await generatePaymentRef(body);
    this.setState({
      pubkey: genRef?.data?.publicKey,
      refdata: genRef?.data?.paymentRef,
    });
    if (genRef?.data?.statusCode === 201) {
      // setTimeout(() => {
      //   paystackWebViewRef.current.startTransaction();
      // }, 3000);
    }
    console.log(genRef?.data?.publicKey, 'genrefernce======');
    setTimeout(() => {
      this.paystackWebViewRef.current.startTransaction();
      console.log(this.state.pubkey, '==keyyyy====refdata');
    }, 2000);
    console.log(this.state.refdata, '======refdata');
    // verifyRef();
  };

  verifyRef = async () => {
    const verify = await verifyPayment(this.state.refdata);
    if (verify?.data.status === 'success') {
      ShowMessage(type.DONE, 'Order Placed Successfully');
      this.props.navigation.navigate('Home');
    } else {
      ShowMessage(type.ERROR, 'Failed Transaction. please retry');
    }
    console.log(verify, 'paymentverify======');
  };

  componentDidMount() {
    // BackHandler.addEventListener('hardwareBackPress', this.backAction());
    console.log(this.props.route.params, 'params=========');
  }

  toggleModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  // backAction = async () => {
  //   this.navigation.navigate('Home');
  //   // setLoading(true);
  //   this.setState({
  //     modalVisible: true,
  //   });

  // };

  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableHighlight
          onPress={() => this.props.navigation.goBack()}
          underlayColor="">
          <Image style={styles.backArrow} source={arrow} />
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor=""
          onPress={() => this.genrateRef('PAYSTACK')}>
          <View style={styles.container}>
            <View>
              <Image
                style={styles.image}
                source={paystack}
                resizeMode="contain"
              />
              <Text style={styles.paymentStack}>Make Payment via Paystack</Text>
              <Text style={styles.details}>Enter card details</Text>
            </View>
            <View>
              <Image
                style={styles.image1}
                source={forward}
                resizeMode="contain"
              />
            </View>
          </View>
        </TouchableHighlight>
        {/* <View>{showStack === true ? paysts : null}</View> */}
        {/* <View>{showWave === true ? flutterwave : null}</View> */}
        {/* <TouchableHighlight underlayColor="" underlayColor="">
          <View style={styles.container}>
            <View>
              <Image style={styles.image} source={flutter} />
              <Text style={styles.paymentStack}>
                Make Payment via Flutterwave
              </Text>
              <Text style={styles.details}>Enter card details</Text>
            </View>
            <View>
              <Image
                style={styles.image1}
                source={forward}
                resizeMode="contain"
              />
            </View>
          </View>
        </TouchableHighlight> */}

        <Modal
          style={{
            maxHeight: '30%',
            width: '80%',
            alignSelf: 'center',
            backgroundColor: colors.logout,
            borderRadius: 12,
            marginTop: '50%',
          }}
          // onBackdropPress={() => toggleModal()}
          isVisible={this.state.modalVisible}>
          <View style={{flex: 1, height: '50%'}}>
            <Text
              style={{
                alignSelf: 'center',
                color: colors.white,
                marginTop: 15,
                fontFamily: 'Poppins-SemiBold',
              }}>
              Cancel Order
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                color: colors.white,
                fontFamily: 'Poppins-SemiBold',
                fontSize: 11,
                marginTop: 30,
              }}>
              Are you sure you want to cancel this order?
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                color: colors.white,
                fontFamily: 'Poppins-SemiBold',
                fontSize: 11,
              }}>
              Note that this action cannot be reversed
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableHighlight
                style={{width: '15%', marginTop: 35, marginLeft: 35}}
                onPress={() => this.toggleModal()}>
                <Text
                  style={{
                    color: colors.white,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.white,
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  No
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{width: '20%', marginTop: 35, marginRight: 35}}
                onPress={() => {
                  this.backAction();
                }}>
                <View
                  style={{
                    backgroundColor: colors.activeTintColor,
                    borderRadius: 5,
                    padding: 3,
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      color: colors.white,
                      paddingLeft: 3,
                      paddingRight: 3,
                      fontFamily: 'Poppins-SemiBold',
                      textAlign: 'center',
                    }}>
                    Yes
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <Paystack
          paystackKey={this.state.pubkey}
          billingEmail="help.ooma@gmail.com"
          amount={this.state.amount}
          onCancel={(e) => {
            console.log(
              e,
              JSON.stringify(this.state.refdata),
              'errrooofromstack========',
            );
            // handle response here
          }}
          onSuccess={(res) => {
            console.log(res, 'responsefromstack========');
            this.verifyRef();
            // handle response here
          }}
          ref={this.paystackWebViewRef}
          refNumber={this.state.refdata}
        />
      </View>
    );
  }
}

export default State;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    elevation: 5,
    flexDirection: 'row',
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    justifyContent: 'space-between',
    borderRadius: 10,
    height: 110,
  },
  image: {
    height: 30,
    width: 150,
  },
  paymentStack: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },
  image1: {
    height: 20,
    width: 25,
    marginTop: 15,
  },
  details: {
    marginTop: 5,
  },
  mainContainer: {
    padding: 10,
  },
  backArrow: {
    width: 25,
    height: 25,
    marginLeft: 3,
    marginBottom: 15,
  },
});
