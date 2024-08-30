/* eslint-disable react/no-unescaped-entities */

import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import signupimg from '../assets/images/signin.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signinStart, signinSuccess, signinFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";


function SignIn() {
  const [formData, setFormData] = useState({});
  const {isLoading, error:errorMessage} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
        return dispatch(signinFailure('Please fill in all fields!'));
    }

    try {
      dispatch(signinStart());
      console.log("Submitting form with data:", formData);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
       dispatch( signinFailure(data.message));
      
       
      }
      
      if (res.ok) {
        localStorage.setItem("token",data.data.token);
        dispatch(signinSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signinFailure(error.message));
    }
  };

  return (
    <div className="pb-20 min-h-auto bg-gradient-to-r from-pink-50 via-red-50 to-violet-50 dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <div className="flex flex-col max-w-3xl gap-20 p-2 mx-auto md:flex-row md:items-center justify-evenly">
        {/* left */}
        <div className="flex items-center justify-center flex-1 mt-20">
          <img src={signupimg} alt="" className="w-auto text-[400px]" />
        </div>

        {/* right */}
        <div className="items-center justify-center flex-1 w-full px-5 py-10 border-2 border-purple-400 rounded-lg dark:border-gray-100 md:mt-20">
          <h1 className="text-3xl font-semibold text-purple-700 dark:text-gray-100">Sign In</h1>
          <p className="text-[12px] font-normal text-purple-600 mb-5 dark:text-gray-100">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa porro consectetur quos amet.
          </p>
          <form onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput type="email" placeholder="Email" id="email" onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="password" value="Password" />
              <TextInput type="password" placeholder="Password" id="password" onChange={handleChange} />
            </div>
            <Button className="w-full mt-4" gradientDuoTone='purpleToPink' type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner size='sm' />
                  <span className="pl-3">Loading...</span>
                </>
              ) : 'Sign In'}
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 mt-3 text-sm">
            <span>Don't have an account?</span>
            <Link to='/signup' className='text-blue-500 '>Sign Up</Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
