import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import signupimg from '../assets/images/signin2.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";

function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('All fields are required to be filled!');
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setIsLoading(false);
        return setErrorMessage('Something went wrong!');
      }
      setIsLoading(false);
      if (res.ok) {
        navigate('/signin');
      }
    } catch (error) {
      setErrorMessage('Something went wrong!');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 via-red-50 to-violet-50">
      <div className="flex p-2 max-w-3xl mx-auto flex-col md:flex-row md:items-center justify-evenly gap-20">
        {/* left */}
        <div className="flex-1 mt-20 flex justify-center items-center">
          <img src={signupimg} alt="" className="w-auto text-[400px]" />
        </div>

        {/* right */}
        <div className="w-full flex-1 justify-center items-center md:mt-20 border-2 px-5 py-10 rounded-lg border-purple-400">
          <h1 className="text-3xl font-semibold text-purple-700">Sign Up</h1>
          <p className="text-[12px] font-normal text-purple-600 mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa porro consectetur quos amet.
          </p>
          <form onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="username" value="Username" />
              <TextInput type="text" placeholder="Username" id="username" onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput type="email" placeholder="Email" id="email" onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="password" value="Password" />
              <TextInput type="password" placeholder="Password" id="password" onChange={handleChange} />
            </div>
            <Button className="mt-4 w-full" gradientDuoTone='purpleToPink' type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner size='sm' />
                  <span className="pl-3">Loading...</span>
                </>
              ) : 'Sign Up'}
            </Button>
          </form>
          <div className="flex gap-2 mt-3 text-sm">
            <span>Have an account?</span>
            <Link to='/signin' className=' text-blue-500'>Sign In</Link>
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

export default SignUp;
