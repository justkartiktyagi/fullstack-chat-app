import cloudinary from "./src/lib/cloudinary.js";
(async () => {
  try {
    const result = await cloudinary.uploader.upload(
      "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    );

    console.log("UPLOAD SUCCESS:", result.secure_url);
  } catch (err) {
    console.log("UPLOAD FAILED:", err);
  }
})();
