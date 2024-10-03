/* ======================== */

/* GLOBAL VARIABLES */

/* ======================== */

const publicKey = '749a30707cb8e9fdcef7e93c31353b2b' // Allows API calls

/* Button and input elements */

const searchButton = document.querySelector('#search-button')
const randomHeroButton = document.querySelector('#random-hero-button')
const toggleStatsButton = document.querySelector('#toggle-stats-button')
const saveHeroButton = document.querySelector('#save-hero-button')
const printHeroButton = document.querySelector('#print-hero-button')

const userInput = document.querySelector('input')

/* Display elements */

const dataContainer = document.querySelector('.data-container')
const nameDisplayHero = document.querySelector('#hero-name-display')
const nameDisplayCivilian = document.querySelector('#civilian-name-display')

// The full hero card  

const heroCardFull = document.querySelector('.hero-card-full')
const cardTop = document.querySelector('.card-top')
const cardImageElement = document.querySelector('#card-picture')
const cardBottom = document.querySelector('.card-bottom')

const toggleNotice = document.querySelector('#toggle-notice')

/* Previous hero display elements */

const previousHeroList = document.querySelector('.previous-hero-list')
const previousHeroContainer = document.querySelector('.previous-hero-container')
const previousHeroHeader = document.querySelector('h5')

/* Character stats elements */

const heroStatHeader = document.querySelector('.hero-stat-header')
const heroStatItems = document.querySelector('#hero-stat-items')

const firstAppearanceElement = document.querySelector('#first-appearance')
const publisherLogo = document.querySelector('#publisher-logo')
const heroAlignment = document.querySelector('#hero-alignment')

toggleStatsElements = [toggleStatsButton, heroCardFull] /* Used for toggle stats event */

hiddenButtonElements = [toggleStatsButton, saveHeroButton, /* printHeroButton, */ publisherLogo, toggleNotice]
// Hiding print button because it doesn't currently print a proper image

/* Company logos */

const marvelLogo = './publisher-logos/Marvel-Logo.svg' // Use of svg rather than png logos prevents logo from taking up entire screen
const dcLogo = './publisher-logos/dc-logo.svg'
const lucasFilmLogo = './publisher-logos/lucasfilm-logo.svg'
const imageComicsLogo = './publisher-logos/image-comics-logo.svg'
const darkHorseLogo = './publisher-logos/dark-horse-comics-logo.svg'
const shueishaLogo = './publisher-logos/Shueisha-Logo.svg'
const idwLogo = './publisher-logos/idw-publishing-logo.svg'
const harperCollinsLogo = './publisher-logos/harpercollins-logo.jpg'
const microsoftLogo = './publisher-logos/microsoft-logo-2.svg'

const abcStudiosLogo = './publisher-logos/abc-studios-logo.svg'
const hannaBarberaLogo = './publisher-logos/hanna-barbera-logo.svg' // PNG available
const nbcLogo = './publisher-logos/nbc-logo.svg'
const rebellionLogo = './publisher-logos/rebellion-logo.svg'
const sonyPicturesLogo = './publisher-logos/sony-pictures-logo.svg'
const southParkLogo = './publisher-logos/south-park-logo.svg'
const starTrekLogo = './publisher-logos/star-trek-logo.svg'
const syfyLogo = './publisher-logos/syfy-logo.svg'
const tolkeinLogo = './publisher-logos/tolkien-logo.svg'
const universalStudiosLogo = './publisher-logos/universal-studios-logo.svg'
const iconComicsLogo = './publisher-logos/icon-comics-logo.png'
const jkRowlingLogo = './publisher-logos/jk-rowling-logo.png'
const wildstormLogo = './publisher-logos/wildstorm-logo.png'
const titanBooksLogo = './publisher-logos/titan-books-logo.jpg'

/* Special backgrounds */

const redBackground = './backgrounds/red-bg.jpg'
const blueBackground = './backgrounds/blue-bg.jpg'
const spaceBackground = './backgrounds/star-wars-bg.jpg'
const sewerBackground = './backgrounds/tmnt-sewer-bg-2.jpg'
const mangaBackground = './backgrounds/manga-bg.jpg'
const haloBackground = './backgrounds/halo-bg.png'
const imageComicsBackground = './backgrounds/orange-bg-2.png'
const darkHorseBackground = './backgrounds/orange-bg-2.png' 

