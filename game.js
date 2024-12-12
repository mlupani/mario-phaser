import { createAnimations } from "./animations.js";
import { initAudios, playAudio } from "./audio.js";
import { checkControls } from "./controls.js";
import { initSpritesheets } from "./spritesheets.js";

/* global phaser*/
const config = {
    autoFocus: false,
    type: Phaser.AUTO,
    width: 256,
    height: 244,
    backgroundColor: '#049cd8',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    zoom: 2,
    scene: {
        preload: preload, // funcion para precargar los recursos
        create: create, // se ejecuta cuando el juego comienza
        update: update // se ejecuta en cada frame
    }
}


new Phaser.Game(config)
// this -> game -> juego que estamos construyendo

function preload() {
    // image(x, y, 'nombre-del-asset)
    this.load.image('cloud1', 'assets/scenery/overworld/cloud1.png')
    this.load.image('floorbricks', 'assets/scenery/overworld/floorbricks.png');
    initSpritesheets(this);
    initAudios(this);
}

function create() { 
    playAudio(this, 'mario-theme', { loop: true, volume: 0.1, delay: 0 });
    createAnimations(this);

    this.add.image(50, 50, 'cloud1')
    .setOrigin(0, 0) // indica el origen de renderizado de la imagen, por defecto el origen es en el centro (0.5, 0.5)
    .setScale(0.15);

    // mario without pysics
    // this.mario = this.add.sprite(50, 205, 'mario')

    // mario with pysics
    this.mario = this.physics.add.sprite(50, 205, 'mario')
    .setCollideWorldBounds(true) // para que no se salga del mundo
    .setGravityY(250)
    .setOrigin(0, 1)

    this.enemy = this.physics.add.sprite(120, config.height - 32, 'goomba')
    .setGravityY(300)
    .setOrigin(0, 1)
    .setVelocityX(-40)
    .anims.play('goomba-walk', true);


    // floor without pysics
    // this.add.tileSprite(0, config.height, config.width, 32, 'floorbricks')
    // .setOrigin(0, 1)
    this.floor = this.physics.add.staticGroup();
    for(let i = 0; i < 300; i += 125) {
        this.floor.create(i, config.height, 'floorbricks')
        .setOrigin(0, 1)
        .refreshBody();
    }

    this.floor.create(410, config.height, 'floorbricks')
        .setOrigin(0, 1)
        .refreshBody();

    this.collectibles = this.physics.add.staticGroup();
    this.collectibles_moves = this.physics.add.group();
    this.boxesWithCoins = this.physics.add.staticGroup();
    this.boxesWithMushrooms = this.physics.add.staticGroup();
    this.boxesEmpty = this.physics.add.staticGroup();
    this.blocks = this.physics.add.staticGroup();
    this.collectibles.create(50, config.height - 80, 'coin').anims.play('coin-spin', true);
    this.collectibles.create(150, config.height - 100, 'coin').anims.play('coin-spin', true);
    this.boxesWithCoins.create(200, config.height - 80, 'mistery-box').anims.play('mistery-box-change', true);
    this.boxesWithMushrooms.create(217, config.height - 80, 'mistery-box').anims.play('mistery-box-change', true);
    this.blocks.create(250, config.height - 80, 'block', true);
    // this.collectibles_moves.create(200, config.height - 40, 'super-mushroom');

    // add attribute active to all boxes
    this.boxesWithCoins.getChildren().forEach(child => {
        child.isActive = true;
    })

    this.boxesWithMushrooms.getChildren().forEach(child => {
        child.isActive = true;
    })

    this.blocks.getChildren().forEach(child => {
        child.body.allowGravity = false;
    });


    // this.boxesWithCoins.getChildren().forEach(child => {
    //     child.body.allowGravity = false;
    //     child.body.setVelocityX(-80);
    // })


    this.physics.add.overlap(this.mario, this.collectibles, collectItem, null, this);
    this.physics.add.overlap(this.mario, this.collectibles_moves, collectItem, null, this);
    // rio and floor collision
    this.physics.add.collider(this.mario, this.floor);
    this.physics.add.collider(this.mario, this.boxesEmpty);
    this.physics.add.collider(this.enemy, this.floor);
    this.physics.add.collider(this.collectibles_moves, this.floor);
    this.physics.add.collider(this.mario, this.enemy, onHitEnemy, null, this);
    this.physics.add.collider(this.mario, this.blocks, onHitBlock, null, this);

    //collide with boxes
    this.physics.add.collider(this.mario, this.boxesWithCoins, onHitBoxWithCoins, null, this);
    this.physics.add.collider(this.mario, this.boxesWithMushrooms, onHitBoxWithMushroom, null, this);

    // limites del mundo
    this.physics.world.setBounds(0, 0, 2000, config.height);
    // camaras
    this.cameras.main.setBounds(0, 0, 2000, config.height);
    this.cameras.main.startFollow(this.mario);

    // para que escuche el teclado
    this.keys = this.input.keyboard.createCursorKeys();
}

