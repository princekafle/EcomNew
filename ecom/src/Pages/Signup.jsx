import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    // Save the signup data to localStorage
    localStorage.setItem('signupData', JSON.stringify(values));

    // Show toast message
    toast.success('Registered successfully! Redirecting to shop...', {
      autoClose: 2000,
      onClose: () => {
        // Redirect to shop page after toast disappears
        navigate('/login');
      }
    });
  };

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          cpassword: ''
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .matches(/^[A-Za-z]+$/, 'Username must contain only letters')
            .max(20, 'Less than 20 characters')
            .required('Username is mandatory'),
          email: Yup.string()
            .email('Invalid email')
            .required('Email is mandatory'),
          password: Yup.string()
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Must contain 8 characters, one uppercase, one number, and one special case character')
            .required('Password is mandatory'),
          cpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is mandatory')
        })}
        onSubmit={handleSubmit}
      >
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:min-h-[80vh]">
            <Link to="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
              Flowbite    
            </Link>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 md:max-w-lg lg:max-w-xl xl:max-w-2xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8 lg:p-10 xl:p-12">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>
                
                <Form className="space-y-4 md:space-y-6">
                  <ToastContainer theme='colored' position='top-center'/>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <Field type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                    <ErrorMessage name='email'>
                      {msg => <div style={{ color: 'red' }}>{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <div>
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                    <Field type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="prince" required="" />
                    <ErrorMessage name='username'>
                      {msg => <div style={{ color: 'red' }}>{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <Field type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    <ErrorMessage name='password'>
                      {msg => <div style={{ color: 'red' }}>{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <div>
                    <label htmlFor="cpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <Field type="password" name="cpassword" id="cpassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    <ErrorMessage name='cpassword'>
                      {msg => <div style={{ color: 'red' }}>{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <Field id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                    </div>
                    <div className="ml-3 mb-3 text-sm">
                      <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" to="#">Terms and Conditions</Link></label>
                    </div>
                  </div>
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account? <Link to='/login' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                  </p>
                </Form>
              </div>
            </div>
          </div>
        </section>
      </Formik>
    </>
  );
};

export default Signup;
