import crypto from "crypto";
import mime from "mime";
import multer from "multer";

export const uploadDirectoryName = "uploads";

/** For file uploads. */
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, `./${uploadDirectoryName}/`);
  },
  filename: function (_req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(
        null,
        raw.toString("hex") +
          Date.now() +
          "." +
          mime.getExtension(file.mimetype),
      );
    });
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1 * 1024 * 1024, // 1MB
  },
});
// the string corresponds to the "name" attribute in the html input for the files
export const uploadType = upload.array("uploaded_file_name", 4);