function onHitEnemy (mario, enemy) {
    if(mario.body.touching.down && enemy.body.touching.up) {
        playAudio(this, 'goomba-stomp');
        enemy.anims.play('goomba-death', true);
        enemy.setVelocityX(0);
        mario.setVelocityY(-200);
        addToScore(200, enemy, this);
        setTimeout(() => {
            enemy.destroy();
        }, 300);
    } else {
        marioDeath(this);
        enemy.setVelocityX(0);
        enemy.anims.stop();
    }
}

function onHitBoxWithMushroom(mario, box) {
    if(!mario.body.touching.down && box.body.touching.down) {
        box.anims.stop();
        // this.collectibles_moves.create(box.x, box.y - 20, 'super-mushroom');
        // this.collectibles_moves.getChildren().forEach(child => {
        //     this.physics.add.collider(child, this.floor);
        //     child.body.allowGravity = true;
        //     child.body.setVelocityX(-80);
        // })
        this.collectibles_moves.create(box.x, box.y - 20, 'super-mushroom')
        .setVelocityX(-80)
        .allowGravity = false;
        box.destroy();
        this.boxesEmpty.create(box.x, box.y, 'empty-block');
    }
}

function onHitBlock(mario, block) {
    if(!mario.body.touching.down && block.body.touching.down) {
        if(mario.isGrown){
            block.destroy();
            const newBlock = this.collectibles_moves.create(block.x, block.y, 'block-hit')
            newBlock.body.allowGravity = true;
            newBlock.setVelocityY(-300);
            newBlock.body.checkCollision.none = true;
        } else {
            // move static block up and down
            block.y -= 1;
            setTimeout(() => {
                block.y += 1;
            }, 200);
            block.refreshBody();
        }
    }
}

function onHitBoxWithCoins(mario, box) {
    if(box.body.touching.up) return;
    if(!mario.body.touching.down && box.body.touching.down) {
        box.anims.stop();
        let item;
        item = this.collectibles_moves.create(box.x, box.y - 20, 'coin').anims.play('coin-spin', true);
        item.setVelocityY(-70);

        box.destroy();
        this.boxesEmpty.create(box.x, box.y, 'empty-block');
        setTimeout(() => {
            item.destroy();
            playAudio(this, 'coin', { volume: 0.1 });
            addToScore(100, item, this);
        }, 300);
    }
}

function update() { // 3 continuamente
    if(this.mario.dead) return;

    checkControls(this);

    const { mario, collectibles } = this;

    // move mushroom
    // collectibles.getChildren().forEach(child => {
    //     if(child.texture.key === "super-mushroom"){
    //         child.x -= 1;
    //     }
    // })

    // muerte
    if(mario.y >= config.height - 10) {
        marioDeath(this);
    }

    // if (this.keys.up.isDown) {
    //     this.mario.y -= 1;
    // }
    // if (this.keys.down.isDown) {
    //     this.mario.y += 1;
    // }
}

function marioDeath(game){
    const { mario, scene } = game;
    if(mario.dead) return;
    mario.dead = true;
    mario.anims.play('mario-death');
    mario.setCollideWorldBounds(false);
    mario.body.checkCollision.none = true;
    mario.setVelocityX(0);
    // traer mario adelante del suelo
    mario.setDepth(1);
    // stop all audio
    game.sound.stopAll();
    playAudio(game, 'dead', { volume: 0.2 });
    setTimeout(() => {
        mario.setVelocityY(-450);
    }, 100);
    setTimeout(() => {
        scene.restart();
    }, 8000);
}

function collectItem(mario,  item) {
    const { texture : { key } } = item
    item.destroy();
    if(key === 'coin') {
        playAudio(this, 'coin', { volume: 0.1 });
        addToScore(100, item, this);
    } else {
        if(key === 'super-mushroom') {

            this.physics.world.pause()
            this.anims.pauseAll()

            playAudio(this, 'powerup', { volume: 0.1 });

            let i = 0;
            const interval = setInterval(() => {
                i++;
                mario.anims.play(i % 2 === 0 ? 'mario-grown-idle' : 'mario-idle');
            }, 100);


            mario.isBlocked = true;
            mario.isGrown = true;

            setTimeout(() => {
                mario.setDisplaySize(18, 32);
                mario.body.setSize(18, 32);

                this.anims.resumeAll();
                mario.isBlocked = false;
                clearInterval(interval);
                this.physics.world.resume();
            }, 1000);
        }
    }
}

function addToScore(scoreToAdd, origin, game){
    const scoreText = game.add.text(origin.x, origin.y, scoreToAdd, { fontFamily: 'pixel', color: '#fff', fontSize: game.height / 40 })
    game.tweens.add({
        targets: scoreText,
        y: scoreText.y - 20,
        duration: 800,
        ease: 'Cubic.easeOut',
        onComplete: () => {
            game.tweens.add({
                targets: scoreText,
                alpha: 0,
                duration: 200,
                ease: 'Cubic.easeOut',
                onComplete: () => {
                    scoreText.destroy();
                }
            })
        }
    })
}