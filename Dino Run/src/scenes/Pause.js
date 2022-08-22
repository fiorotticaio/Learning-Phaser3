import Phaser from '../lib/phaser.js'

export default class Pause extends Phaser.Scene {

    constructor() {
        super('pause');
    }

    init(){};

    preload() {

        //creating keys object
        this.keys = this.input.keyboard.createCursorKeys();

        //loading images
        this.load.image('background', './src/sprites/images/background2.png');
        this.load.image('home', './src/sprites/images/home.png');
        this.load.image('restart','./src/sprites/images/restart.png');
    }

    create() {

        //adding background
        this.add.image(500, 250, 'background');

        //creating play/pause button and his actions
        const playPauseButton2 = this.add.image(500,250, 'button').setScale(0.1).setInteractive();

        playPauseButton2.on('pointerover', () => {playPauseButton2.setScale(0.12)});
        playPauseButton2.on('pointerout', () => {playPauseButton2.setScale(0.1)});
        playPauseButton2.on('pointerdown', () => {
            this.scene.resume('game');
            this.scene.stop();
        })

        //creating buttons objects
        const home = this.add.image(900,410,'home').setScale(0.15).setInteractive();
        const restart = this.add.image(100,410,'restart').setScale(0.15).setInteractive();

        //home button actions
        home.on('pointerover', () => {home.setScale(0.22)});
        home.on('pointerout', () => {home.setScale(0.15)});
        home.on('pointerdown', () => {
            this.scene.stop('game');
            this.scene.stop('pause');
            this.scene.start('start');
        });

        //restart button actions
        restart.on('pointerover', () => {restart.setScale(0.22);})
        restart.on('pointerout', () => {restart.setScale(0.15);})
        restart.on('pointerdown', () => {
            this.scene.stop('game');
            this.scene.stop('pause');
            this.scene.start('game');
        })
    }

    update(){

        //SHIFT key unpause the game
        const kShift = this.keys.shift.isDown;

        if(kShift){

            this.scene.resume('game');
            this.scene.stop();
        }
    }
}
