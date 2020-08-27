class Menu extends Phaser.Scene {
    constructor() {
        super({
            key: 'Menu',
            active: true
        })
    }

    preload() {
        this.load.image('play_button', 'assets/images/menu/play_button.png');
    }

    create() {
        game.currentGame = 'Menu';
        game.coinScore = 0;
        const playButton = this.add.image(800, 600, 'play_button').setScale(0.5);
        playButton.setInteractive({
            'cursor': 'pointer'
        }).on('pointerdown', this.start);
    }

    start() {
        this.scene.start('Level1')
    }
}