import formidable from "formidable";
import cloudinary from "cloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.status(400).json({ message: "Method not allowed" });
    return;
  }

  const form = formidable({});

  const [fields, files] = await form.parse(request);

  const results = [];

  if (files.image) {
    if (Array.isArray(files.image)) {
      for (const file of files.image) {
        const { newFilename, filepath } = file;

        const result = await cloudinary.v2.uploader.upload(filepath, {
          public_id: newFilename,
          folder: "nf",
        });

        results.push(result);
      }
    } else {
      const { newFilename, filepath } = files.image;

      const result = await cloudinary.v2.uploader.upload(filepath, {
        public_id: newFilename,
        folder: "nf",
      });

      results.push(result);
    }
  }

  response.status(200).json(results);
}
