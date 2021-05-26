import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyDivJ74OTC_r5xBV8Q62ELc2Y5hcylVBxk',
  authDomain: 'note-app-eeec4.firebaseapp.com',
  projectId: 'note-app-eeec4',
  storageBucket: 'note-app-eeec4.appspot.com',
  messagingSenderId: '664178330105',
  appId: '1:664178330105:web:9339b499bfd4a78ab0d528',
});

export const firestore = firebase.firestore();
