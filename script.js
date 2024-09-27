const publicKey = '749a30707cb8e9fdcef7e93c31353b2b'

const buttonOne = document.querySelector('#btn1')
const buttonTwo = document.querySelector('#btn2')
const buttonThree = document.querySelector('#btn3')
const buttonFour = document.querySelector('#btn4')
const userInput = document.querySelector('input')

const nameDisplay = document.querySelector('#name-display')
const nameDisplayCivilian = document.querySelector('#civilian-name-display')
const imageEl = document.querySelector('#picDisplay')

/* Character stats elements */

const intelligenceStat = document.querySelector('#intelligence-stat')
const strengthStat = document.querySelector('#strength-stat')
const speedStat = document.querySelector('#speed-stat')
const durabilityStat = document.querySelector('#durability-stat')
const powerStat = document.querySelector('#power-stat')
const combatStat = document.querySelector('#combat-stat')

const birthplaceStat = document.querySelector('#birthplace-stat')

const raceStat = document.querySelector('#race-stat')
const heightStat = document.querySelector('#height-stat')
const weightStat = document.querySelector('#weight-stat')
const genderStat = document.querySelector('#gender-stat')

const occupationStat = document.querySelector('#occupation-stat')
const homeBaseStat = document.querySelector('#home-base-stat')

const firstAppearanceStat = document.querySelector('#first-appearance-stat')
const publisherStat = document.querySelector('#publisher-stat')
const alignmentStat = document.querySelector('#alignment-stat')

const statsList = [intelligenceStat, strengthStat, speedStat, durabilityStat, powerStat, combatStat,
    birthplaceStat,
    raceStat, heightStat, weightStat, genderStat,
    occupationStat, homeBaseStat,
    firstAppearanceStat, publisherStat, alignmentStat,

]

for (element of statsList) {
    console.log(element.textContent)
}



buttonOne.addEventListener('click', async () => {

    let heroName = userInput.value
    let responseSearch = await axios.get(`https://www.superheroapi.com/api.php/${publicKey}/search/${heroName}`)

    let heroID = responseSearch.data.results[0].id
    let responseID = await axios.get(`https://www.superheroapi.com/api.php/${publicKey}/${heroID}`)

    let heroPic = responseSearch.data.results[0].image.url
    console.log(heroPic)
    console.log(`API Pull: ${responseSearch.data.results[0].name}`) 
    console.log(`User input: ${heroName}`)
    console.log(`ID: ${heroID}`)

    nameDisplay.textContent = responseSearch.data.results[0].name
    nameDisplayCivilian.textContent = responseSearch.data.results[0].biography['full-name']
    
    imageEl.setAttribute ('src', heroPic)
    imageEl.setAttribute ('alt', heroName)

    /* Finding desired stats */
    console.log('================================')

    /* Power stats */

    intelligenceStat.textContent = responseSearch.data.results[0].powerstats.intelligence
    strengthStat.textContent = responseSearch.data.results[0].powerstats.strength
    speedStat.textContent = responseSearch.data.results[0].powerstats.speed
    durabilityStat.textContent = responseSearch.data.results[0].powerstats.durability
    powerStat.textContent = responseSearch.data.results[0].powerstats.power
    combatStat.textContent = responseSearch.data.results[0].powerstats.combat

    /* Bio info */ console.log('================================')

    birthplaceStat.textContent = responseSearch.data.results[0].biography['place-of-birth']
    nameDisplayCivilian.textContent = responseSearch.data.results[0].biography['full-name']

    /* Race, height, weight */ console.log('================================')

    genderStat.textContent = responseSearch.data.results[0].appearance.gender
    raceStat.textContent = responseSearch.data.results[0].appearance.race   
    heightStat.textContent = responseSearch.data.results[0].appearance.height[0]
    weightStat.textContent = responseSearch.data.results[0].appearance.weight[0]

    /* Occupation */ console.log('================================')

    occupationStat.textContent = responseSearch.data.results[0].work.occupation
    homeBaseStat.textContent = responseSearch.data.results[0].work.base


    /* Publisher and First appearance */ console.log('================================')

    publisherStat.textContent = responseSearch.data.results[0].biography.publisher
    firstAppearanceStat.textContent = responseSearch.data.results[0].biography['first-appearance']
    alignmentStat.textContent = responseSearch.data.results[0].biography.alignment

})

/* Functions here */

async function getHeroSearch(userInput, publicKey) {
    let heroName = userInput.value
    let response = await axios.get(`https://www.superheroapi.com/api.php/${publicKey}/search/${heroName}`)
    return response
}