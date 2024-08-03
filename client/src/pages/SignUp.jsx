import { Button, Label, TextInput } from "flowbite-react"
import signupimg from '../assets/images/signupp.png'
import { Link } from 'react-router-dom'

function SignUp() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 via-red-50 to-violet-50">
      <div className="flex p-2 max-w-3xl mx-auto flex-col md:flex-row md:items-center justify-evenly gap-20">
        {/* left */}
        <div className="flex-1 mt-20 flex justify-center items-center">
          <img src={signupimg} alt="" className="w-auto h-auto max-h-100" />
        </div>


        {/* right */}
        <div className="w-full flex-1 justify-center items-center md:mt-20 border-2 px-5 py-10 rounded-lg border-purple-400">
          <h1 className="text-3xl font-semibold text-purple-700">Sign Up</h1>
          <p className="text-[12px] font-normal text-purple-600 mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa porro consectetur quos amet.</p>
          <form className="">
            <div>
              <Label value="Username" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value="Email" />
              <TextInput type="email" placeholder="Email" id="email" />
            </div>
            <div>
              <Label value="Password" />
              <TextInput type="password" placeholder="Password" id="password" />
            </div>
            <Button className="mt-4 w-full" gradientDuoTone='purpleToPink' type="submit">
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 mt-3 text-sm">
            <span>Have an account?</span>
            <Link to='/signin' className=' text-blue-500'>Sign In</Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SignUp