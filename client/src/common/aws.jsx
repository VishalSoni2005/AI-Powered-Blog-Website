import axios from "axios";

export const uploadImage = async (img) => {
  try {
    // Step 1: Fetch the upload URL
    const {
      data: { uploadURL },
    } = await axios.get("http://localhost:8080/get-upload-url");

    // Step 2: Upload the image using the fetched URL
    await axios({
      method: "PUT",
      url: uploadURL,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: img,
    });

    // Step 3: Construct the final image URL
    const imgUrl = uploadURL.split("/upload")[0]; // Remove the '/upload' part
    console.log("Image uploaded successfully!", imgUrl);

    return imgUrl;
  } catch (err) {
    console.error("Error uploading image:", err);
    return null; // Return null in case of an error
  }
};
