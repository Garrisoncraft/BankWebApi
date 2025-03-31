import * as Yup from 'yup';

export const signupSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Minimum 8 characters')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must contain letters, numbers, and special characters'
    )
    .required('Required')
    .test('password-strength', 'Password must be strong', value => {
      return value && value.length >= 8 && 
             /[A-Z]/.test(value) && 
             /[a-z]/.test(value) && 
             /\d/.test(value) && 
             /[@$!%*#?&]/.test(value); // Check for at least one uppercase, one lowercase, one number, and one special character
    }),


  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

export const accountSchema = Yup.object().shape({
  accountType: Yup.string().oneOf(['savings', 'current']).required('Required'),
  initialDeposit: Yup.number()
    .min(100, 'Minimum $100 initial deposit')
    .required('Required'),
});
