/* Code meant to be re-pasted if something goes wrong */

buttonOne.addEventListener('click', async () => {

    let heroName = userInput.value
    let response = await axios.get(`https://www.superheroapi.com/api.php/${publicKey}/search/${heroName}`)
    let heroID = response.data.results[0].id
    let responseID = await axios.get(`https://www.superheroapi.com/api.php/${publicKey}/${heroID}`)

    let heroPic = response.data.results[0].image.url
    console.log(heroPic)
    console.log(`API Pull: ${response.data.results[0].name}`) 
    console.log(`User input: ${heroName}`)
    console.log(`ID: ${heroID}`)

    headerEl.textContent = response.data.results[0].name
    bioEl.textContent = response.data.results[0].biography['full-name']
    
    imageEl.setAttribute ('src', heroPic)
    imageEl.setAttribute ('alt', heroName)

})

/* Functions here */

function getHero(params) {
    
}