
class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'BootScene'
        });
    }

    preload() {
        //Adding the assets
        let path = process.env.NODE_ENV === 'production' ? './images/' : '../src/images/';
        this.load.path = path;
        this.load.image('PLAY', 'play.png');
        this.load.image('PLAY_PRESS', 'play_press.png');
        this.load.image('BALL', 'ball.png');
    }

    create() {
        let width = window.innerWidth, height = window.innerHeight;
        let test = this.add.image(0, 0, 'PLAY').setOrigin(0).setDepth(2).setInteractive({ useHandCursor: true });
        test.x = (width - test.displayWidth) / 2;
        test.y = (height - test.displayHeight) / 2;

        test.on('pointerdown', () => {
            test.setTexture('PLAY_PRESS');
        }).on('pointerup', () => {
            setTimeout(() => {
                test.disableInteractive();
                //Checking the device orientation is present or not, if yes it will popup to enable in IOS
                if (typeof (DeviceOrientationEvent) !== 'undefined' && DeviceOrientationEvent && typeof (DeviceOrientationEvent.requestPermission) === "function") {
                    DeviceOrientationEvent.requestPermission().then(permissionState => {
                        if (permissionState === 'granted') {
                            console.log("permission granted");
                        }
                    }).catch(console.error);
                }
                this.scene.start('GameScene');
            }, 50);
        });

    }
}

export default BootScene;
