var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var monkas;
var life;
var air;
function preload() {
	// preload assets
game.load.image('ship', 'assets/img/ship.png');
game.load.atlas('robbie', 'assets/img/robbie.png', 'assets/img/robbie.json');
}

function create() {
		console.log('GamePlay: create');
        air = 100;
        life = 100;
		game.physics.startSystem(Phaser.Physics.Arcade);
 		robot = game.add.sprite(500,300, 'robbie', 'walk1');
 		game.physics.enable(robot);
	 	cursors = game.input.keyboard.createCursorKeys();
		//Adds player character
	 	monkas = game.add.sprite(100,550,'ship'); 
		game.physics.arcade.enable(monkas); //Charcater got some physics
		//monkas.scale.setTo(-.1,.1); //flips
		monkas.anchor.x = .5;
		monkas.anchor.y = .5;

    	monkas.body.gravity.y = 2000;
    	monkas.body.collideWorldBounds = true;
    	airText = game.add.text(16,320, 'Air: ' + air, { fontSize: '32px', fill: '#FDFEFE  ' });
    	timer = game.time.events.loop(200, subAir,this);
		scoreText = game.add.text(16, 280, 'Score: 0', { fontSize: '32px', fill: '#FDFEFE  ' });
		lifeText = game.add.text(200, 280, 'Life: ' + life, { fontSize: '32px', fill: '#FDFEFE  ' });
	}
	function update() {
    	
    	//Controls baddies enemy movemen
    	if(cursors.right.isDown && cursors.up.isDown){ //Polishes movement so you can press two cursors at once 
    		monkas.body.velocity.y = -150;
    		monkas.body.velocity.x = 150
    	}
    	else if(cursors.left.isDown && cursors.up.isDown){
    		monkas.body.velocity.y = -150;
    		monkas.body.velocity.x = -150
			//monkas.scale.setTo(-1,1);
    	}
    	else if(cursors.right.isDown && cursors.down.isDown){
    		monkas.body.velocity.y = 100;
    		monkas.body.velocity.x = 150;
    	}
    	else if(cursors.left.isDown && cursors.down.isDown){
    		monkas.body.velocity.y = 100;
    		monkas.body.velocity.x = -150;
    	}
		
		else if (cursors.right.isDown){ //move right
			monkas.body.velocity.x = 150;
			monkas.body.velocity.y = 0;
	    }
		else if(cursors.left.isDown){ //move left
			monkas.body.velocity.x = -150;
			monkas.body.velocity.y = 0;
		}
		else if(cursors.up.isDown){
			monkas.body.velocity.y = -150
		
		}
		else if(cursors.down.isDown){
			monkas.body.velocity.y = 150;
		}
		else{
			monkas.body.velocity.x = 0;
			monkas.body.velocity.y = 0;
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