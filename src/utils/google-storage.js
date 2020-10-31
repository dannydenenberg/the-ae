import { Storage } from "@google-cloud/storage";
import root from "app-root-path";
import dotenv from "dotenv";
import { uploadDirectoryName } from "./multer";

/** Load config vars for development purposes. **/
dotenv.config();

// variables
const authJSON = JSON.parse(process.env.GOOGLE_STORAGE_JSON_AUTHORIZATION);
const projectId = "the-academia-exchange";
const bucketName = "the-academia-exchange-images";

// where multer put files
const uploadsDirectory = `${root.path}/${uploadDirectoryName}`;

const gc = new Storage({
  credentials: authJSON,
  projectId,
});

export const uploadFiles = async (filenames) => {
  for (let i = 0; i < filenames.length; i++) {
    const file = filenames[i];

    try {
      await uploadSingleFile(file);
    } catch (e) {
      console.log(`error`, e);
    }
  }

  return true; // done
};

async function uploadSingleFile(filename) {
  let fullPath = `${uploadsDirectory}/${filename}`;

  await gc.bucket(bucketName).upload(fullPath, {
    gzip: true,
    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });

  console.log(`🎃 ==> ${filename} uploaded to ${bucketName}`);
}
