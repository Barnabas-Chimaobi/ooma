import React, {useState} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {Formik} from 'formik';
import * as yup from 'yup';
import {S} from './styles';
import {Button, BaseInput, BaseKeyBoardType} from '../../../../components';
const validationSchema = yup.object().shape({
  oldPassword: yup.string().required('This field is required.'),
  newPassword: yup.string().required('This field is required.'),
  confirmPassword: yup.string().required('This field is required.'),
});
const initialValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};
interface Props {
  navigation: any;
}
interface stateProps {
  showPassword1: boolean;
  showPassword2: boolean;
  showPassword3: boolean;
}
const ChangePassword: React.FC<Props> = ({navigation}) => {
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
          onSubmit={async (
            {oldPassword, newPassword, confirmPassword},
            resetForm,
          ) => {
            if (newPassword !== confirmPassword) {
              console.log('Passwords do not match');
              return;
            }
            const data = {
              oldPassword,
              password: newPassword,
            };
          }}>
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
                // ...styles.inputWrapper,
                flex: 1,
                paddingHorizontal: 15,
              }}>
              <TouchableOpacity
                style={{paddingVertical: 5, marginBottom: 10}}
                onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={28} />
              </TouchableOpacity>
              <Text>Enter old password</Text>
              <BaseInput
                placeholder="*******"
                secureTextEntry={showPassword1}
                value={values.oldPassword}
                onChangeText={handleChange('oldPassword')}
                errors={errors.oldPassword}
                touched={touched.oldPassword}
                name={values.oldPassword}
                style={S.input}
                rightIcon={
                  <TouchableOpacity
                    onPress={() =>
                      setState({...state, showPassword1: !showPassword1})
                    }>
                    <Feather
                      name={showPassword1 ? 'eye' : 'eye-off'}
                      // name="ios-eye-off"
                      color="#00000080"
                      size={17}
                    />
                  </TouchableOpacity>
                }
              />
              <Text>Create new password</Text>
              <BaseInput
                placeholder="*******"
                secureTextEntry={showPassword2}
                value={values.newPassword}
                onChangeText={handleChange('newPassword')}
                errors={errors.newPassword}
                touched={touched.newPassword}
                name={values.newPassword}
                style={S.input}
                rightIcon={
                  <TouchableOpacity
                    onPress={() =>
                      setState({...state, showPassword2: !showPassword2})
                    }>
                    <Feather
                      name={showPassword2 ? 'eye' : 'eye-off'}
                      // name="ios-eye-off"
                      color="#00000080"
                      size={17}
                    />
                  </TouchableOpacity>
                }
              />
              <Text>Confirm new password</Text>
              <BaseInput
                placeholder="*******"
                secureTextEntry={showPassword3}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                errors={errors.confirmPassword}
                touched={touched.confirmPassword}
                name={values.confirmPassword}
                style={S.input}
                rightIcon={
                  <TouchableOpacity
                    onPress={() =>
                      setState({...state, showPassword3: !showPassword3})
                    }>
                    <Feather
                      name={showPassword3 ? 'eye' : 'eye-off'}
                      // name="ios-eye-off"
                      color="#00000080"
                      size={17}
                    />
                  </TouchableOpacity>
                }
              />

              <Button title="Update" onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      </ScrollView>
    </>
  );
};

export default ChangePassword;
