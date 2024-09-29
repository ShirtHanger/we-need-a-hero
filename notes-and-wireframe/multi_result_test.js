/* Problem: Search results return the first alphabetica result*/
/* NOBODY knows who cyborg superman is! */
/* I asked ChatGPT for help on this, but ultimately did not use it's code */
/* https://chatgpt.com/share/66f708e6-6d38-8012-b08b-71d3c9e32e3b */

const supermen = {
  "response": "success",
  "results-for": "superman",
  "results": [
    {
      "id": "195",
      "name": "Cyborg Superman",
      "powerstats": {
        "intelligence": "75",
        "strength": "93",
        "speed": "92",
        "durability": "100",
        "power": "100",
        "combat": "80"
      },
      "biography": {
        "full-name": "Henry Henshaw",
        "alter-egos": "No alter egos found.",
        "aliases": [
          "Grandmaster of the Manhunters",
          "Herald of the Anti-Monitor",
          "Alpha-Prime of the Alpha Lanterns"
        ],
        "place-of-birth": "-",
        "first-appearance": "Adventures of Superman #466 (May, 1990)",
        "publisher": "DC Comics",
        "alignment": "bad"
      },
      "appearance": {
        "gender": "Male",
        "race": "Cyborg",
        "height": [
          "-",
          "0 cm"
        ],
        "weight": [
          "- lb",
          "0 kg"
        ],
        "eye-color": "Blue",
        "hair-color": "Black"
      },
      "work": {
        "occupation": "-",
        "base": "Warworld, Qward, Antimatter Universe, formerly Biot, Sector 3601"
      },
      "connections": {
        "group-affiliation": "Alpha Lantern Corps, Manhunters, Warworld, formerly Apokolips and Sinestro Corps",
        "relatives": "Terri Henshaw (wife, deceased)"
      },
      "image": {
        "url": "https://www.superherodb.com/pictures2/portraits/10/100/667.jpg"
      }
    },
    {
      "id": "644",
      "name": "Superman",
      "powerstats": {
        "intelligence": "94",
        "strength": "100",
        "speed": "100",
        "durability": "100",
        "power": "100",
        "combat": "85"
      },
      "biography": {
        "full-name": "Clark Kent",
        "alter-egos": "Superman Prime One-Million",
        "aliases": [
          "Clark Joseph Kent",
          "The Man of Steel",
          "the Man of Tomorrow",
          "the Last Son of Krypton",
          "Big Blue",
          "the Metropolis Marvel",
          "the Action Ace"
        ],
        "place-of-birth": "Krypton",
        "first-appearance": "ACTION COMICS #1",
        "publisher": "Superman Prime One-Million",
        "alignment": "good"
      },
      "appearance": {
        "gender": "Male",
        "race": "Kryptonian",
        "height": [
          "6'3",
          "191 cm"
        ],
        "weight": [
          "225 lb",
          "101 kg"
        ],
        "eye-color": "Blue",
        "hair-color": "Black"
      },
      "work": {
        "occupation": "Reporter for the Daily Planet and novelist",
        "base": "Metropolis"
      },
      "connections": {
        "group-affiliation": "Justice League of America, The Legion of Super-Heroes (pre-Crisis as Superboy); Justice Society of America (pre-Crisis Earth-2 version); All-Star Squadron (pre-Crisis Earth-2 version)",
        "relatives": "Lois Lane (wife), Jor-El (father, deceased), Lara (mother, deceased), Jonathan Kent (adoptive father), Martha Kent (adoptive mother), Seyg-El (paternal grandfather, deceased), Zor-El (uncle, deceased), Alura (aunt, deceased), Supergirl (Kara Zor-El, cousin), Superboy (Kon-El/Conner Kent, partial clone)"
      },
      "image": {
        "url": "https://www.superherodb.com/pictures2/portraits/10/100/791.jpg"
      }
    }
  ]
}


/* Figuring out how to ONLY show result of user input, not alphabetical stuff */

let userInput = 'superman'

// for (superman of supermen.results) {
//   if (superman.name.toLowerCase() === userInput.toLowerCase()) {
//     console.log(superman.name);
//     break
//   }
// }

function validateSearchResult(userInput, response) {
  /* Makes sure first result matches what user typed in if multiple heroes get pulled */
  /* ChatGPT suggested .toLowerCase() */
  console.log('==========================')
  for (result of response.results) {
      if (result.name.toLowerCase() === userInput.toLowerCase()) {
        return result.name
        break
      }
    }
}

// console.log(validateSearchResult(userInput, supermen))

/* I don't feel comfortable with chatGPT's solution though, so I have no used it. At all */

/* I decided to pass in a random number, random result for heroes with similar/same name */

let randIndex

function randNum(array) {
  randIndex = Math.floor(Math.random() * array.length) // Copied this from my Pokemon Album Prework, edited for this
  return randIndex
}

randNum(supermen.results)

randIndex = randNum(supermen.results)

console.log(randIndex)

console.log(supermen.results[randIndex].name)