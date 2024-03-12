import { Sidebar } from 'flowbite-react';
import React,{useState,useEffect} from 'react';
import {HiUser,HiArrowSmRight,HiDocumentText,HiOutlineUserGroup} from 'react-icons/hi';
import { useLocation,NavLink ,Link} from 'react-router-dom';
import {logoutSuccess} from '../../redux/user/userSlice'
import { useDispatch ,useSelector} from 'react-redux';

export default function DashSide() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab,setTab] = useState('');
  const {currentUser} = useSelector(state=>state.user);

  useEffect(() =>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search])

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
    <Sidebar className='w-full md:w-56'>
    <Sidebar.Items>
      <Sidebar.ItemGroup className='flex flex-col gap-1 p-0'>
        
        <Link className='lien' to='/dashboard?tab=profile'>
          <Sidebar.Item
            active={tab === 'profile'}
            icon={HiUser}
            label={currentUser.isAdmin ? 'Admin' : 'User'}
            labelColor='dark'
            as='div'
          >
            Profile
          </Sidebar.Item>
        </Link>
        {currentUser.isAdmin && (
          <Link className='lien' to='/dashboard?tab=articles'>
            <Sidebar.Item
              active={tab === 'articles'}
              icon={HiDocumentText}
              as='div'
            >
              Articles
            </Sidebar.Item>
          </Link>
        )}
        {currentUser.isAdmin && (
          <Link className='lien' to='/dashboard?tab=users'>
            <Sidebar.Item
              active={tab === 'users'}
              icon={HiOutlineUserGroup}
              as='div'
            >
              Users
            </Sidebar.Item>
          </Link>
        )}
        <Sidebar.Item
          icon={HiArrowSmRight}
          className='cursor-pointer lien'
          onClick={handleLogout}
          
        >
          Log Out
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
  )
}
