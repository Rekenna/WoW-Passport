import * as firebase from 'firebase'
import * as contentful from 'contentful'
import {formatCharacterData} from "./config/CharacterHelpers";
require("firebase/firestore");

const request = require('request-promise');

const config = {
    apiKey: "XXX",
    authDomain: "XXX",
    databaseURL: "XXX,
    projectId: "XXX",
    storageBucket: "XXX",
    messagingSenderId: "XXX"
}

firebase.initializeApp(config)

export const client = contentful.createClient({
    space: 'XXX',
    accessToken: 'XXX'
})

export const appVersion = '1.3.3'

export const gaCode = "UA-XXXX-XX";
export const bnet = "XXX";
export const bnetSecret = "XXX";
export const wcl = "XXX";
export const shortUrlApi = "XXX";

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

//Enable Offline Data Persistence
firebase.firestore().enablePersistence();
export const db = firebase.firestore();

export const storageKey = 'XXX';

export const isAuthenticated = () => {
    return !!auth.currentUser || !!localStorage.getItem(storageKey);
}

export default firebase;

export function requestCharacterData(region, realm, name) {
    return request({
        method: 'GET',
        url: `https://${region}.api.battle.net/wow/character/${realm}/${name}`,
        qs: {
            fields: 'stats,talents,statistics,guild,items,progression,pvp,achievements',
            apikey: bnet
        },
        resolveWithFullResponse: true
    }, function (error, response, body) {
        let formattedData;
        if (response.statusCode === 200) {
            formattedData = formatCharacterData(body, realm, region);
        }
        else {
            formattedData = {
                data: false
            }
        }
        return updateCharacterReference((`${region}_${realm}_${name}`).toLowerCase(), formattedData)
    }).catch(function (error) {
        console.log(error)
    });
}

function updateCharacterReference(key, data) {
    db.collection('characters').doc(key).set(data);
}