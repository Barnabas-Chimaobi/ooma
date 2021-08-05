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
import {Divider} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import {DateFormatter} from '../../Utils';

interface IProps {
  image1: any;
  title: string;
  image2?: any;
  rejig?: boolean;
  rejigTitle?: string;
  otherTitle?: any;
  onPressImg?: () => void;
  modes?: any;
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
}: IProps) => {
  const [date, setDate] = useState();

  const [show, setShow] = useState(modes);

  const onChange = (e: any, selectedDate: any) => {
    console.log(new Date(selectedDate).toLocaleDateString(), 'selecteddatess');
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(Platform.OS === 'ios');
    modes(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  console.log(otherTitle, 'title');
  return (
    <>
      <View style={S.location}>
        <View style={S.locationDetails}>
          {onPressImg ? (
            <TouchableOpacity
              onPress={() => {
                showDatepicker(), onPressImg();
              }}>
              <Image source={image1} style={S.locationImage} />
            </TouchableOpacity>
          ) : (
            <Image source={image1} style={S.locationImage} />
          )}
          <Text style={{fontSize: 13}}>{title}</Text>
        </View>
        <TouchableOpacity
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
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </>
  );
};

export default HeaderBar;
