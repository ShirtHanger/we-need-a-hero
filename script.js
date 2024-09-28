const publicKey = '749a30707cb8e9fdcef7e93c31353b2b'

/* Button and input elements */

const searchButton = document.querySelector('#search-button')
const randomHeroButton = document.querySelector('#random-hero-button')
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
const lucasFilmLogo = './publisher-logos/lucasfilm-logo.png'
const imageComicsLogo = './publisher-logos/image-comics-logo.png'
const darkHorseLogo = './publisher-logos/dark-horse-comics-logo.png'
const shueishaLogo = './publisher-logos/shueisha-logo.png'
const idwLogo = './publisher-logos/idw-publishing-logo.png'
const harperCollinsLogo = './publisher-logos/harpercollins-logo.jpg'

const redBackground = './backgrounds/red-bg.jpg'
const blueBackground = './backgrounds/blue-bg.jpg'
const spaceBackground = './backgrounds/star-wars-bg.jpg'
const sewerBackground = './backgrounds/tmnt-sewer-bg.jpg'
const mangaBackground = './backgrounds/manga-bg.jpg'
const mixedBackground = './backgrounds/mixed-bg.jpg'
console.log(marvelLogo, dcLogo, shueishaLogo)


searchButton.addEventListener('click', async () => { /* Pulls image and hero stats when search button is clicked*/

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

    setHeroStats(heroData, heroPic, heroID)

    console.log(heroData.biography.publisher)

    setBackground(heroData.biography.publisher)
})

randomHeroButton.addEventListener('click', async (params) => {
    /* Will create a random ID between 1 and 731, then pull a random hero using ID search */
    randomNumber = randNum(732) // 732 because of technicality with math.floor or whatever

    let responseID = await axios.get(`https://www.superheroapi.com/api.php/${publicKey}/${randomNumber}`)

    console.log(`You got: ${responseID.data.name}`)

    console.log('Hero ID:', randomNumber)

    let heroData = responseID.data
    let heroID = heroData.id
    let heroPic = heroData.image.url

    console.log(heroData)
    console.log(heroID)
    console.log(heroPic)

    setHeroStats(heroData, heroPic, heroID)

    console.log(heroData.biography.publisher)

    setBackground(heroData.biography.publisher)


})

/* Hello there */















/* ======================== */

/* Functions here */

function randNum(maxNum) {
    /* Returns a random number between 0 and the length of given array */
    /* Used for when multiple heroes are returned for search result, will use this over ChatGPT's suggestion */
    randIndex = Math.floor(Math.random() * maxNum) // Copied this from my Pokemon Album Prework, edited for this
    return randIndex
  }

function setHeroStats(responseDrill, heroPic, heroID) {
    /* Sets all text content in accordance to API pull */
    nameDisplay.textContent = responseDrill.name
    nameDisplayCivilian.textContent = responseDrill.biography['full-name']
    
    imageEl.setAttribute ('src', heroPic)
    imageEl.setAttribute ('alt', heroID) // Storing ID will be useful for "Saving previous pulls" stretch goal

    /* Finding desired stats */
    

    /* =============== Power stats =============== */

    intelligenceStat.textContent = responseDrill.powerstats.intelligence
    strengthStat.textContent = responseDrill.powerstats.strength
    speedStat.textContent = responseDrill.powerstats.speed
    durabilityStat.textContent = responseDrill.powerstats.durability
    powerStat.textContent = responseDrill.powerstats.power
    combatStat.textContent = responseDrill.powerstats.combat

    /*=============== Biography ===============*/ 

    birthplaceStat.textContent = responseDrill.biography['place-of-birth']
    nameDisplayCivilian.textContent = responseDrill.biography['full-name']

    occupationStat.textContent = responseDrill.work.occupation
    homeBaseStat.textContent = responseDrill.work.base

    /* =============== Physical Stats =============== */ 

    genderStat.textContent = responseDrill.appearance.gender
    raceStat.textContent = responseDrill.appearance.race   
    heightStat.textContent = responseDrill.appearance.height[0] // Imperial units
    weightStat.textContent = responseDrill.appearance.weight[0]


    /* =============== Meta (Publisher and First appearance) =============== */ 

    firstAppearanceStat.textContent = responseDrill.biography['first-appearance']
    alignmentStat.textContent = responseDrill.biography.alignment
}

function setBackground(heroPublisher) {

    /* Sets background of page and Logo depending on publisher */

    if (heroPublisher === 'Marvel Comics') {
        publisherStat.setAttribute ('src', marvelLogo)
        publisherStat.setAttribute ('alt', heroPublisher)
        document.body.style.background = `url(${redBackground})`

    } else if (heroPublisher === 'DC Comics') {
        publisherStat.setAttribute ('src', dcLogo)
        publisherStat.setAttribute ('alt', heroPublisher)
        document.body.style.background = `url(${blueBackground})`

    } else if (heroPublisher === 'Shueisha') {
        publisherStat.setAttribute ('src', shueishaLogo)
        publisherStat.setAttribute ('alt', heroPublisher)
        document.body.style.background = `url(${mangaBackground})`

    } else if (heroPublisher === 'George Lucas') {
        publisherStat.setAttribute ('src', lucasFilmLogo)
        publisherStat.setAttribute ('alt', heroPublisher)
        document.body.style.background = `url(${spaceBackground})`

    } else if (heroPublisher === 'Image Comics') {
        publisherStat.setAttribute ('src', imageComicsLogo)
        publisherStat.setAttribute ('alt', heroPublisher)
        document.body.style.background = `url(${mixedBackground})`

    } else if (heroPublisher === 'Dark Horse Comics') {
        publisherStat.setAttribute ('src', darkHorseLogo)
        publisherStat.setAttribute ('alt', heroPublisher)
        document.body.style.background = `url(${mixedBackground})`

    } else if (heroPublisher === 'IDW Publishing') {
        publisherStat.setAttribute ('src', idwLogo)
        publisherStat.setAttribute ('alt', heroPublisher)
        document.body.style.background = `url(${sewerBackground})`
        
    } else if (heroPublisher === 'HarperCollins') {
        publisherStat.setAttribute ('src', harperCollinsLogo)
        publisherStat.setAttribute ('alt', heroPublisher)
        document.body.style.background = `url(${mixedBackground})`

    } else {
        publisherStat.setAttribute ('src', '')
        publisherStat.setAttribute ('alt', '')
        document.body.style.background = `url(${mixedBackground})`
    }

    // Fixes repeating background
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundAttachment = 'fixed'
    document.body.style.backgroundSize = 'auto'
    document.body.style.backgroundPosition = 'center'
}