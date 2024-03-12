import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { toggleTheme } from '../redux/theme/themeSlice';
import {logoutSuccess} from '../redux/user/userSlice'

const Header = () => {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:8000/logout',{
        method: 'POST',
      });
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }else{
        dispatch(logoutSuccess());
      }
    }catch (err) {
        console.log(err.message)
    }
  
  }
  return (
    <Navbar fluid rounded>

      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white text-decoration-none'
      >
        <img className='w-56' src="/assets/labo1.png" alt="lab" />

      </Link>
      <form >
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'

        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button
          className='w-12 h-10 '
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >

          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt='user' img={currentUser.photoProfile} rounded />}
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.Firstname}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link  to={'/dashboard?tab=profile'} >
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <div className='flex'>
            <Link to='/login'>
              <Button className='mr-1' gradientDuoTone='purpleToBlue' outline>
                Login
              </Button>
            </Link>
            <Link to='/register'>
              <Button gradientDuoTone='purpleToBlue' outline>
                Register
              </Button>
            </Link>
          </div>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link>
          <Link to='/' >Home</Link>
        </Navbar.Link>
        <Navbar.Link >
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link >
          <Link to='/Services'>Services</Link>
        </Navbar.Link>
        <Navbar.Link >
          <Link to='/contact'>contact</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
