class Menu extends Phaser.Scene {
    constructor() {
        super({
            key: 'Menu',
            active: true
        })
    }

    preload() {
        this.load.audio('ambiance_menu', 'assets/audio/ambiance_menu.mp3');
        this.load.image('menu_background', 'assets/images/background/menu_background.png');
        this.load.image('play_button', 'assets/images/menu/play.png');
        this.load.image('ranking_button', 'assets/images/menu/ranking.png');
        this.load.image('setting_button', 'assets/images/menu/setting.png');
    }

    create() {
        game.currentGame = 'Menu';
        game.coinScore = 0;

        this.add.image(0, 0, 'menu_background').setOrigin(0, 0);

        // CREATE BUTTON
        const playButton = this.add.image(550, 550, 'play_button').setOrigin(0, 0);
        const rankingButton = this.add.image(730, 545, 'ranking_button').setOrigin(0, 0);
        const settingButton = this.add.image(930, 550, 'setting_button').setOrigin(0, 0);

        // INTERACTIVE BUTTON
        playButton.setInteractive({
            'cursor': 'pointer'
        }).on('pointerdown', this.start);

        rankingButton.setInteractive({
            'cursor': 'pointer'
        }).on('pointerdown', this.ranking);

        settingButton.setInteractive({
            'cursor': 'pointer'
        }).on('pointerdown', this.setting);
    }

    start() {
        game.scene.stop('Menu')
        game.scene.start('Level1')
    }

    ranking() {
        game.scene.stop('Menu')
        game.scene.start('Ranking')
    }

    setting() {
        game.scene.stop('Menu')
        game.scene.start('Setting')
    }
}