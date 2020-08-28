const config = {
    width: 1600,
    height: 800,
    type: Phaser.AUTO,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: [
        Menu,
        Setting,
        Ranking,
        GameOver,
        Level1,
        Level2,
        Level3,
        Final
    ]
}

var game = new Phaser.Game(config)
