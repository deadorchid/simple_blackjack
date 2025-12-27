const fs = require('node:fs')
const path = require('path')
const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/cards', (req, res) => {
  res.send(getCards())
})

app.listen(port, () => {
  console.log(`BlackJack server listening on port ${port}`)
})


function getCards() {
  let files = getFilesInDirectorySync('./assets/')
  let cards = []
  for (const file of files) {
    const title = file.split('.')[0].split('_').join(' ')
    const data = file.split('_')
    cards.push({
      'title': title,
      'cost': getCost(data[0]),
      'path': __dirname + '/assets/' + file
    })
  }
  shuffle(cards)
  return cards
}

function getFilesInDirectorySync(dirPath) {
  try {
    const files = fs.readdirSync(dirPath);
    return files;
  } catch (err) {
    console.error(`Error reading directory: ${err}`);
    throw err;
  }
}

function getCost(str) {
  if (['king', 'queen', 'jack'].includes(str)) return 10
  else if (str === 'ace') return 11
  else return Number(str)
}

function shuffle(array) {
  // Алгоритм Фишера-Йетса
  let currentIndex = array.length, randomIndex;

  // Пока есть элементы для перемешивания.
  while (currentIndex !== 0) {

    // Выбираем оставшийся элемент.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // И меняем его местами с текущим элементом.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
