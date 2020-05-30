import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA5DDFGT9fQw9Vj-nuPMt8pF6J4g-q_srI",
    authDomain: "e-buy-9c5ea.firebaseapp.com",
    databaseURL: "https://e-buy-9c5ea.firebaseio.com",
    projectId: "e-buy-9c5ea",
    storageBucket: "e-buy-9c5ea.appspot.com",
    messagingSenderId: "770736577062",
    appId: "1:770736577062:web:c562a9ded1852eb78f24e7"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return null;
    const userRef = firestore.doc(`users/${userAuth['uid']}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (e) {
            console.log('Error creating user')
        }
    }
    return userRef;
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;