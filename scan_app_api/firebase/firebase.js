const firebase = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const fs = require("fs");
const path = require("path");

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

const bucket_url = process.env.bucket_url;

const app = firebase.initializeApp(firebaseConfig);

const uploadQRCode = async (filePath) => {
  const fileData = fs.readFileSync(filePath);
  const buffer = Buffer.from(fileData);
  const fileName = new Date().getTime() + path.basename(filePath);
  const storage = getStorage(app, bucket_url);
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, buffer);

  // Wrap the call to getDownloadURL in a promise so that we can return the value
  const downloadUrlPromise = new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(`${progress}% uploaded...`);
      },
      (error) => {
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });

  // Wait for the promise to resolve and return the downloadURL
  return downloadUrlPromise;
};

module.exports = { uploadQRCode };
