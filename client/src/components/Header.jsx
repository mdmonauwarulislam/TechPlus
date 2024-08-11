import {Avatar, Button, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, TextInput} from 'flowbite-react';
import {Link, useLocation} from 'react-router-dom';
import Logo from '../assets/images/Tech +.png';
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';


function Header() {
    const path = useLocation().pathname;
    const {currentUser} = useSelector((state) => state.user);
    const {theme} = useSelector((state) => state.theme);
    const dispatch = useDispatch();
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
        <Button className='inline w-12 h-10 lg:hidden' color = 'gray' pill>
        <AiOutlineSearch/>
        </Button >
        <div className="flex gap-2 md:order-2">
        <Button className='hidden w-12 h-10 sm:inline' color = 'gray' pill onClick={() => dispatch(toggleTheme()) }>
            {theme === 'light' ? <FaSun/> : <FaMoon/>}
        </Button>
        {currentUser ? (
            <Dropdown arrowIcon = {false}
            inline
            label={
                <Avatar
                alter = "user"
                img={currentUser.profilePic}
                rounded
                />
            }>
                <DropdownHeader>
                    <span className='block text-sm'>@{currentUser.username}</span>
                </DropdownHeader>
                <Link to ={'/dashboard?tab=profile'}>
                <DropdownItem>
                    Profile
                </DropdownItem>
                </Link>
                <DropdownDivider/>
                <DropdownItem>Sign Out</DropdownItem>
                
            </Dropdown>
        ):(
            <Link to='/signin'>
            <Button gradientDuoTone='purpleToBlue' outline>
                SignIn 
            </Button>
        </Link>
        )}
        
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