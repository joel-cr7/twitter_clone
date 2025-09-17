import React, { useState } from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IconButton } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function SubscriptionModal({ open, handleClose }) {
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
    outline: "none",
    p: 4,
  };

  // image state
  const [uploading, setUploading] = useState(false);

  const [plan, setPlan] = useState("Anually");

  const features = [
    "Prioritized rankings in conversations and search",
    "See approximately twice as many Tweets between ads",
    "Add bold and italic text in your tweets",
    "Post longer videos and 1080p video uploads",
    "All the existing Blue features, including Edit Tweet, Bookmark folders and early access to new features",
  ];

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
          {/* Close icon */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <IconButton onClick={handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </div>
          </div>

          <div className="flex justify-center py-10">
            <div className="w-[80%] space-y-10">
              <div className="flex items-center justify-between p-5 shadow-lg bg-slate-200">
                <h1 className="text-xl pr-5">
                  Blue subscribers with a verified phone number will have a blue
                  checkmark once approved.
                </h1>
                <img
                  className="w-24 h-24"
                  src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
                  alt="verified_icon"
                />
              </div>
              <div className="flex justify-between border border-gray-700 rounded-full px-5 py-3">
                <div>
                  <span
                    className={`${
                      plan === "Anually" ? "text-black" : "text-gray-400"
                    } cursor-pointer`}
                    onClick={() => setPlan("Anually")}
                  >
                    Anually
                  </span>
                  <span className="text-green-500 text-sm ml-5 ">SAVE 12%</span>
                </div>
                <p
                  className={`${
                    plan === "Monthly" ? "text-black" : "text-gray-400"
                  } cursor-pointer`}
                  onClick={() => setPlan("Monthly")}
                >
                  Monthly
                </p>
              </div>

              <div className="space-y-3 ">
                {features.map((item) => (
                  <div className="flex items-center space-x-5">
                    <FiberManualRecordIcon
                      sx={{ width: "7px", height: "7px" }}
                    />
                    <p className="text-xs">{item}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center rounded-full cursor-pointer bg-gray-900 text-white px-5 py-3">
                <span className="line-through italic"> ₹7,800.00</span>
                <span className="px-5"> ₹6,800/year</span>
              </div>

            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default SubscriptionModal;
