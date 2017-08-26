export function determineRace(race) {
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
      return 'Nuetral'
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

export function determineClass(characterClass, talents) {
  const specialization = talents.filter(talent => talent.selected === true)[0];

  switch (characterClass) {
    case 1:
      return ({spec: 'Warrior', talents: specialization});
    case 2:
      return ({spec: 'Paladin', talents: specialization});
    case 3:
      return ({spec: 'Hunter', talents: specialization});
    case 4:
      return ({spec: 'Rogue', talents: specialization});
    case 5:
      return ({spec: 'Priest', talents: specialization});
    case 6:
      return ({spec: 'Death Knight', talents: specialization});
    case 7:
      return ({spec: 'Shaman', talents: specialization});
    case 8:
      return ({spec: 'Mage', talents: specialization});
    case 9:
      return ({spec: 'Warlock', talents: specialization});
    case 10:
      return ({spec: 'Monk', talents: specialization});
    case 11:
      return ({spec: 'Druid', talents: specialization});
    case 12:
      return ({spec: 'Demon Hunter', talents: specialization});
    default:
      return ({spec: 'None', talents: null});
  }
}

export function determineProgression(raid) {
  const bossKills = raid.bosses.map((boss, i) => {
    return ({'name': boss.name, 'normal': boss.normalKills, 'heroic': boss.heroicKills, 'mythic': boss.mythicKills})
  });

  const normalProgression = bossKills.filter(boss => boss.normal >= 1).length
  const heroicProgression = bossKills.filter(boss => boss.heroic >= 1).length
  const mythicProgression = bossKills.filter(boss => boss.mythic >= 1).length

  const progression = {
    bossKills: bossKills,
    bosses: raid.bosses.length,
    normalProgression: normalProgression,
    heroicProgression: heroicProgression,
    mythicProgression: mythicProgression
  }

  return progression;
}

export function averagePerformance(performances, difficulty) {
  const encounters = performances.map((performance, i) => {
    return ({"encounter": performance.encounter, "difficulty": performance.difficulty, "rank": performance.rank, "outOf": performance.outOf, "reportID": performance.reportID})
  });

  const encountersToAverage = encounters.filter(encounter => encounter.difficulty === difficulty)

  const average = 100 - (encountersToAverage.map((encounter, i) => {
    return ((encounter.rank / encounter.outOf) * 100)
  }).reduce(getSum) / encountersToAverage.length);

  return Math.floor(average);
}

function getSum(total, num) {
  return total + num;
}
