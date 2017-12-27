'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const moment = require('moment');

exports.makeCharacterSearchable = functions.firestore.document('characters/{characterKey}').onWrite(event => {
    // Get an object with the current document value
    var character = event.data.data();
    var lastLogout = JSON.parse(character.raw).lastModified;

    // Only index the character if they are max level and have logged out in the last 14 days.
    if(character.level === 110 && moment().diff(lastLogout, 'days') <= 14){
        // perform desired operations ...
        return admin.firestore().collection('searchable').doc(`${character.region}_${character.realm}_${character.name.toLowerCase()}`).set({
            name: character.name,
            realm: character.realm,
            region: character.region,
            length: character.name.length,
            faction: character.faction,
            classIcon: character.class.name.toLowerCase()
        });
    }else{
        // Is character currently searchable?
        var searchableRef = admin.firestore().collection('searchable').doc(`${character.region}_${character.realm}_${character.name.toLowerCase()}`);
        searchableRef.get().then(function (character) {
            // If there is a searchable index for this character delete it.
            if (character.exists) {
                searchableRef.delete()
            }
        }).catch(function (error) {
            console.log("Error checking searchable reference:", error);
        });
    }
});