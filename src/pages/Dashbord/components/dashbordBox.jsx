import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { HiDotsVertical } from "react-icons/hi";
import { IoTimerOutline } from "react-icons/io5";

const ITEM_HEIGHT = 48;

const DashbordBox = ({ color, icon, grow, title, amount }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Button className="dashbordBox" 
                style={{
                    backgroundImage: `linear-gradient(to right, 
                        ${color?.[0] || 'defaultColor1'}, 
                        ${color?.[1] || 'defaultColor2'})`
                }}
                onClick={handleClick} // Ensure the button click opens the menu
                >
            {grow ? (
                <span className='chart'><TrendingUpIcon />  </span>
            ) : (
                <span className='chart'><TrendingDownIcon/>  </span>
            )}

            <div className="d-flex w-100">
                <div className="col1">
                    <h4 className="text-white mb-0">{title}</h4>
                    <span className="text-white">{amount}</span>
                </div>
                <div className="ml-auto">
                    {icon && (
                        <span className="icon">
                            {icon}
                        </span>
                    )}
                </div>
            </div>

            <div className="d-flex align-items-center w-100 bottomEle">
                <h6 className="text-white mb-0 mt-0">Last year</h6>
                <Button className="ml-auto toggleIcon" onClick={handleClick}>
                    <HiDotsVertical />
                </Button>
                <Menu
                    id="dropdown_menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '20ch',
                        },
                    }}
                >
                    <MenuItem onClick={handleClose}> <IoTimerOutline />
                        Last Day
                    </MenuItem>
                    <MenuItem onClick={handleClose}><IoTimerOutline />
                        Last Week
                    </MenuItem>
                    <MenuItem onClick={handleClose}><IoTimerOutline />
                        Last Month
                    </MenuItem>
                    <MenuItem onClick={handleClose}><IoTimerOutline />
                        Last Year
                    </MenuItem>
                </Menu>
            </div>
        </Button>
    );
}

export default DashbordBox;
