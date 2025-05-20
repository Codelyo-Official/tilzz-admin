import React from 'react';
import { FaRegFlag} from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, RiStockLine } from 'react-icons/ri';
import { MdGroups } from "react-icons/md";
import { IoIosStats } from "react-icons/io";

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
        name: 'Statistics',
        slug:'stats',
        icon: <IoIosStats style={{height:"14px", width:"14px", display:"inline-block", margin:"0", color:"black", marginRight:"5px", marginTop:"-2px"}}/>,
      },
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
        name: 'Deleted Content',
        slug:'reports',
        icon: <FaRegFlag style={{height:"14px", width:"14px", display:"inline-block", margin:"0", color:"black", marginRight:"5px", marginTop:"-2px"}}/>,
      },
      {
        name: 'Quarantine',
        slug:'approvals',
        icon: <FaRegCheckCircle style={{height:"14px", width:"14px", display:"inline-block", margin:"0", color:"black", marginRight:"5px", marginTop:"-2px"}}/>,
      },
      {
        name: 'Organizations',
        slug:'groups',
        icon: <MdGroups style={{height:"14px", width:"14px", display:"inline-block", margin:"0", color:"black", marginRight:"5px", marginTop:"-2px"}}/>,
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