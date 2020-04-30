import 'phaser';
import "../sass/index.scss";

import BootScene from "./scenes/BootScene";
import GameScene from "./scenes/GameScene";


var config = {
    type: Phaser.AUTO,
    parent: 'root',
    scene: [
        BootScene,
        GameScene
    ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
    pixelArt: false,
    scale: {
        mode: Phaser.Scale.FIT,
        width: window.innerWidth,
        height: window.innerHeight
    },
    transparent: true,
    backgroundColor: '#fff'
};

const game = new Phaser.Game(config);