const abcBackground = './backgrounds/abc-studios-bg.jpg'
const hannaBarberaBackground = './backgrounds/cosmic-bg.jpg'
const jkRowlingBackground = './backgrounds/jk-rowling-bg.jpg'
const nbcBackground = './backgrounds/nbc-bg.jpg'
const rebellionBackground = './backgrounds/rebellion-bg.jpg'
const southParkBackground = './backgrounds/south-park-bg.jpg'
const starTrekBackground = './backgrounds/star-trek-bg.jpg'
const tolkeinBackground = './backgrounds/tolkien-bg.jpg'
const universalStudiosBackground = './backgrounds/universal-studios-bg.jpg'
const sonyPicturesBackground = './backgrounds/sony-pictures-bg.png'
const titanBooksBackground = './backgrounds/titan-books-bg.jpg'

/* The default background */
const defaultBackground = './backgrounds/default-bg.jpg'


/* ======================== */

/* EVENT LISTENERS */

/* ======================== */


searchButton.addEventListener('click', async () => { 
    
    /* Pulls image and hero stats when search button is clicked */
    let heroName = userInput.value // Collects search results for user input

    hyphenJoke(heroName) // See bottom of file

    let responseSearch = await axios.get(`https://www.superheroapi.com/api.php/${publicKey}/search/${heroName}`)

    /* response is an object containing an Array of objects 😵‍💫 (See multi_result_test.js) */

    /* Because many heroes share names, a random number is passed into object notation 
    to pull a random search result if there is more than one w/ same name (Spider-men/women, Batmen/women, Supermen/women)*/

    /* Also allows results on incomplete searches. "Spider" or "Bat" or "Super" pulls up so many heroes! */

    let randIndex = randNum(responseSearch.data.results.length) // Calls function from below

    /* randIndex is declared ONCE, so the number is the same throughout, meaning same result */

    /* Stores drill into variable for readability */
    let heroData = responseSearch.data.results[randIndex]

    /* Collects specified ID search for usability */

    let heroID = heroData.id
    let responseID = await axios.get(`https://www.superheroapi.com/api.php/${publicKey}/${heroID}`)



    let heroPic = heroData.image.url
    /* Confirmation of data */
    console.log(heroPic)
    console.log(`API Pull: ${heroData.name}`) 
    console.log(`User input: ${heroName}`)
    console.log(`ID: ${heroID}`)
    console.log('Array length', responseSearch.data.results.length)
    console.log('random number:', randIndex)

    /* Sets stats and data */

    setHeroStats(heroData, heroPic, heroID)

    console.log(heroData.biography.publisher)

    /* Sets card aesthetic */
    setAesthetic(heroData.biography.publisher, heroData.biography.alignment)

    /* Reveals new buttons if this is the user's first pull */
    revealButtons(cardImageElement)
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

    /* Confirmation of data */
    console.log(heroData)
    console.log('random number', randomNumber)
    console.log('Hero ID', heroID)
    console.log(heroPic)

    /* Sets stats and data */

    setHeroStats(heroData, heroPic, heroID)

    console.log(heroData.biography.publisher)

    /* Sets card aesthetic */

    setAesthetic(heroData.biography.publisher, heroData.biography.alignment)

    /* Reveals new buttons if this is the user's first pull */

    revealButtons(cardImageElement)


})


for (toggleStatsElement of toggleStatsElements) {
    
    toggleStatsElement.addEventListener('click', async () => {

        /* Pulls hero ID from alt to make things easier */
        let heroID = cardImageElement.alt
        console.log (heroID)

        /* Collects API response again */

        let responseID = await axios.get(`https://www.superheroapi.com/api.php/${publicKey}/${heroID}`)

        console.log(`Swapping stats of: ${responseID.data.name}`)

        let heroData = responseID.data
        console.log(heroData)

        /* Calls toggle stat function */

        toggleDisplayedStats(heroData, heroStatHeader)

    })
}

