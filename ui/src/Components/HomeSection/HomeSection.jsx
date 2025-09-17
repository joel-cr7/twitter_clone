import { Avatar, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import ImageIcon from "@mui/icons-material/Image";
import React, { useState } from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import TweetCard from "../TweetCard/TweetCard";

function HomeSection() {
  // states
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const yupValidations = yup.object().shape({
    content: yup
      .string()
      .trim("Tweet text is required")
      .required("Tweet text is required"),
  });

  const handleFormSubmit = (values) => {
    console.log("values ", values);
  };

  // using formik for form state management and yup for form validations
  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
    },
    validationSchema: yupValidations,
    onSubmit: handleFormSubmit,
  });

  // handle image selection
  const handleSelectImage = (event) => {
    setUploadingImage(true);
    console.log("Attaching file", event);
    const img = event.target.files[0];
    setSelectedImage(img);
    formik.setFieldValue("image", img);
    setUploadingImage(false);
  };

  return (
    <div className="space-y-5">
      <section>
        <h1 className="text-xl font-bold opacity-90 py-5">Home</h1>
      </section>

      {/* Profile photo, input for tweet, image input, tweet button */}
      <section className="pb-10">
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

      {/* Show all tweets */}
      {[1, 1, 1, 1, 1].map((item) => (
        <TweetCard />
      ))}
    </div>
  );
}

export default HomeSection;
