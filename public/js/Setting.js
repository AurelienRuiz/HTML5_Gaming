class Setting extends Phaser.Scene {
    constructor() {
        super({
            key: 'Setting',
            active: false
        })
    }

    preload() {
        this.load.image('setting_background', 'assets/images/background/control_background.png');
        this.load.image('exit_button', 'assets/images/menu/cross.png');
    }

    create() {
        game.currentGame = 'Setting';

        this.add.image(0, 0, 'setting_background').setOrigin(0, 0);
        const exitButton = this.add.image(1400, 20, 'exit_button').setOrigin(0, 0);

        exitButton.setInteractive({
            'cursor': 'pointer'
        }).on('pointerdown', this.exit);
    }

    exit() {
        game.scene.stop('Setting')
        game.scene.start('Menu')
    }
}