let totalCost = 0
let deck = []
const btn = document.querySelector('.game__btn')
btn.addEventListener('click', () => {
  totalCost += createCard(deck)
  if (!isGame(totalCost)) {
    gameEnd(totalCost)
  }
})

const field = document.querySelector('.game__field')

async function game() {
  deck = await getDeck()

  totalCost = createCard(deck) + createCard(deck)

  if (!isGame(totalCost)) {
    gameEnd(totalCost)
    return
  }

  btn.style.display = 'inline-block'
}

const startBtn = document.querySelector('.game__start')

startBtn.addEventListener('click', () => {
  gameReset()
  game()
  startBtn.style.display = 'none'
})

/* Functions */
function getRandomNum(min = 2, max = 11) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)

  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

function getRandomCard(deck) {
  const cost = getRandomNum()
  const card = deck.find(card => card.cost === cost)
  deck.splice(deck.indexOf(card), 1)

  return card
}

function createCard(deck) {
  const card = getRandomCard(deck)
  const cardElement = document.createElement('img')
  cardElement.setAttribute('src', card.path)
  cardElement.setAttribute('alt', card.title)
  cardElement.classList.add('game__card')
  field.appendChild(cardElement)

  return card.cost
}

async function getDeck() {
  const url = "http://localhost:3000/cards"

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw Error('Http Error! Status: ' + response.status)
    }

    const data = await response.json()
    return data
  } catch {
    console.error("Error trying get the deck")
    return []
  }
}

function isGame(totalCost) {
  if (totalCost < 21) {
    return true
  }
  return false
}

function gameEnd(totalCost) {
  btn.style.display = 'none'
  startBtn.style.display = 'inline-block'
  if (totalCost === 21) {
    setTimeout(() => alert('You won'), 100)
    return
  }
  setTimeout(() => alert('You lose'), 100)
}

function gameReset() {
  while (field.firstChild) {
    field.removeChild(field.firstChild);
  }
  totalCost = 0
  deck = []
}
