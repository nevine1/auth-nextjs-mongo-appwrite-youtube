"use client"
import React, { useState, useEffect} from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Formik, Form } from 'formik';
import { TextField, Button, Box, Typography } from '@mui/material';
import { validationSchema } from '../../helpers/validationSchema';
import toast from 'react-hot-toast';

interface FormValues  {
    email: string;
    password: string;
    username: string;
}

 const page = (props: FormValues) => {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "", email: " ", password: "",
    })
    const [isLoading, setIsLoading] = useState(false);

    const initialValues: FormValues = {
        username: '', 
        email: ' ', 
        password: '',
    }
    const handleSubmit =async (values: FormValues) =>{
        console.log(values)
       
        try{
          setIsLoading(true);
          const response = await axios.post(`/api/users/signup`, user);//user defined at the top (username, password, email)
          console.log("signup success", response.data);// to know what type of data is coming up
          router.push('/login')
        }catch(error: any){
          console.log(`Signup failed ${error.message}` );
          toast(error.message);
        }finally{
          setIsLoading(false);
        }
    }
   return (
    <Box
      sx={{
        marginTop: '150px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: '100vh',
        border: 'white',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '400px',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#eff0f2'
        }}
        className="border-white"
      >
        <Typography component="h1" variant="h5" align="center"
          gutterBottom
          className="text-slate-900 text-[22px] mt-6"
        >
          sign up
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, handleChange, handleBlur, values, touched, errors }) => (
            <Form className="p-2 rounded-md border-white">
              <Box mb={2}>
                <TextField
                    fullWidth
                    id="username"
                    label="username"
                    name="username"
                    type="text"
                    variant="standard"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    />
              </Box>

              <Box mb={2}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  variant="standard"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                />
              </Box>

              <Box mb={2}>
                <TextField
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    variant="standard"
                    autoComplete="current-password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    />
              </Box>

              <Box display="flex" justifyContent="center" className="w-full mt-4">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  Register
                </Button>
              </Box>
              <Box display="flex" justifyContent="center" className="w-full mt-4 text-gray-800">
                Already have an account?
                <Link href="/login" className="text-blue-600 ml-2">
                  Login
                </Link>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}


export default page;