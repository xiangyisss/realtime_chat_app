import firebase from 'firebase/app';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: 'AIzaSyB5MtdihYjAyTFQQUsfTMtlkuPrVdiXWqY',
    authDomain: 'chat-app-57a6e.firebaseapp.com',
    projectId: 'chat-app-57a6e',
    storageBucket: 'chat-app-57a6e.appspot.com',
    messagingSenderId: '744699877638',
    appId: '1:744699877638:web:cbce155e23dd0e18cda687',
};
const database = firebase.initializeApp(firebaseConfig);
// const database = firebase.initializeApp(firebaseConfig).firestore();


export default database;
