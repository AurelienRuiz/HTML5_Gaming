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

var GameOver =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(GameOver, _Phaser$Scene);

  function GameOver() {
    _classCallCheck(this, GameOver);

    return _possibleConstructorReturn(this, _getPrototypeOf(GameOver).call(this, 'GameOver'));
  }

  _createClass(GameOver, [{
    key: "preload",
    value: function preload() {
      this.load.image('game_over', 'assets/images/menu/gameover.png');
      this.load.image('replay', 'assets/images/menu/replay.png');
    }
  }, {
    key: "create",
    value: function create() {
      this.add.image(800, 300, 'game_over').setScale(1);
      this.add.text(730, 500, "Score : ".concat(game.coinScore), {
        fontSize: '26px',
        fill: '#fff'
      }); // BUTTON RESTART

      var replay_button = this.add.image(800, 700, 'replay').setScale(0.5);
      replay_button.setInteractive({
        'cursor': 'pointer'
      }).on('pointerdown', this.gameRestart, this);
    }
  }, {
    key: "gameRestart",
    value: function gameRestart() {
      this.scene.stop();
      this.scene.start(game.currentGame);
    }
  }]);

  return GameOver;
}(Phaser.Scene);