import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Avatar, Menu, Button, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
  outline: "none",
};

export default function ReplyModal({handleClose, open}) {

  // image states
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = (values) => {
    console.log("handle submit", values);
  };

  // using formik for form state management
  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
      tweetId: 4,
    },
    onSubmit: handleFormSubmit,
  });

  // handle reply image selection
  const handleSelectImage = (event) => {
    setUploadingImage(true);
    console.log("Attaching file", event);
    const img = event.target.files[0];
    setSelectedImage(img);
    formik.setFieldValue("image", img);
    setUploadingImage(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex space-x-5">
            {/* Profile photo */}
            <Avatar
              className="cursor-pointer"
              onClick={() => navigate(`/profile/${6}`)}
              alt="photo"
              src=""
            />

            {/* Tweet content (name, twitter handle, etc), tweet text */}
            <div className="w-full">
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
              </div>

              <div className="mt-2">
                {/* ------------------tweet text content---------------------- */}
                <p className="mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipisicing{" "}
                </p>
              </div>
            </div>
          </div>

          {/* Profile photo, reply input for tweet, image input, reply button */}
          <section className="py-10">
            <div className="flex space-x-5">
              {/* Profile photo */}
              <Avatar alt="photo" src="" />

              <div className="w-full">
                <form onSubmit={formik.handleSubmit}>
                  {/* Tweet text input */}
                  <div className="flex flex-col">
                    <input
                      className="outline-none text-xl"
                      type="text"
                      placeholder="What is happening"
                      {...formik.getFieldProps("content")}
                    />
                    {formik.errors.content && formik.touched.content && (
                      <span className="text-red-500 text-sm">
                        {formik.errors.content}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between mt-5 items-center">
                    {/* Tweet image input */}
                    <div className="flex space-x-5">
                      <label className="flex items-center rounded-md cursor-pointer">
                        <ImageIcon className="text-blue-400" />
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleSelectImage}
                        />
                      </label>
                      <FmdGoodIcon className="text-blue-400" />
                      <TagFacesIcon className="text-blue-400" />
                    </div>
                    <div>
                      <Button
                        sx={{
                          width: "100%",
                          bgcolor: "#4d81f7",
                          borderRadius: "30px",
                          paddingY: "8px",
                          paddingX: "20px",
                        }}
                        variant="contained"
                        type="submit"
                      >
                        Tweet
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </Box>
      </Modal>
    </div>
  );
}