saveHeroButton.addEventListener('click', async () => {
    /* Adds static image of currently displayed hero to the bottom of page */
    if (cardImageElement.alt !== '') {  /* If there is already a hero... */

        previousHeroHeader.style.visibility = `visible`
        let previousHero = document.createElement('li')
        console.log(previousHero)

        previousHero.innerHTML = 
        `<h1>${nameDisplayHero.textContent}</h1>
        <img src='${cardImageElement.src}' alt='${cardImageElement.alt}' class="superhero-image" id='previous-hero'>`

        console.log(previousHero.innerHTML)
        previousHeroList.prepend(previousHero) // I asked ChatGPT about Prepend, asked it for "Opposite of appendChild"
                                               // https://chatgpt.com/share/66faf8f9-aaa8-8012-9c3f-e972c4c0ebf8
        console.log(previousHeroList)
        setBoxShadow(previousHeroList) // Sets box-shadow via DOM instead of style, prevents ugly shadow in starting page
    }
    else {
        alert("Error: You don't have a hero here!")
    }
})

/* This button should not be visible at all */
printHeroButton.addEventListener('click', async () => {
    /* SHOULD print a cut-out slip of paper with the hero card.
    Currently broken, splits at bottom. See bottom of style.css */
    if (cardImageElement.alt !== '') {
        print(heroCardFull)
    } else {
        alert("Error: You don't have a hero here!")
    }

})





/* ======================== */

/* Functions */

/* ======================== */

function setHeroStats(responseDrill, heroPic, heroID) {

    /* Sets all text content in accordance to API pull */

    /* Top of the card gets their civilian name, left side gets their superhero name */
    nameDisplayHero.textContent = responseDrill.name
    if (nameDisplayCivilian.textContent !== '') {
        nameDisplayCivilian.textContent = responseDrill.biography['full-name']
    } else { // ... unless the API doesn't have a civilian name
        nameDisplayCivilian.textContent = responseDrill.name
    }
    
    cardImageElement.setAttribute ('src', heroPic)
    cardImageElement.setAttribute ('alt', heroID) // Storing ID used for "Toggle stats" button function
    

    /* Sets Power rating stats. Other stats (Biography, physical, etc.) will be toggled via toggleDisplayedStats function */

    heroStatHeader.innerHTML = `BATTLE STATS`

    heroStatItems.innerHTML = 
    `<strong>Intelligence</strong> - ${responseDrill.powerstats.intelligence}</p>
     <p><strong>Strength</strong> - ${responseDrill.powerstats.strength}</p>
     <p><strong>Speed</strong> - ${responseDrill.powerstats.speed}</p>
     <p><strong>Durability</strong> - ${responseDrill.powerstats.durability}</p>
     <p><strong>Super power score</strong> - ${responseDrill.powerstats.power}</p>
     <p><strong>Combat Skills</strong> - ${responseDrill.powerstats.combat}`

    /* =============== Meta stuff, hero's alignment and first appearance =============== */

    firstAppearanceElement.textContent = responseDrill.biography['first-appearance']
    heroAlignment.textContent = responseDrill.biography.alignment
}

function randNum(maxNum) {
    /* Returns a random number between 0 and the length of given array */
    /* Used for when multiple heroes are returned for search result*/

    randIndex = Math.floor(Math.random() * maxNum) // Copied this from my Pokemon Album Prework, edited for this
    return randIndex
  }

