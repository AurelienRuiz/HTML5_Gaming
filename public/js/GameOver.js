class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver')
    }

    preload() {
        this.load.image('game_over', 'assets/images/menu/gameover.png');
        this.load.image('replay', 'assets/images/menu/replay.png');
    }

    create() {

        this.add.image(800, 300, 'game_over').setScale(1);
        this.add.text(730, 500, `Score : ${game.coinScore}`, {
            fontSize: '26px',
            fill: '#fff'
        });

        // BUTTON RESTART
        let replay_button = this.add.image(800, 700, 'replay').setScale(0.5);
        replay_button.setInteractive({
            'cursor': 'pointer'
        }).on('pointerdown', this.gameRestart, this);

    }

    gameRestart() {
        this.scene.stop()
        game.coinScore = 0;
        this.scene.start(game.currentGame);
    }
}