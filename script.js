const publicKey = '749a30707cb8e9fdcef7e93c31353b2b'

const buttonOne = document.querySelector('#btn1')
const buttonTwo = document.querySelector('#btn2')
const buttonThree = document.querySelector('#btn3')
const buttonFour = document.querySelector('#btn4')
const userInput = document.querySelector('input')

const headerEl = document.querySelector('h1')
const bioEl = document.querySelector('p')
const imageEl = document.querySelector('#picDisplay')



buttonOne.addEventListener('click', async () => {

    let heroName = userInput.value
    let response = await axios.get(`https://www.superheroapi.com/api.php/${publicKey}/search/${heroName}`)

    let heroPic = response.data.results[0].image.url
    console.log(heroPic)

    console.log(response.data.results[0].name) 
    headerEl.textContent = response.data.results[0].name
    bioEl.textContent = response.data.results[0].biography['full-name']
    
    imageEl.setAttribute ('src', heroPic)
    imageEl.setAttribute ('alt', heroName)

})