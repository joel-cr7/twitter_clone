import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SubscriptionModal from "../SubscriptionModal/SubscriptionModal";


function RightPanel() {

  // State for Subscription modal
  const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
  
  

  //--------------------- Handling right panel buttons-------------------

  const handleOpenSubscriptionModal = () => setOpenSubscriptionModal(true);

  const handleCloseSubscriptionModal = () => setOpenSubscriptionModal(false);

  const handleThemeChange = () => {};


  return (
    <div className="py-5 sticky top-0">

      {/* Search bar and theme toggle */}
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search Twitter"
          className="py-3 rounded-full bg-gray-100 text-gray-500 w-full pl-12"
        />
        <div className="absolute top-0 left-0 pl-3 pt-3">
          <SearchIcon className="text-gray-500" />
        </div>

        <Brightness4Icon
          className="ml-3 cursor-pointer"
          onClick={handleThemeChange}
        />
      </div>

      {/* Get Verified button */}
      <section className="my-5">
        <h1 className="text-xl font-bold">Get Verified</h1>
        <h1 className="font-semibold mb-5">Subscribe to unlock new features</h1>
        <Button
          sx={{
            bgcolor: "#4d81f7",
            borderRadius: "25px",
            padding: "10px",
            paddingX: "20px"
          }}
          variant="contained"
          onClick={handleOpenSubscriptionModal}
        >
          Get Verified
        </Button>
      </section>

      {/* Trending news */}
      <section className="mt-7 space-y-5">
        <h1 className="font-bold text-xl py-1">What's happening</h1>
        <div>
          <p className="text-sm text-gray-500">FIFA Women's World Cup . Live</p>
          <p className="text-md font-bold text-black">Philippines vs Switzerland</p>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <p className="text-gray-500">Entertainment . Trending</p>
            <p className="font-bold">#TheMarvels</p>
            <p>34.5K Tweets</p>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <p className="text-gray-500">Entertainment . Trending</p>
            <p className="font-bold">#TheMarvels</p>
            <p>34.5K Tweets</p>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col">
            <p className="text-gray-500">Entertainment . Trending</p>
            <p className="font-bold">#TheMarvels</p>
            <p>34.5K Tweets</p>
          </div>
          <MoreHorizIcon />
        </div>
      </section>

      {/* Subscription modal */}
      <section>
        <SubscriptionModal handleClose={handleCloseSubscriptionModal} open={openSubscriptionModal}/>
      </section>
    </div>
  );
}

export default RightPanel;
