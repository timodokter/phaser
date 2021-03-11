var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: "arcade",
      arcade: {
          gravity: { y: 300},
          debug: false
      }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var platforms;
var player;
var cursors;
var stars;
var score = 0;
var scoreText
var bombs;
var gameOver = false;

var game = new Phaser.Game(config);

function preload () {
    //images
    this.load.image("star", "assets/star.png");
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("bomb", "assets/bomb.png");

    //spritesheet
    this.load.spritesheet("dude", "assets/dude.png", {
        frameWidth: 32,
        frameHeight: 48
    });
}

function create () {

    //background
    this.add.image(400, 300, "sky")

    //ground
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, "ground").setScale(2).refreshBody();

    platforms.create(600, 400, "ground");
    platforms.create(50, 250, "ground");
    platforms.create(750, 220, "ground");


    //player
    player = this.physics.add.sprite(100, 450, "dude");

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("dude", {start: 0, end: 3}),
        framerate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "turn",
        frames: [ { key: "dude", frame: 4} ],
        framerate: 20
    });

    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("dude", {start: 5, end: 8}),
        framerate: 10,
        repeat: -1
    });

    this.physics.add.collider(player, platforms);

    // //star
    stars = this.physics.add.group({
        key: "star",
        repeat: 11,
        setXY: {x: 12, y: 0, stepX: 70}
    });

    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
    })

    this.physics.add.collider(stars, platforms);

    this.physics.add.overlap(player, stars, collectStar, null, this);

    function collectStar (player, star) {
        star.disableBody(true, true)

        score += 10;
        scoreText.setText("Score: " + score);
    }

    scoreText = this.add.text(16, 16, "Score: 0", {fontSize: "32px", fill: "#000"});

    bombs = this.physics.add.group();

    this.physics.add.collider(bombs, platforms);

    this.physics.add.collider(player, bombs, hitbomb, null, this);

}

function hitbomb (player, bomb) {

    this.physics.pause();

    player.setTint(0xf0000);

    player.anims.play("turn");

    gameOver = true

}

function update () {
    cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play("left", true)
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);

        player.anims.play("right", true);
    } else {
        player.setVelocityX(0);

        player.anims.play("turn");
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}