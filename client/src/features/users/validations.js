import * as Yup from 'yup';

export const editUserSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),

    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),

    email: Yup.string()
      .email('Invalid email')
      .required('Required'),

    password: Yup.string()
      .required('Required') 
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password can contain at least one lower case, one uppercase and one number.'),

    phoneNumber: Yup.number()
      .required('Required')
      .integer()
      .test('length', 'Must be exactly 9 numbers', val => String(val).length === 8),

    // role: Yup.string().required('Required')        

});

