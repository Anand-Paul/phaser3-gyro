class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        });
    }

    init() {
        this.txt;
        this.ball;
        this.speed = 10;
    }

    create() {
        this.physics.world.setBounds(0, 0, window.innerWidth, window.innerHeight);

        // this.txt = this.add.text(50, 100, 'hello', {
        //     fontSize: '46px',
        //     fontFamily: 'Arial',
        //     color: '#000'
        // });

        //Adding the ball as an physics body
        this.ball = this.physics.add.image(0, 0, 'BALL').setOrigin(0).setDepth(2);
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(2);

        //initialising the gyro and setting the velocity
        this.initGyro();
    }


    update() {
    }

    initGyro() {
        window.ondeviceorientation = function (event) {
            if (event.gamma) {
                let x = Math.round(event.gamma.toFixed(2)) * 10 * window.devicePixelRatio;
                var alpha = event.alpha;
                var beta = event.beta;
                var gamma = event.gamma;
                // this.txt.setText(gamma);
                this.ball.setVelocity(gamma * this.speed, beta * this.speed);
            }
        }.bind(this)
    }
}

export default GameScene;
