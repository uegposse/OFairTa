import * as admin from "firebase-admin";

const serviceAccount = require("../firebase-admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
});

export const storage = admin.storage();
