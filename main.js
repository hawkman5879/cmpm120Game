var game = new Phaser.Game(800, 600, Phaser.AUTO);
var map;
var layer1;
var layer2;
var foreground1;
var foreground2;
var background;
var monkas;
var cursors;
var air;
var Mov = 300;
var Up = 250;
var scale = .18;
var camera;
var items;

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
		var midground = game.add.sprite(0, 0, 'Mid');	
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
	    game.load.image('foreground1', 'assets/img/foreground-1.png');
	    game.load.image('foreground2', 'assets/img/foreground-2.png');
	    game.load.image('background', 'assets/img/background.png');
	    game.load.image('midground', 'assets/img/midground.png');
	    game.load.image('plant', 'assets/img/plant.png');
	    game.load.image('box', 'assets/img/box.png');
	    game.load.image('bigbox', 'assets/img/box_2x1.png');
	    game.load.image('barrel', 'assets/img/barrel_side.png');
	    game.load.atlas('danny', 'assets/img/DannyDeDiver.png', 'assets/img/DannyDeDiver.json');
	},

	create: function() {
	   	
		//starts physics 
	    game.physics.startSystem(Phaser.Physics.ARCADE);

	    //background Top half
	    background = game.add.sprite(0, 0, 'background');
	    background.scale.setTo(3,3);
	    background = game.add.sprite(864, 0, 'background');
	    background.scale.setTo(3,3);
	    background = game.add.sprite(1728, 0, 'background');
	    background.scale.setTo(3,3);
	    background = game.add.sprite(2592, 0, 'background');
	    background.scale.setTo(3,3);

	    //background lower half
	    background = game.add.sprite(0, 768, 'background');
	    background.scale.setTo(3,3);
	    background = game.add.sprite(864, 768, 'background');
	    background.scale.setTo(3,3);
	    background = game.add.sprite(1728, 768, 'background');
	    background.scale.setTo(3,3);
	    background = game.add.sprite(2592, 768, 'background');
	    background.scale.setTo(3,3);

	    //midground
	    midground = game.add.sprite(0, 0, 'midground');
	    midground.scale.setTo(3,3);    

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
	    items = game.add.sprite(160, 220, 'plant');
	    items.scale.setTo(1.25, 1.25);
	    items = game.add.sprite(160, 830, 'plant');
	    items.scale.setTo(1.25, 1.25);
	    items = game.add.sprite(400, 830, 'plant');
	    items.scale.setTo(1.25, 1.25);
	    items = game.add.sprite(1100, 630, 'plant');
	    items.scale.setTo(1.25, 1.25);
	    items = game.add.sprite(2310, 700, 'plant');
	    items.scale.setTo(1.25, 1.25);
	    items = game.add.sprite(2310, 1400, 'plant');
	    items.scale.setTo(1.25, 1.25);
	    items = game.add.sprite(2240, 1400, 'plant');
	    items.scale.setTo(1.25, 1.25);

	    //boxes
	    items = game.add.sprite(710, 650, 'bigbox');
	    items.scale.setTo(1.25, 1.25);
	    items = game.add.sprite(750, 600, 'box');
	    items.scale.setTo(1.25, 1.25);
	    items = game.add.sprite(710, 1170, 'bigbox');
	    items.scale.setTo(1.25, 1.25);
	    items = game.add.sprite(690, 1190, 'barrel');
	    items.scale.setTo(1.25, 1.25);
	    items = game.add.sprite(740, 1190, 'barrel');
	    items.scale.setTo(1.25, 1.25);
	    items = game.add.sprite(760, 1190, 'barrel');
	    items.scale.setTo(1.25, 1.25);
	    items = game.add.sprite(800, 1190, 'barrel');
	    items.scale.setTo(1.25, 1.25);
	    items = game.add.sprite(2000, 175, 'bigbox');
	    items.scale.setTo(1.25, 1.25);
	    items = game.add.sprite(1820, 175, 'bigbox');
	    items.scale.setTo(1.25, 1.25);
	    items = game.add.sprite(1900, 175, 'bigbox');
	    items.scale.setTo(1.25, 1.25);
	    items = game.add.sprite(1870, 125, 'bigbox');
	    items.scale.setTo(1.25, 1.25);
	    items = game.add.sprite(1950, 125, 'bigbox');
	    items.scale.setTo(1.25, 1.25);

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

	    //more diver movement 
	    monkas.body.gravity.y = 2000;
	    monkas.body.collideWorldBounds = true;
	    monkas.animations.add('swim', Phaser.Animation.generateFrameNames('swimmer', 1 , 6, '', 1), 10, true);
	    monkas.animations.play('swim');


	},

	update: function() {

			//makes sure player collides with walls of designated layer
			game.physics.arcade.collide(monkas, layer1);

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
        if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
			game.state.start('Level2');
		}

	}
}

