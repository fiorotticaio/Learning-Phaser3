import Phaser from './lib/phaser.js';

// importing scenes
import Start from './scenes/Start.js';
import Menu from './scenes/Menu.js';
import Game from './scenes/Game.js';
import Pause from './scenes/Pause.js';
import GameOver from './scenes/GameOver.js';

new Phaser.Game({
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    scene: [Start, Menu, Game, Pause, GameOver],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1000
            },
            debug: false
        }
    }
})