const moment = require('moment');

export function formatCharacterData(body, realm, region) {
    let data = JSON.parse(body);

    let formattedData = {
        raw: body,
        gender: determineGender(data.gender),
        race: determineRace(data.race),
        faction: determineFaction(data.faction),
        class: determineClass(data.class, data.talents),
        level: data.level,
        region: region,
        realm: realm,
        name: data.name,
        thumbnail: data.thumbnail,
        lastLogout: data.lastModified,
        lastUpdated: moment().format()
    };
    formattedData['urls'] = getLinks(formattedData);
    formattedData['renders'] = getRenders(formattedData);
    return formattedData;
}

function determineRace(race) {
    switch (race) {
        case 1:
            return 'Human'
        case 2:
            return 'Orc'
        case 3:
            return 'Dwarf'
        case 4:
            return 'Night Elf'
        case 5:
            return 'Undead'
        case 6:
            return 'Tauren'
        case 7:
            return 'Gnome'
        case 8:
            return 'Troll'
        case 9:
            return 'Goblin'
        case 10:
            return 'Blood Elf'
        case 11:
            return 'Draenei'
        case 22:
            return 'Worgen'
        case 24:
            return 'Pandaren'
        case 25:
            return 'Pandaren'
        case 26:
            return 'Pandaren'
        case 27:
            return 'Nightborne'
        case 28:
            return 'Highmountain Tauren'
        case 29:
            return 'Void Elf'
        case 30:
            return 'Lightforged Draenei'
        default:
            return 'None'
    }
}

function determineFaction(faction) {
    switch (faction) {
        case 0:
            return 'Alliance'
        case 1:
            return 'Horde'
        default:
            return 'Nuetral'
    }
}

function determineClass(characterClass, talents) {
    const specialization = talents.filter(talent => talent.selected === true)[0];

    switch (characterClass) {
        case 1:
            return ({name: 'Warrior', talents: specialization});
        case 2:
            return ({name: 'Paladin', talents: specialization});
        case 3:
            return ({name: 'Hunter', talents: specialization});
        case 4:
            return ({name: 'Rogue', talents: specialization});
        case 5:
            return ({name: 'Priest', talents: specialization});
        case 6:
            return ({name: 'Death Knight', talents: specialization});
        case 7:
            return ({name: 'Shaman', talents: specialization});
        case 8:
            return ({name: 'Mage', talents: specialization});
        case 9:
            return ({name: 'Warlock', talents: specialization});
        case 10:
            return ({name: 'Monk', talents: specialization});
        case 11:
            return ({name: 'Druid', talents: specialization});
        case 12:
            return ({name: 'Demon Hunter', talents: specialization});
        default:
            return ({name: 'None', talents: null});
    }
}

function determineGender(gender) {
    if (gender) {
        return "Female"
    }
    else {
        return "Male";
    }
}

function getLinks(formattedData) {

    let locale;
    switch (formattedData.region) {
        case 'us':
            locale = 'en_US'
            break;
        case 'eu':
            locale = 'en_GB'
            break;
        case 'kr':
            locale = 'ko_KR'
            break;
        case 'tw':
            locale = 'zh_TW'
            break;
        default:
            locale = 'en_US'
    }

    let urls = {
        'armory': (`https://worldofwarcraft.com/${locale}/character/${formattedData.realm}/${formattedData.name}`).toLowerCase(),
        'wowprogress': (`https://www.wowprogress.com/character/${formattedData.region}/${formattedData.realm}/${formattedData.name}`).toLowerCase(),
        'raiderio': (`https://raider.io/characters/${formattedData.region}/${formattedData.realm}/${formattedData.name}`).toLowerCase(),
        'warcraftlogs': (`https://www.warcraftlogs.com/character/${formattedData.region}/${formattedData.realm}/${formattedData.name}`).toLowerCase()

    }
    return urls
}

function getRenders(formattedData) {

    let renders = {
        'main': `//render-${formattedData.region}.worldofwarcraft.com/character/${(formattedData.thumbnail.split('-avatar')[0])}-main.jpg`,
        'avatar': `https://render-${formattedData.region}.worldofwarcraft.com/character/${formattedData.thumbnail}`,
        'spec': `https://render-us.worldofwarcraft.com/icons/56/${formattedData.class.talents.spec.icon}.jpg`,
        'fallback': (`https://blzmedia-a.akamaihd.net/wow/renders/shadow/wow/renders/shadow/${formattedData.class.name}-${formattedData.race}-${formattedData.gender}.jpg`).toLowerCase().replace(/\s/g, '')
    }
    return renders;
}
