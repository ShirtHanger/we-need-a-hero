const theSpiderMen = {
    "response": "success",
    "results-for": "spider-man",
    "results": [
      {
        "id": "620",
        "name": "Spider-Man",
        "powerstats": {
          "intelligence": "90",
          "strength": "55",
          "speed": "67",
          "durability": "75",
          "power": "74",
          "combat": "85"
        },
        "biography": {
          "full-name": "Peter Parker",
          "alter-egos": "No alter egos found.",
          "aliases": [
            "Spiderman",
            "Bag-Man",
            "Black Marvel",
            "Captain Universe",
            "Dusk",
            "Green Hood",
            "Hornet",
            "Mad Dog 336",
            "Peter Palmer",
            "Prodigy",
            "Ricochet",
            "Scarlet Spider",
            "Spider-Boy",
            "Spider-Hulk",
            "Spider-Morphosis"
          ],
          "place-of-birth": "New York, New York",
          "first-appearance": "Amazing Fantasy #15",
          "publisher": "Marvel Comics",
          "alignment": "good"
        },
        "appearance": {
          "gender": "Male",
          "race": "Human",
          "height": [
            "5'10",
            "178 cm"
          ],
          "weight": [
            "165 lb",
            "74 kg"
          ],
          "eye-color": "Hazel",
          "hair-color": "Brown"
        },
        "work": {
          "occupation": "Freelance photographer, teacher",
          "base": "New York, New York"
        },
        "connections": {
          "group-affiliation": "Member of the Avengers, formerly member of Outlaws, alternate Fantastic Four",
          "relatives": "Richard Parker (father, deceased), Mary Parker(mother, deceased), Benjamin Parker (uncle, deceased), May Parker (aunt), Mary Jane Watson-Parker (wife), May Parker (daughter, allegedly deceased)"
        },
        "image": {
          "url": "https://www.superherodb.com/pictures2/portraits/10/100/133.jpg"
        }
      },
      {
        "id": "621",
        "name": "Spider-Man",
        "powerstats": {
          "intelligence": "null",
          "strength": "57",
          "speed": "null",
          "durability": "null",
          "power": "null",
          "combat": "null"
        },
        "biography": {
          "full-name": "Miguel O'Hara",
          "alter-egos": "No alter egos found.",
          "aliases": [
            "Spider-Man 2099",
            "Spiderman"
          ],
          "place-of-birth": "-",
          "first-appearance": "Amazing Spider-Man #365 (August, 1992)",
          "publisher": "Marvel Comics",
          "alignment": "good"
        },
        "appearance": {
          "gender": "-",
          "race": "Human",
          "height": [
            "5'10",
            "178 cm"
          ],
          "weight": [
            "170 lb",
            "77 kg"
          ],
          "eye-color": "Red",
          "hair-color": "Brown"
        },
        "work": {
          "occupation": "CEO of Alchemax Corporation, Executive Assistant",
          "base": "-"
        },
        "connections": {
          "group-affiliation": "-",
          "relatives": "-"
        },
        "image": {
          "url": "https://www.superherodb.com/pictures2/portraits/10/100/479.jpg"
        }
      },
      {
        "id": "622",
        "name": "Spider-Man",
        "powerstats": {
          "intelligence": "null",
          "strength": "58",
          "speed": "null",
          "durability": "null",
          "power": "null",
          "combat": "null"
        },
        "biography": {
          "full-name": "Miles Morales",
          "alter-egos": "No alter egos found.",
          "aliases": [
            "Spiderman"
          ],
          "place-of-birth": "-",
          "first-appearance": "Ultimate Comics Fallout #4 (October, 2011)",
          "publisher": "Marvel Comics",
          "alignment": "good"
        },
        "appearance": {
          "gender": "Male",
          "race": "Human",
          "height": [
            "5'2",
            "157 cm"
          ],
          "weight": [
            "125 lb",
            "56 kg"
          ],
          "eye-color": "Brown",
          "hair-color": "Black"
        },
        "work": {
          "occupation": "Student, adventurer, vigilante",
          "base": "-"
        },
        "connections": {
          "group-affiliation": "-",
          "relatives": "-"
        },
        "image": {
          "url": "https://www.superherodb.com/pictures2/portraits/10/100/10647.jpg"
        }
      }
    ]
  }

// console.log(spiderMen)

for (spider of theSpiderMen.results) {
    console.log(spider.biography['full-name'])
}