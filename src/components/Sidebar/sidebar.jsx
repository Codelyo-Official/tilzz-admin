import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { links } from '../../data/dummy';
import { useStateContext } from '../../contexts/ContextStateProvider';

const Sidebar = () => {
  const { activeMenu, setActiveMenu} = useStateContext();

  const handleActiveMenu = (name) => {
      setActiveMenu(name);
  };

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
     
        <>
          <div>
            {links.map((item) => (
              <div key={item.title}>
                <h4 className="leftbar-heading">
                  {item.title}
                </h4>
                <div className="leftbar-items">
                  {item.links.map((link) => (
                      <NavLink
                        to={`/dashboard?activeTab=${link.slug}`}
                        key={link.name}
                        onClick={()=>{handleActiveMenu(link.name)}}
                        className={activeMenu===link.name ? "active-leftbar" : ""}
                      >
                        {link.icon} {link.name}
                      </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      
    </div>
  );
};

export default Sidebar;