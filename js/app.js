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
        this.height = 63;
        this.width = 77;

        this.respawn();
    }
    
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.x > 505) {
            this.respawn(); 
        } else {
            this.x = this.x + (this.speed * dt);
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // When enemy "leaves" canvas on right side, 
    // respawn it with random velocity(the amount of pixels travelled in 1 second) on left side outside of canvas.
    respawn() {
        this.x = -101;
        this.speed = this.calcSpeed(100, 600);
    }
    // Function to calculate a random speed between two values to provide a minimum speed,
    // credits go to (https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Math/math.random).
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
        this.height = 76;
        this.width = 67;
    }

    // updates the players position and checks if the win condition is met via the checkWinCondition() method.
    update(dt) {
        this.checkWinCondition();

    }

    // Method to check if the win condition is met - when true, open up the winModal
    // and return the player object to its starting position
    checkWinCondition() {
        if (this.y === -11) {
            setTimeout(function() {
                player.resetPlayer();
            }, 1000);

            modal.style.display = "block";
            startModal.style.display = "none";
            winModal.style.display = "block";
            span.onclick = () => modal.style.display = "none";
            window.onclick = function (event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            };
        }
    }

    // Method to reset the player object's position to the initial starting point.
    resetPlayer() {
        this.x = 202;
        this.y = 404;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // Switch statement handles movement of player:
    // When player hits the boundaries of the canvas,
    // player cannot move further in that direction.
    handleInput(key) {
        
        switch(key) {
            case "left":
                if (this.x === 0) {
                    return;
                } else {
                    this.x = this.x - 101;
                }
                break;
            case "right":
                if (this.x === 404) {
                    return;
                } else {
                    this.x = this.x + 101;
                    break;
                }
            case "up":
                if (this.y === -11) {
                    return;
                } else {
                    this.y = this.y - 83;
                    break;
                }
            case "down":
                if (this.y === 404) {
                    return;
                } else {
                    this.y = this.y + 83;
                    break;
                }
        }
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(-101, 63);
var enemy2 = new Enemy(-101, 144);
var enemy3 = new Enemy(-101, 227);
var enemy4 = new Enemy(-101, 63);

var allEnemies = [];

allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);

var player = new Player(202, 404);

// Variables for creating everything regarding the modal functionality.
var modal = document.querySelector('.modal');
var startModal = document.querySelector('.startModal');
var winModal = document.querySelector('.winModal');
var span = document.querySelector('.close');
var btn = document.querySelector('.btn');

(function startUp() {
    modal.style.display = 'block';
    startModal.style.display = 'block';
    btn.onclick = () => modal.style.display = 'none';
})();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
