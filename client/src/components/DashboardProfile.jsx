import { Button, Label, TextInput } from 'flowbite-react';
import {useSelector} from 'react-redux'

function DashboardProfile() {
    const {currentUser} = useSelector((state) => state.user);
  return (
   <div className='w-full max-w-lg p-3 mx-auto '>
    <h1 className='font-semibold text-center my-7'>Profile</h1>
    <form className='flex flex-col gap-2' >
    <div className='self-center w-32 h-32 overflow-hidden rounded-full shadow-md cursor-pointer'>
        <img src={currentUser.profilePic} alt="userPic" 
        className='object-cover h-full border-2 border-purple-400 rounded-full dark:border-pink-500'/>
    </div>
    <Label className='mt-3 text-sm'>Full Name</Label>
    <TextInput type='text' id='name' placeholder='Full Name' className='input' value={""} />
    <Label className='mt-3 text-sm'>Username</Label>
    <TextInput type='text' id='username' placeholder='username' className='input' value={currentUser.username} />
    <Label className='mt-3 text-sm'>Email</Label>
    <TextInput type='email' id='email' placeholder='Email' className='input' value={currentUser.email} />
    <Label className='mt-3 text-sm'>Password</Label>
    <TextInput type='password' id='password' placeholder='Password' className='input' value={"***********"} />
    <Button className='bg-gradient-to-l from-purple-500 to-blue-500 via-orange-500' type='submit'  outline>
        Update
    </Button>
    </form>
    <div className='flex justify-between mt-4 mb-10 text-red-600'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
    </div>
   </div>
    
  )
}

export default DashboardProfile