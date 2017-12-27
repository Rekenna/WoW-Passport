import * as firebase from 'firebase'
import * as contentful from "contentful/index";
import * as contentful from 'contentful'
require("firebase/firestore");

const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
}

firebase.initializeApp(config)

export const client = contentful.createClient({
    space: '',
    accessToken: ''
})

export const appVersion = ''

export const gaCode = "UA-XXXX-X";
export const bnet = "";
export const bnetSecret = "";
export const wcl = "";
export const shortUrlApi = "";

export const auth = firebase.auth();
export const db = firebase.database();

export const storageKey = '';

export const isAuthenticated = () => {
    return !!auth.currentUser || !!localStorage.getItem(storageKey);
}

export default firebase;
