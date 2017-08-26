import firebase from 'firebase'
import algoliasearch from 'algoliasearch'

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
}

firebase.initializeApp(config)

const client = algoliasearch("1WBXPWDURS", "••••••••••••••••••••••••••••••••");
export const index = client.initIndex('your_index_name');

export const ga = "<GOOGLE ANALYTICS ID>";
export const bnet = "<BNET API KEY>";
export const wcl = "<WARCRAFT LOGS API KEY>";

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
