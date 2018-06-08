//LEVEL 3 STATE

var Level3 = function(game) {};
Level3.prototype = { 
	preload: function() {
	    game.load.tilemap('level3', 'assets/img/level3_tiledmap.json', null, Phaser.Tilemap.TILED_JSON);
	    game.load.spritesheet('tilesheet', 'assets/img/tilespritesheet.png', 32, 32);
	    game.load.atlas('MOBSP', 'assets/img/MOBSP.png', 'assets/img/MOBSP.json');
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

	    //enemies being added
	    enemies = game.add.group();
	    enemies.enableBody = true;	//anything in group will have physics applied	    
	    map.createFromObjects('enemies', 1275, 'MOBSP', 'Jellyfish1', true, true, enemies, Jellyfish);
	    map.createFromObjects('enemies', 1300, 'MOBSP', 'urchin', true, true, enemies);
	    map.createFromObjects('enemies', 1337, 'MOBSP', 'shark1', true, true, enemies, shark);
	   	map.createFromObjects('enemies', 1269, 'MOBSP', 'eelrock10', true, true, enemies, eel);

	    //creates furniture/other single background pieces
	    furniture = game.add.group();
	    map.createFromObjects('furniture', 1253, 'MOBSP', 'box_2x1', true, true, furniture);
	    map.createFromObjects('furniture', 1252, 'MOBSP', 'box', true, true, furniture);
	    map.createFromObjects('furniture', 1250, 'MOBSP', 'barrel_side', true, true, furniture);
	    map.createFromObjects('furniture', 1298, 'MOBSP', 'table', true, true, furniture);
	    map.createFromObjects('furniture', 1301, 'MOBSP', 'plant', true, true, furniture);
	    map.createFromObjects('furniture', 1304, 'MOBSP', 'safe', true, true, furniture);
	    map.createFromObjects('furniture', 1303, 'MOBSP', 'cup', true, true, furniture);
	    map.createFromObjects('furniture', 1258, 'MOBSP', 'column', true, true, furniture);
	    map.createFromObjects('furniture', 1364, 'MOBSP', 'coat', true, true, furniture);
	    map.createFromObjects('furniture', 1315, 'MOBSP', 'coathanger', true, true, furniture);
	    map.createFromObjects('furniture', 1259, 'MOBSP', 'drawers', true, true, furniture);
	    map.createFromObjects('furniture', 1363, 'MOBSP', 'bench', true, true, furniture);
	    map.createFromObjects('furniture', 1251, 'MOBSP', 'bigdrawers', true, true, furniture);

	    //creates bubbles/ hitboxes
	    bubbles = game.add.group();
	    bubbles.enableBody = true; //sets physics on bubbles
	    var bubble = bubbles.create(2850, 720, 'atlasItems', 'bubble');
	    bubble.body.setSize(40, 60, 30, 50);
	    bubble = bubbles.create(950, 200, 'atlasItems', 'bubble');
	    bubble.body.setSize(40, 60, 50, 30);	
	    bubble = bubbles.create(250, 2350, 'atlasItems', 'bubble');
	    bubble.body.setSize(40, 60, 50, 30);
	    bubble = bubbles.create(3250, 1800, 'atlasItems', 'bubble');
	    bubble.body.setSize(40, 60, 50, 30);
	    bubble = bubbles.create(3250, 2450, 'atlasItems', 'bubble');
	    bubble.body.setSize(40, 60, 50, 30);
	    bubble = bubbles.create(3800, 460, 'atlasItems', 'bubble');
	    bubble.body.setSize(40, 60, 50, 30);
	    bubble = bubbles.create(4200, 460, 'atlasItems', 'bubble');
	    bubble.body.setSize(40, 60, 50, 30);
	    bubble = bubbles.create(4600, 1800, 'atlasItems', 'bubble');
	    bubble.body.setSize(40, 60, 50, 30);
	    bubbles.scale.setTo(0.5, 0.5);




	    //CONSUMABLES:
	    sushi = game.add.group();
	    sushi.enableBody = true;
	    map.createFromObjects('sushi', 1283, 'MOBSP', 'sushi1', true, true, sushi);
	    map.createFromObjects('sushi', 1284, 'MOBSP', 'sushi2', true, true, sushi);

	    // sush = sushi.create(660, 5030, 'MOBSP', 'sushi1');
	    // sush.body.setSize(10, 10, 0, 0); //for hit box
	    // sush = sushi.create(800, 4030, 'MOBSP', 'sushi1');
	    // sush.body.setSize(10, 10, 0, 0);


	    //CREATRES KEY. YEEEEE BOOOIIIII
	    keys = game.add.group();
	    keys.enableBody = true;
	    map.createFromObjects('keys', 1278, 'MOBSP', 'key', true, true, keys);

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

	    //camera for health bar and air
	    lifeText = game.add.text(20, 20, "Life: " + life, {font: "24px Arial", fill: "#ffffff", align: "left"});
	    lifeText.fixedToCamera = true;
	    lifeText.cameraOffset.setTo(20, 20);

	   	airText = game.add.text(20, 20, "Air: " + air, {font: "24px Arial", fill: "#ffffff", align: "left"});
	    airText.fixedToCamera = true;
	    airText.cameraOffset.setTo(20, 40);

	   	keyText = game.add.text(20, 20, "keys: " + gotKey, {font: "24px Arial", fill: "#ffffff", align: "left"});
	    keyText.fixedToCamera = true;
	    keyText.cameraOffset.setTo(20, 60);

	    timer = game.time.events.loop(3000, subAir,this);

	    //more diver stuff
	    monkas.body.gravity.y = 2000;
	    monkas.body.collideWorldBounds = true;
	    monkas.animations.add('swim', Phaser.Animation.generateFrameNames('swimmer', 1 , 6, '', 1), 10, true);
	    monkas.animations.play('swim');

	    //Door properties
	    //temp door is out of screen
	    door = game.add.sprite(4835, 1370, 'atlasItems', 'door');  //door is at (2835, 1370)
	    door.scale.setTo(1, 1.2);
	    game.physics.arcade.enable(door)


	},

	update: function() {

		//collides player with layers
		game.physics.arcade.collide(monkas, layer1);

		//when player hits door
		var hitdoor = game.physics.arcade.collide(monkas, door);

		//when player hits enemey
		game.physics.arcade.overlap(monkas,enemies,subLife,null,this);	

		//Player eats sushi
		game.physics.arcade.overlap(monkas,sushi,eatSushi,null,this);

		//Player Picks up key
		//game.physics.arcade.overlap(monkas,keys,getKey3,null,this);

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


        //BRIANS CODE GOES HERE

        //AIR 
	    if(air <= 0) {
			life = life - .2;
			lifeText.text = 'Life: ' + life;
		}

		if(game.physics.arcade.overlap(monkas, bubbles, airF, null, this)) {
			//noises effect goes here
		}

        //GamerOver state changer
        if(life <= 0) {
			game.state.start('GameOver3');
		}

        //temp state switcher
        if(hitdoor == true) {
			game.state.start('Level4');
		}

	},

	render: function() {

    	game.debug.physicsGroup(enemies);


	}


}

	// function getKey3(monkas, keys) {
	// 	keys.destroy();
	// 	if(pocketKey == 1) {
	// 		door = game.add.sprite(2835, 1370, 'atlasItems', 'door');
	// 		door.scale.setTo(1, 1.2);
	// 	}