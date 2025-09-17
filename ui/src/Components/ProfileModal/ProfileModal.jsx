import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Avatar, IconButton, TextField } from "@mui/material";

function ProfileModal({open, handleClose}) {

  // custom styling for modal
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
  };

  // image state
  const [uploading, setUploading] = useState(false);

  // ----------------form handling using formik and yup------------
  const yupValidations = Yup.object().shape({
    fullName: Yup.string()
      .trim("Name is required")
      .required("Name is required"),
  });

  const handleFormSumbit = (formValues) => {
    console.log("handle submit: ", formValues);
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      website: "",
      location: "",
      bio: "",
      backgroundImage: "",
      profileImage: "",
    },
    validationSchema: yupValidations,
    onSubmit: handleFormSumbit,
  });

  // handling profile/cover photo change
  const handleImageChange = (event) => {
    console.log(event);
    setUploading(true);
    const name = event.target.name;
    const img = event.target.files[0];
    formik.setFieldValue(name, img);
    setUploading(false);
  };

  return (
    <div>
      {/* MUI modal for displaying form for editing profile */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <form onSubmit={formik.handleSubmit}>
            {/* Close icon and save button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <IconButton onClick={handleClose} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <p className="text-lg text-gray-500">Edit Profile</p>
              </div>
              <Button type="submit">Save</Button>
            </div>

            {/* Profile fields to edit (custom class for hiding scrollbar) */}
            <div className="h-[80vh] hideScrollbar overflow-y-scroll overflow-x-hidden">
              {/* Profile/Cover photo */}
              <>
                {/* Cover picture */}
                <div className="w-full">
                  <div className="relative">
                    <img
                      className="w-full h-[12rem] object-cover object-center"
                      src="/download.jpg"
                      alt="cover_photo"
                    />
                    <input
                      type="file"
                      name="backgroundImage"  // used in onClick function and same name is set in formik initialValues
                      accept="image/*"
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>

                {/* Profile picture */}
                <div className="w-full h-[6rem] ml-4 transform -translate-y-20">
                  <div className="relative">
                    <Avatar
                      src="/profile.png"
                      alt="profile_photo"
                      sx={{
                        width: "10rem",
                        height: "10rem",
                        border: "4px solid white",
                      }}
                    />
                    <input
                        type="file"
                        name="profileImage" // used in onClick function and same name is set in formik initialValues
                        accept="image/*"
                        className="absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer"
                        onClick={handleImageChange}
                      />
                  </div>
                </div>
              </>

              {/* Text fields */}
              <div className="space-y-3">
                {/* fullname field */}
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Full name"
                  error={
                    formik.touched.fullName && Boolean(formik.errors.fullName)
                  }
                  helperText={formik.touched.fullName && formik.errors.fullName}
                  {...formik.getFieldProps("fullName")}
                />

                {/* bio field */}
                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  label="Bio"
                  error={formik.touched.bio && Boolean(formik.errors.bio)}
                  helperText={formik.touched.bio && formik.errors.bio}
                  {...formik.getFieldProps("bio")}
                />

                {/* website field */}
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Website"
                  error={
                    formik.touched.website && Boolean(formik.errors.website)
                  }
                  helperText={formik.touched.website && formik.errors.website}
                  {...formik.getFieldProps("website")}
                />

                {/* Location field */}
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Location"
                  error={
                    formik.touched.location && Boolean(formik.errors.location)
                  }
                  helperText={formik.touched.location && formik.errors.location}
                  {...formik.getFieldProps("location")}
                />

                <div className="my-3">
                  <p className="text-lg">Birth Date . Edit</p>
                  <p className="text-2xl">February 05, 2002</p>
                </div>
                <p className="py-3 text-lg">Edit professional Profile</p>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default ProfileModal;
