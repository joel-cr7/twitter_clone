import React from "react";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import TweetCard from "../TweetCard/TweetCard";
import { Divider } from "@mui/material";


function TweetDetails() {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  return (
    <>
      {/* Top navigation to go back */}
      <section className={`z-50 flex items-center sticky top-0 bg-white bg-opacity-95`}>
        <KeyboardBackspaceIcon
          className="cursor-pointer"
          onClick={handleBack}
        />
        <h1 className="ml-5 py-5 text-xl font-bold">Tweet</h1>
      </section>

      {/* Actual tweet post */}
      <section>
        <TweetCard />
        <Divider sx={{margin: "2rem 0rem"}} />
      </section>

      {/* All replies for the above tweet */}
      <section>
        {[1,1,1].map(item => <TweetCard />)}
      </section>
    </>
  );
}

export default TweetDetails;
