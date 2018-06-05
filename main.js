var game = new Phaser.Game(2880, 1536, Phaser.AUTO);
var map;
var layer1;
var layer2;
var foreground1;
var foreground2;
var background;
var midground;
var monkas;
var cursors;
var airOG = 100;
var Mov = 300;
var Up = 250;
var scale = .18;
var camera;
var door;
var enemy;
var greens;
var plant;
var bubble;
var box;
var chest;
var healthOG = 100;

//MAIN MENU STATE

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

		//midground
		midground = game.add.sprite(0, 0, 'Mid');	
		midground.scale.setTo(3, 3);

		//Main beginning menu ----> just the text that shows up
		game.add.text(150, 175, 'SUSHI HUNTERS', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 210, 'By Nick, Brian, and Marcos', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 255, 'PRESS R TO START', { fontSize: '32px', fill: '#7B241C' });


	},
	update: function() {
		// main menu logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
			game.state.start('Story');
		}
	}
}

//STORY STATE

var Story = function(game) {};
Story.prototype = {
	preload: function() {
		console.log('MainMenu: preload');

	},
	create: function() {
		console.log('MainMenu: create');
		game.add.text(115, 210, 'TEMP STORY STATE', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 255, 'PRESS R TO START', { fontSize: '32px', fill: '#7B241C' });
	},
	update: function() {
		// main menu logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
			game.state.start('Level1');
		}
	}
}

//LEVEL 1 STATE

