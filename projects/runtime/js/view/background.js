var background = function (window) {
    'use strict';

    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;

    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function (app, ground) {
        /* Error Checking - DO NOT DELETE */
        if (!app) {
            throw new Error("Invalid app argument");
        }
        if (!ground || typeof (ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        var audio = new Audio('img/sun.mp3');
        audio.play();

        // container which will be returned
        var background;

        // ANIMATION VARIABLES HERE:
        var rocket1
        var rocket2
        var rocket3
        var rocket4

        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth, canvasHeight, 'lightblue');
            backgroundFill = draw.bitmap('img/background.jpg');
            background.addChild(backgroundFill);
            var moon = draw.bitmap("img/background.jpg");
            moon.x = 0;
            moon.y = 0;
            moon.scaleX = 3.54;
            moon.scaleY = 3.6;
            background.addChild(moon);



            // TODO: 3 - Add a moon and starfield


            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?


            // TODO 4: Part 1 - Add a tree
            rocket1 = draw.bitmap("img/rocket.png")
            rocket1.x = 100;
            rocket1.y = 200;
            rocket1.scaleX = 0.2;
            rocket1.scaleY = 0.2;
            background.addChild(rocket1)

            rocket2 = draw.bitmap("img/rocket2.png")
            rocket2.x = 100;
            rocket2.y = 100;
            rocket2.scaleX = 0.2;
            rocket2.scaleY = 0.2;
            background.addChild(rocket2)

            rocket3 = draw.bitmap("img/rocket3.png")
            rocket3.x = 100;
            rocket3.y = 500;
            rocket3.scaleX = 0.4;
            rocket3.scaleY = 0.4;
            background.addChild(rocket3)

            rocket4 = draw.bitmap("img/rocket4.png")
            rocket4.x = 100;
            rocket4.y = 550;
            rocket4.scaleX = 0.15;
            rocket4.scaleY = 0.15;
            background.addChild(rocket4)

        } // end of render function - DO NOT DELETE


        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            // TODO 4: Part 2 - Move the tree!
            rocket1.x = rocket1.x - 10;
            if (rocket1.x < - 200) {
                rocket1.x = canvasWidth
            }
            rocket2.x = rocket2.x - 15;
            if (rocket2.x < - 200) {
                rocket2.x = canvasWidth
            }
            rocket3.x = rocket3.x - 17;
            if (rocket3.x < - 200) {
                rocket3.x = canvasWidth
            }
            rocket4.x = rocket4.x - 5;
            if (rocket4.x < - 200) {
                rocket4.x = canvasWidth
            }

            // TODO 5: Part 2 - Parallax


        } // end of update function - DO NOT DELETE



        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;

        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);

        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if ((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
