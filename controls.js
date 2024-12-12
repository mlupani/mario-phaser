const MARIO_ANIMATIONS = {
    grown: {
        idle: 'mario-grown-idle',
        walk: 'mario-grown-walk',
        jump: 'mario-grown-jump',
        getDown: 'mario-grown-get-down',
    },
    small: {
        idle: 'mario-idle',
        walk: 'mario-walk',
        jump: 'mario-jump',
    }
}


export const checkControls = (game) => {
    const { keys, mario } = game;
    const marioAnims = mario.isGrown ? MARIO_ANIMATIONS.grown : MARIO_ANIMATIONS.small;

    if(mario.isBlocked) return;
    if(mario.dead) return;

    if (keys.right.isDown) {
        if(mario.body.touching.down) {
            mario.anims.play(marioAnims.walk, true);
        }
        mario.x += 2;
        mario.flipX = false;
    }
    else if (keys.left.isDown) {
        if(mario.body.touching.down) {
            mario.anims.play(marioAnims.walk, true);
        }
        mario.x -= 2;
        mario.flipX = true;
    }
    else if (keys.down.isDown) {
        if(mario.body.touching.down) {
            mario.anims.play(marioAnims.getDown, true);
        }
    }
    else if(mario.body.touching.down) {
        mario.anims.stop();
        mario.anims.play(marioAnims.idle, true);
    }

    if(keys.space.isDown && mario.body.touching.down) {
        game.sound.add('jump', { volume: 0.1 }).play();
        mario.anims.play(marioAnims.jump, true);
        mario.setVelocityY(-300);
    }
}