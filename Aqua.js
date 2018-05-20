var GAME_WIDTH = 450;
var GAME_HEIGHT = 700;

//Game Variables
var tridents;
var mouseTouchDown = false;
var monkas;
var life;
var air;
var Mov = 300;
var Up = 250;
var scale = .18;
var bubbleS;
var way = true;
var overheat = false;
var tooMuchS = 0;

// Create a Phaser game instance
var game = new Phaser.Game(
	GAME_WIDTH,
	GAME_HEIGHT,
	Phaser.AUTO,
	'container',
	{ preload: preload, create: create, update: update, init: init, render: render }
);

// Preload assets
function preload() {
	game.load.atlas('danny', 'assets/img/DannyDeDiver.png', 'assets/img/DannyDeDiver.json');
		game.load.image('robbie', 'assets/img/bubble.png');
		game.load.image('Back', 'assets/img/background.png');
		game.load.image('Mid', 'assets/img/midground.png');
		game.load.image('ground', 'assets/img/ground.png');
		game.load.image('slant', 'assets/img/slant.png');
		game.load.image('rock', 'assets/img/rock.png');
		game.load.image('urchin', 'assets/img/urchin.png');
		game.load.image('chest', 'assets/img/chest.png');
		game.load.audio('bubbleS', ['assets/audio/Acid Bubble.wav']);
		game.load.image('trident', 'assets/img/trident.png')

}

// Init
function init() {
	// Listen to space & enter keys
	var keys = [Phaser.KeyCode.SPACEBAR, Phaser.KeyCode.ENTER];
	// Create Phaser.Key objects for listening to the state
	phaserKeys = game.input.keyboard.addKeys(keys);
	// Capture these keys to stop the browser from receiving this event
	game.input.keyboard.addKeyCapture(keys);
}

// Assets are available in create
function create() {
	//Trident firing code obtained from Sabatino Masala on codecaptain.io
	// Create the group using the group factory
	tridents = game.add.group();
	// To move the sprites later on, we have to enable the body
	tridents.enableBody = true;
	// We're going to set the body type to the ARCADE physics, since we don't need any advanced physics
	tridents.physicsBodyType = Phaser.Physics.ARCADE;
	/*

		This will create 20 sprites and add it to the stage. They're inactive and invisible, but they're there for later use.
		We only have 20 trident bullets available, and will 'clean' and reset they're off the screen.
		This way we save on precious resources by not constantly adding & removing new sprites to the stage

	*/
	tridents.createMultiple(20, 'trident');

	tridents.callAll('events.onOutOfBounds.add', 'events.onOutOfBounds', resettrident);
	// Same as above, set the anchor of every sprite to 0.5, 1.0
	tridents.callAll('anchor.setTo', 'anchor', 0.5, 1.0);

	// This will set 'checkWorldBounds' to true on all sprites in the group
	tridents.setAll('checkWorldBounds', true);
	console.log('GamePlay: create');

    bubbleS = game.add.audio('bubbleS');
    air = 100;
    life = 100;

	game.physics.startSystem(Phaser.Physics.Arcade);

	
 		robot = game.add.sprite(500,300, 'robbie');
 		chest1 = game.add.sprite(1100, 100, 'chest');
 		chest1.scale.setTo(.3,.3);
 		robot.scale.setTo(.3,.3);
 		game.physics.enable(robot);
 		//==game.physcis.enable('chest1');
	 	cursors = game.input.keyboard.createCursorKeys();
		//Adds player character
	 	monkas = game.add.sprite(100,500,'danny', 'swimmer1'); 
		game.physics.arcade.enable(monkas); //Charcater got some physics
		monkas.anchor.x = .5;
		monkas.anchor.y = .5;
		monkas.scale.setTo(scale,scale);

    	monkas.body.gravity.y = 2000;
    	monkas.body.collideWorldBounds = true;
    	monkas.animations.add('swim', Phaser.Animation.generateFrameNames('swimmer', 1 , 6, '', 1), 10, true);
    	monkas.animations.add('swimIdle', Phaser.Animation.generateFrameNames('swimmer', 1 , 6, '', 1), 5, true);
    	monkas.animations.play('swim');
    	airText = game.add.text(16,320, 'Air: ' + air, { fontSize: '32px', fill: '#FDFEFE  ' });
    	timer = game.time.events.loop(3000, subAir,this);
		overheatText = game.add.text(16, 280, 'Overheat: 0', { fontSize: '32px', fill: '#FDFEFE  ' });
		lifeText = game.add.text(200, 280, 'Life: ' + life, { fontSize: '32px', fill: '#FDFEFE  ' });
		
}

function resettrident(trident) {
	trident.kill();
}

