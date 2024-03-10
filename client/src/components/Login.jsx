import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'
import OAuth from './Oauth';
import { Alert, Button, Label, Spinner, TextInput  } from 'flowbite-react';

const Login = () => {
 
  // const handleGoogleLogin = () => {
  //   const popupWindow = window.open('http://localhost:3001/auth/google', '_blank', 'width=500,height=600');

  //   window.addEventListener('message', (event) => {
  //     if (event.origin === 'http://localhost:3001' && event.source === popupWindow) {
  //       console.log('Received message from popup:', event.data);

  //     }
  //   });
  // };

 
  const navigate = useNavigate();
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const dispatch = useDispatch();



  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value.trim();
    setUser({ ...user, [name]: value })
  };
  const handleSubmit = async (event) => {
    event.preventDefault();



    const { email, password } = user;

    try {
      dispatch(signInStart());
      const res = await fetch('/login', {
        method: 'POST',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          email, password
        })
      });

      const data = await res.json();


      if (data.success === false) {
        dispatch(signInFailure(data.message));
        console.log(data.message);
      }



      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/dashboard')
      }
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  };

  useEffect(() => {
    dispatch(signInFailure(null)); 
  }, [dispatch]);


  return (
    <div className='min-h-screen mt-20'>
    <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
    
      <div className='flex-1'>
        <NavLink  to='/' className='font-bold dark:text-white text-4xl text-decoration-none'>
          Lab
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
            Management
          </span>
          
        </NavLink>
        <p className='text-sm mt-5'>
          This is a demo project. You can sign in with your email and password
          or with Google.
        </p>
      </div>

      <div className='flex-1'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <Label value='Your email' />
            <TextInput
              type='email'
              placeholder='name@company.com'
              name='email'
              onChange={handleChange}
            />
          </div>
          <div>
            <Label value='Your password' />
            <TextInput
              type='password'
              placeholder='**********'
              name='password'
              onChange={handleChange}
            />
          </div>
          <Button
            gradientDuoTone='purpleToPink'
            type='submit'
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size='sm' />
                <span className='pl-3'>Loading...</span>
              </>
            ) : (
              'Log In'
            )}
          </Button>
          <OAuth />
        </form>
        <div className='flex gap-2 text-sm mt-5'>
          <span>Dont Have an account?</span>
          <NavLink to='/register' className='text-blue-500'>
            register
          </NavLink>
        </div>
        {errorMessage && (
          <Alert className='mt-5' color='failure'>
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  </div>
  );

}

export default Login;