import SnekGame from './components/SnekGame'
import { startGame } from './game'
import './style.css'

const container = document.body
const game = new SnekGame(container)
game.start()

// startGame(container)
