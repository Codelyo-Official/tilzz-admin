import React from 'react';
import * as IoIcons from 'react-icons/io';
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdTour } from "react-icons/md";
import { RiLoginCircleLine } from "react-icons/ri";
import { IoCreate } from "react-icons/io5";

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <FaHome style={{color:"#2c2c2c"}} />,
    cName: 'nav-text'
  },
  
  {
    title: 'Profile',
    path: '/profile',
    icon: <CgProfile style={{color:"#2c2c2c"}} />,
    cName: 'nav-text'
  },
 
  
 
   {
    title: 'Login',
    path: '/Login',
    icon: <RiLoginCircleLine style={{ color: '#2c2c2c' }} />,
    cName: 'nav-text',
    authenticated: false, // Add a property to specify if it requires authentication
  },
];