var Level1 = function(game) {};
Level1.prototype = {

	preload: function() {
	    game.load.tilemap('level1', 'assets/img/level1_tiledmap.json', null, Phaser.Tilemap.TILED_JSON);
	    game.load.spritesheet('tilesheet', 'assets/img/tilespritesheet.png', 32, 32);
	    game.load.atlas('MOBSP', 'assets/img/MOBSP.png', 'assets/img/MOBSP.json');
	    game.load.atlas('atlasItems', 'assets/img/tilemapspritesheet.png','assets/img/tilemapspritesheet.json');
	    game.load.atlas('danny', 'assets/img/DannyDeDiver.png', 'assets/img/DannyDeDiver.json');
	    game.load.image('urchin', 'assets/img/urchin.png');

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

	    //smaller pieces to the map(plants/ boxes):

	    //Plants:
	    greens = game.add.group()
	    plant = greens.create(140, 175, 'atlasItems', 'plant');
	    plant = greens.create(160, 660, 'atlasItems', 'plant');
	    plant = greens.create(400, 1045, 'atlasItems', 'plant');
	    plant = greens.create(875, 507, 'atlasItems', 'plant');
	    plant = greens.create(1850, 560, 'atlasItems', 'plant');
	    plant = greens.create(1850, 1120, 'atlasItems', 'plant');
	    plant = greens.create(1800, 1120, 'atlasItems', 'plant');
	    greens.scale.setTo(1.25, 1.25)

	    //BOXES and BARRELS
	    var boxes = game.add.group();
	    box = boxes.create(570, 522, 'atlasItems', 'box_2x1');
	    box = boxes.create(600, 485, 'atlasItems', 'box');
	    box = boxes.create(500, 935, 'atlasItems', 'box_2x1');
	    box = boxes.create(550, 950, 'atlasItems', 'barrel_side');
	    box = boxes.create(570, 950, 'atlasItems', 'barrel_side');
	    box = boxes.create(510, 950, 'atlasItems', 'barrel_side');
	    box = boxes.create(1500, 140, 'atlasItems', 'box_2x1');
	    box = boxes.create(1575, 140, 'atlasItems', 'box_2x1');
	    box = boxes.create(1430, 140, 'atlasItems', 'box_2x1');
	    box = boxes.create(1460, 100, 'atlasItems', 'box_2x1');
	    box = boxes.create(1533, 100, 'atlasItems', 'box_2x1');
	    boxes.scale.setTo(1.25, 1.25);

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

	    //camera for health bar and air
	    var health = game.add.text(20, 20, "Health: " + healthOG, {font: "24px Arial", fill: "#ffffff", align: "left"});
	    health.fixedToCamera = true;
	    health.cameraOffset.setTo(20, 20);

	   	var air = game.add.text(20, 20, "Air: " + airOG, {font: "24px Arial", fill: "#ffffff", align: "left"});
	    air.fixedToCamera = true;
	    air.cameraOffset.setTo(20, 40);

	    //ANIMATIONS:
	    //DIVER:
	    monkas.body.gravity.y = 2000;
	    monkas.body.collideWorldBounds = true;
	    monkas.animations.add('swim', Phaser.Animation.generateFrameNames('swimmer', 1 , 6, '', 1), 10, true);
	    monkas.animations.add('swimIdle', Phaser.Animation.generateFrameNames('swimmer', 1 , 6, '', 1), 5, true);
	    monkas.animations.play('swim');

	    //JELLYFISH:
		//jellyfish.animations.add('bounce', Phaser.Animation.generateFrameNames('Jellyfish', 1 , 2, '', 1), 2, true);
   		//sjellyfish.animations.play('bounce');

 		//Door properties
	    door = game.add.sprite(2840, 1375,'atlasItems', 'door');
	    door.scale.setTo(1, 1.35);
	   	game.physics.arcade.enable(door)

	    //Bubbles and Chests:
	    //Bubbles:
	    var bubbles = game.add.group()
	    bubble = bubbles.create(3700, 2900,  'atlasItems', 'bubble');
	    bubble = bubbles.create(180, 500, 'atlasItems', 'bubble');
	    bubble = bubbles.create(5500, 1700, 'atlasItems', 'bubble');
	    bubbles.scale.setTo(.4, .4);

	    //chests:
	    var chests = game.add.group();
	    var chest = chests.create(1300, 1445, 'atlasItems', 'chest');
	    chests.scale.setTo(.35, .35);

	    //chest = game.add.sprite(2280, 1415, 'atlasItems', 'chest');
	    //chest = game.add.sprite(660, 325, 'atlasItems', 'chest');

	    //ENEMIES START HERE
	    //URCHINS:
	    var urchin1 = game.add.group(); //smaller urchins 
	    urchin1.scale.setTo(.75, .75);
	    var urchin2 = game.add.group(); //bigger urchins
	    var enemy1 = urchin1.create(2200, 1600, 'MOBSP', 'urchin');	 //urchin 1
	    enemy1 = urchin1.create(2200, 1780, 'MOBSP', 'urchin');
	    enemy1 = urchin1.create(600, 570, 'MOBSP', 'urchin');
	    //BIG ONES
	   	var enemy2 = urchin2.create(1630, 1250, 'MOBSP', 'urchin');  //urchin 2
	   	enemy2 = urchin2.create(1330, 1050, 'MOBSP', 'urchin');
	   	enemy2 = urchin2.create(1360, 1310, 'MOBSP', 'urchin');
	   	enemy2 = urchin2.create(800, 400, 'MOBSP', 'urchin');
	   	enemy2 = urchin2.create(2320, 770, 'MOBSP', 'urchin');	 
	   	enemy2 = urchin2.create(2200, 1000, 'MOBSP', 'urchin');
	    
	    //JELLYFISH:
	    var jelly1 = game.add.group(); //smaller ones 
	    jelly1.scale.setTo(.15, .15);
	    var jelly2 = game.add.group(); //bigger ones
	    jelly2.scale.setTo(.25, .25);
	    var enemy3 = jelly1.create(16000, 2500, 'MOBSP', 'Jellyfish1');
	    enemy3 = jelly1.create(17500, 1400, 'MOBSP', 'Jellyfish1');
	    enemy3 = jelly1.create(17500, 3900, 'MOBSP', 'Jellyfish1');
	    enemy3 = jelly1.create(15000, 3500, 'MOBSP', 'Jellyfish1');
	    enemy3 = jelly1.create(16700, 5000, 'MOBSP', 'Jellyfish1');
	    enemy3 = jelly1.create(17500, 6500, 'MOBSP', 'Jellyfish1');
	    enemy3 = jelly1.create(16500, 7300, 'MOBSP', 'Jellyfish1');
	    //BIGGER ONES:
	    var enemy4 = jelly2.create(6000, 1500, 'MOBSP', 'Jellyfish1');
	    enemy4 = jelly2.create(5500, 2600, 'MOBSP', 'Jellyfish1');
	    enemy4 = jelly2.create(4900, 2000, 'MOBSP', 'Jellyfish1');

	    //EELS:
	    var eels = game.add.group();
	    eels.scale.setTo(.6, .6);
	    var enemy5 = eels.create(360, 490, 'MOBSP', 'eelrock10');
	    enemy5 = eels.create(50, 1070, 'MOBSP', 'eelrock10');
	    enemy5 = eels.create(500, 1500, 'MOBSP', 'eelrock10');
	    enemy5.rotation = 300;

	    //SHARK
	    var shark = game.add.group();
	    
	    shark.scale.setTo(.8, .8);
	    var enemy6 = shark.create(1600, 50, 'MOBSP', 'shark1');
	    enemy6 = shark.create(2600, 90, 'MOBSP', 'shark1');
	    game.physics.enable(shark, Phaser.Physics.ARCADE);
	   	shark.body.velocity.x = game.rnd.integerInRange(-500,500);
	    //ANIMATIONS FOR ENEMYS:
	    var framejel1 = Phaser.Animation.generateFrameNames('Jellyfish1', 0, 3, '', 0);
	    //jelly1.callAll(	'animations.add', 'animations', 'jelmov1', framejel1, 5, true, false);
	 	//jelly2.animations.add('jel2', Phaser.Animation.generateFrameNames('Jellyfish', 1 , 4, '', 1), 3, true);
	    //jelly1.callAll('play', null, 'jelmov1');
	    //jelly2.animations.play('jel2');
	},

	update: function() {

			//makes sure player collides with walls of designated layer
			game.physics.arcade.collide(monkas, layer1);

			//when player hits door
			var hitdoor = game.physics.arcade.collide(monkas, door);

			//when player hits enemey
			var hitenemy = game.physics.arcade.collide(monkas, enemy);	

			//when player opens chest
			//var openchest = game.physics.arcade.overlap(monkas, chest);
			//if(shark.)
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


	        //BRIANS CODE GOES HERE

	        //temp state switcher
        	if(hitdoor == true) {
				game.state.start('Level2');
			}

			//function for opening chest
			//if(openchest == true && game.input.keyboard.isDown(Phaser.Keyboard.F)) {
			//	openChest(chest);
			//}

	}
}

