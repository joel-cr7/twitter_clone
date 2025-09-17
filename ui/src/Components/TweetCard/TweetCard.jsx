import { Avatar, Menu, Button, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VerifiedIcon from "@mui/icons-material/Verified";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import BarChartIcon from "@mui/icons-material/BarChart";
import RepeatIcon from "@mui/icons-material/Repeat";
import ReplyModal from "./ReplyModal";

function TweetCard() {
  const navigate = useNavigate();

  // @mui code - for showing menu item to logout
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  // states for reply modal
  const [openReplyModal, setOpenReplyModal] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteTweet = () => {
    console.log("Delete tweet");
    handleClose();
  };

  //--------------------- Handling Tweet/post buttons-------------------

  // handling reply/comment button
  const handleOpenReplyModal = () => setOpenReplyModal(true);
  const handleCloseReplyModal = () => setOpenReplyModal(false);

  // handling retweet button
  const handleCreateRetweet = () => {
    console.log("handle retweet button");
  };

  // handling like button
  const handleLikeTweet = () => {
    console.log("handle like tweet button");
  };

  // handling dislike button (if tweet already liked)
  const handleDislikeTweet = () => {
    console.log("handle dislike retweet button");
  };

  // handling upload button
  const handleUpload = () => {
    console.log("handle upload button");
  };

  return (
    <>
      <div className="flex space-x-5">
        {/* Profile photo */}
        <Avatar
          className="cursor-pointer"
          onClick={() => navigate(`/profile/${6}`)}
          alt="photo"
          src=""
        />

        <div className="w-full">
          {/* Tweet top content (name, twitter handle, etc) */}
          <div className="flex justify-between items-center">
            {/* Name and handle */}
            <div className="flex cursor-pointer items-center space-x-2">
              <span className="font-semibold">Joel Miranda</span>
              <span className="text-gray-600">@joel_miranda . 2m</span>
              <VerifiedIcon
                sx={{ width: "18px", height: "18px" }}
                className="text-blue-500"
              />
            </div>

            {/* Menu 3-dots button for each tweet post*/}
            <div>
              <Button
                id="tweetMenuBtn"
                aria-controls={openMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreHorizIcon />
              </Button>
              <Menu
                id="menuBtn"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
                slotProps={{
                  list: {
                    "aria-labelledby": "tweetMenuBtn",
                  },
                }}
              >
                <MenuItem onClick={handleDeleteTweet}>Delete</MenuItem>
                <MenuItem onClick={handleDeleteTweet}>Edit</MenuItem>
              </Menu>
            </div>
          </div>

          <div className="mt-2">
            {/* ------------------Main tweet content---------------------- */}
            <div
              className="cursor-pointer"
              onClick={() => navigate(`/tweet/${3}`)}
            >
              <p className="mb-2">
                Lorem ipsum dolor sit amet, consectetur adipisicing{" "}
              </p>
              <img
                className="w-[87%] p-5 rounded-md border border-gray-400"
                src="https://cdn.pixabay.com/photo/2025/08/13/15/30/elephant-9772462_1280.jpg"
                alt="post"
              />
            </div>

            {/* ----------------Tweet buttons---------------- */}
            <div className="py-5 flex justify-between items-center">
              {/* Comment button */}
              <div className="flex items-center space-x-1 text-gray-600">
                <ChatBubbleOutlineIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModal}
                />
                <p>43</p>
              </div>

              {/* Re-tweet button */}
              <div
                className={`flex items-center space-x-1 ${
                  true ? "text-pink-600" : "text-gray-600"
                }`}
              >
                <RepeatIcon
                  className="cursor-pointer"
                  onClick={handleCreateRetweet}
                />
                <p>54</p>
              </div>

              {/* Like button */}
              <div
                className={`flex items-center space-x-1 ${
                  true ? "text-pink-600" : "text-gray-600"
                }`}
              >
                {true ? (
                  <FavoriteIcon
                    className="cursor-pointer"
                    onClick={handleDislikeTweet}
                  />
                ) : (
                  <FavoriteBorderIcon
                    className="cursor-pointer"
                    onClick={handleLikeTweet}
                  />
                )}
                <p>54</p>
              </div>

              {/* Impressions button */}
              <div className="flex space-x-1 text-gray-600">
                <BarChartIcon
                  className="cursor-pointer"
                />
                <p>430</p>
              </div>

              {/* Upload button */}
              <div className="flex space-x-1 text-gray-600">
                <FileUploadIcon
                  className="cursor-pointer"
                  onClick={handleUpload}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reply modal */}
      <section>
        <ReplyModal handleClose={handleCloseReplyModal} open={openReplyModal} />
      </section>
    </>
  );
}

export default TweetCard;
