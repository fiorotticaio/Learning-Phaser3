import Phaser from '../lib/phaser.js'

export default class Game extends Phaser.Scene {

    constructor() {
        super('game');
    }

    /** PRÓXIMAS ETAPAS
     *  - gerador de cones aleatório
     *  - colisão entre carro e cones
     *  - GameOver scene se bater em um cone
     *  - música de fundo
     */


    preload() {
        /* carregando as imagens */
        this.load.image('background', '../../assets/rua.jpg'); 
        this.load.image('carro', '../../assets/carro.png'); 
        this.load.image('cone', '../../assets/cone.png'); 

        /* inserindo os cursores pela entrada do teclado */
        this.cursors = this.input.keyboard.createCursorKeys()
    }


    create() {
        /* adicionando as imagens */
        this.add.image(400, 400, 'background').setScrollFactor(1, 0);
        this.add.image(500, 300, 'cone').setScale(0.3);
        
        /* adiocionando um grupo estático de cones ao jogo */
        this.cones = this.physics.add.staticGroup();
        /* gerador de cones... */
        
        // criando o carro
        this.carro = this.physics.add.sprite(500, 500, 'carro').setScale(0.1);
        // adicionando colisão do carro com o cone
        this.physics.add.collider(this.cones, this.carro);

        // camera segue o carro
        this.cameras.main.startFollow(this.carro);
        // camera não acompanha o deslocamento horizontal do carro 
        this.cameras.main.setDeadzone(this.scale.width * 1.5)


    }


    update() {
        if(this.cursors.left.isDown) {
            this.carro.setVelocityX(-200);
        } else if(this.cursors.right.isDown) {
            this.carro.setVelocityX(200);
        } else if(this.cursors.down.isDown) {
            this.carro.setVelocityY(200);
        } else if(this.cursors.up.isDown) { // tirar no futuro
            this.carro.setVelocityY(-200);
        } else {
            this.carro.setVelocityX(0);
            this.carro.setVelocityY(0);
        }
    }

}