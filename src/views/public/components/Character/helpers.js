import {realms} from "../../../../config/realms";

export function formatCharacterData(characterData, region) {
    let formattedData = characterData;

    formattedData['class'] = determineClass(characterData.class, characterData.talents)
    formattedData['gender'] = determineGender(characterData.gender)
    formattedData['race'] = determineRace(characterData.race)
    formattedData['faction'] = determineFaction(characterData.faction)
    formattedData['realm_slug'] = getRealmSlug(characterData.realm, region)
    formattedData['region'] = region.toLowerCase()
    formattedData['urls'] = getLinks(formattedData)
    formattedData['renders'] = getRenders(formattedData)

    formattedData['key'] = characterKey(formattedData)

    return formattedData;
}

function characterKey(formattedData) {

    let characterKey = (`${formattedData.region}/${formattedData.realm_slug}/character/${formattedData.name}`).toLowerCase()

    return characterKey
}

function determineGender(gender) {
    if (gender) {
        return "Female"
    }
    else {
        return "Male";
    }
}

export function getRealmSlug(characterRealm, region) {
    let realmSlug;
    realms[region].map((realm, index) => {
        if (realm.name === characterRealm) {
            return realmSlug = realm.slug.replace(/\s/g, '-').toLowerCase()
        }
        else {
            return realmSlug = characterRealm.replace(/\s/g, '-').toLowerCase()
        }
    })
    return realmSlug
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
        case 26:
            return 'Pandaren'
        default:
            return 'None'
    }
}

export function determineFaction(faction) {
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
        'armory': (`https://worldofwarcraft.com/${locale}/character/${formattedData.realm_slug}/${formattedData.name}`).toLowerCase(),
        'wowprogress': (`https://www.wowprogress.com/character/${formattedData.region}/${formattedData.realm_slug}/${formattedData.name}`).toLowerCase(),
        'raiderio': (`https://raider.io/characters/${formattedData.region}/${formattedData.realm_slug}/${formattedData.name}`).toLowerCase(),
        'warcraftlogs': (`https://www.warcraftlogs.com/character/${formattedData.region}/${formattedData.realm_slug}/${formattedData.name}`).toLowerCase()

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

export function determineProgression(raid) {
    const bossKills = raid.bosses.map((boss, i) => {
        return ({
            'name': boss.name,
            'lfr': boss.lfrKills,
            'normal': boss.normalKills,
            'heroic': boss.heroicKills,
            'mythic': boss.mythicKills
        })
    });

    const lfrProgression = bossKills.filter(boss => boss.lfr >= 1).length
    const normalProgression = bossKills.filter(boss => boss.normal >= 1).length
    const heroicProgression = bossKills.filter(boss => boss.heroic >= 1).length
    const mythicProgression = bossKills.filter(boss => boss.mythic >= 1).length

    const progression = {
        bossKills: bossKills,
        bosses: raid.bosses.length,
        lfrProgression: lfrProgression,
        normalProgression: normalProgression,
        heroicProgression: heroicProgression,
        mythicProgression: mythicProgression
    }

    return progression;
}
