import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Platform,
  Alert,
} from 'react-native';
import S from './styles';
import s from './styles1';
import {Divider} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import {DateFormatter} from '../../Utils';
import {useNavigation} from '@react-navigation/native';

interface IProps {
  image1: any;
  title: string;
  image2?: any;
  rejig?: boolean;
  rejigTitle?: string;
  otherTitle?: any;
  onPressImg?: () => void;
  modes?: any;
  checkout: any;
  // onPressImgcheckout?: () => void;
}

const HeaderBar = ({
  image1,
  title,
  image2,
  rejig,
  rejigTitle,
  otherTitle,
  onPressImg,
  modes,
  checkout,
}: IProps) => {
  const [date, setDate] = useState();
  const navigation = useNavigation();

  const [show, setShow] = useState(modes);

  const onChange = (e: any, selectedDate: any) => {
    console.log(new Date(selectedDate).toLocaleDateString(), 'selecteddatess');
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(Platform.OS === 'ios');
    modes(DateFormatter.formatAMPM(currentDate));
  };

  const showMode = (currentMode: any) => {
    setShow(true);
  };

  const showDatepicker = () => {
    showMode('time');
  };
  console.log(otherTitle, 'title');
  return (
    <>
      {checkout === 'checkout' ? (
        <View>
          <View style={s.location}>
            <View style={s.locationDetails}>
              {onPressImg ? (
                <TouchableOpacity onPress={() => showDatepicker()}>
                  <Image source={image1} style={s.locationImage} />
                </TouchableOpacity>
              ) : (
                <Image source={image1} style={s.locationImage} />
              )}
              <Text style={{fontSize: 13, fontFamily: 'Open Sans'}}>
                {title}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                // (otherTitle == 'Set Time' || title == 'Set Time') &&
                showDatepicker();
              }}
              style={[s.timerBar, rejig && {width: '30%', padding: 0}]}>
              {/* {rejig ? (
                <>
                  <Text style={s.rejig}>{rejigTitle}</Text>
                </>
              ) : (
                <Image
                  source={image2}
                  style={{height: 18, width: 18, marginLeft: -25}}
                />
              )} */}
              <Text
                style={
                  (rejig && {padding: 6}) ||
                  (date && {
                    paddingHorizontal: 5,
                    // width: 90,
                    fontSize: 12,
                    marginLeft: 20,
                    textAlign: 'center',
                  })
                }>
                {date ? DateFormatter.formatAMPM(date) : 'Now'}
              </Text>
            </TouchableOpacity>
          </View>
          {show &&
            (checkout === 'checkout' ? (
              <DateTimePicker
                testID="dateTimePicker"
                value={date || new Date()}
                mode={'time'}
                is24Hour
                // is24Hour={true}
                display="default"
                onChange={onChange}
              />
            ) : (
              <DateTimePicker
                testID="dateTimePicker"
                value={date || new Date()}
                mode={'time'}
                // is24Hour={true}
                display="default"
                onChange={onChange}
              />
            ))}
        </View>
      ) : (
        <View style={{}}>
          <View style={S.location}>
            <Text
              style={{
                fontSize: 12,
                bottom: 10,
                alignSelf: 'flex-start',
                opacity: 0.5,
                left: 5,
                fontFamily: 'Montserrat',
              }}>
              Location
            </Text>
            <View style={S.locationDetails}>
              <Text style={{fontSize: 13, fontFamily: 'Open Sans'}}>
                {title.length > 25 ? title.substring(0, 25) + '..' : title}
              </Text>

              {onPressImg ? (
                <TouchableOpacity
                  onPress={() => {
                    onPressImg();
                  }}>
                  <Image
                    resizeMode="contain"
                    source={image1}
                    style={S.locationImage}
                  />
                </TouchableOpacity>
              ) : (
                <Image
                  resizeMode="contain"
                  source={image1}
                  style={S.locationImage}
                />
              )}
            </View>

            {/* <TouchableOpacity onPress={() => showDatepicker()}>
              <View
                style={{
                  flexDirection: 'row',
                  top: 25,
                  // marginLeft: -20,
                  borderColor: '#F6F6F6',
                  borderWidth: 1,
                  padding: 5,
                  borderRadius: 50,
                  marginBottom: 15,
                  alignSelf: 'flex-start',
                }}>
                <Image source={image2} style={{height: 18, width: 18}} />
                <Text style={{paddingHorizontal: 5, fontSize: 14}}>
                  Schedule Order
                </Text>
              </View>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
          onPress={() => {
            (otherTitle == 'Set Time' || title == 'Set Time') &&
              showDatepicker();
          }}
          style={[S.timerBar, rejig && {width: '50%', padding: 0}]}>
          {rejig ? (
            <>
              <Text style={S.rejig}>{rejigTitle}</Text>
            </>
          ) : (
            <Image
              source={image2}
              style={{height: 18, width: 18, marginLeft: -25}}
            />
          )}
          <Text
            style={
              (rejig && {padding: 6}) ||
              (date && {paddingHorizontal: 5, width: 90, fontSize: 10})
            }>
            {DateFormatter.date2(date) || new Date().toLocaleDateString()}
          </Text>
        </TouchableOpacity> */}
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date || new Date()}
              mode={'time'}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
      )}
    </>
  );
};

export default HeaderBar;
