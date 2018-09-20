import firebase from "firebase";
import { DB_KEY } from "../config/DB_KEY"

export const DB_CONFIG = {
  apiKey: DB_KEY,
  authDomain: "kpogodin-blog73.firebaseapp.com",
  databaseURL: "https://kpogodin-blog73.firebaseio.com",
  projectId: "kpogodin-blog73",
  storageBucket: "kpogodin-blog73.appspot.com",
  messagingSenderId: "136260481730"
};

export const appDB = firebase.initializeApp(DB_CONFIG);
export const database_posts = appDB
  .database()
  .ref()
  .child("posts");

export const database_love = appDB
  .database()
  .ref()
  .child("imLove");

export const database_notlove = appDB
  .database()
  .ref()
  .child("notLove");
