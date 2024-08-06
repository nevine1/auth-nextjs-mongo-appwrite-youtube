import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  city: Yup.string().required('City is required'),
  birthday: Yup.date().required('Birthday is required'),
  gender: Yup.string().required('Gender is required'),
  address: Yup.string().required('Address is required'),
})