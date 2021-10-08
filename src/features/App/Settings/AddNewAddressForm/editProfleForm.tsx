import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
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
  ShowMessage,
  type,
} from '../../../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {itemOrderStates} from '../../../../reducers/menuItemOrder';
import {AppDispatch, RootState} from '../../../../store';
import {updateProfile} from '../../../../FetchData';
import {useNavigation, useRoute} from '@react-navigation/native';

const validationSchema = yup.object().shape({
  //   city: yup.string().required('This field is required.'),
  //   area: yup.string().required('This field is required.'),
  //   streetOrLayout: yup.string().required('This field is required.'),
  //   firstName: yup.string().required('This field is required.'),
  //   lastName: yup.string().required('This field is required.'),
  //   address: yup.string().required('This field is required.'),
});

interface Props {
  navigation: any;
}
interface stateProps {
  showPassword1: boolean;
  showPassword2: boolean;
  showPassword3: boolean;
}
const AddNewAddress: React.FC<Props> = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [state, setState] = useState<stateProps>({
    showPassword1: true,
    showPassword2: true,
    showPassword3: true,
  });
  const [load, setLoading] = useState(false);

  const initialValues = {
    city: '',
    area: '',
    streetOrLayout: '',
    houseNumber: '',
    landmark: '',
    firstName: route?.params?.profile?.firstName,
    lastName: route?.params?.profile?.lastName,
    address: route?.params?.profile?.address,
  };

  const editProfile = async (values) => {
    setLoading(true);
    const userId = await AsyncStorage.getItem('userId');
    let body = {
      id: userId,
      firstName: values.firstName,
      lastName: values.lastName,
      address: values.address,
    };
    console.log(userId, 'useriddd');
    const profile = await updateProfile(body);
    setLoading(false);
    if (profile?.statusCode) {
      ShowMessage(type.DONE, 'Profile updated successfully');
      navigation.goBack();
    }
    console.log(profile, 'profilesss====');
  };

  useEffect(() => {
    console.log(route, 'routessssss');
  }, []);
  const {showPassword1, showPassword2, showPassword3} = state;

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => editProfile(values)}>
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
                width: '100%',
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
                First Name
              </Text>
              <BaseInput
                value={values.firstName}
                onChangeText={handleChange('firstName')}
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
                Last Name
              </Text>
              <BaseInput
                value={values.lastName}
                onChangeText={handleChange('lastName')}
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
                Address
              </Text>
              <BaseInput
                value={values.address}
                onChangeText={handleChange('address')}
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
              {load ? (
                <ActivityIndicator
                  animating={load}
                  color="green"
                  size="large"
                />
              ) : (
                <Button title="Update" onPress={handleSubmit} />
              )}
            </View>
          )}
        </Formik>
      </ScrollView>
    </>
  );
};

export default AddNewAddress;