function setAesthetic(heroPublisher, heroAlignment) {

    /* Sets background of page/card and Logo depending on publisher and hero alignment */

    setCardColor(heroAlignment) // Card color based on if hero, villain, neutral, or other

    /* Sets value of image borders so it doesn't clutter screen before user pulls a card */

    publisherLogo.style.visibility = 'visible'

    setBoxShadow(heroStatHeader)
    setBoxShadow(publisherLogo)

    cardImageElement.style.border = '10px ridge green'
    heroCardFull.style.border = '10px ridge red'
    setBoxShadow(heroCardFull)
    cardTop.style.border = '20px ridge gray'
    heroStatHeader.style.border = '15px ridge darkorange'
    cardBottom.style.border = '10px ridge silver'

    /* Long if else block. Calls setBackground function to create relavent background for heroes based on publisher */
    if (heroPublisher === 'Marvel Comics') {

        setBackground(marvelLogo, heroPublisher, redBackground)

    } else if (heroPublisher === 'DC Comics') {
        setBackground(dcLogo, heroPublisher, blueBackground)

    } else if (heroPublisher === 'Shueisha') {
        setBackground(shueishaLogo, heroPublisher, mangaBackground)

    } else if (heroPublisher === 'George Lucas') {
        setBackground(lucasFilmLogo, heroPublisher, spaceBackground)

    } else if (heroPublisher === 'Image Comics') {
        setBackground(imageComicsLogo, heroPublisher, imageComicsBackground)

    } else if (heroPublisher === 'Dark Horse Comics') {
        setBackground(darkHorseLogo, heroPublisher, darkHorseBackground)

    } else if (heroPublisher === 'IDW Publishing') {
        setBackground(idwLogo, heroPublisher, sewerBackground)
        
    } else if (heroPublisher === 'HarperCollins') {
        setBackground(harperCollinsLogo, heroPublisher, defaultBackground)

    } else if (heroPublisher === 'Microsoft') {
        setBackground(microsoftLogo, heroPublisher, haloBackground)

    } else if (heroPublisher === 'Icon Comics') {
        setBackground(iconComicsLogo, heroPublisher, redBackground)

    } else if (heroPublisher === 'SyFy') {
        setBackground(syfyLogo, heroPublisher, defaultBackground)

    } else if (heroPublisher === 'Wildstorm') {
        setBackground(wildstormLogo, heroPublisher, blueBackground)

    } else if (heroPublisher === 'Titan Books') {
        setBackground(titanBooksLogo, heroPublisher, titanBooksBackground)

    } else if (heroPublisher === 'J. R. R. Tolkien') {
        setBackground(tolkeinLogo, heroPublisher, tolkeinBackground)

    } else if (heroPublisher === 'Hanna-Barbera') {
        setBackground(hannaBarberaLogo, heroPublisher, hannaBarberaBackground)

    } else if (heroPublisher === 'J. K. Rowling') {
        setBackground(jkRowlingLogo, heroPublisher, jkRowlingBackground)

    } else if (heroPublisher === 'Star Trek') {
        setBackground(starTrekLogo, heroPublisher, starTrekBackground)

    } else if (heroPublisher === 'Rebellion') {
        setBackground(rebellionLogo, heroPublisher, rebellionBackground)

    } else if (heroPublisher === 'South Park') {
        setBackground(southParkLogo, heroPublisher, southParkBackground)

    } else if (heroPublisher === 'NBC - Heroes') {
        setBackground(nbcLogo, heroPublisher, nbcBackground)

    } else if (heroPublisher === 'Sony Pictures') {
        setBackground(sonyPicturesLogo, heroPublisher, sonyPicturesBackground)

    } else if (heroPublisher === 'Universal Studios') {
        setBackground(universalStudiosLogo, heroPublisher, universalStudiosBackground)

    } else if (heroPublisher === 'ABC Studios') {
        setBackground(abcStudiosLogo, heroPublisher, abcBackground)

    } else {
        setBackground('', '', defaultBackground)
        publisherLogo.style.visibility = 'hidden'
    }

    // resetting these properties at end fixes repeating background issue
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundAttachment = 'fixed'
    document.body.style.backgroundSize = 'auto'
    document.body.style.backgroundPosition = 'center'
}

