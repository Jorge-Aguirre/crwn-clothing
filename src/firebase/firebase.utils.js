import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCxFu7yvQZL4ln0LYDgyggS3AFwKFbQT2I",
  authDomain: "crwn-db-fc900.firebaseapp.com",
  databaseURL: "https://crwn-db-fc900.firebaseio.com",
  projectId: "crwn-db-fc900",
  storageBucket: "crwn-db-fc900.appspot.com",
  messagingSenderId: "368347408245",
  appId: "1:368347408245:web:62498c0e78a2c7a104953c",
  measurementId: "G-HS5BHR1J82"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, addionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...addionalData
      })
    } catch (error) {
      console.log('error create user', error.message);
    }
  }

  return userRef;
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;