import Phaser from '../lib/phaser.js'

export default class Game extends Phaser.Scene {

    constructor() {
        super('game')
    }

    
    preload() {
        // carregando imagens
        this.load.image('background', 'src/sprites/background.png')
        this.load.image('platform', 'src/sprites/ground.png')
        this.load.image('player-stand', 'src/sprites/player_stand.png')
        this.load.image('player-jump', 'src/sprites/player_jump.png')
        this.load.image('player-fall', 'src/sprites/player_fall.png')
        this.load.image('player-walk', 'src/sprites/player_walk1.png')
    }


    create() {
        // adicionando as imagens
        this.add.image(240, 320, 'background').setScrollFactor(0, 1)

        // criando o player
        this.player = this.physics.add.sprite(240, 400, 'player-stand')

        // chao vai sofrer influencia da fisica porem permanecerem estaticas
        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(240, 530, 'platform')
        let ultimoX = 240

        // criando 5 plataformas para o grupo
        for(let i = 0; i < 5; ++i){
            let x = ultimoX + 500 + Phaser.Math.Between(0, 10) // gera numeros aleatorios entre 80 e 400
            const y = 530

            const platform = this.platforms.create(x, y, 'platform')

            const body = platform.body
            body.updateFromGameObject() // atualiza a fisica do objeto se fizermos alguma alteracao (como posicao e escala)
            ultimoX = x
        }

        // Configuracao de camera 
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setFollowOffset(0, 0);
        this.cameras.main.setBounds(0, 0);
        this.cameras.main.setDeadzone(0, 0); // pra nao ter lugar onde a camera ainda assim nao mexe

        // Configuracao de colisoues
        this.physics.add.collider(this.platforms, this.player)

        // cria o controle de inputs
        this.cursors = this.input.keyboard.createCursorKeys()
    }


    update() {
        const touchingDown = this.player.body.touching.down
        if(this.cursors.up.isDown && touchingDown) {
            this.player.setVelocityY(-200)
        }
        if(this.cursors.right.isDown) {
            this.player.setVelocityX(200)
        }
        if(this.cursors.left.isDown) {
            this.player.setVelocityX(-200)
        }
        if(this.cursors.down.isDown) {
            this.player.setVelocityX(0)
            this.player.setVelocityX(0)
        }
        

        if(this.player.body.velocity.y > 0) {
            this.player.setTexture('player-jump')
        } else if(this.player.body.velocity.y < 0) {
            this.player.setTexture('player-fall')
        } else if(this.player.body.velocity.x != 0){
            this.player.setTexture('player-walk')
        } else {
            this.player.setTexture('player-stand')
        }
    }


    /* other functions */
}