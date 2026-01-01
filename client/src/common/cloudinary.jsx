import axios from "axios";

export const uploadToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    console.log(formData);

    formData.append("image", file); // Make sure to append the correct key

    const response = await axios.post(
      "http://localhost:8080/upload-banner-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Uploaded Image:", response.data);
    return response.data.imageUrl; // Return the uploaded image URL
  } catch (error) {
    console.error("Upload error:", error);
  }
};
