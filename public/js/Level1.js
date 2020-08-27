class Level1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'Level1',
            active: false
        })
        this.gameOver = false;
    }

    preload() {
        this.load.audio('ambiance_level1', 'assets/audio/ambiance_desert.mp3');
        this.load.audio('coins_music_level1', 'assets/audio/coins.wav');
        this.load.audio('jump_music_level1', 'assets/audio/jump.wav');
        this.load.image('background_level1', 'assets/images/background/desert_background.png');
        this.load.image('tiles_level1', 'assets/images/desert.png');
        this.load.image('door_level1', 'assets/images/doorOpen.png');
        this.load.tilemapTiledJSON('map_level1', 'assets/json/level1.json');
        this.load.atlas('player_level1', 'assets/images/player.png', 'assets/json/player.json');
        this.load.atlas('coins_level1', 'assets/images/coins.png', 'assets/json/coins.json');
        this.load.atlas('zombies_level1', 'assets/images/zombies.png', 'assets/json/zombies.json');
    }

    create() {
        game.currentGame = 'Level1';
        // MUSIC
        let music_ambiance = this.sound.add('ambiance_level1');
        music_ambiance.play();

        //MAP
        const background = this.add.tileSprite(0, 0, 7680, 960, 'background_level1').setOrigin(0, 0);

        const map = this.make.tilemap({
            key: 'map_level1'
        });

        const tileset = map.addTilesetImage('desert', 'tiles_level1');

        const platforms = map.createStaticLayer('platforms', tileset, 0, 0);
        platforms.setCollisionByExclusion(-1, true);

        //DECORATION
        const decoration = map.createStaticLayer('decoration', tileset, 0, 0);

        //WATER
        const water = map.createStaticLayer('water', tileset, 0, 0);
        water.setCollisionByExclusion(-1, true);

        // DOOR
        const doorObjects = map.getObjectLayer('door')['objects'];
        const doors = this.physics.add.staticGroup();
        doorObjects.forEach(door => {
            doors.create(door.x, door.y - (-10) - door.height, 'door_level1').setScale(2).setOrigin(0);
        })

        //COINS
        const coinsLayer = map.getObjectLayer('coins')['objects'];
        const coins = this.physics.add.staticGroup();
        this.objs = [];
        coinsLayer.forEach(coin => {
            this.objs.push(coins.create(coin.x, coin.y - 25 - coin.height, 'coins_level1').setScale(1).setOrigin(0));
        })

        // PLAYER
        this.player = this.physics.add.sprite(50, 700, 'player_level1');
        this.player.setBounce(0.1);
        this.physics.add.collider(this.player, platforms);
        this.physics.add.collider(this.player, water, gameOver, null, this);
        this.physics.add.collider(this.player, doors, nextLevel, null, this);
        this.physics.add.overlap(this.player, coins, collectCoin, null, this);

        //ENNEMY
        this.ennemys = [];
        const coordEnnemy = [{
                x: 1100,
                y: 850
            },
            {
                x: 2000,
                y: 850
            },
            {
                x: 4000,
                y: 850
            },
        ];
        for (let i = 0; i < coordEnnemy.length; i++) {
            this.ennemys[i] = this.physics.add.sprite(coordEnnemy[i].x, coordEnnemy[i].y, 'zombies_level1');
            this.physics.add.collider(this.ennemys[i], platforms);
            this.ennemys[i].setVelocityX(100);
            this.physics.add.collider(this.player, this.ennemys[i], gameOver, null, this);
        }

        //CAMERA
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);

        //SCORE
        let text = this.add.text(10, 20, `Score: ${game.coinScore}x`, {
            fontSize: '32px',
            fill: '#ffffff',
        });
        text.setScrollFactor(0);

        //COLLECT COINS
        function collectCoin(player, coin) {
            let music_coins = this.sound.add('coins_music_level1');
            music_coins.play();
            coin.destroy(coin.x, coin.y);
            game.coinScore++;
            text.setText(`Score: ${game.coinScore}x`);
            return false;
        }

        function nextLevel() {
            music_ambiance.stop();
            this.scene.stop();
            this.scene.start('Level2');
        }

        // GAME OVER 
        function gameOver() {
            music_ambiance.stop();
            this.scene.stop()
            this.scene.start('GameOver')
        }

        // ANIMATIONS PLAYER
        this.anims.create({
            key: 'p_anim_idle',
            frames: this.anims.generateFrameNames('player_level1', {
                prefix: 'Idle__',
                start: 0,
                end: 9,
                suffix: '.png',
                zeroPad: 3,
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'p_anim_right',
            frames: this.anims.generateFrameNames('player_level1', {
                prefix: 'Right__',
                start: 0,
                end: 9,
                suffix: '.png',
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'p_anim_left',
            frames: this.anims.generateFrameNames('player_level1', {
                prefix: 'Left__',
                start: 0,
                end: 9,
                suffix: '.png',
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'p_anim_jump_right',
            frames: this.anims.generateFrameNames('player_level1', {
                prefix: 'Right_Jump__',
                start: 0,
                end: 9,
                suffix: '.png',
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'p_anim_jump_left',
            frames: this.anims.generateFrameNames('player_level1', {
                prefix: 'Left_Jump__',
                start: 0,
                end: 9,
                suffix: '.png',
                zeroPad: 3
            }),
            frameRate: 10,
            repeat: -1
        });

        //ANIMATION COINS
        this.anims.create({
            key: 'coins_anim',
            frames: this.anims.generateFrameNames('coins_level1', {
                prefix: 'Coins_',
                start: 0,
                end: 14,
                suffix: '.png',
                zeroPad: 3,
            }),
            frameRate: 10,
            repeat: -1
        });

        //ANIMATION ENNEMY
        this.anims.create({
            key: 'ennemy_right',
            frames: this.anims.generateFrameNames('zombies_level1', {
                prefix: 'Walk_Right_',
                start: 0,
                end: 9,
                suffix: '.png',
                zeroPad: 3,
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'ennemy_left',
            frames: this.anims.generateFrameNames('zombies_level1', {
                prefix: 'Walk_Left_',
                start: 0,
                end: 9,
                suffix: '.png',
                zeroPad: 3,
            }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();

    }

    update() {
        
        //COINS UPDATE
        this.objs.forEach(coin => {
            if(coin.active) {
                coin.anims.play('coins_anim', true)
            }
        });

        // PLAYER UPDATE
        if (this.cursors.right.isDown) {
            this.player.setVelocityX(300);
            if (this.player.body.onFloor()) {
                this.player.play('p_anim_right', true);
            }
        } else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-300);
            if (this.player.body.onFloor()) {
                this.player.play('p_anim_left', true);
            }
        } else {
            this.player.setVelocityX(0);
            if (this.player.body.onFloor()) {
                this.player.play('p_anim_idle', true);
            }
        }

        if (this.cursors.up.isDown && this.cursors.right.isDown && this.player.body.onFloor()) {
            let jump = this.sound.add('jump_music_level1');
            jump.play();
            this.player.setVelocityY(-400);
            this.player.play('p_anim_jump_right', true);
        }
        if (this.cursors.up.isDown && this.cursors.left.isDown && this.player.body.onFloor()) {
            let jump = this.sound.add('jump_music_level1');
            jump.play();
            this.player.setVelocityY(-400);
            this.player.play('p_anim_jump_left', true);
        }

        // ENNEMY UPDATE
        this.ennemys.forEach(ennemy => {
            if (ennemy.body.blocked.right) {
                ennemy.setVelocityX(-100);
                ennemy.play('ennemy_left', true);
            } else if (ennemy.body.blocked.left) {
                ennemy.setVelocityX(100);
                ennemy.play('ennemy_right', true);
            }
        });
    }
}