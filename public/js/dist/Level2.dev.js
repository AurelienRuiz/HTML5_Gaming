"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Level2 =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(Level2, _Phaser$Scene);

  function Level2() {
    var _this;

    _classCallCheck(this, Level2);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Level2).call(this, {
      key: 'Level2',
      active: false
    }));
    _this.gameOver = false;
    return _this;
  }

  _createClass(Level2, [{
    key: "preload",
    value: function preload() {
      this.load.audio('ambiance_level2', 'assets/audio/ambiance_forest.mp3');
      this.load.audio('coins_music_level2', 'assets/audio/coins.wav');
      this.load.audio('jump_music_level2', 'assets/audio/jump.wav');
      this.load.image('background_level2', 'assets/images/background/forest_background.png');
      this.load.image('tiles_level2', 'assets/images/forest.png');
      this.load.image('door_level2', 'assets/images/doorOpen.png');
      this.load.tilemapTiledJSON('map_level2', 'assets/json/level2.json');
      this.load.atlas('player_level2', 'assets/images/player.png', 'assets/json/player.json');
      this.load.atlas('coins_level2', 'assets/images/coins.png', 'assets/json/coins.json');
      this.load.atlas('zombies_level2', 'assets/images/zombies.png', 'assets/json/zombies.json');
    }
  }, {
    key: "create",
    value: function create() {
      var _this2 = this;

      game.currentGame = 'Level2'; // MUSIC

      var music_ambiance = this.sound.add('ambiance_level2');
      music_ambiance.play(); //MAP

      var background = this.add.tileSprite(0, 0, 7680, 960, 'background_level2').setOrigin(0, 0);
      var map = this.make.tilemap({
        key: 'map_level2'
      });
      var tileset = map.addTilesetImage('forest', 'tiles_level2');
      var platforms = map.createStaticLayer('platforms', tileset, 0, 0);
      platforms.setCollisionByExclusion(-1, true); //DECORATION

      var decoration = map.createStaticLayer('decoration', tileset, 0, 0); //WATER

      var water = map.createStaticLayer('water', tileset, 0, 0);
      water.setCollisionByExclusion(-1, true); // DOOR

      var doorObjects = map.getObjectLayer('door')['objects'];
      var doors = this.physics.add.staticGroup();
      doorObjects.forEach(function (door) {
        doors.create(door.x, door.y - -10 - door.height, 'door_level2').setScale(2).setOrigin(0);
      }); //COINS

      var coinsLayer = map.getObjectLayer('coin')['objects'];
      var coins = this.physics.add.staticGroup();
      this.objs = [];
      coinsLayer.forEach(function (coin) {
        _this2.objs.push(coins.create(coin.x, coin.y - 25 - coin.height, 'coins_level2').setScale(1).setOrigin(0));
      }); // PLAYER

      this.player = this.physics.add.sprite(50, 700, 'player_level2');
      this.player.setBounce(0.1);
      this.physics.add.collider(this.player, platforms);
      this.physics.add.collider(this.player, doors, nextLevel, null, this);
      this.physics.add.collider(this.player, water, gameOver, null, this);
      this.physics.add.overlap(this.player, coins, collectCoin, null, this); //ENNEMY

      this.ennemys = [];
      var coordEnnemy = [{
        x: 2000,
        y: 500
      }, {
        x: 2800,
        y: 700
      }, {
        x: 3400,
        y: 650
      }, {
        x: 4500,
        y: 700
      }];

      for (var i = 0; i < coordEnnemy.length; i++) {
        this.ennemys[i] = this.physics.add.sprite(coordEnnemy[i].x, coordEnnemy[i].y, 'zombies_level2');
        this.physics.add.collider(this.ennemys[i], platforms);
        this.ennemys[i].setVelocityX(100);
        this.physics.add.collider(this.player, this.ennemys[i], gameOver, null, this);
      } //CAMERA


      this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      this.cameras.main.startFollow(this.player); //SCORE

      var text = this.add.text(10, 20, "Score: ".concat(game.coinScore, "x"), {
        fontSize: '32px',
        fill: '#ffffff'
      });
      text.setScrollFactor(0); //COLLECT COINS

      function collectCoin(player, coin) {
        var music_coins = this.sound.add('coins_music_level2');
        music_coins.play();
        coin.destroy(coin.x, coin.y);
        game.coinScore++;
        text.setText("Score: ".concat(game.coinScore, "x"));
        return false;
      }

      function nextLevel() {
        music_ambiance.stop();
        this.scene.stop();
        this.scene.start('Level3');
      } // GAME OVER 


      function gameOver() {
        music_ambiance.stop();
        this.scene.stop();
        this.scene.start('GameOver');
      } // ANIMATIONS PLAYER


      this.anims.create({
        key: 'p_anim_idle',
        frames: this.anims.generateFrameNames('player_level2', {
          prefix: 'Idle__',
          start: 0,
          end: 9,
          suffix: '.png',
          zeroPad: 3
        }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'p_anim_right',
        frames: this.anims.generateFrameNames('player_level2', {
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
        frames: this.anims.generateFrameNames('player_level2', {
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
        frames: this.anims.generateFrameNames('player_level2', {
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
        frames: this.anims.generateFrameNames('player_level2', {
          prefix: 'Left_Jump__',
          start: 0,
          end: 9,
          suffix: '.png',
          zeroPad: 3
        }),
        frameRate: 10,
        repeat: -1
      }); //ANIMATION COINS

      this.anims.create({
        key: 'coins_anim',
        frames: this.anims.generateFrameNames('coins_level2', {
          prefix: 'Coins_',
          start: 0,
          end: 14,
          suffix: '.png',
          zeroPad: 3
        }),
        frameRate: 10,
        repeat: -1
      }); //ANIMATION ENNEMY

      this.anims.create({
        key: 'ennemy_right',
        frames: this.anims.generateFrameNames('zombies_level2', {
          prefix: 'Walk_Right_',
          start: 0,
          end: 9,
          suffix: '.png',
          zeroPad: 3
        }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'ennemy_left',
        frames: this.anims.generateFrameNames('zombies_level2', {
          prefix: 'Walk_Left_',
          start: 0,
          end: 9,
          suffix: '.png',
          zeroPad: 3
        }),
        frameRate: 10,
        repeat: -1
      });
      this.cursors = this.input.keyboard.createCursorKeys();
    }
  }, {
    key: "update",
    value: function update() {
      //COINS UPDATE
      this.objs.forEach(function (coin) {
        if (coin.active) {
          coin.anims.play('coins_anim', true);
        }
      }); // PLAYER UPDATE

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
        var jump = this.sound.add('jump_music_level2');
        jump.play();
        this.player.setVelocityY(-400);
        this.player.play('p_anim_jump_right', true);
      }

      if (this.cursors.up.isDown && this.cursors.left.isDown && this.player.body.onFloor()) {
        var _jump = this.sound.add('jump_music_level2');

        _jump.play();

        this.player.setVelocityY(-400);
        this.player.play('p_anim_jump_left', true);
      } // ENNEMY UPDATE


      this.ennemys.forEach(function (ennemy) {
        if (ennemy.body.blocked.right) {
          ennemy.setVelocityX(-100);
          ennemy.play('ennemy_left', true);
        } else if (ennemy.body.blocked.left) {
          ennemy.setVelocityX(100);
          ennemy.play('ennemy_right', true);
        }
      });
    }
  }]);

  return Level2;
}(Phaser.Scene);