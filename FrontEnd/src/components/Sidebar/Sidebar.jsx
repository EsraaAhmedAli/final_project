import React, { useState } from 'react';
import Logo3 from '../../imgs/finallogo.png';
import './Sidebar.css';
import { SidebarData } from '../../Data/Data';
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const sidebarVariants = {
    true: {
      left: '0'
    },
    false: {
      left: '-60%'
    }
  };

  return (
    <>
      <div className="bars" style={expanded ? { left: '60%' } : { left: '5%' }} onClick={() => setExpanded(!expanded)}>
        <UilBars />
      </div>

      <motion.div
        className='sidebar'
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ''}
      >
        {/*Logo*/}
        <div className='logo'>
          <img src={Logo3} alt='' />
         
        </div>

        <div className='menu'>
          {SidebarData.map((item, index) => (
            <Link
              to={item.path}
              className={location.pathname === item.path ? 'menuitem active' : 'menuitem'}
              key={index}
              onClick={() => setSelected(index)}
            >
              <item.icon />
              <span>{item.heading}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
