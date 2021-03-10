
class SceneMain extends Phaser.Scene {

    constructor() {
        super('SceneMain');
    }

    preload() {
        // This is where we load things into memory
        this.alphaFactor = -0.01;
        this.stepLengthX = 2;
        this.stepLengthY = 2;
        this.bananaX = game.config.width / 2;
        this.bananaY = game.config.height / 2;

        //banana
        this.load.image("banana", "images/banana.png");

        //snake
        this.load.spritesheet("snake", "images/snake.png",{
            frameWidth: 320,
            frameHeight: 160
        });
    }

    create() {
        // This is where we create an manipulate objects
        //banana
        this.banana = this.add.image(this.bananaX, this.bananaY, "banana");
        this.banana.displayHeight = 50;
        this.banana.displayWidth = 50;

        //snake
        this.snake = this.add.sprite(240, 320, "snake")
        this.anims.create({
            key: "snake_walk",
            frames: [
                { key: "snake", frame: 1},
                { key: "snake", frame: 2},
                { key: "snake", frame: 3},
                { key: "snake", frame: 4}
            ],
            frameRate: 4,
            repeat: -1
        });
        this.snake.play("snake_walk");
    }

    update() {
        // This is the method that gets looped continuously
        //banana movement X
        this.banana.x += this.stepLengthX;
        if (this.banana.x >= game.config.width) {
            this.stepLengthX = this.stepLengthX * -1;
            this.banana.flipX = true;
        }
        if (this.banana.x <= 0) {
            this.stepLengthX = this.stepLengthX * -1;
            this.banana.flipX = false;
        }

        // banana movement Y
        this.banana.y += this.stepLengthY;
        if (this.banana.y >= game.config.height) {
            this.stepLengthY = this.stepLengthY * -1;
        }
        if (this.banana.y <= 0) {
            this.stepLengthY = this.stepLengthY * -1;
        }
    }

}