// Update
function update() {

	// Loop over the keys
	for (var index in phaserKeys) {
		// Save a reference to the current key
		var key = phaserKeys[index];
		// If the key was just pressed, fire a trident
		if (key.justDown && overheat == false) {
			firetrident();
		}
	}

	// Game.input.activePointer is either the first finger touched, or the mouse
	if (game.input.activePointer.isDown) {
		// We'll manually keep track if the pointer wasn't already down
		if (!mouseTouchDown) {
			touchDown();
		}
	} else {
		if (mouseTouchDown) {
			touchUp();
		}
	}
	if(cursors.right.isDown && cursors.up.isDown){ //Polishes movement so you can press two cursors at once 
    		monkas.body.velocity.y = -Mov;
    		monkas.body.velocity.x = Mov;
    		monkas.scale.setTo(scale,scale);
    		way = true;
    		monkas.animations.play('swim');
    	}
    	else if(cursors.left.isDown && cursors.up.isDown){
    		monkas.body.velocity.y = -Mov;
    		monkas.body.velocity.x = -Mov
    		monkas.scale.setTo(-scale,scale);
    		way = false;
    		monkas.animations.play('swim');
    	}
    	else if(cursors.right.isDown && cursors.down.isDown){
    		monkas.body.velocity.y = Up;
    		monkas.body.velocity.x = Mov;
    		monkas.scale.setTo(scale,scale);
    		way = true;
    		monkas.animations.play('swim');
    	}
    	else if(cursors.left.isDown && cursors.down.isDown){
    		monkas.body.velocity.y = Up;
    		monkas.body.velocity.x = -Mov;
    		monkas.scale.setTo(-scale,scale);
    		way = false;
    		monkas.animations.play('swim');
    	}
		
		else if (cursors.right.isDown){ //move right
			monkas.body.velocity.x = Mov;
			monkas.body.velocity.y = 0;
			monkas.scale.setTo(scale,scale);
			way = true;
			monkas.animations.play('swim');
	    }
		else if(cursors.left.isDown){ //move left
			monkas.body.velocity.x = -Mov;
			monkas.body.velocity.y = 0;
			monkas.scale.setTo(-scale,scale);
			way = false;
			monkas.animations.play('swim');
		}
		else if(cursors.up.isDown){
			monkas.body.velocity.y = -Mov;
			monkas.animations.play('swim');
		
		}
		else if(cursors.down.isDown){
			monkas.body.velocity.y = Mov;
			monkas.animations.play('swim');
		}
		else{
			monkas.body.velocity.x = 0;
			monkas.body.velocity.y = 0;
			monkas.animations.play('swimIdle');
		}
		if(air == 0){
			air = 100;
			life = life - 1;
			lifeText.text = 'Life: ' + life;
		}
		if(game.physics.arcade.overlap(monkas, robot, airF, null, this)){
			bubbleS.play('', 0, 3, false);
		}
		if(tooMuchS > 0){
			tooMuchS = tooMuchS - 5;
			overheatText.text = 'Overheat: ' + tooMuchS;
		}
		if(tooMuchS <= 0 ){
			tooMuchS = 0;
			overheatText.text = 'Overheat: ' + tooMuchS;
			overheat = false;
		}
		if(tooMuchS >= 1000){
			overheat = true;
		}

		//Moves to game over scene

}
function subAir(){
	air = air - 25;
	airText.text = 'Air: ' + air;
}
function airF(monkas, robot){
	air = 100;
	airText.text = 'Air: ' + air;

}
function touchDown() {
	// Set touchDown to true, so we only trigger this once
	mouseTouchDown = true;
		firetrident();	
}

function touchUp() {
	// Set touchDown to false, so we can trigger touchDown on the next click
	mouseTouchDown = false;
}

function firetrident() {
	// Get the first trident that's inactive, by passing 'false' as a parameter
	tooMuchS = tooMuchS + 250;
	overheatText.text = 'Overheat: ' + tooMuchS;
	var trident = tridents.getFirstExists(false);
	if (trident) {
		
		if(way == true){
		// If we have a trident, set it to the starting position
		trident.reset(monkas.x + 50, monkas.y + 12);
		// Give it a velocity of -500 so it starts shooting
		trident.body.velocity.x = 400;
		trident.scale.setTo(.5,.5);
	}
		else {
		trident.reset(monkas.x-50, monkas.y + 12);
		// Give it a velocity of -500 so it starts shooting
		trident.body.velocity.x = -400;
		trident.scale.setTo(-.5,.5);
		}
	}

}

// Render some debug text on screen
function render() {
	game.debug.text('Click or press space / enter to shoot', 10, 55);
}