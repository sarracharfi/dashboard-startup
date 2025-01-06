import Button from '@mui/material/Button';
import React, { useContext, useState } from 'react';
import { BsAppIndicator } from "react-icons/bs";
import { FaAngleRight, FaMapMarkerAlt, FaMoneyBillAlt, FaTransgenderAlt } from "react-icons/fa";
import { GiLifeBar, GiReceiveMoney, GiTargeted } from "react-icons/gi";
import { IoIosNotifications, IoMdLogOut } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { MdDashboard, MdLabelImportant } from "react-icons/md";
import { SiImessage } from "react-icons/si";
import { Link } from 'react-router-dom';
import { Mycontext } from '../../App';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(null);
  const context = useContext(Mycontext);

  const handleSubmenuToggle = (tabIndex) => {
    setActiveTab(activeTab === tabIndex ? null : tabIndex);
  };

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">
            <div className={`w-100 ${activeTab === 0 ? 'active' : ''}`}>
              <span className='icon'><MdDashboard /></span>
              Dashboard d'évaluation des startups
              <span className='arrow'><FaAngleRight /></span>
            </div>
          </Link>
        </li>
        <li>
          <Button
            className={`w-100 ${activeTab === 1 ? 'active' : ''}`}
            onClick={() => handleSubmenuToggle(1)}
          >
            <span className='icon'><BsAppIndicator /></span>
            Les indicateurs
            <span className='arrow'><FaAngleRight /></span>
          </Button>
          {activeTab === 1 && (
            <div className={`submenuWrapper ${activeTab === 1 ? 'colapse' : 'colapsed'}`}>
              <ul className='submenu'>
                <li><Link to="/domain-activity">Domaine d'activité</Link></li>
                <li><Link to="/innovation-duration">Durée d'innovation</Link></li>
                <li><Link to="/maturity-level">Niveau de maturité</Link></li>
              </ul>
            </div>
          )}
        </li>
        <li>
          <Button
            className={`w-100 ${activeTab === 4 ? 'active' : ''}`}
            onClick={() => handleSubmenuToggle(4)}
          >
            <span className='icon'><FaTransgenderAlt /></span>
            Genre
            <span className='arrow'><FaAngleRight /></span>
          </Button>
          {activeTab === 4 && (
            <div className='submenuWrapper'>
              <ul className='submenu'>
                <li><Link to="/gender-female">Femme</Link></li>
                <li><Link to="/gender-male">Homme</Link></li>
              </ul>
            </div>
          )}
        </li>
        <li>
          <Link to="/label">
            <Button className={`w-100 ${activeTab === 2 ? 'active' : ''}`}>
              <span className='icon'><MdLabelImportant /></span>
              Label
              <span className='arrow'><FaAngleRight /></span>
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/revenue">
            <Button className={`w-100 ${activeTab === 5 ? 'active' : ''}`}>
              <span className='icon'><FaMoneyBillAlt /></span>
              Chiffre d'affaires
              <span className='arrow'><FaAngleRight /></span>
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/market-share">
            <Button className={`w-100 ${activeTab === 6 ? 'active' : ''}`}>
              <span className='icon'><GiTargeted /></span>
              Part de marché visée/réalisée
              <span className='arrow'><FaAngleRight /></span>
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/funding-model">
            <Button className={`w-100 ${activeTab === 7 ? 'active' : ''}`}>
              <span className='icon'><GiReceiveMoney /></span>
              Modèle de financement
              <span className='arrow'><FaAngleRight /></span>
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/startup-lifetime">
            <Button className={`w-100 ${activeTab === 8 ? 'active' : ''}`}>
              <span className='icon'><GiLifeBar /></span>
              Durée de vie de startup
              <span className='arrow'><FaAngleRight /></span>
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/messages">
            <Button className={`w-100 ${activeTab === 9 ? 'active' : ''}`}>
              <span className='icon'><SiImessage /></span>
              Messages
              <span className='arrow'><FaAngleRight /></span>
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/notifications">
            <Button className={`w-100 ${activeTab === 10 ? 'active' : ''}`}>
              <span className='icon'><IoIosNotifications /></span>
              Notifications
              <span className='arrow'><FaAngleRight /></span>
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <Button className={`w-100 ${activeTab === 11 ? 'active' : ''}`}>
              <span className='icon'><IoSettingsSharp /></span>
              Settings
              <span className='arrow'><FaAngleRight /></span>
            </Button>
          </Link>
        </li>
        <li>
          <Button
            className="w-100"
            component="a"
            href="https://www.google.com/maps/place/Smart+Tunisian+Technoparks+(S2T)/@36.8936449,10.1866846,15z/data=!4m6!3m5!1s0x12e2cb28ebd31623:0x2b4a2fe263b74169!8m2!3d36.8936449!4d10.1866846!16s%2Fg%2F11k50wfn0p?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className='icon'><FaMapMarkerAlt /></span>
            Find us on Map
          </Button>
        </li>
      </ul>
      <br />
      <div className='logoutWrapper'>
        <div className='logoutBox'>
          <Button variant='contained' onClick={() => context.logout()}>
            <IoMdLogOut /> Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
