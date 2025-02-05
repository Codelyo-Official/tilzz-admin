import React, { useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import { RxTextAlignLeft } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { useStateContext } from '../contexts/ContextProvider';
import { RiLoginCircleLine } from 'react-icons/ri';
import axiosClient from '../axios-client';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const { token, setToken } = useStateContext();

  const showSidebar = () => setSidebar(!sidebar);

  const handleLogout = (ev) => {
    console.log("logout");
    ev.preventDefault();
    axiosClient.post('/logout').then(() => {
      setToken(null);
    });
  };

  const updatedSidebarData = SidebarData.map((item) => {
    if (item.title === 'Login') {
      return {
        ...item,
        authenticated: !!token,
        path: token ? '/' : '/Login',
        title: token ? 'Logout' : 'Login',
        content: token ? (
          <Link onClick={handleLogout} style={{ cursor: 'pointer' }}>
           {item.icon}
            <span>Logout</span>
          </Link>
        ) : (
          <Link to={item.path}>
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ),
      };
    }
    if (item.title === 'Create Tour') {
      return {
        ...item,
        authenticated: !!token,
        path: token ? '/' : '/Login',
        title: token ? 'Logout' : 'Login',
        content: token ? (
          <Link   to="/CreateTour" style={{ cursor: 'pointer' }}>
           {item.icon}
            <span>{item.title}</span>
          </Link>
        ) : (
          <Link style={{display:"none"}}></Link>
        ),
      };
    }
    
    return item;
  });

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <RxTextAlignLeft style={{ color: 'black' }} onClick={showSidebar} />
          </Link>
          <Link to='/' style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <img src="/Images/logo.png" height={"70px"} style={{ marginLeft: '-3.5rem' }} alt="logo_image" />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose style={{ color: '#2c2c2c' }} />
              </Link>
            </li>
            {updatedSidebarData.map((item, index) => (
              <li key={index} className={item.cName}>
                {item.content ? item.content : (
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
