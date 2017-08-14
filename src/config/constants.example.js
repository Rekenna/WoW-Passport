import firebase from 'firebase'

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
}

firebase.initializeApp(config)

export const ga = "<GOOGLE ANALYTICS ID>";
export const bnet = "<BNET API KEY>";
export const wcl = "<WARCRAFT LOGS API KEY>";

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
