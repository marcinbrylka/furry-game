var Furry = require("./furry.js");
var Coin = require("./coin.js");

var Game = function () {
    this.board = document.querySelectorAll("#board div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;

    this.index = function (x, y) {
        return x + (y * 10);
    };

    this.showFurry = function () {
        this.hideVisibleFurry();
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    };

    var self = this;
    this.startGame = function () {
        this.idSetInterval = setInterval(function () {
            self.moveFurry()
        }, 250);
    };


    this.showCoin = function () {
        while (this.coin.x === this.furry.x && this.coin.y === this.furry.y) {
            this.coin.x = Math.floor(Math.random() * 10);
            this.coin.y = Math.floor(Math.random() * 10);
        }
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    };

    this.hideVisibleFurry = function () {
        document.querySelector(".furry").classList.remove("furry");
    };

    this.moveFurry = function () {
        if (this.furry.direction === "right") {
            this.furry.x += 1;
        } else if (this.furry.direction === "left") {
            this.furry.x -= 1;
        } else if (this.furry.direction === "up") {
            this.furry.y -= 1;
        } else if (this.furry.direction === "down") {
            this.furry.y += 1;
        }
        this.gameOver();
        this.showFurry();
        this.checkCoinCollision();
    };

    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = "left";
                break;
            case 38:
                this.furry.direction = "up";
                break;
            case 39:
                this.furry.direction = "right";
                break;
            case 40:
                this.furry.direction = "down";
                break;
        }
    };

    document.addEventListener("keydown", function (event) {
        self.turnFurry(event);

    });

    this.checkCoinCollision = function () {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            document.querySelector(".coin").classList.remove("coin");
            this.score += 1;
            document.querySelector("#score strong").innerHTML = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };

    this.gameOver = function () {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.idSetInterval);
            document.getElementById('over').classList.remove('invisible');
            document.querySelector("#over strong").innerHTML = this.score;
            this.hideVisibleFurry();
        }

    };
};

module.exports = Game;
