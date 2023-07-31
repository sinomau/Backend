import multer from "multer";
import path from "path";
import { __dirname, __filename } from "../utils/utils.js";

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../multer/users/img"));
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.email}-profile-${file.originalname}`);
  },
});

export const uploaderProfile = multer({ storage: profileStorage });

const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../multer/users/documents"));
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.email}-document-${file.originalname}`);
  },
});

export const documentUploader = multer({ storage: documentStorage });

const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../multer/users/products"));
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.code}-product-${file.originalname}`);
  },
});

export const productUploader = multer({ storage: productStorage });
