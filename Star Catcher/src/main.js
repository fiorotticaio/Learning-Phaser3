var config = {
    type: Phaser.AUTO, 
    width: 800,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    /* dizendo qual funcao faz cada coisa em caso se fossem com nomes diferentes */
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var starsCollected = 0;

var game = new Phaser.Game(config);

function init() {
    this.starsCollected = 0;
}


function preload () {
    this.load.image('sky', 'src/sprites/sky.png');
    this.load.image('ground', 'src/sprites/platform.png');
    this.load.image('star', 'src/sprites/star.png');
    this.load.spritesheet('dude', 'src/sprites/dude.png', { frameWidth: 32, frameHeight: 48 });
}


var FlyingStar = new Phaser.Class({

    Extends: Phaser.Physics.Arcade.Sprite,

    initialize:

    function FlyingStar (scene, x, y, width, height, speed) {
        Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, 'star');

        //  This is the path the sprite will follow
        this.path = new Phaser.Curves.Ellipse(x, y, width, height);
        this.pathIndex = 0;
        this.pathSpeed = speed;
        this.pathVector = new Phaser.Math.Vector2();

        this.path.getPoint(0, this.pathVector);

        this.setPosition(this.pathVector.x, this.pathVector.y);
    },

    preUpdate: function (time, delta) {
        this.anims.update(time, delta);
        
        // faz seguir o caminho em elipse que foi criado em PlyingStar
        this.path.getPoint(this.pathIndex, this.pathVector); 
        this.setPosition(this.pathVector.x, this.pathVector.y);
        this.pathIndex = Phaser.Math.Wrap(this.pathIndex + this.pathSpeed, 0, 1);
    }
});


function create () {
    this.add.image(400, 300, 'sky');

    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');

    this.player = this.physics.add.sprite(100, 450, 'dude');

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.stars = this.physics.add.group({ allowGravity: false }); // pra gravidade nao influenciar na movimentacao das estrelas

    //  x, y = center of the path
    //  width, height = size of the elliptical path
    //  speed = speed the sprite moves along the path per frame
    this.stars.add(new FlyingStar(this, 500, 200, 40, 100, 0.005), true);
    this.stars.add(new FlyingStar(this, 150, 100, 100, 100, 0.005), true);
    this.stars.add(new FlyingStar(this, 600, 200, 40, 100, -0.005), true);
    this.stars.add(new FlyingStar(this, 700, 200, 40, 100, 0.01), true);

    
    /* Criando as animacoes do spritesheet */
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: - 1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(this.player, this.platforms);

    this.physics.add.overlap(this.player, this.stars, collectStar, undefined, this);

    this.input.keyboard.on('keydown-SPACE', dropStars, this);
}


function update () {
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play('left', true); // o treu eh responsavel pela "animacaozinha" dele andando

    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.anims.play('right', true);

    } else {
        this.player.setVelocityX(0);
        this.player.anims.play('turn');

    } if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-330);
    }
}


function collectStar(player, star) {
    this.stars.killAndHide(star);
    this.physics.world.disableBody(star.body);
    starsCollected++; // isso aqui nao ta funcionando
}


function dropStars() {
    if(starsCollected == 4) {
        this.stars.add(new FlyingStar(this, Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 600), 100, 100, 0.005), true);
        this.stars.add(new FlyingStar(this, Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 600), 40, 100, 0.005), true);
        this.stars.add(new FlyingStar(this, Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 600), 40, 100, -0.005), true);
        this.stars.add(new FlyingStar(this, Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 600), 40, 100, 0.01), true);
        starsCollected = 0; // reset
    }
}