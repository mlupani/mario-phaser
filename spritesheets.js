const INIT_SPREETSHEETS = [
    {
        name: 'mario',
        src: 'assets/entities/mario.png',
        frameWidth: 18,
        frameHeight: 16,
    },
    {
        name: 'mario-grown',
        src: 'assets/entities/mario-grown.png',
        frameWidth: 18,
        frameHeight: 32,
    },
    {
        name: 'goomba',
        src: 'assets/entities/overworld/goomba.png',
        frameWidth: 16,
        frameHeight: 16,
    },
    {
        name: 'coin',
        src: 'assets/collectibles/coin.png',
        frameWidth: 16,
        frameHeight: 16,
    },
    {
        name: 'super-mushroom',
        src: 'assets/collectibles/super-mushroom.png',
        frameWidth: 16,
        frameHeight: 16,
    },
    {
        name: 'mistery-box',
        src: 'assets/blocks/overworld/misteryBlock.png',
        frameWidth: 16,
        frameHeight: 16,
    },
    {
        name: 'empty-block',
        src: 'assets/blocks/overworld/emptyBlock.png',
        frameWidth: 16,
        frameHeight: 16,
    },
    {
        name: 'block',
        src: 'assets/blocks/overworld/block.png',
        frameWidth: 16,
        frameHeight: 16,
    },
    {
        name: 'block-hit',
        src: 'assets/blocks/overworld/brick-debris.png',
        frameWidth: 32,
        frameHeight: 3,
    }
]

export const initSpritesheets = ({load}) => {
    INIT_SPREETSHEETS.forEach(({name, src, frameHeight, frameWidth}) => {
        load.spritesheet(name, src, { frameWidth, frameHeight });
    })
}