import Logout from '@mui/icons-material/Logout';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useContext, useState } from 'react';
import { AiFillMessage } from "react-icons/ai";
import { BsShieldFillExclamation } from "react-icons/bs";
import { CiLight } from 'react-icons/ci';
import { FaRegBell } from 'react-icons/fa6';
import { IoMenuOutline } from 'react-icons/io5';
import { MdEmail, MdMenuOpen } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Mycontext } from '../../App';
import avatar from '../../assets/images/avatar.jpg';
import logo from '../../assets/images/logo.jpg';
import SearchBox from '../SearchBox';



const Header = () => {
    const [anchorElMyAcc, setAnchorElMyAcc] = useState(null);
    const [anchorElNotifications, setAnchorElNotifications] = useState(null);
    const [anchorElMessages, setAnchorElMessages] = useState(null);
    const [anchorElEmails, setAnchorElEmails] = useState(null);

    const openMyAcc = Boolean(anchorElMyAcc);
    const openNotifications = Boolean(anchorElNotifications);
    const openMessages = Boolean(anchorElMessages);
    const openEmails = Boolean(anchorElEmails);

    const context = useContext(Mycontext);

    const handleMyAccClick = (event) => {
        setAnchorElMyAcc(event.currentTarget);
    };

    const handleNotificationsClick = (event) => {
        setAnchorElNotifications(event.currentTarget);
    };

    const handleMessagesClick = (event) => {
        setAnchorElMessages(event.currentTarget);
    };

    const handleEmailsClick = (event) => {
        setAnchorElEmails(event.currentTarget);
    };

    const handleMyAccClose = () => {
        setAnchorElMyAcc(null);
    };

    const handleNotificationsClose = () => {
        setAnchorElNotifications(null);
    };

    const handleMessagesClose = () => {
        setAnchorElMessages(null);
    };

    const handleEmailsClose = () => {
        setAnchorElEmails(null);
    };

    return (
        <header className="d-flex align-items-center">
            <div className="container-fluid w-100">
                <div className="row d-flex align-items-center">
                    {/* Logo S2T */}
                    <div className="col-sm-2 part1">
                        <Link to="/" className="d-flex align-items-center logo">
                            <img src={logo} alt="S2T Logo" />
                            <span className="ml-2">S2T</span>
                        </Link>
                    </div>

                    <div className="col-sm-3 d-flex align-items-center part2">
                        <Button 
                            className="rounded-circle mr-3" 
                            onClick={() => context.setIsToggleSidebar(!context.isToggleSidebar)}
                        > 
                            {
                                context.isToggleSidebar === false ? <MdMenuOpen /> : <IoMenuOutline />
                            }
                        </Button>
                        <SearchBox />
                    </div>

                    <div className="col-sm-7 d-flex align-items-center justify-content-end part3">
                        <Button className="rounded-circle mr-3" onClick={() =>
                            context.setThemeMode(!context.themeMode)}>
                            <CiLight />
                        </Button>
                       
                        <Button className="rounded-circle mr-3" onClick={handleEmailsClick}>
                            <MdEmail />
                        </Button>
                        <Button className="rounded-circle mr-3" onClick={handleMessagesClick}>
                        <AiFillMessage />
                        </Button>
                        <Button className="rounded-circle mr-3" onClick={handleNotificationsClick}>
                            <FaRegBell />
                        </Button>

                        {/* Notifications Menu */}
                        <Menu
                            anchorEl={anchorElNotifications}
                            className='notifications dropdown_list'
                            id="notifications"
                            open={openNotifications}
                            onClose={handleNotificationsClose}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <div className='head pl-3 pb-0'>
                                <h4>Notifications</h4>
                            </div>
                            <Divider className='mb-1' />
                            <div className='scroll'>
                                <MenuItem onClick={handleNotificationsClose}>
                                    <div className='d-flex align-items-center'>
                                        <div className='userImg'>
                                            <span className='rounded-circle'>
                                                <img src={avatar} alt="avatar" />
                                            </span>
                                        </div>
                                        <div className='dropdownInfo ml-2'>
                                            <h4>
                                                <span><b>Ikram</b></span> 
                                                💰 Revenus en hausse de 15% ! Votre confiance nous inspire.
                                            </h4>
                                            <p className='text-sky mb-0'>Il y a quelques secondes</p>
                                        </div>
                                    </div>
                                </MenuItem>
                                <MenuItem onClick={handleNotificationsClose}>
                                    <div className='d-flex align-items-center'>
                                        <div className='userImg'>
                                            <span className='rounded-circle'>
                                                <img src={avatar} alt="avatar" />
                                            </span>
                                        </div>
                                        <div className='dropdownInfo ml-2'>
                                            <h4>
                                                <span><b>Sarra</b></span> 
                                                "Restez à jour avec les dernières nouvelles et opportunités de notre startup innovante. Ne manquez rien ! 🚀"
                                            </h4>
                                            <p className='text-sky mb-0'>Il y a quelques secondes</p>
                                        </div>
                                    </div>
                                </MenuItem>
                                <MenuItem onClick={handleNotificationsClose}>
                                    <div className='d-flex align-items-center'>
                                        <div className='userImg'>
                                            <span className='rounded-circle'>
                                                <img src={avatar} alt="avatar" />
                                            </span>
                                        </div>
                                        <div className='dropdownInfo ml-2'>
                                            <h4>
                                                <span><b>Ons</b></span> 
                                                🎉 +25% d’utilisateurs ce mois-ci ! Merci pour votre soutien !
                                            </h4>
                                            <p className='text-sky mb-0'>Il y a quelques secondes</p>
                                        </div>
                                    </div>
                                </MenuItem>
                            </div>
                            <Divider className='pl-2 pr-2 w-100 pt-3 pb' />
                            <Button className='btn-blue w-100' onClick={handleNotificationsClose}>
                                View all notifications
                            </Button>
                        </Menu>

                        {/* Messages Menu */}
                        <Menu
                            anchorEl={anchorElMessages}
                            className='messages dropdown_list'
                            id="messages"
                            open={openMessages}
                            onClose={handleMessagesClose}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <div className='head pl-3 pb-0'>
                                <h4>Messages</h4>
                            </div>
                            <Divider className='mb-1' />
                            <div className='scroll'>
                                {/* Sample messages */}
                                <MenuItem onClick={handleMessagesClose}>
                                    <div className='d-flex align-items-center'>
                                        <div className='userImg'>
                                            <span className='rounded-circle'>
                                                <img src={avatar} alt="avatar" />
                                            </span>
                                        </div>
                                        <div className='dropdownInfo ml-2'>
                                            <h4>
                                                <span><b>Sarah</b></span> 
                                                Salut ! Comment vas-tu ?
                                            </h4>
                                            <p className='text-sky mb-0'>Il y a 5 minutes</p>
                                        </div>
                                    </div>
                                </MenuItem>
                                <MenuItem onClick={handleMessagesClose}>
                                    <div className='d-flex align-items-center'>
                                        <div className='userImg'>
                                            <span className='rounded-circle'>
                                                <img src={avatar} alt="avatar" />
                                            </span>
                                        </div>
                                        <div className='dropdownInfo ml-2'>
                                            <h4>
                                                <span><b>Houda</b></span> 
                                                Merci pour les documents !
                                            </h4>
                                            <p className='text-sky mb-0'>Il y a 10 minutes</p>
                                        </div>
                                    </div>
                                </MenuItem>
                            </div>
                            <Divider className='pl-2 pr-2 w-100 pt-3 pb' />
                            <Button className='btn-blue w-100' onClick={handleMessagesClose}>
                                View all messages
                            </Button>
                        </Menu>

                        {/* Emails Menu */}
                        <Menu
                            anchorEl={anchorElEmails}
                            className='emails dropdown_list'
                            id="emails"
                            open={openEmails}
                            onClose={handleEmailsClose}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <div className='head pl-3 pb-0'>
                                <h4>Emails</h4>
                            </div>
                            <Divider className='mb-1' />
                            <div className='scroll'>
                                {/* Sample emails */}
                                <MenuItem onClick={handleEmailsClose}>
                                    <div className='d-flex align-items-center'>
                                        <div className='userImg'>
                                            <span className='rounded-circle'>
                                                <img src={avatar} alt="avatar" />
                                            </span>
                                        </div>
                                        <div className='dropdownInfo ml-2'>
                                            <h4>
                                                <span><b>Admin</b></span> 
                                                Votre demande de support a été reçue.
                                            </h4>
                                            <p className='text-sky mb-0'>Il y a 1 heure</p>
                                        </div>
                                    </div>
                                </MenuItem>
                                <MenuItem onClick={handleEmailsClose}>
                                    <div className='d-flex align-items-center'>
                                        <div className='userImg'>
                                            <span className='rounded-circle'>
                                                <img src={avatar} alt="avatar" />
                                            </span>
                                        </div>
                                        <div className='dropdownInfo ml-2'>
                                            <h4>
                                                <span><b>partenaire</b></span> 
                                                Votre abonnement est confirmé.
                                            </h4>
                                            <p className='text-sky mb-0'>Il y a 2 heures</p>
                                        </div>
                                    </div>
                                </MenuItem>
                            </div>
                            <Divider className='pl-2 pr-2 w-100 pt-3 pb' />
                            <Button className='btn-blue w-100' onClick={handleEmailsClose}>
                                View all emails
                            </Button>
                        </Menu>

                        {
                            context.isLogin !== true ? 
                                <Link to={'/login'}> 
                                    <Button className='btn-blue btn-lg btn-round'>Sign In</Button> 
                                </Link>
                            : (
                                <>
                                    <Button className="myAcc d-flex align-items-center" onClick={handleMyAccClick}>
                                        <div className="userImg">
                                            <span className="rounded-circle">
                                                <img src={avatar} alt="avatar" />
                                            </span>
                                        </div>
                                        <div className="userInfo ml-2">
                                            <h4>Afifa Zaghdoudi</h4>
                                            <p className="mb-0">@ch</p>
                                        </div>
                                    </Button>
                                    <Menu
                                        anchorEl={anchorElMyAcc}
                                        id="account-menu"
                                        open={openMyAcc}
                                        onClose={handleMyAccClose}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <MenuItem onClick={handleMyAccClose}>
                                            <ListItemIcon>
                                                <PersonAdd fontSize="small" />
                                            </ListItemIcon>
                                            My Account
                                        </MenuItem>
                                        <MenuItem onClick={handleMyAccClose}>
                                            <ListItemIcon>
                                                <BsShieldFillExclamation fontSize="small" />
                                            </ListItemIcon>
                                            Reset Password
                                        </MenuItem>
                                        <MenuItem onClick={handleMyAccClose}>
                                            <ListItemIcon>
                                                <Logout fontSize="small" />
                                            </ListItemIcon>
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Header;