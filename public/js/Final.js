class Final extends Phaser.Scene {
    constructor() {
        super({
            key: 'Final',
            active: false
        })
    }

    preload() {
        this.load.image('exit_button', 'assets/images/menu/cross.png');
        this.load.image('win', 'assets/images/menu/win.png');
    }

    create() {
        game.scene.stop('Menu');

        const exitButton = this.add.image(1400, 20, 'exit_button').setOrigin(0, 0);

        exitButton.setInteractive({
            'cursor': 'pointer'
        }).on('pointerdown', this.exit);

        this.add.image(650, 200, 'win').setScale(0.5).setOrigin(0,0);
        this.add.text(715, 600, `Score : ${game.coinScore}`, {
            fontSize: '26px',
            fill: '#fff'
        });
    }

    exit() {
        game.scene.stop('Final')
        game.scene.start('Menu')
    }

}