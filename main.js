var game = new Phaser.Game(1200, 640, Phaser.AUTO);
	
//global variables 
var monkas;
var life;
var air;
var Mov = 300;
var Up = 250;
var scale = .18;
var bubbleS;

// define MainMenu state and methods
var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
		console.log('MainMenu: preload');
		
		//loading assets
		game.load.image('Back', 'assets/img/background.png');
		game.load.image('Mid', 'assets/img/midground.png');
	},
	create: function() {
		console.log('MainMenu: create');

		//Background 1
		var background1 = game.add.sprite(0, 0, 'Back');
		background1.scale.setTo(2.5, 2.5);

		//Background 2
		var background2 = game.add.sprite(720, 0, 'Back');
		background2.scale.setTo(2.5, 2.5);

		//midground
		var midground = game.add.sprite(0, 0, 'Mid');	
		midground.scale.setTo(1.25, 1.25);

		//Main beginning menu ----> just the text that shows up
		game.add.text(150, 175, 'SUSHI HUNTERS', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 210, 'By Nick, Brian, and Marcos', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 255, 'PRESS SPACE TO START', { fontSize: '32px', fill: '#7B241C' });


	},
	update: function() {
		// main menu logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GamePlay');
		}
	}
}

//define GamePlay state and methods
var GamePlay = function(game) {};
GamePlay.prototype = {
	preload: function() {
		console.log('GamePlay: preload');
		
		// preload assets
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
	},

	create: function() {
		console.log('GamePlay: create');

    bubbleS = game.add.audio('bubbleS');
    air = 100;
    life = 100;

	game.physics.startSystem(Phaser.Physics.Arcade);

	var background1 = game.add.sprite(0, 0, 'Back');
	background1.scale.setTo(2.5, 2.5);

	//Background 2
	var background2 = game.add.sprite(720, 0, 'Back');
	background2.scale.setTo(2.5, 2.5);

	//midground
	var midground = game.add.sprite(0, 0, 'Mid');	
	midground.scale.setTo(1.25, 1.25);

	//makes ground group
	platforms = game.add.group();

	//enable physics on platform group
	platforms.enableBody = true;

	//ground is on 546
	var ground = platforms.create(300, 600, 'ground');	
	ground.body.immovable = true;

 	ground = platforms.create(100, 546, 'ground');
	ground.body.immovable = true; 

	ground = platforms.create(500, 600, 'ground');
	ground.body.immovable = true; 

	ground = platforms.create(800, 600, 'ground');
	ground.body.immovable = true; 

	ground = platforms.create(400, 400, 'ground');
	ground.body.immovable = true;

	ground = platforms.create(200, 350, 'ground');
	ground.body.immovable = true;

	ground = platforms.create(0, 350, 'ground');
	ground.body.immovable = true;

	ground = platforms.create(600, 400, 'ground');
	ground.body.immovable = true; 

	ground = platforms.create(700, 315, 'ground');
	ground.body.immovable = true; 

	ground = platforms.create(1000, 150, 'ground');
	ground.body.immovable = true; 

	ground = platforms.create(800, 150, 'ground');
	ground.body.immovable = true;

	ground = platforms.create(600, 125, 'ground');
	ground.body.immovable = true;

	ground = platforms.create(400, 125, 'ground');
	ground.body.immovable = true;

	ground = platforms.create(200, 125, 'ground');
	ground.body.immovable = true;


	//rock placement
	var rock = platforms.create(700, 560, 'rock');
	rock.body.immovable = true; 

	rock = platforms.create(990	, 546, 'rock');
	rock.body.immovable = true;

	rock = platforms.create(1090, 546, 'rock');
	rock.body.immovable = true; 

	rock = platforms.create(150, 325, 'rock');
	rock.body.immovable = true;


	//makes urhin group
	urchins = game.add.group();

	//enable physics on platform group
	urchins.enableBody = true;

	//urchin spawns
	var urchin = urchins.create(500, 100, 'urchin');
	urchin.scale.setTo(1.25, 1.25);
	urchin.body.immovable = true;

	urchin = urchins.create(790, 125, 'urchin');
	urchin.scale.setTo(1.25, 1.25);
	urchin.body.immovable = true;

	urchin = urchins.create(200, 520, 'urchin');
	urchin.scale.setTo(1.25, 1.25);
	urchin.body.immovable = true;

	urchin = urchins.create(1105, 520, 'urchin');
	urchin.scale.setTo(1.25, 1.25);
	urchin.body.immovable = true;
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
    	monkas.animations.play('swim');
    	airText = game.add.text(16,320, 'Air: ' + air, { fontSize: '32px', fill: '#FDFEFE  ' });
    	timer = game.time.events.loop(3000, subAir,this);
		scoreText = game.add.text(16, 280, 'Score: 0', { fontSize: '32px', fill: '#FDFEFE  ' });
		lifeText = game.add.text(200, 280, 'Life: ' + life, { fontSize: '32px', fill: '#FDFEFE  ' });
		
	},

	update: function() {
		//collides players with platforms
    	var hitPlatform = game.physics.arcade.collide(monkas, platforms);

    	//touching chest gives game over
   		game.physics.arcade.overlap(monkas, chest1, gameOver, null, this);

    	//Controls baddies enemy movemen
    	if(cursors.right.isDown && cursors.up.isDown){ //Polishes movement so you can press two cursors at once 
    		monkas.body.velocity.y = -Mov;
    		monkas.body.velocity.x = Mov;
    		monkas.scale.setTo(scale,scale);
    		monkas.animations.play('swim');
    	}
    	else if(cursors.left.isDown && cursors.up.isDown){
    		monkas.body.velocity.y = -Mov;
    		monkas.body.velocity.x = -Mov
    		monkas.scale.setTo(-scale,scale);
    		monkas.animations.play('swim');
    	}
    	else if(cursors.right.isDown && cursors.down.isDown){
    		monkas.body.velocity.y = Up;
    		monkas.body.velocity.x = Mov;
    		monkas.scale.setTo(scale,scale);
    		monkas.animations.play('swim');
    	}
    	else if(cursors.left.isDown && cursors.down.isDown){
    		monkas.body.velocity.y = Up;
    		monkas.body.velocity.x = -Mov;
    		monkas.scale.setTo(-scale,scale);
    		monkas.animations.play('swim');
    	}
		
		else if (cursors.right.isDown){ //move right
			monkas.body.velocity.x = Mov;
			monkas.body.velocity.y = 0;
			monkas.scale.setTo(scale,scale);
			monkas.animations.play('swim');
	    }
		else if(cursors.left.isDown){ //move left
			monkas.body.velocity.x = -Mov;
			monkas.body.velocity.y = 0;
			monkas.scale.setTo(-scale,scale);
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
			monkas.animations.stop(null,true);
		}
		//if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
		//	game.physics.arcade.overlap(monkas, chest1, endGame, null, this);
		//}
		if(air == 0){
			air = 100;
			life = life - 1;
			lifeText.text = 'Life: ' + life;
		}
		if(game.physics.arcade.overlap(monkas, robot, airF, null, this)){
			bubbleS.play('', 0, 3, false);
		}

		//Moves to game over scene
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GameOver');
		}
		
	}
}

