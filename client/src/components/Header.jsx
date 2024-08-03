import {Button, Navbar, TextInput} from 'flowbite-react';
import {Link, useLocation} from 'react-router-dom';
import Logo from '../assets/images/Tech +.png';
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";


function Header() {
    const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2 border-purple-300' >
        <Link to= '/' className='self-center size-100 sm:size-max bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 rounded-se-full'>
        <img src= {Logo} alt=""  height={20} width={175}/>
        </Link>
        <form>
            <TextInput
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
            />
        </form>
        <Button className='lg:hidden h-10 w-12 inline' color = 'gray' pill>
        <AiOutlineSearch/>
        </Button >
        <div className="flex gap-2 md:order-2">
        <Button className='hidden h-10 w-12 sm:inline' color = 'gray' pill>
            <FaMoon/>
        </Button>
        <Link to='/signin'>
            <Button gradientDuoTone='purpleToBlue' outline>
                SignIn 
            </Button>
        </Link>
        <Navbar.Toggle/>
        </div>
        <Navbar.Collapse className='text-white'>
            <Navbar.Link active = {path === '/'} as={'div'}>
                <Link to = '/'>
                Home
                </Link>
            </Navbar.Link>
            <Navbar.Link active = {path === '/about'} as={'div'}>
                <Link to = '/about'>
                Abouts
                </Link>
            </Navbar.Link>
            <Navbar.Link active = {path === '/projects'} as={'div'}>
                <Link to = '/projects'>
                Projects
                </Link>
            </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Header