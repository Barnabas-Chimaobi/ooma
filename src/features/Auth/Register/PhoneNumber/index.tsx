// import React from 'react';
// import {OmaCard, InputPrimary, KeyboardType} from '../../../../components';
// import S from '../styles';

// const Phone = () => {
//   return (
//     <OmaCard
//       title="Get Started"
//       titleStyle={S.omaTitle}
//       subTitle="Enter your phone number to login or Signup, if you don’t have an account."
//       subStyle={S.omaSubTitle}
//       mainStyle={S.omaMainStyle}
//       otherProps={
//         <InputPrimary
//           title="Phone number"
//           titleStyle={S.phoneInput}
//           containerStyles={S.phoneContainerStyle}
//           keyboardType={KeyboardType.phone}
//           maxLength={11}
//         />
//       }
//     />
//   );
// };

// export default Phone;

import React, {useEffect, useState} from 'react';
import {
  OmaCard,
  Button,
  InputPrimary,
  KeyboardType,
  BaseInput,
  BaseKeyBoardType,
} from '../../../../components';
import S from '../styles';
import {Formik} from 'formik';
import * as yup from 'yup';
import {colors} from '../../../../colors';
import {setUserDetails} from '../../../../reducers';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../../store';

const validationSchema = yup.object().shape({
  number: yup.string().min(11).required().label('Phone number'),
});
const initialValues = {
  phone: '',
};

const Phone = () => {
  const dispatch: AppDispatch = useDispatch();
  const [number, setnumber] = useState('');
  let formatNumber: string;
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // validationSchema
      //   .validate({number})
      //   .then(() => {
      formatNumber = '234' + number.substr(1);
      formatNumber =
        number[0] == '0' ||
        number.substr(2) == '234' ||
        number.substr(3) == '+234'
          ? formatNumber
          : number;
      console.log(formatNumber, 'fgcgf');
      dispatch(setUserDetails({number: formatNumber}));
      // })
      // .catch((err) => console.log(err));
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [number]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('OtpPage');
      }}>
      {({values, handleChange, handleSubmit, touched, errors}) => (
        <>
          {/* <BaseInput
                placeholder="Your phone number"
                value={values.phone}
                keyboardType={BaseKeyBoardType.phonePad}
                onChangeText={handleChange('phone')}
                errors={errors.phone}
                touched={touched.phone}
                name={values.phone}
              /> */}
          <OmaCard
            title="Get Started"
            titleStyle={S.omaTitle}
            subTitle="Enter your phone number to login or Signup, if you don’t have an account."
            subStyle={S.omaSubTitle}
            mainStyle={S.omaMainStyle}
            otherProps={
              <>
                <BaseInput
                  placeholder="Your phone number"
                  value={number}
                  keyboardType={BaseKeyBoardType.phonePad}
                  onChangeText={(text) => setnumber(text)}
                  autoFocus={true}
                  inputStyle={{backgroundColor: colors.white, elevation: 5,borderRadius:5}}
                />
                {/* <Button title="Proceed" onPress={handleSubmit} /> */}
              </>
            }
          />
        </>
      )}
    </Formik>
  );
};

export default Phone;
