class Ranking extends Phaser.Scene {
    constructor() {
        super({
            key: 'Ranking',
            active: false
        })
    }

    preload() {
        this.load.image('ranking_background', 'assets/images/background/coming_soon.png');
        this.load.image('exit_button', 'assets/images/menu/cross.png');
    }

    create() {
        this.add.image(0, 0, 'ranking_background').setOrigin(0, 0);

        const exitButton = this.add.image(1400, 20, 'exit_button').setOrigin(0, 0);

        exitButton.setInteractive({
            'cursor': 'pointer'
        }).on('pointerdown', this.exit);
    }

    exit() {
        game.scene.stop('Ranking')
        game.scene.start('Menu')
    }
}
