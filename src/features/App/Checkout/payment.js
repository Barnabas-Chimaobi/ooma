import React, {useState, useEffect, useRef, Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  BackHandler,
  ImageBackground,
} from 'react-native';
import {color, colors} from '../../../colors';
import {
  paystack,
  flutter,
  forward,
  arrow,
  instantSuccess,
  mealSuccess,
} from '../../../assets';
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
      success: false,
      planState: this.props.route.params?.planOrderState,
    };
    this.paystackWebViewRef = React.createRef(null);
    this.backAction = this.backAction.bind(this);
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
      this.setState({
        success: true,
      });
      // ShowMessage(type.DONE, 'Order Placed Successfully');
      // this.props.navigation.navigate('Home');
    } else {
      ShowMessage(type.ERROR, 'Failed Transaction. please retry');
    }
    console.log(verify, 'paymentverify======');
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backAction);
    console.log(this.props.route.params, 'params=========');
  }

  toggleModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  backAction = async () => {
    // setLoading(true);
    if (!this.state.success) {
      this.setState({
        modalVisible: true,
      });
    } else {
      this.props.navigation.navigate('Home');
    }
  };

  backToHome = () => {
    this.props.navigation.navigate('Home');
  };

  render() {
    return this.state.success ? (
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={this.state.planState ? mealSuccess : instantSuccess}>
        <View
          style={{
            // backgroundColor: colors.white,
            top: '92%',
            height: 40,
            width: '40%',
            alignSelf: 'center',
            zIndex: 5,
          }}>
          <TouchableHighlight
            underlayColor=""
            onPress={() => {
              this.setState({success: false}),
                this.props.navigation.navigate('Home');
            }}>
            <Text></Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    ) : (
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
            maxHeight: '25%',
            width: '80%',
            alignSelf: 'center',
            backgroundColor: colors.white,
            borderRadius: 12,
            marginTop: '50%',
          }}
          // onBackdropPress={() => toggleModal()}
          isVisible={this.state.modalVisible}>
          <View style={{flex: 1, height: '50%'}}>
            <Text
              style={{
                alignSelf: 'center',
                color: colors.black,
                marginTop: 15,
                fontFamily: 'Montserrat',
                fontWeight: 'bold',
              }}>
              Cancel Order
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                color: colors.black,
                fontFamily: 'Montserrat',
                fontSize: 11,
                marginTop: 30,
                fontWeight: '900',
              }}>
              Are you sure you want to cancel this order?
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                color: colors.black,
                fontFamily: 'Montserrat',
                fontSize: 11,
                fontWeight: '900',
              }}>
              Note that this action cannot be reversed
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '60%',
                alignSelf: 'flex-end',
              }}>
              <TouchableHighlight
                underlayColor=""
                style={{width: '15%', marginTop: 35, marginLeft: 35}}
                onPress={() => this.toggleModal()}>
                <Text
                  style={{
                    color: colors.black,
                    // borderBottomWidth: 1,
                    // borderBottomColor: colors.black,
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  No
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor=""
                style={{width: '20%', marginTop: 35, marginRight: 35}}
                onPress={() => {
                  this.backToHome();
                }}>
                <View
                  style={{
                    // backgroundColor: colors.activeTintColor,
                    borderRadius: 5,
                    // padding: 3,
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      color: colors.black,
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
