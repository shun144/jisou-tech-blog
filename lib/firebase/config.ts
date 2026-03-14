import { initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDg-LWpZCrs-S_NBatyA1zjb-prYIutlCI",
  authDomain: "jisou-tech-blog.firebaseapp.com",
  projectId: "jisou-tech-blog",
  storageBucket: "jisou-tech-blog.firebasestorage.app",
  messagingSenderId: "624449248730",
  appId: "1:624449248730:web:ef1fb3b7810a4a8b3f74e3",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firestoreDb = getFirestore(app);
export const auth = getAuth(app);

// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDg-LWpZCrs-S_NBatyA1zjb-prYIutlCI",
//   authDomain: "jisou-tech-blog.firebaseapp.com",
//   projectId: "jisou-tech-blog",
//   storageBucket: "jisou-tech-blog.firebasestorage.app",
//   messagingSenderId: "624449248730",
//   appId: "1:624449248730:web:ef1fb3b7810a4a8b3f74e3",
// };

// const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app);
// export const firestoreDb = getFirestore(app);
// export const auth = getAuth(app);
