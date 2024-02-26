import React from 'react'
import { Link } from 'react-router-dom'
import "./settingstyle.css"
import { CgProfile } from "react-icons/cg";
import { IoNotifications } from "react-icons/io5";
import ReactDOM from 'react-dom/client';
import { FaRegEdit } from "react-icons/fa";
import { FcAcceptDatabase } from "react-icons/fc";
import { IoMoonOutline } from "react-icons/io5";
import { GrLanguage } from "react-icons/gr";
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Login2 from '../../../Login2/Login2';
//import { useTheme } from '../../../theme/theme';
const Setting = () => {
  //const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <aside>
        <div className="setting">



          <Link to='/setting/my_profile'>
            <CgProfile />
            <h2>My Profile</h2>
          </Link>



          <Link to='/dashboard'>
            <FaRegEdit />
            <h2>My Posts</h2>
          </Link>



          <Link to='/dashboard'>
            <IoMoonOutline />
            <h2> Mode</h2>
          </Link>

          <Link to='/dashboard'>
            <GrLanguage />
            <h2>Language</h2>
          </Link>

          <Link to='/login'>
            <IoIosLogOut />
            <h2>LogOut</h2>
          </Link>





        </div>
      </aside>
    </div>
  )
}

export default Setting