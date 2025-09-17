import React, { useState } from "react";
import { navigationMenu } from "./NavigationMenu";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function Navigation() {
  const navigate = useNavigate();

  // @mui code - for showing menu item to logout
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleLogoutMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    console.log("logged out !");
    handleClose();
  };


  return (
    <div className="h-screen sticky top-0">
      <div>
        {/* Portal icon */}
        <div className="py-5">
          <img src="/logo.png" height={30} width={30} alt="logo" />
        </div>

        {/* Portal navigation bar */}
        <div className="space-y-6">
          {navigationMenu.map((item) => (
            <div
              className="cursor-pointer flex space-x-3"
              onClick={() =>
                item.title == "Profile"
                  ? navigate(`/profile/${5}`)
                  : navigate(item.path)
              }
            >
              {item.icon}
              <p className="text-md">{item.title}</p>
            </div>
          ))}
        </div>

        {/* Tweet button */}
        <div className="py-10">
          <Button
            sx={{
              width: "100%",
              bgcolor: "#4d81f7",
              borderRadius: "30px",
              py: "15px",
            }}
            variant="contained"
          >
            Tweet
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar src="" alt="photo" />
          <div className="flex flex-col mr-auto">
            <span>Joel Miranda</span>
            <span className="opacity-70">Joel-cr7</span>
          </div>
        </div>

        {/* menu icon for logout */}
        <Button
          id="logoutMenuBtn"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleLogoutMenuClick}
        >
          <MoreHorizIcon />
        </Button>
        <Menu
          id="menuBtn"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{
            list: {
              "aria-labelledby": "logoutMenuBtn",
            },
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Navigation;
