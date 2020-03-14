function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

export function getData(rows) {
  const output = []

  for (let i = 0; i < rows; i++) {
    output.push({
      id: generateID(),
      name: getName(getRandomInt(10)),
      completed: getCompleted(getRandomInt(100)),
      age: getAge(getRandomInt(10)),
      country: getCountry(getRandomInt(10)),
      genre: getGenre(getRandomInt(10)),
      city: getCity(getRandomInt(10))
    })
  }

  return output
}

function getCompleted(index) {
  return index
}

function getName(index) {
  switch (true) {
    case index < 2:
      return `Hugo`
    case index >= 2 && index < 4:
      return `Fer`
    case index >= 4 && index < 6:
      return `Angeles`
    case index >= 6 && index < 8:
      return `Sonia`
    case index >= 8 && index < 10:
      return `Ana`
  }
}

function generateID() {
  let id = ''

  for (let i = 1; i < 24; i++) {
    if (i % 6 === 0) {
      id += '-'
    } else {
      const ramdom = Math.random()
      if (ramdom > 0.5) {
        id += Math.random().toString(36).substring(3, 4)
      } else {
        id += (Math.random() * 10).toString().substring(3, 4)
      }
    }
  }
  return id
}

function getAge(index) {
  switch (true) {
    case index < 2:
      return 30
    case index >= 2 && index < 4:
      return 34
    case index >= 4 && index < 6:
      return 60
    case index >= 6 && index < 8:
      return 52
    case index >= 8 && index < 10:
      return 20
  }
}

function getCountry(index) {
  switch (true) {
    case index < 2:
      return `Spain`
    case index >= 2 && index < 4:
      return `France`
    case index >= 4 && index < 6:
      return `Italy`
    case index >= 6 && index < 8:
      return `Germany`
    case index >= 8 && index < 10:
      return `Portugal`
  }
}

function getGenre(index) {
  switch (true) {
    case index <= 5:
      return 'Male'
    case index > 5:
      return 'Female'
  }
}

function getCity(index) {
  switch (true) {
    case index < 2:
      return `London`
    case index >= 2 && index < 4:
      return `Madrid`
    case index >= 4 && index < 6:
      return `Barcelona`
    case index >= 6 && index < 8:
      return `Lisbon`
    case index >= 8 && index < 10:
      return `Berlin`
  }
}
