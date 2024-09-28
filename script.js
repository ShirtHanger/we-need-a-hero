const publicKey = '749a30707cb8e9fdcef7e93c31353b2b'

/* Button and input elements */

const buttonOne = document.querySelector('#btn1')
const buttonTwo = document.querySelector('#btn2')
const buttonThree = document.querySelector('#btn3')
const buttonFour = document.querySelector('#btn4')
const userInput = document.querySelector('input')

/* Display elements */

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

/* Special backgrounds */

const marvelLogo = './publisher-logos/marvel-logo.png'
const dcLogo = './publisher-logos/dc-logo.png'
const shueishaLogo = './publisher-logos/shueisha-logo.png'

const redBackground = './backgrounds/red-bg.jpg'
const blueBackground = './backgrounds/blue-bg.jpg'
const mangaBackground = './backgrounds/mixed-bg.jpg'
console.log(marvelLogo, dcLogo, shueishaLogo)


buttonOne.addEventListener('click', async () => { /* Pulls image and hero stats when button is clicked, currently assigned to "Test One" */

    /* Collects search results for user input */
    let heroName = userInput.value
    let responseSearch = await axios.get(`https://www.superheroapi.com/api.php/${publicKey}/search/${heroName}`)
    /* response is an object containing an Array of objects 😵‍💫 */

    /* Because many heroes share names, a random number is passed into object notation 
    to pull a random search result if there is more than one w/ same name (Spider-men/women, Batmen/women, Supermen/women)*/

    let randIndex = randNum(responseSearch.data.results.length) // Calls function from below
    console.log('Array length', responseSearch.data.results.length)
    console.log('random number:', randIndex)

    /* Stores drill into variable for readability */
    let heroData = responseSearch.data.results[randIndex]

    /* Collects specified ID search for usability */
    let heroID = heroData.id
    let responseID = await axios.get(`https://www.superheroapi.com/api.php/${publicKey}/${heroID}`)

    let heroPic = heroData.image.url
    console.log(heroPic)
    console.log(`API Pull: ${heroData.name}`) 
    console.log(`User input: ${heroName}`)
    console.log(`ID: ${heroID}`)

    /* Showing off hero name */

    nameDisplay.textContent = heroData.name
    nameDisplayCivilian.textContent = heroData.biography['full-name']
    
    imageEl.setAttribute ('src', heroPic)
    imageEl.setAttribute ('alt', heroID) // Storing ID will be useful for "Saving previous pulls" stretch goal

    /* Finding desired stats */
    

    /* =============== Power stats =============== */

    intelligenceStat.textContent = heroData.powerstats.intelligence
    strengthStat.textContent = heroData.powerstats.strength
    speedStat.textContent = heroData.powerstats.speed
    durabilityStat.textContent = heroData.powerstats.durability
    powerStat.textContent = heroData.powerstats.power
    combatStat.textContent = heroData.powerstats.combat

    /*=============== Biography ===============*/ 

    birthplaceStat.textContent = heroData.biography['place-of-birth']
    nameDisplayCivilian.textContent = heroData.biography['full-name']

    occupationStat.textContent = heroData.work.occupation
    homeBaseStat.textContent = heroData.work.base

    /* =============== Physical Stats =============== */ 

    genderStat.textContent = heroData.appearance.gender
    raceStat.textContent = heroData.appearance.race   
    heightStat.textContent = heroData.appearance.height[0] // Imperial units
    weightStat.textContent = heroData.appearance.weight[0]


    /* =============== Meta (Publisher and First appearance) =============== */ 

    firstAppearanceStat.textContent = heroData.biography['first-appearance']
    alignmentStat.textContent = heroData.biography.alignment

    console.log(heroData.biography.publisher)

    if (heroData.biography.publisher === 'Marvel Comics') {
        publisherStat.setAttribute ('src', marvelLogo)
        publisherStat.setAttribute ('alt', heroData.biography.publisher)
        document.body.style.background = redBackground
    } else if (heroData.biography.publisher === 'DC Comics') {
        publisherStat.setAttribute ('src', dcLogo)
        publisherStat.setAttribute ('alt', heroData.biography.publisher)
        document.body.style.background = blueBackground
    } else if (heroData.biography.publisher === 'Shueisha') {
        publisherStat.setAttribute ('src', shueishaLogo)
        publisherStat.setAttribute ('alt', heroData.biography.publisher)
        document.body.style.background = mangaBackground
    }
    else {
        publisherStat.setAttribute ('src', '')
        publisherStat.setAttribute ('alt', '')
        document.body.style.background = mangaBackground
    }

    // Fixes repeating background
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundAttachment = 'fixed'
    document.body.style.backgroundSize = 'auto'
    document.body.style.backgroundPosition = 'center'
})

/* Functions here */

async function getHeroSearch(userInput, publicKey) {
    let heroName = userInput.value
    let response = await axios.get(`https://www.superheroapi.com/api.php/${publicKey}/search/${heroName}`)
    return response
}

function validateSearchResult(userInput, response) {
    /* Makes sure first result matches what user typed in if multiple heroes get pulled */
    // ChatGPT suggested .toLowerCase()
    // Very likely will NOT use this, I cannot get it to work
    for (result of response.data.results) {
        if (result.name.toLowerCase() === userInput.toLowerCase()) {
          return result.name
          break
        }
      }
}

function randNum(maxNum) {
    /* Returns a random number between 0 and the length of given array */
    /* Used for when multiple heroes are returned for search result, will use this over ChatGPT's suggestion */
    randIndex = Math.floor(Math.random() * maxNum) // Copied this from my Pokemon Album Prework, edited for this
    return randIndex
  }