var game = new Phaser.Game(1200, 640, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var monkas;
var life;
var air;
var Mov = 300;
var Up = 250;
var scale = .22;
function preload() {
	// preload assets
	game.load.atlas('danny', 'assets/img/DannyDeDiver.png', 'assets/img/DannyDeDiver.json');
	game.load.atlas('robbie', 'assets/img/robbie.png', 'assets/img/robbie.json');
	game.load.image('Back', 'assets/img/background.png');
	game.load.image('Mid', 'assets/img/midground.png');
	game.load.image('ground', 'assets/img/ground.png');
	game.load.image('slant', 'assets/img/slant.png');
	game.load.image('rock', 'assets/img/rock.png');
	game.load.image('urchin', 'assets/img/urchin.png');
}

function create() {
		console.log('GamePlay: create');
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
	var rock = platforms.create(700, 546, 'rock');
	rock.body.immovable = true; 

	rock = platforms.create(990	, 546, 'rock');
	rock.body.immovable = true;

	rock = platforms.create(1090, 546, 'rock');
	rock.body.immovable = true; 

	rock = platforms.create(150, 325, 'rock');
	rock.body.immovable = true;

	rock = platforms.create(800, 500, 'rock');
	rock.scale.y *= -1;
	rock.body.immovable = true;


	//slant placement
	var slant = platforms.create(0, 546, 'slant');
	slant.body.immovable = true;

	slant = platforms.create(600, 315 , 'slant');
	slant.body.immovable = true;

	slant = platforms.create(1000, 315, 'slant');
	slant.scale.x *= -1;
	slant.body.immovable = true;

	slant = platforms.create(100, 125, 'slant');
	slant.body.immovable = true;


	//urchin spawns
	var urchin = platforms.create(500, 100, 'urchin');
	urchin.scale.setTo(1.25, 1.25);
	urchin.body.immovable = true;

	urchin = platforms.create(790, 125, 'urchin');
	urchin.scale.setTo(1.25, 1.25);
	urchin.body.immovable = true;

	urchin = platforms.create(200, 520, 'urchin');
	urchin.scale.setTo(1.25, 1.25);
	urchin.body.immovable = true;

	urchin = platforms.create(1105, 520, 'urchin');
	urchin.scale.setTo(1.25, 1.25);
	urchin.body.immovable = true;
 		robot = game.add.sprite(500,300, 'robbie', 'walk1');
 		game.physics.enable(robot);
	 	cursors = game.input.keyboard.createCursorKeys();
		//Adds player character
	 	monkas = game.add.sprite(100,530,'danny', 'swimmer1'); 
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

	}
	function update() {
    	
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
		if(air == 0){
			air = 100;
			life = life - 1;
			lifeText.text = 'Life: ' + life;
		}
		game.physics.arcade.overlap(monkas, robot, airF, null, this);
		
	}
	function subAir(){
		air = air - 25;
		airText.text = 'Air: ' + air;
	}
	function airF(monkas, robot){
		air = 100;
		airText.text = 'Air: ' + air;
	}