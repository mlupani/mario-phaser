export const createAnimations = (game) => {
    // animations
    game.anims.create({
        key: 'mario-walk',
        frames: game.anims.generateFrameNumbers('mario', { start: 1, end: 3 }),
        frameRate: 12,
        repeat: -1
    })

    game.anims.create({
        key: 'mario-idle',
        frames: [{ key: 'mario', frame: 0 }],
    })

    game.anims.create({
        key: 'mario-jump',
        frames: game.anims.generateFrameNumbers('mario', { start: 5, end: 5 }),
        frameRate: 12,
        repeat: -1
    })

    game.anims.create({
        key: 'mario-death',
        frames: [{ key: 'mario', frame: 4 }],
        frameRate: 12,
        repeat: -1
    })

    game.anims.create({
        key: 'goomba-walk',
        frames: game.anims.generateFrameNumbers('goomba', { start: 0, end: 1 }),
        frameRate: 12,
        repeat: -1
    })

    game.anims.create({
        key: 'goomba-death',
        frames: [{ key: 'goomba', frame: 2 }],
        frameRate: 12,
        repeat: -1
    })

    game.anims.create({
        key: 'coin-spin',
        frames: game.anims.generateFrameNumbers('coin', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    })

    game.anims.create({
        key: 'mistery-box-change',
        frames: game.anims.generateFrameNumbers('mistery-box', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    })

    game.anims.create({
        key: 'mario-grown-idle',
        frames: [{ key: 'mario-grown', frame: 0 }],
        frameRate: 12,
        repeat: -1
    })

    game.anims.create({
        key: 'mario-grown-jump',
        frames: [{ key: 'mario-grown', frame: 5 }],
        frameRate: 12,
        repeat: -1
    })

    game.anims.create({
        key: 'mario-grown-walk',
        frames: game.anims.generateFrameNumbers('mario-grown', { start: 1, end: 3 }),
        frameRate: 12,
        repeat: -1
    })

    game.anims.create({
        key: 'mario-grown-get-down',
        frames: [{ key: 'mario-grown', frame: 4 }],
        frameRate: 12,
        repeat: -1
    })

    game.anims.create({
        key: 'block-hit',
        frames: [{ key: 'block-hit', frame: 0 }],
        frameRate: 12,
        repeat: -1
    })
}