import React, { useState } from "react";
import { Avatar, Box, Button, Tab } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TweetCard from "../TweetCard/TweetCard";
import ProfileModal from "../ProfileModal/ProfileModal";

function Profile() {
  const navigate = useNavigate();

  // managing state for tabs
  const [tabValue, setTabValue] = useState("1");

  // states for edit profile modal
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const handleOpenProfileModal = () => setOpenProfileModal(true);
  const handleCloseProfileModal = () => setOpenProfileModal(false);

  const handleBack = () => navigate(-1);

  const handleFollowUser = () => {
    console.log("Handle follow user");
  };

  const handleTabChange = (event, newTabValue) => {
    console.log(newTabValue, event);
    setTabValue(newTabValue);
    if (newTabValue === 4) {
      console.log("Likes tweet");
    } else if (newTabValue === 1) {
      console.log("users tweet");
    }
  };

  return (
    <div>
      {/* Top navigation to go back */}
      <section className={`z-50 flex items-center sticky top-0 bg-white bg-opacity-95`}>
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="ml-5 py-5 text-xl font-bold">Joel Miranda</h1>
      </section>

      {/* ----------------------Main profile page content--------------------------- */}
      {/* Cover photo */}
      <section>
        <img
          className="w-full h-[15rem] object-cover"
          src="/download.jpg"
          alt="cover_photo"
        />
      </section>

      {/* Profile info section */}
      <section className="pl-6">
        {/* Profile photo, edit profile/Follow button */}
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="bg-white -translate-y-20"
            src="/profile.png"
            alt="profile_photo"
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          />
          {true ? (
            <Button
              variant="contained"
              onClick={handleOpenProfileModal}
              sx={{ borderRadius: "20px" }}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleFollowUser}
              sx={{ borderRadius: "20px" }}
            >
              {true ? "Follow" : "Unfollow"}
            </Button>
          )}
        </div>

        {/* User name and handle */}
        <div>
          <div className="flex items-center">
            <h1 className="font-bold text-xl">Joel Miranda</h1>
            {true && (
              <VerifiedIcon
                sx={{ width: "18px", height: "18px", marginLeft: "10px" }}
                className="text-blue-500"
              />
            )}
          </div>
          <h1 className="text-gray-500">@joel_miranda</h1>
        </div>

        {/* Profile quote, education, country, date, follower/following count */}
        <div className="mt-2 space-y-3">
          <p>
            The greatest achievement of technology is not how it changes life,
            but how it improves it
          </p>

          <div className="py-1 flex space-x-5">
            <div className="flex items-center text-gray-500">
              <BusinessCenterIcon />
              <p className="ml-2">Education</p>
            </div>
            <div className="flex items-center text-gray-500">
              <LocationOnIcon />
              <p className="ml-2">Indian</p>
            </div>

            <div className="flex items-center text-gray-500">
              <CalendarMonthIcon />
              <p className="ml-2">Joined Jun 2022</p>
            </div>
          </div>

          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-1 font-semibold">
              <span>190</span>
              <span className="text-gray-500">Following</span>
            </div>
            <div className="flex items-center space-x-1 font-semibold">
              <span>590</span>
              <span className="text-gray-500">Followers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tab content */}
      <section className="py-5">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Tweets" value="1" />
                <Tab label="Replies" value="2" />
                <Tab label="Media" value="3" />
                <Tab label="Likes" value="4" />
              </TabList>
            </Box>

            {/* Different tab panels as per above tab list */}
            {/* Tweets tab panel */}
            <TabPanel value="1">
              {[1,1,1,1].map(item => <TweetCard />)}
            </TabPanel>

            {/*  */}
            <TabPanel value="2">User replies</TabPanel>
            <TabPanel value="3">Media</TabPanel>
            <TabPanel value="4">Likes</TabPanel>
          </TabContext>
        </Box>
      </section>

      {/* Edit profile modal */}
      <section>
        <ProfileModal handleClose={handleCloseProfileModal} open={openProfileModal}/>
      </section>
    </div>
  );
}

export default Profile;
