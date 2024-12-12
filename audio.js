const INIT_AUDIOS = [
    {
        name: 'dead',
        src: 'assets/sound/music/gameover.mp3',
    },
    {
        name: 'jump',
        src: 'assets/sound/effects/jump.mp3',
    },
    {
        name: 'goomba-stomp',
        src: 'assets/sound/effects/goomba-stomp.wav',
    },
    {
        name: 'coin',
        src: 'assets/sound/effects/coin.mp3',
    },
    {
        name: 'powerup',
        src: 'assets/sound/effects/consume-powerup.mp3',
    },
    {
        name: 'mario-theme',
        src: 'assets/sound/music/overworld/theme.mp3',
    }
]



export const initAudios = ({load}) => {
    INIT_AUDIOS.forEach(({name, src}) => {
        load.audio(name, src);
    })
}

export const playAudio = (game, name, config) => {
    try {
        return game.sound.add(name, config).play();
    } catch (error) {
        console.log('Error al reproducir audio', error);
    }
}