//LEVEL 1 STATE

//FOR SHOOTING
// Init
function init() {
	// Listen to space & enter keys
	var keys = [Phaser.KeyCode.SPACEBAR, Phaser.KeyCode.ENTER];
	// Create Phaser.Key objects for listening to the state
	phaserKeys = game.input.keyboard.addKeys(keys);
	// Capture these keys to stop the browser from receiving this event
	game.input.keyboard.addKeyCapture(keys);
}



var Level1 = function(game) {};
Level1.prototype = {

	preload: function() {
	    game.load.tilemap('level1', 'assets/img/level1_tiledmap.json', null, Phaser.Tilemap.TILED_JSON);
	    game.load.spritesheet('tilesheet', 'assets/img/tilespritesheet.png', 16, 16);
	    game.load.atlas('MOBSP', 'assets/img/MOBSP.png', 'assets/img/MOBSP.json');
	    game.load.atlas('atlasItems', 'assets/img/tilemapspritesheet.png','assets/img/tilemapspritesheet.json');
	    game.load.atlas('danny', 'assets/img/DannyDeDiver.png', 'assets/img/DannyDeDiver.json');
	},



	create: function() {
	   	
		//starts physics 
	    game.physics.startSystem(Phaser.Physics.ARCADE);

	    //BACKGROUND:
	    //background Top half
	    background = game.add.tileSprite(0, 0, game.width, game.height, 'atlasItems', 'background');
	    background.scale.setTo(3, 3);
	    background = game.add.tileSprite(864, 0, game.width, game.height, 'atlasItems', 'background');
	    background.scale.setTo(3, 3);
	    background = game.add.tileSprite(1728, 0, game.width, game.height, 'atlasItems', 'background');
	    background.scale.setTo(3, 3);
		background = game.add.tileSprite(2592, 0, game.width, game.height, 'atlasItems', 'background');
		background.scale.setTo(3, 3);

	    //background lower half
	    background = game.add.tileSprite(0, 768, game.width, game.height, 'atlasItems', 'background');
	    background.scale.setTo(3, 3);
		background = game.add.tileSprite(864, 768, game.width , game.height , 'atlasItems', 'background');
		background.scale.setTo(3, 3);
		background = game.add.tileSprite(1728, 768, game.width , game.height , 'atlasItems', 'background');
		background.scale.setTo(3, 3);
		background = game.add.tileSprite(2592, 768, game.width , game.height , 'atlasItems', 'background');
		background.scale.setTo(3, 3);

	    //midground
	    midground = game.add.sprite(0, 0, 'atlasItems', 'midground');
 		midground.scale.setTo(3, 3);
 		
 		//TILE MAP:
	    //adds tile mp
	    map = game.add.tilemap('level1');
	    //add tileset to tilemap
	    map.addTilesetImage('tilespritesheet', 'tilesheet');
	    //initializes the layers 
	    layer1 = map.createLayer('Tile Layer 1');
	    layer2 = map.createLayer('Tile Layer 2');
	    //initializes layer collision
	    map.setCollisionByExclusion([]);


	    //enemies being added
	    enemies = game.add.group();
	    enemies.enableBody = true;	//anything in group will have physics applied

	    map.createFromObjects('enemies', 1275, 'MOBSP', 'Jellyfish1', true, true, enemies, Jellyfish);
	    map.createFromObjects('enemies', 1270, 'MOBSP', 'eelrock11', true, true, enemies);
	    map.createFromObjects('enemies', 1300, 'MOBSP', 'urchin', true, true, enemies);

	    //furniture being added
	    furniture = game.add.group();
	    map.createFromObjects('furniture', 1253, 'atlasItems', 'box_2x1', true, true, furniture);
	    map.createFromObjects('furniture', 1252, 'atlasItems', 'box', true, true, furniture);
	    map.createFromObjects('furniture', 1250, 'atlasItems', 'barrel_side', true, true, furniture);
	    map.createFromObjects('furniture', 1301, 'atlasItems', 'plant', true, true, furniture);

	    //creates bubbles/ hitboxes
	    bubbles = game.add.group();
	    bubbles.enableBody = true; //sets physics on bubbles
	    var bubble = bubbles.create(3000, 2400, 'atlasItems', 'bubble');
	    bubble.body.setSize(40, 60, 30, 50);
	    bubble = bubbles.create(120, 400, 'atlasItems', 'bubble');
	    bubble.body.setSize(40, 60, 50, 30);
	    bubble = bubbles.create(4400, 1300, 'atlasItems', 'bubble');
	    bubble.body.setSize(40, 60, 50, 30);

	    
	    //bubble.body.setSize(100, 100);
	    bubbles.scale.setTo(0.5, 0.5);
	    
	    //Divers Code stuff
	    monkas = game.add.sprite(50,1350,'danny', 'swimmer1'); 
	    game.physics.arcade.enable(monkas); //Charcater got some physics
	    monkas.anchor.x = .5;
	    monkas.anchor.y = .5;
	    monkas.scale.setTo(scale, scale);

	    //initializes keyboard controls
	    cursors = game.input.keyboard.createCursorKeys();

	    //resizes world
	    game.world.setBounds(0, 0, 2880, 1536);

	    //camera
	    game.camera.follow(monkas, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);






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







	    //camera for health bar and air
	    lifeText = game.add.text(20, 20, "Life: " + life, {font: "24px Arial", fill: "#ffffff", align: "left"});
	    lifeText.fixedToCamera = true;
	    lifeText.cameraOffset.setTo(20, 20);

	   	airText = game.add.text(20, 20, "Air: " + air, {font: "24px Arial", fill: "#ffffff", align: "left"});
	    airText.fixedToCamera = true;
	    airText.cameraOffset.setTo(20, 40);

	    timer = game.time.events.loop(3000, subAir,this);

	    //ANIMATIONS:
	    //DIVER:
	    monkas.body.gravity.y = 2000;
	    monkas.body.collideWorldBounds = true;
	    monkas.animations.add('swim', Phaser.Animation.generateFrameNames('swimmer', 1 , 6, '', 1), 10, true);
	    monkas.animations.add('swimIdle', Phaser.Animation.generateFrameNames('swimmer', 1 , 6, '', 1), 5, true);

 		//Door properties
	    door = game.add.sprite(2840, 1375,'atlasItems', 'door');
	    door.scale.setTo(1, 1.35);
	   	game.physics.arcade.enable(door)


	},

	update: function() {

			//makes sure player collides with walls of designated layer
			game.physics.arcade.collide(monkas, layer1);

			//when player hits door
			var hitdoor = game.physics.arcade.collide(monkas, door);

			//when player hits enemey
			game.physics.arcade.overlap(monkas,enemies,subLife,null,this);	

			//when player opens chest
			//var openchest = game.physics.arcade.overlap(monkas, chest);

			//ANIMATIONS:
			//jelly1.callAll('play', null, 'jelmov1');

			//Movement for jellyfish


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

	        //AIR 
	        if(air <= 0){
				life = life - .2;
				lifeText.text = 'Life: ' + life;
			}

			if(life <= 0) {
				game.state.start('GameOver');
			}

	        //temp state switcher
        	if(hitdoor == true) {
				game.state.start('Level2');
			}

			//if player touches enemy

			if(game.physics.arcade.overlap(monkas, bubbles, airF, null, this)) {

			}

			//function for opening chest
			//if(openchest == true && game.input.keyboard.isDown(Phaser.Keyboard.F)) {
			//	openChest(chest);
			//}

	}

}
function subLife(monkas,enemies){
		enemies.destroy();
		life = life - 25;
		lifeText.text = "Life: " + life;	
}