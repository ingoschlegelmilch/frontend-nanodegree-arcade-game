// Enemies our player must avoid
class Enemy {
    constructor(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;

    this.respawn();
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        //console.log(dt, this.x, this.y);
        if (this.x > 505) {
            this.respawn(); 
        } else {
            this.x = this.x + (this.speed * dt);
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, (this.y * 83) - 20);
    }

    // When enemy "leaves" canvas on right side, 
    // respawn it with random velocity on left side outside of canvas.
    respawn() {
        this.x = -101;
        this.speed = this.calcSpeed(200, 700);
    }
    // Function to calculate a random speed between two values to provide a minimum speed.
    calcSpeed(min, max) {
        return Math.random() * (max - min) + min;
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.y = y;
    }

    update(dt) {
        console.log(dt, this.x, this.y);
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x * 101, (this.y * 83) - 20);
    }

    // Switch statement handles movement of player:
    // When player hits the boundaries of the canvas,
    // player cannot move further in that direction.
    handleInput(key) {
        console.log(key);
        
        switch(key) {
            case "left":
                if (this.x === 0) {
                    return;
                } else {
                    this.x = this.x - 1;
                }
                break;
            case "right":
                if (this.x === 4) {
                    return;
                } else {
                    this.x = this.x + 1;
                    break;
                }
            case "up":
                if (this.y === 0) {
                    return;
                } else {
                    this.y = this.y - 1;
                    break;
                }
            case "down":
                if (this.y === 5) {
                    return;
                } else {
                    this.y = this.y + 1;
                    break;
                }
        }
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(1, 1);
var enemy2 = new Enemy(1, 2);
var enemy3 = new Enemy(1, 3);

var allEnemies = [];

allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

var player = new Player(2, 5);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    console.log(e.keyCode);
    player.handleInput(allowedKeys[e.keyCode]);
});
