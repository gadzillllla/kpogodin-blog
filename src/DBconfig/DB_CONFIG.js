import firebase from 'firebase';
import DB_KEY from './DB_KEY';

export const DB_CONFIG = {
  apiKey: DB_KEY,
  authDomain: 'kpogodin-blog73.firebaseapp.com',
  databaseURL: 'https://kpogodin-blog73.firebaseio.com',
  projectId: 'kpogodin-blog73',
  storageBucket: 'kpogodin-blog73.appspot.com',
  messagingSenderId: '136260481730',
};

export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const appDB = firebase.initializeApp(DB_CONFIG);
export const databasePosts = appDB
  .database()
  .ref()
  .child('posts');

export const databaseAutosave = appDB
  .database()
  .ref()
  .child('autosave');

export const storage = firebase.storage();

export const logout = () => appDB.auth().signOut();

export const facebookLogin = () => {
  appDB.auth().signInWithPopup(facebookProvider);
};

export const googleLogin = () => {
  appDB.auth().signInWithPopup(googleProvider);
};