function toggleDisplayedStats(responseDrill, heroStatHeader) {

    /* Swaps which stats are displayed when "Toggle stats" button or the bottom of card is clicked */


    if (heroStatHeader.innerHTML === `BATTLE STATS`) {

        // Set to physicals

        heroStatHeader.innerHTML = `PHYSICAL CHARACTERISTICS`
        
        heroStatItems.innerHTML = 
        `<strong>HEIGHT</strong> - ${responseDrill.appearance.height[0]}</p>
        <p><strong>WEIGHT</strong> - ${responseDrill.appearance.weight[0]}</p>
        <p><strong>RACE</strong> - ${responseDrill.appearance.race}</p>
        <p><strong>GENDER</strong> - ${responseDrill.appearance.gender}`

    } else if (heroStatHeader.innerHTML === `PHYSICAL CHARACTERISTICS`) {

        //Set to biography

        heroStatHeader.innerHTML = `BIOGRAPHY`
        
        heroStatItems.innerHTML = `<strong>Civilian Name</strong> - ${responseDrill.biography['full-name']}</p>
        <p><strong>Place of Birth</strong> - ${responseDrill.biography['place-of-birth']}</p>
        <p><strong>Lives in</strong> - ${responseDrill.work.base}</p>
        <p><strong>Occupation</strong> - ${responseDrill.work.occupation}`

    } else if (heroStatHeader.innerHTML === `BIOGRAPHY`) {

        // Set to battle stats
        
        heroStatHeader.innerHTML = `BATTLE STATS`

        heroStatItems.innerHTML = `<strong>Intelligence</strong> - ${responseDrill.powerstats.intelligence}</p>
        <p><strong>Strength</strong> - ${responseDrill.powerstats.strength}</p>
        <p><strong>Speed</strong> - ${responseDrill.powerstats.speed}</p>
        <p><strong>Durability</strong> - ${responseDrill.powerstats.durability}</p>
        <p><strong>Super power score</strong> - ${responseDrill.powerstats.power}</p>
        <p><strong>Combat Skills</strong> - ${responseDrill.powerstats.combat}`

    } else {

        alert(`Error: You don't have any heroes yet!`)
    }
}

function setBackground(companyLogo, heroPublisher, companyBackground) {
    /* Repeatable lines of code, sets background and logo associated with hero pulled */
        publisherLogo.setAttribute ('src', companyLogo)
        publisherLogo.setAttribute ('alt', heroPublisher)
        document.body.style.background = `url(${companyBackground})`
}

function setCardColor(heroAlignment) {

    /* Sets color of card based on if character is a hero, villain, neutral, or other */
    
    if (heroAlignment === 'good') {
        setCardColorCode('darkslateblue', 'navy', 'firebrick')
    } else if (heroAlignment === 'bad') {
        setCardColorCode('darkslategrey', 'firebrick', 'maroon')
    } else if (heroAlignment === 'neutral') {
        setCardColorCode('darkmagenta', 'darkcyan', 'darkslategrey')
    } else {
        setCardColorCode('orange', 'purple', 'brown')
    }

    function setCardColorCode(cardFullColor, cardTopColor, cardBottomColor) {
        /* Only used here. Sets color of card, repeatable line of code */
        heroCardFull.style.background = cardFullColor
        cardTop.style.background = cardTopColor
        cardBottom.style.background = cardBottomColor
    }
}

function revealButtons(heroImage) {
    if (heroImage.alt !== '') {
        for (hiddenButton of hiddenButtonElements) {
            console.log(hiddenButton)
            hiddenButton.style.visibility = `visible`
        }
    }
}

function setBoxShadow(element) {
    /* Sets box shadow via DOM instead of style.css to prevent ugly shadows on start page */
    element.style.boxShadow = '10px 10px 10px 10px black'
}

function hyphenJoke(input) { 
    /* If the user (Foolishly) forgets to hyphenate Spider-Man's name, tell them as such */
    /* AND if they (Foolishly) hyphenate Batman's name... */
    const spiderNames = [
        'spiderman', 'spider man',
        'spiderwoman', 'spider woman',
        'spidergwen', 'spider gwen',
        'spidergirl', 'spider girl',
        'spidercarnage', 'spider carnage',        
    ]
    for (spiderName of spiderNames) {
        if (input.toLowerCase() === spiderName) {
            alert('🕸️You forgot the hyphen🕸️')
            break
        }
    }
    const batHyphens = ['bat-man', 'bat-girl', 'bat-woman']
    for (batName of batHyphens) {
        if (input.toLowerCase() === batName) {
            alert('🦇Why the hyphen?🦇')
            break
        }
    }
}