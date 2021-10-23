import {Button} from 'native-base';
import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {useTheme, useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import {colors} from '../colors/index';

import {
  homeIcon,
  exploreIcon,
  menuIcon,
  cartIcon,
  moreIcon,
  newCart,
  newMore,
  newPlan,
} from '../assets';
import {AppDispatch, RootState} from '../store';
import {useDispatch, useSelector} from 'react-redux';

class Footer extends Component {
  state = {
    loadDashboard: false,
  };

  hideLoader = () => {
    this.setState({
      loadDashboard: true,
    });
    setTimeout(() => {
      this.setState({
        loadDashboard: false,
      });
    }, 2000);
  };
  render() {
    const theme = this.props;
    // const notify = this.props.notify;
    // console.log(theme, 'notifyprops');
    // console.log(this.props.length, 'schedullless');
    // console.log(this.props.dashboard, 'dashboard');
    // console.log(this.props.notifications, 'notifications');
    // console.log(this.props.message, 'messages');
    // console.log(this.props.settings, 'settings');

    return (
      <View>
        <View style={[styles.container, {backgroundColor: colors.white}]}>
          <Spinner
            visible={this.state.loadDashboard}
            textStyle={styles.spinnerTextStyle}
            overlayColor="rgba(66, 66, 66,0.6)"
            customIndicator={<UIActivityIndicator color="white" />}
          />

          <TouchableWithoutFeedback
            onPress={() => {
              // this.hideLoader();
              this.props.navigation.navigate('Home');
            }}>
            <View
            // style={
            // this.props.dashboard != undefined ? styles.bordertop : null
            // }
            >
              <View style={{alignSelf: 'center'}}>
                {this.props.dashboard != undefined ? (
                  <Image
                    style={
                      this.props.dashboard != undefined
                        ? styles.btnSelected
                        : styles.notSelected
                    }
                    source={homeIcon}
                    resizeMethod="resize"
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    style={
                      this.props.dashboard != undefined
                        ? styles.btnSelected
                        : styles.notSelected
                    }
                    source={homeIcon}
                    resizeMethod="resize"
                    resizeMode="contain"
                  />
                )}
              </View>

              <Text
                style={{
                  alignSelf: 'center',
                  fontFamily: 'Montserrat',
                  fontSize: 12,
                }}>
                Home
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              // this.hideLoader();
              this.props.navigation.navigate('Menu');
            }}>
            <View
            // style={
            // this.props.schedule != undefined ? styles.bordertop : null
            // }
            >
              <View style={{alignSelf: 'center'}}>
                {this.props.meal != undefined ? (
                  <Image
                    style={
                      this.props.meal != undefined
                        ? styles.btnSelected
                        : styles.notSelected
                    }
                    resizeMode="contain"
                    resizeMethod="resize"
                    source={newPlan}
                  />
                ) : (
                  <Image
                    style={
                      this.props.meal != undefined
                        ? styles.btnSelected
                        : styles.notSelected
                    }
                    resizeMode="contain"
                    resizeMethod="resize"
                    source={newPlan}
                  />
                )}
              </View>

              <Text
                style={{
                  alignSelf: 'center',
                  fontFamily: 'Montserrat',
                  fontSize: 12,
                }}>
                Meal Plan
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              // this.hideLoader();
              this.props.navigation.navigate('Explore');
            }}>
            <View
            // style={
            // this.props.notifications != undefined
            //   ? styles.bordertop
            //   : null
            // }
            >
              <View style={{alignSelf: 'center'}}>
                {this.props.explore != undefined ? (
                  <Image
                    style={
                      this.props.explore != undefined
                        ? styles.btnSelected
                        : styles.notSelected
                    }
                    source={exploreIcon}
                    resizeMode="contain"
                    resizeMethod="resize"
                  />
                ) : (
                  <Image
                    style={
                      this.props.explore != undefined
                        ? styles.btnSelected
                        : styles.notSelected
                    }
                    source={exploreIcon}
                    resizeMode="contain"
                    resizeMethod="resize"
                  />
                )}
              </View>

              <Text
                style={{
                  alignSelf: 'center',
                  fontFamily: 'Montserrat',
                  fontSize: 12,
                }}>
                Explore
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              // this.hideLoader();
              this.props.navigation.navigate('MyCart');
            }}>
            <View
            // style={this.props.message != undefined ? styles.bordertop : null}
            >
              <View style={{alignSelf: 'center'}}>
                {this?.props?.length !== undefined ? (
                  <View
                    style={{
                      backgroundColor: colors.red,
                      borderRadius: 50,
                      position: 'absolute',
                      zIndex: 30,
                      minWidth: 15,
                      minHeight: 15,
                      marginLeft: 20,
                    }}>
                    <Text
                      style={{
                        color: colors.white,
                        textAlign: 'center',
                        fontSize: 10,
                      }}>
                      {this?.props?.length}
                    </Text>
                  </View>
                ) : null}

                {this.props.mycart != undefined ? (
                  <Image
                    style={
                      this.props.mycart != undefined
                        ? styles.btnSelected
                        : styles.notSelected
                    }
                    source={newCart}
                    resizeMode="contain"
                    resizeMethod="resize"
                  />
                ) : (
                  <Image
                    style={
                      this.props.mycart != undefined
                        ? styles.btnSelected
                        : styles.notSelected1
                    }
                    source={newCart}
                    resizeMode="contain"
                    resizeMethod="resize"
                  />
                )}
              </View>

              <Text
                style={{
                  alignSelf: 'center',
                  fontFamily: 'Montserrat',
                  fontSize: 12,
                }}>
                My Cart
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              // this.hideLoader();
              this.props.navigation.navigate('More');
            }}>
            <View
            // style={
            //   this.props.settings != undefined ? styles.bordertop : null
            // }
            >
              <View style={{alignSelf: 'center'}}>
                {this.props.more != undefined ? (
                  <Image
                    style={
                      this.props.more != undefined
                        ? styles.btnSelected
                        : styles.notSelected
                    }
                    source={newMore}
                    resizeMethod="resize"
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    style={
                      this.props.more != undefined
                        ? styles.btnSelected
                        : styles.notSelected
                    }
                    source={newMore}
                    resizeMethod="resize"
                    resizeMode="contain"
                  />
                )}
              </View>

              <Text
                style={{
                  alignSelf: 'center',
                  fontFamily: 'Montserrat',
                  fontSize: 12,
                }}>
                More
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const newFooter = (props) => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  // const dispatch: AppDispatch = useDispatch();
  const cartItem = useSelector((state: RootState) => state.addedCart.payload);

  return (
    <Footer
      {...props}
      length={cartItem?.length}
      theme={colors}
      navigation={navigation}
    />
  );
};

// const mapStateToProps = (state) => ({
//   notificationList: state.xplur.load.loadNotificationNo,
// });

// const mapDispatchToProps = (dispatch) => {
//   return {
//     notification: (params) => dispatch(xplurActions.getNotificationNo(params)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(newFooter);
export default newFooter;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    height: 52,
    paddingTop: 5,
    paddingLeft: '5%',
    paddingRight: '5%',
    borderTopColor: colors.greyShade,
    borderWidth: 1,
    // bottom: 10,
  },
  btnSelected: {
    // marginTop: 5,
    height: 25,
    width: 25,
    tintColor: colors.activeTintColor,
    alignSelf: 'center',
    // borderRadius: 10,
    // height: 30,
    // width: 100,
    // backgroundColor: 'red',
  },
  notSelected: {
    // borderColor: 'blue',
    // borderTopWidth: 1,
    height: 25,
    width: 25,
    tintColor: colors.inactiveTintColor,
  },
  notSelected1: {
    // borderColor: 'blue',
    // borderTopWidth: 1,
    height: 25,
    width: 25,
    tintColor: 'gray',
  },
  bordertop: {
    borderTopColor: '#ffffff',
    borderTopWidth: 2,
    width: 50,
    marginTop: -6,
  },
});
