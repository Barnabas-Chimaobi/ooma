import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Image,
} from 'react-native';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

export const DatePicker = forwardRef((props, ref) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      showModal: () => showDatepicker,
      dateChange: () => onChange,
    }),
    [setShow],
  );

  const onChange = (e: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');

    setDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode(mode);
  };
  return (
    <View>
      <TouchableOpacity style={styles.calendar} onPress={showDatepicker}>
        <Image
          source={require('../../features/App/MenuPlan/assets/calendar3.png')}
        />
        <Text>{moment(date).format('D-MM-YYYY')}</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  calendar: {
    marginLeft: 20,
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
});
