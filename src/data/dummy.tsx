import React from 'react';
import { AiOutlineCalendar, AiOutlineShoppingCart, AiOutlineAreaChart, AiOutlineBarChart, AiOutlineStock } from 'react-icons/ai';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsKanban, BsBarChart, BsBoxSeam, BsCurrencyDollar, BsShield, BsChatLeft } from 'react-icons/bs';
import { FaRegHeart ,FaRegFlag} from "react-icons/fa";
import { SlUserFollowing } from "react-icons/sl";

import { BiColorFill } from 'react-icons/bi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, RiStockLine } from 'react-icons/ri';

import { IoExitOutline } from "react-icons/io5";


// Define types
interface LinkItem {
  name: string;
  slug: string;
  icon: React.JSX.Element; // JSX.Element type for React icons
}

interface LinkCategory {
  title: string;
  links: LinkItem[];
}

export const links: LinkCategory[] = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'All Stories',
        slug:'stories-feed',
        icon: <IoMdContacts style={{height:"14px", width:"14px", display:"inline-block", margin:"0", color:"black", marginRight:"5px", marginTop:"-2px"}}/>,
      },
      {
        name: 'All Users',
        slug:'users',
        icon: <RiContactsLine style={{height:"14px", width:"14px", display:"inline-block", margin:"0", color:"black", marginRight:"5px", marginTop:"-2px"}}/>,
      },
      {
        name: 'Quarantine',
        slug:'reports',
        icon: <FaRegFlag style={{height:"14px", width:"14px", display:"inline-block", margin:"0", color:"black", marginRight:"5px", marginTop:"-2px"}}/>,
      },
      {
        name: 'Approvals',
        slug:'approvals',
        icon: <FaRegFlag style={{height:"14px", width:"14px", display:"inline-block", margin:"0", color:"black", marginRight:"5px", marginTop:"-2px"}}/>,
      }
    ],
  },

  // {
  //   title: 'Actions',
  //   links: [
  //     {
  //       name: 'Create New Story',
  //       slug:'create-story',
  //       icon: <FiEdit style={{height:"14px", width:"14px", display:"inline-block", margin:"0", color:"black", marginRight:"5px", marginTop:"-2px"}}/>,
  //     },
  //   ],
  // },
  {
    title: 'Account',
    links: [
      {
        name: 'logout',
        slug:'user-logout',
        icon: <IoExitOutline style={{height:"16px", width:"16px", display:"inline-block", margin:"0", color:"black", marginRight:"5px", marginTop:"-2px"}}/>,
      },
    ],
  },
  // {
  //   title: 'Apps',
  //   links: [
  //     {
  //       name: 'calendar',
  //       icon: <AiOutlineCalendar style={{height:"14px", width:"14px", display:"inline-block", margin:"0", color:"black", marginRight:"5px", marginTop:"-2px"}}/>,
  //     },
  //     {
  //       name: 'kanban',
  //       icon: <BsKanban style={{height:"14px", width:"14px", display:"inline-block", margin:"0", color:"black", marginRight:"5px", marginTop:"-2px"}}/>,
  //     },
  //     {
  //       name: 'editor',
  //       icon: <FiEdit style={{height:"14px", width:"14px", display:"inline-block", margin:"0", color:"black", marginRight:"5px", marginTop:"-2px"}}/>,
  //     },
  //     {
  //       name: 'color-picker',
  //       icon: <BiColorFill style={{height:"14px", width:"14px", display:"inline-block", margin:"0", color:"black", marginRight:"5px", marginTop:"-2px"}}/>,
  //     },
  //   ],
  // },
  // {
  //   title: 'Charts',
  //   links: [
  //     {
  //       name: 'line',
  //       icon: <AiOutlineStock />,
  //     },
  //     {
  //       name: 'area',
  //       icon: <AiOutlineAreaChart />,
  //     },

  //     {
  //       name: 'bar',
  //       icon: <AiOutlineBarChart />,
  //     },
  //     {
  //       name: 'pie',
  //       icon: <FiPieChart />,
  //     },
  //     {
  //       name: 'financial',
  //       icon: <RiStockLine />,
  //     },
  //     {
  //       name: 'color-mapping',
  //       icon: <BsBarChart />,
  //     },
  //     {
  //       name: 'pyramid',
  //       icon: <GiLouvrePyramid />,
  //     },
  //     {
  //       name: 'stacked',
  //       icon: <AiOutlineBarChart />,
  //     },
  //   ],
  // },
];