// define GameOver state and methods
var GameOver = function(game) {};
GameOver.prototype = {
	preload: function() {
		console.log('GameOver: preload');

		//loading assets
		game.load.image('Back', 'assets/img/background.png');
		game.load.image('Mid', 'assets/img/midground.png');

	},
	create: function() {
		console.log('GameOver: create');

		//Background 1
		var background1 = game.add.sprite(0, 0, 'Back');
		background1.scale.setTo(2.5, 2.5);

		//Background 2
		var background2 = game.add.sprite(720, 0, 'Back');
		background2.scale.setTo(2.5, 2.5);

		//midground
		var midground = game.add.sprite(0, 0, 'Mid');	
		midground.scale.setTo(1.25, 1.25);
		
		//says GAME OVER after gameplay
		game.add.text(125, 150, 'GAME OVER', { fontSize: '64px', fill: '#7B241C' });

	},
	update: function() {
		// GameOver logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('MainMenu');
		}
	}
}

function subAir(){
	air = air - 25;
	airText.text = 'Air: ' + air;
}
function airF(monkas, robot){
	air = 100;
	airText.text = 'Air: ' + air;

}

//Function that changes gameplay state to game over
function gameOver(monkas, chest1) {
	game.state.start('GameOver');
}

//add states to StateManager and start MainMenu
game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');