//LEVEL 2 STATE

var Level2 = function(game) {};
Level2.prototype = {

	preload: function() {
	    game.load.tilemap('level2', 'assets/img/level2_tiledmap.json', null, Phaser.Tilemap.TILED_JSON);
	    game.load.spritesheet('tilesheet', 'assets/img/tilespritesheet.png', 32, 32);
	    game.load.spritesheet('Anime', 'assets/img/MOBspriteSheet.png')
	    game.load.atlas('atlasItems', 'assets/img/tilemapspritesheet.png','assets/img/tilemapspritesheet.json');
	    game.load.atlas('danny', 'assets/img/DannyDeDiver.png', 'assets/img/DannyDeDiver.json');
	},

	create: function() {
   		
   		//starts physics function
	    game.physics.startSystem(Phaser.Physics.ARCADE);

	    //background
	    background = game.add.sprite(0, 0,'atlasItems', 'starback');
	    background.scale.setTo(3,3);
		
	    //midground:
	    midground = game.add.sprite(0, 0, 'atlasItems', 'midground');
	    midground.scale.setTo(3,3);    

	   	//foregrounds:
	    foreground1 = game.add.sprite(125, 490, 'atlasItems', 'foreground-1');
	    foreground1.scale.setTo(1.75,1.75);    
	    foreground2 = game.add.sprite(2400, 1150, 'atlasItems', 'foreground-2');
	    foreground2.scale.setTo(1.75,1.75);  

	    map = game.add.tilemap('level2');

	    map.addTilesetImage('tilespritesheet', 'tilesheet');

	    //adding layers
	    layer1 = map.createLayer('Tile Layer 1');
	    layer2 = map.createLayer('Tile Layer 2');

	    //initializes layer collision
	    map.setCollisionByExclusion([]);

	    //adding smaller objects
	    //TABLES AND DRAWERS
	    var smallItem = game.add.group();
	    var table = smallItem.create(900, 492, 'atlasItems', 'table');
	    table = smallItem.create(1500, 260, 'atlasItems', 'table');
	    var drawers = smallItem.create(700, 730, 'atlasItems', 'bigdrawers');
	    drawers = smallItem.create(800, 754, 'atlasItems', 'drawers');
	    var box = smallItem.create(640, 965, 'atlasItems', 'box_2x1');
	    box = smallItem.create(640, 940, 'atlasItems', 'barrel_side');
	    box = smallItem.create(660, 940, 'atlasItems', 'barrel_side');
	    box = smallItem.create(680, 940, 'atlasItems', 'barrel_side');
	    box = smallItem.create(700, 980, 'atlasItems', 'barrel_side');
	    box = smallItem.create(1680, 555, 'atlasItems', 'box_2x1');
	    box = smallItem.create(1710, 515, 'atlasItems', 'box');
	    box = smallItem.create(20, 237, 'atlasItems', 'box_2x1');
	    box = smallItem.create(800, 130, 'atlasItems', 'box');
	    smallItem.scale.setTo(1.5, 1.5);

	    //monkas stuff
	    monkas = game.add.sprite(50,1300,'danny', 'swimmer1'); 
	    game.physics.arcade.enable(monkas); //Charcater got some physics
	    monkas.anchor.x = .5;
	    monkas.anchor.y = .5;
	    monkas.scale.setTo(scale, scale);

	    //initializes keyboard
	    cursors = game.input.keyboard.createCursorKeys();

	    //resizes world
	    game.world.setBounds(0, 0, 2880, 1536);

	    //camera
	    game.camera.follow(monkas, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

	    //more diver stuff
	    monkas.body.gravity.y = 2000;
	    monkas.body.collideWorldBounds = true;
	    monkas.animations.add('swim', Phaser.Animation.generateFrameNames('swimmer', 1 , 6, '', 1), 10, true);
	    monkas.animations.play('swim');

	   	//Door properties
	    door = game.add.sprite(2840, 32, 'atlasItems', 'door');
	    door.scale.setTo(1, 1.6);
	    game.physics.arcade.enable(door)

	},

	update: function() {

		//collides player with 
		game.physics.arcade.collide(monkas, layer1);

		//when player hits door
		var hitdoor = game.physics.arcade.collide(monkas, door);	

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


        //BRIANS CODE GOES HERE
                //temp state switcher
        if(hitdoor == true) {
			game.state.start('Level3');
		}
	}
}

//LEVEL 3 STATE

var Level3 = function(game) {};
Level3.prototype = { 
	preload: function() {
	    game.load.tilemap('level3', 'assets/img/level3_tiledmap.json', null, Phaser.Tilemap.TILED_JSON);
	    game.load.spritesheet('tilesheet', 'assets/img/tilespritesheet.png', 32, 32);
	    game.load.spritesheet('Anime', 'assets/img/MOBspriteSheet.png')
	    game.load.atlas('atlasItems', 'assets/img/tilemapspritesheet.png','assets/img/tilemapspritesheet.json');
	    game.load.atlas('danny', 'assets/img/DannyDeDiver.png', 'assets/img/DannyDeDiver.json');
	},

	create: function() {
   	
   		//initializes physics
	    game.physics.startSystem(Phaser.Physics.ARCADE);

	    //background
	    background = game.add.sprite(0, 0,'atlasItems', 'starback');
	    background.scale.setTo(3,3);
		
	    //midground
	    midground = game.add.sprite(0,1536 ,'atlasItems', 'midground');
	    midground.scale.setTo(3,3);  
	    midground.scale.y *= -1;
	   
	    //tile map starts here
	    map = game.add.tilemap('level3');

	    //adds tileset to game
	    map.addTilesetImage('tilespritesheet', 'tilesheet');

	    //creates layers
	    layer1 = map.createLayer('Tile Layer 1');
	    layer2 = map.createLayer('Tile Layer 2');

	    //initializes layer collision
	    map.setCollisionByExclusion([]);

	    //adding smaller objects
	    //COLUMNS:
	    var smallItem = game.add.group();
	    var column = smallItem.create(20, 80, 'atlasItems', 'column');
	    column = smallItem.create(20, 960, 'atlasItems', 'column');
	    //FURNITURE:
	    var drawers = smallItem.create(1100, 730, 'atlasItems', 'bigdrawers');
	    drawers = smallItem.create(1300, 753, 'atlasItems', 'drawers');
	   	drawers = smallItem.create(1600, 730, 'atlasItems', 'bigdrawers');
		drawers = smallItem.create(1750, 753, 'atlasItems', 'drawers');
		var table = smallItem.create(1400, 108, 'atlasItems', 'table');
		table = smallItem.create(300, 980, 'atlasItems', 'table');
		//BOXES
	    var box = smallItem.create(1422, 960, 'atlasItems', 'box_2x1');
	    box = smallItem.create(1470, 935, 'atlasItems', 'barrel_side');
	    box = smallItem.create(1450, 935, 'atlasItems', 'barrel_side');
	    box = smallItem.create(1430, 935, 'atlasItems', 'barrel_side');
	    box = smallItem.create(1400, 978, 'atlasItems', 'barrel_side');
	    box = smallItem.create(1570, 320, 'atlasItems', 'box_2x1');
	    box = smallItem.create(85, 960, 'atlasItems', 'box');
	    box = smallItem.create(1170, 410, 'atlasItems', 'box_2x1');
	    box = smallItem.create(1170, 370, 'atlasItems', 'box');
	    box = smallItem.create(1720, 535, 'atlasItems', 'box_2x1');
	    box = smallItem.create(1750, 495, 'atlasItems', 'box');
	    box = smallItem.create(1450, 102, 'atlasItems', 'barrel_side');
	    box = smallItem.create(1360, 102, 'atlasItems', 'barrel_side');
	    smallItem.scale.setTo(1.5, 1.5);

	    //monkas stuff
	    monkas = game.add.sprite(50 ,120 ,'danny', 'swimmer1'); 
	    game.physics.arcade.enable(monkas); //Charcater got some physics
	    monkas.anchor.x = .5;
	    monkas.anchor.y = .5;
	    monkas.scale.setTo(scale, scale);

	    //initializes keyboard
	    cursors = game.input.keyboard.createCursorKeys();

	    //resizes world
	    game.world.setBounds(0, 0, 2880, 1536);

	    //camera
	    game.camera.follow(monkas, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

	    //more diver stuff
	    monkas.body.gravity.y = 2000;
	    monkas.body.collideWorldBounds = true;
	    monkas.animations.add('swim', Phaser.Animation.generateFrameNames('swimmer', 1 , 6, '', 1), 10, true);
	    monkas.animations.play('swim');

	    //Door properties
	    door = game.add.sprite(2835, 1370, 'atlasItems', 'door');
	    door.scale.setTo(1, 1.2);
	    game.physics.arcade.enable(door)


	},

	update: function() {

		//collides player with layers
		game.physics.arcade.collide(monkas, layer1);

		//when player hits door
		var hitdoor = game.physics.arcade.collide(monkas, door);

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


        //BRIANS CODE GOES HERE

        //temp state switcher
        if(hitdoor == true) {
			game.state.start('Level4');
		}

	}
}

//LEVEL 4 STATE

var Level4 = function(game) {};
Level4.prototype = { 

	preload: function() {
	    game.load.tilemap('level4', 'assets/img/level4_tiledmap.json', null, Phaser.Tilemap.TILED_JSON);
	    game.load.spritesheet('tilesheet', 'assets/img/tilespritesheet.png', 32, 32);
	    game.load.spritesheet('Anime', 'assets/img/MOBspriteSheet.png')
	    game.load.atlas('atlasItems', 'assets/img/tilemapspritesheet.png','assets/img/tilemapspritesheet.json');
	    game.load.atlas('danny', 'assets/img/DannyDeDiver.png', 'assets/img/DannyDeDiver.json');
	},

	create: function() {
   		
   		//initializes physics
	    game.physics.startSystem(Phaser.Physics.ARCADE);

	    //background
	    background = game.add.sprite(0, 0,'atlasItems', 'starback');
	    background.scale.setTo(3,3);
		
	    //midground:
	    midground = game.add.sprite(0, 0, 'atlasItems', 'midground');
	    midground.scale.setTo(3,3);     

	    //adds map
	    map = game.add.tilemap('level4');

	    //adds sheet
	    map.addTilesetImage('tilespritesheet', 'tilesheet');

	    //adds layers
	    layer1 = map.createLayer('Tile Layer 1');
	    layer2 = map.createLayer('Tile Layer 2');

	    //enables layer collision
	    map.setCollisionByExclusion([]);

	    //adding smaller objects
	    //FURNITURE:
	    var smallItem = game.add.group()
	    var drawers = smallItem.create(50, 730, 'atlasItems', 'bigdrawers');
	    drawers = smallItem.create(190, 753, 'atlasItems', 'drawers');
	    var table = smallItem.create(280, 555, 'atlasItems', 'table');
	    table = smallItem.create(1850, 663, 'atlasItems', 'table');
	    //BOXES:
	    var box = smallItem.create(510, 960, 'atlasItems', 'box_2x1');
	    box = smallItem.create(510, 940, 'atlasItems', 'barrel_side');
	    box = smallItem.create(530, 940, 'atlasItems', 'barrel_side');
	    box = smallItem.create(550, 940, 'atlasItems', 'barrel_side');
	    box = smallItem.create(570, 975, 'atlasItems', 'barrel_side');
	    box = smallItem.create(1024, 874, 'atlasItems', 'box_2x1');
	    box = smallItem.create(1024, 834, 'atlasItems', 'box');
	    box = smallItem.create(740, 384, 'atlasItems', 'box');
	    box = smallItem.create(720, 400, 'atlasItems', 'barrel_side');
	    box = smallItem.create(760, 360, 'atlasItems', 'barrel_side');
	    box = smallItem.create(1000, 230, 'atlasItems', 'barrel_side');
	    box = smallItem.create(1825, 150, 'atlasItems', 'box_2x1');
	    box = smallItem.create(1665, 150, 'atlasItems', 'box_2x1');
	    box = smallItem.create(1665, 750, 'atlasItems', 'box');
	    box = smallItem.create(1350, 385, 'atlasItems', 'box');
	    smallItem.scale.setTo(1.5, 1.5);

	    //monkas stuff
	    monkas = game.add.sprite(100,1400,'danny', 'swimmer1'); 
	    game.physics.arcade.enable(monkas); //Charcater got some physics
	    monkas.anchor.x = .5;
	    monkas.anchor.y = .5;
	    monkas.scale.setTo(scale, scale);

	    //initializes keyboard
	    cursors = game.input.keyboard.createCursorKeys();

	    //resizes world
	    game.world.setBounds(0, 0, 2880, 1536);

	    //camera
	    game.camera.follow(monkas, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

	    monkas.body.gravity.y = 2000;
	    monkas.body.collideWorldBounds = true;
	    monkas.animations.add('swim', Phaser.Animation.generateFrameNames('swimmer', 1 , 6, '', 1), 10, true);
	    monkas.animations.play('swim');

	    //Door properties
	    door = game.add.sprite(2837, 90, 'atlasItems', 'door');
	    door.scale.setTo(1, 1.15);
	    game.physics.arcade.enable(door)


	},

	update: function() {

		//collides player with layers
		game.physics.arcade.collide(monkas, layer1);

		//when player hits door
		var hitdoor = game.physics.arcade.collide(monkas, door);

		//Loop over the keys ------------> FOR FIRING GUN
		//for (var index in phaserKeys) {
		//	//Save a reference to the current key
		//	var key = phaserKeys[index];
		//	// If the key was just pressed, fire a trident
		//	if (key.justDown && overheat == false) {
		//		firetrident();
		//	}
		//}
/*
		//Game.input.activePointer is either the first finger touched, or the mouse
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
*/
		//PLAYER MOVEMENT:
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


        //BRIAN'S CODE GOES HERE

        //temp state switcher
        if(hitdoor == true) {
			game.state.start('GameOver');
		}


	}
}

var GameOver = function(game) {};
GameOver.prototype = {
	preload: function() {
		console.log('MainMenu: preload');


	},
	create: function() {
		console.log('MainMenu: create');
		game.add.text(115, 210, 'TEMP GAMEOVER STATE', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 255, 'PRESS R TO START', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 300, 'Goes Back To Lvl 1 ATM', { fontSize: '32px', fill: '#7B241C' });
	},
	update: function() {
		// main menu logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
			game.state.start('Level1');
		}
	}
}




function openChest(chest) {
	chest.destroy();
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

function killJelly(){
	jelly.kill();
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

function resettrident(trident) {
	trident.kill();
}





//add states to StateManager and start MainMenu
game.state.add('MainMenu', MainMenu);
game.state.add('Story', Story);
game.state.add('Level1', Level1);
game.state.add('Level2', Level2);
game.state.add('Level3', Level3);
game.state.add('Level4', Level4);
game.state.add('GameOver', GameOver);
game.state.start('Level1');