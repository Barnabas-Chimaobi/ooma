import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {Formik} from 'formik';
import * as yup from 'yup';
import {S} from './styles';
import {data} from './data';
import {
  Button,
  BaseInput,
  BaseKeyBoardType,
  Picker,
} from '../../../../components';
const validationSchema = yup.object().shape({
  city: yup.string().required('This field is required.'),
  area: yup.string().required('This field is required.'),
  streetOrLayout: yup.string().required('This field is required.'),
  houseNumber: yup.string().required('This field is required.'),
});
const initialValues = {
  city: '',
  area: '',
  streetOrLayout: '',
  houseNumber: '',
  landmark: '',
};
interface Props {
  navigation: any;
}
interface stateProps {
  showPassword1: boolean;
  showPassword2: boolean;
  showPassword3: boolean;
}
const AddNewAddress: React.FC<Props> = ({navigation}) => {
  const [state, setState] = useState<stateProps>({
    showPassword1: true,
    showPassword2: true,
    showPassword3: true,
  });
  const {showPassword1, showPassword2, showPassword3} = state;

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => console.log(values)}>
          {({
            values,
            handleBlur,
            errors,
            touched,
            handleChange,
            handleSubmit,
          }) => (
            <View
              style={{
                flex: 1,
                paddingHorizontal: 15,
              }}>
              {/* <TouchableOpacity
                style={{paddingVertical: 5, marginBottom: 10}}
                onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={28} />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Entypo name="home" size={25} />
                <Text style={{marginLeft: 15, fontSize: 20}}>Home</Text>
              </View> */}
              {/* <Picker
                topLabel="City"
                PickerOptions={data}
                selectedValue={values.city}
                onValueChange={handleChange('city')}
                errors={errors.city}
                touched={touched.city}
              />
              <Picker
                topLabel="Area"
                PickerOptions={data}
                selectedValue={values.area}
                onValueChange={handleChange('area')}
                errors={errors.area}
                touched={touched.area}
              />
              <Picker
                topLabel="Stret/Layout"
                PickerOptions={data}
                selectedValue={values.streetOrLayout}
                onValueChange={handleChange('streetOrLayout')}
                errors={errors.streetOrLayout}
                touched={touched.streetOrLayout}
              /> */}
              <Text
                style={{
                  marginBottom: 9,
                  fontSize: 16,
                  color: 'rgba(0, 0, 0, 0.25)',
                }}>
                {' '}
                House Number
              </Text>
              <BaseInput
                value={values.houseNumber}
                onChangeText={handleChange('houseNumber')}
                errors={errors.houseNumber}
                touched={touched.houseNumber}
                name={values.houseNumber}
                style={{
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                  borderColor: 'rgba(0, 0, 0, 0.25)',
                }}
              />

              <Text
                style={{
                  marginBottom: 9,
                  fontSize: 16,
                  color: 'rgba(0, 0, 0, 0.25)',
                }}>
                {' '}
                House Number
              </Text>
              <BaseInput
                value={values.houseNumber}
                onChangeText={handleChange('houseNumber')}
                errors={errors.houseNumber}
                touched={touched.houseNumber}
                name={values.houseNumber}
                style={{
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                  borderColor: 'rgba(0, 0, 0, 0.25)',
                }}
              />

              {/* <Picker
                topLabel="Landmark(optional)"
                PickerOptions={data}
                selectedValue={values.landmark}
                onValueChange={handleChange('landmark')}
                errors={errors.landmark}
                touched={touched.landmark}
              /> */}

              {/* <Button title="Update" onPress={handleSubmit} /> */}
            </View>
          )}
        </Formik>
      </ScrollView>
    </>
  );
};

export default AddNewAddress;