//LEVEL 2 STATE

var Level2 = function(game) {};
Level2.prototype = {

	preload: function() {
	    game.load.tilemap('level2', 'assets/img/level2_tiledmap.json', null, Phaser.Tilemap.TILED_JSON);
	    game.load.spritesheet('tilesheet', 'assets/img/tilespritesheet.png', 32, 32);
	    game.load.image('foreground1', 'assets/img/foreground-1.png');
	    game.load.image('foreground2', 'assets/img/foreground-2.png');
	    game.load.image('background', 'assets/img/background.png');
	    game.load.image('midground', 'assets/img/midground.png');
	    game.load.image('starback', 'assets/img/starback.png');
	    game.load.image('bigdrawers', 'assets/img/bigdrawers.png');
	    game.load.image('table', 'assets/img/table.png');
	    game.load.image('drawers', 'assets/img/drawers.png');
	    game.load.image('box', 'assets/img/box.png');
	    game.load.image('bigbox', 'assets/img/box_2x1.png');
	    game.load.image('barrel', 'assets/img/barrel_side.png');
	    game.load.atlas('danny', 'assets/img/DannyDeDiver.png', 'assets/img/DannyDeDiver.json');
	},

	create: function() {
   		
   		//starts physics function
	    game.physics.startSystem(Phaser.Physics.ARCADE);

	    //background
	    background = game.add.sprite(0, 0, 'starback');
	    background.scale.setTo(3,3);
		
	    //midground:
	    midground = game.add.sprite(0, 0, 'midground');
	    midground.scale.setTo(3,3);    

	   	//foregrounds:
	    foreground1 = game.add.sprite(125, 490, 'foreground1');
	    foreground1.scale.setTo(1.75,1.75);    
	    foreground2 = game.add.sprite(2400, 1150, 'foreground2');
	    foreground2.scale.setTo(1.75,1.75);  

	    map = game.add.tilemap('level2');

	    map.addTilesetImage('tilespritesheet', 'tilesheet');

	    //adding layers
	    layer1 = map.createLayer('Tile Layer 1');
	    layer2 = map.createLayer('Tile Layer 2');

	    //initializes layer collision
	    map.setCollisionByExclusion([]);

	    //adding smaller objects
	    items = game.add.sprite(1300, 740, 'table');
	    items.scale.setTo(1.5, 1.5);
	    items = game.add.sprite(2300, 870, 'table');
	    items.scale.setTo(1.5, 1.5);
	    items = game.add.sprite(1000, 1100, 'bigdrawers');
	    items.scale.setTo(1.5, 1.5);
	    items = game.add.sprite(1100, 1128, 'drawers');
	    items.scale.setTo(1.5, 1.5);   
	    items = game.add.sprite(1070, 1465, 'barrel');
	    items.scale.setTo(1.5, 1.5); 
	    items = game.add.sprite(1000, 1407, 'barrel');
	    items.scale.setTo(1.5, 1.5); 
	    items = game.add.sprite(980, 1407, 'barrel');
	    items.scale.setTo(1.5, 1.5);   
	    items = game.add.sprite(960, 1407, 'barrel');
	    items.scale.setTo(1.5, 1.5);   
	    items = game.add.sprite(960, 1445, 'bigbox');
	    items.scale.setTo(1.5, 1.5);   
	    items = game.add.sprite(1490, 705, 'bigbox');
	    items.scale.setTo(1.5, 1.5); 
	    items = game.add.sprite(1520, 645, 'box');
	    items.scale.setTo(1.5, 1.5);
	    items = game.add.sprite(2515, 830, 'bigbox');
	    items.scale.setTo(1.5, 1.5);  
	    items = game.add.sprite(2560, 770, 'box');
	    items.scale.setTo(1.5, 1.5);   

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

	},

	update: function() {

		//collides player with 
		game.physics.arcade.collide(monkas, layer1);

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
        if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
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
	    game.load.image('foreground1', 'assets/img/foreground-1.png');
	    game.load.image('foreground2', 'assets/img/foreground-2.png');
	    game.load.image('background', 'assets/img/background.png');
	    game.load.image('midground', 'assets/img/midground.png');
	    game.load.image('starback', 'assets/img/starback.png');
	    game.load.image('bigdrawers', 'assets/img/bigdrawers.png');
	    game.load.image('table', 'assets/img/table.png');
	    game.load.image('drawers', 'assets/img/drawers.png');
	    game.load.image('box', 'assets/img/box.png');
	    game.load.image('bigbox', 'assets/img/box_2x1.png');
	    game.load.image('column', 'assets/img/column.png');
	    game.load.image('barrel', 'assets/img/barrel_side.png');
	    game.load.atlas('danny', 'assets/img/DannyDeDiver.png', 'assets/img/DannyDeDiver.json');
	},

	create: function() {
   	
   		//initializes physics
	    game.physics.startSystem(Phaser.Physics.ARCADE);

		//background
	    background = game.add.sprite(0, 0, 'starback');
	    background.scale.setTo(3,3);
		
	    //midground
	    midground = game.add.sprite(0,1536 , 'midground');
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
	    items = game.add.sprite(40, 1430, 'column');
	    items.scale.setTo(1.5, 1.5);
	    items = game.add.sprite(40, 850, 'column');
	    items.scale.setTo(1.5, 1.5);
	    items = game.add.sprite(100, 1440, 'box');
	    items.scale.setTo(1.5, 1.5);
	    items = game.add.sprite(1600, 1100, 'bigdrawers');
	    items.scale.setTo(1.5, 1.5);
	    items = game.add.sprite(1800, 1128, 'drawers');
	    items.scale.setTo(1.5, 1.5);
	    items = game.add.sprite(2275, 1100, 'bigdrawers');
	    items.scale.setTo(1.5, 1.5);
	    items = game.add.sprite(2500, 1128, 'drawers');
	    items.scale.setTo(1.5, 1.5);      
	    items = game.add.sprite(1800, 1465, 'barrel');
	    items.scale.setTo(1.5, 1.5); 
	    items = game.add.sprite(2090, 1465, 'barrel');
	    items.scale.setTo(1.5, 1.5); 
	    items = game.add.sprite(2130, 1407, 'barrel');
	    items.scale.setTo(1.5, 1.5); 
	    items = game.add.sprite(2150, 1407, 'barrel');
	    items.scale.setTo(1.5, 1.5);   
	    items = game.add.sprite(2170, 1407, 'barrel');
	    items.scale.setTo(1.5, 1.5);   
	    items = game.add.sprite(2130, 1445, 'bigbox');
	    items.scale.setTo(1.5, 1.5);   
	    items = game.add.sprite(1970, 800, 'bigbox');
	    items.scale.setTo(1.5, 1.5); 
	    items = game.add.sprite(1600, 450, 'box');
	    items.scale.setTo(1.5, 1.5);
	    items = game.add.sprite(2580, 800, 'bigbox');
	    items.scale.setTo(1.5, 1.5);  
	    items = game.add.sprite(2620, 740, 'box');
	    items.scale.setTo(1.5, 1.5);  
	    items = game.add.sprite(2300, 480, 'bigbox');
	    items.scale.setTo(1.5, 1.5);   
	    items = game.add.sprite(2500, 160, 'table');
	    items.scale.setTo(1.5, 1.5); 
	    items = game.add.sprite(2580, 160, 'barrel');
	    items.scale.setTo(1.5, 1.5);
	    items = game.add.sprite(2460, 160, 'barrel');
	    items.scale.setTo(1.5, 1.5);     

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


	},

	update: function() {

		//collides player with layers
		game.physics.arcade.collide(monkas, layer1);

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
        if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
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
	    game.load.image('foreground1', 'assets/img/foreground-1.png');
	    game.load.image('foreground2', 'assets/img/foreground-2.png');
	    game.load.image('background', 'assets/img/background.png');
	    game.load.image('midground', 'assets/img/midground.png');
	    game.load.image('starback', 'assets/img/starback.png');
	    game.load.image('bigdrawers', 'assets/img/bigdrawers.png');
	    game.load.image('table', 'assets/img/table.png');
	    game.load.image('drawers', 'assets/img/drawers.png');
	    game.load.image('box', 'assets/img/box.png');
	    game.load.image('bigbox', 'assets/img/box_2x1.png');
	    game.load.image('barrel', 'assets/img/barrel_side.png');
	    game.load.atlas('danny', 'assets/img/DannyDeDiver.png', 'assets/img/DannyDeDiver.json');
	},



	create: function() {
   		
   		//initializes physics
	    game.physics.startSystem(Phaser.Physics.ARCADE);

	    //background
	    background = game.add.sprite(0, 0, 'starback');
	    background.scale.setTo(3,3);
		
	    //midground
	    midground = game.add.sprite(0, 0, 'midground');
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
	    items = game.add.sprite(350, 835, 'table');
	    items.scale.setTo(1.5, 1.5);
	    items = game.add.sprite(2700, 995, 'table');
	    items.scale.setTo(1.5, 1.5);
	    items = game.add.sprite(100, 1100, 'bigdrawers');
	    items.scale.setTo(1.5, 1.5);
	    items = game.add.sprite(300, 1128, 'drawers');
	    items.scale.setTo(1.5, 1.5);   
	    items = game.add.sprite(870, 1465, 'barrel');
	    items.scale.setTo(1.5, 1.5); 
	    items = game.add.sprite(790, 1407, 'barrel');
	    items.scale.setTo(1.5, 1.5); 
	    items = game.add.sprite(770, 1407, 'barrel');
	    items.scale.setTo(1.5, 1.5);   
	    items = game.add.sprite(750, 1407, 'barrel');
	    items.scale.setTo(1.5, 1.5);  
	    items = game.add.sprite(1200, 600, 'barrel');
	    items.scale.setTo(1.5, 1.5); 
	    items = game.add.sprite(1100, 538, 'barrel');
	    items.scale.setTo(1.5, 1.5);
	    items = game.add.sprite(2775, 250, 'barrel');
	    items.scale.setTo(1.5, 1.5);   
	    items = game.add.sprite(2600, 250, 'barrel');
	    items.scale.setTo(1.5, 1.5);          
	    items = game.add.sprite(750, 1445, 'bigbox');
	    items.scale.setTo(1.5, 1.5);  
	    items = game.add.sprite(1100, 575, 'box');
	    items.scale.setTo(1.5, 1.5); 
	    items = game.add.sprite(1535, 1310, 'bigbox');
	    items.scale.setTo(1.5, 1.5); 
	    items = game.add.sprite(1680, 545, 'box');
	    items.scale.setTo(1.5, 1.5);
	    items = game.add.sprite(2495, 225, 'bigbox');
	    items.scale.setTo(1.5, 1.5);  
	    items = game.add.sprite(2700, 225, 'box');
	    items.scale.setTo(1.5, 1.5);   

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


	},

	update: function() {

		//collides player with layers
		game.physics.arcade.collide(monkas, layer1);

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
        if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
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

//add states to StateManager and start MainMenu
game.state.add('MainMenu', MainMenu);
game.state.add('Story', Story);
game.state.add('Level1', Level1);
game.state.add('Level2', Level2);
game.state.add('Level3', Level3);
game.state.add('Level4', Level4);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');