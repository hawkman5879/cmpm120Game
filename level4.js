//LEVEL 4 STATE

var Level4 = function(game) {};
Level4.prototype = { 

	preload: function() {
	    game.load.tilemap('level4', 'assets/img/level4_tiledmap.json', null, Phaser.Tilemap.TILED_JSON);
	    game.load.spritesheet('tilesheet', 'assets/img/tilespritesheet.png', 32, 32);
	    game.load.atlas('bars', 'assets/img/bars.png', 'assets/img/bars.json');
	    game.load.atlas('MOBSP', 'assets/img/MOBSP.png', 'assets/img/MOBSP.json');
	    game.load.atlas('atlasItems', 'assets/img/tilemapspritesheet.png','assets/img/tilemapspritesheet.json');
	    game.load.atlas('danny', 'assets/img/DannyDeDiver.png', 'assets/img/DannyDeDiver.json');
	    game.load.audio('BGmusic', 'assets/audio/BGMusic.mp3');
	    game.load.audio('eatSush', 'assets/audio/eatSush.mp3');
	    game.load.audio('hurt', 'assets/audio/hurt.mp3');
	    game.load.audio('inhale', 'assets/audio/inhale.mp3');
	},

	create: function() {

		//creates audio
		BG = game.add.audio('BGmusic', 1, true);
		BG.play();
		hurt = game.add.audio('hurt', 1, false);
		eatSush = game.add.audio('eatSush', 1, false);
		inhale = game.add.audio('inhale', 1, false);
   		
   		//initializes physics
	    game.physics.startSystem(Phaser.Physics.ARCADE);
	    air = 100;
	    life = 100;
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

	    //ENEMIES:
	    //enemies being added
	    enemies = game.add.group();
	    enemies.enableBody = true;	//anything in group will have physics applied	    
	    map.createFromObjects('enemies', 1275, 'MOBSP', 'Jellyfish1', true, true, enemies, Jellyfish);
	    map.createFromObjects('enemies', 1300, 'MOBSP', 'urchin', true, true, enemies);
	    map.createFromObjects('enemies', 1279, 'MOBSP', 'shark1', true, true, enemies, shark);
	   	map.createFromObjects('enemies', 1269, 'MOBSP', 'eelrock10', true, true, enemies, eel);

	    //FURNITURE:
	    //creates furniture/other single background pieces
	    furniture = game.add.group();
	    map.createFromObjects('furniture', 1253, 'MOBSP', 'box_2x1', true, true, furniture);
	    map.createFromObjects('furniture', 1252, 'MOBSP', 'box', true, true, furniture);
	    map.createFromObjects('furniture', 1250, 'MOBSP', 'barrel_side', true, true, furniture);
	    map.createFromObjects('furniture', 1301, 'MOBSP', 'plant', true, true, furniture);
	    map.createFromObjects('furniture', 1307, 'MOBSP', 'cup', true, true, furniture);
	    map.createFromObjects('furniture', 1308, 'MOBSP', 'safe', true, true, furniture);
		map.createFromObjects('furniture', 1251, 'MOBSP', 'bigdrawers', true, true, furniture);
	    map.createFromObjects('furniture', 1259, 'MOBSP', 'drawers', true, true, furniture);
	    map.createFromObjects('furniture', 1305, 'MOBSP', 'bench', true, true, furniture);
	 	map.createFromObjects('furniture', 1306, 'MOBSP', 'coat', true, true, furniture);
	    map.createFromObjects('furniture', 1257, 'MOBSP', 'coathanger', true, true, furniture);
	    map.createFromObjects('furniture', 1303, 'MOBSP', 'treasures', true, true, furniture);
	    map.createFromObjects('furniture', 1304, 'MOBSP', 'treasures_vase', true, true, furniture);

	    //creates bubbles/ hitboxes
	    bubbles = game.add.group();
	    bubbles.enableBody = true; //sets physics on bubbles

	    var bubble = bubbles.create(1500, 250, 'atlasItems', 'bubble');
	    bubble.body.setSize(40, 60, 50, 30);	
	    bubble = bubbles.create(1050, 1900, 'atlasItems', 'bubble');
	    bubble.body.setSize(40, 60, 50, 30);
	    bubble = bubbles.create(3250, 2450, 'atlasItems', 'bubble');
	    bubble.body.setSize(40, 60, 50, 30);
	    bubble = bubbles.create(4100, 620, 'atlasItems', 'bubble');
	    bubble.body.setSize(40, 60, 50, 30);
	    bubble = bubbles.create(5400, 2130, 'atlasItems', 'bubble');
	    bubble.body.setSize(40, 60, 50, 30);

	    bubble = bubbles.create(1950, 2430, 'atlasItems', 'bubble');
	    bubble.body.setSize(40, 60, 50, 30);
	    bubbles.scale.setTo(0.5, 0.5);

	    //CONSUMABLES:
	    sushi = game.add.group();
	    sushi.enableBody = true;
	    map.createFromObjects('sushi', 1283, 'MOBSP', 'sushi1', true, true, sushi);
	    map.createFromObjects('sushi', 1284, 'MOBSP', 'sushi2', true, true, sushi);

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

	    //makes the hearts
	    hearts = game.add.group();
	    heart1 = hearts.create(20, 20, 'bars', 'heart');
	    heart1.fixedToCamera = true;
	    heart1.cameraOffset.setTo(20, 20);
	    heart1.scale.setTo(.5, .5);
	   	heart2 = hearts.create(20, 20, 'bars', 'heart');
	    heart2.fixedToCamera = true;
	    heart2.cameraOffset.setTo(70, 20);
	    heart2.scale.setTo(.5, .5);
	    heart3 = hearts.create(20, 20, 'bars', 'heart');
	    heart3.fixedToCamera = true;
	    heart3.cameraOffset.setTo(120, 20);
	    heart3.scale.setTo(.5, .5);
	    heart4 = hearts.create(20, 20, 'bars', 'heart');
	    heart4.fixedToCamera = true;
	    heart4.cameraOffset.setTo(170, 20);
	    heart4.scale.setTo(.5, .5);
		
	    airbars = game.add.group();
	    airbar1 = airbars.create(20, 20, 'bars', 'airbar9');
	    airbar1.fixedToCamera = true;
		airbar1.cameraOffset.setTo(20, 70);
		airbar1.scale.setTo(.35, .25);
		airbar2 = airbars.create(20, 20, 'bars', 'airbar8');
	    airbar2.fixedToCamera = true;
		airbar2.cameraOffset.setTo(20, 70);
		airbar2.scale.setTo(.35, .25);
		airbar3 = airbars.create(20, 20, 'bars', 'airbar7');
	    airbar3.fixedToCamera = true;
		airbar3.cameraOffset.setTo(20, 70);
		airbar3.scale.setTo(.35, .25);
		airbar4 = airbars.create(20, 20, 'bars', 'airbar6');
	    airbar4.fixedToCamera = true;
		airbar4.cameraOffset.setTo(20, 70);
		airbar4.scale.setTo(.35, .25);
	    airbar5 = airbars.create(20, 20, 'bars', 'airbar5');
	    airbar5.fixedToCamera = true;
		airbar5.cameraOffset.setTo(20, 70);
		airbar5.scale.setTo(.35, .25);
		airbar6 = airbars.create(20, 20, 'bars', 'airbar4');
	    airbar6.fixedToCamera = true;
		airbar6.cameraOffset.setTo(20, 70);
		airbar6.scale.setTo(.35, .25);
		airbar7 = airbars.create(20, 20, 'bars', 'airbar3');
	    airbar7.fixedToCamera = true;
		airbar7.cameraOffset.setTo(20, 70);
		airbar7.scale.setTo(.35, .25);
		airbar8 = airbars.create(20, 20, 'bars', 'airbar2');
	    airbar8.fixedToCamera = true;
		airbar8.cameraOffset.setTo(20, 70);
		airbar8.scale.setTo(.35, .25);
		airbar9 = airbars.create(20, 20, 'bars', 'airbar1');
	    airbar9.fixedToCamera = true;
		airbar9.cameraOffset.setTo(20, 70);
		airbar9.scale.setTo(.35, .25);

	    //timer for air drop
	    timer = game.time.events.loop(2000, subAir,this);

	    //more diver stuff
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

		//when player hits enemey
		if(game.physics.arcade.overlap(monkas,enemies,subLife,null,this)) {
			hurt.play();
		}	

		//when player eats sushi
		if(game.physics.arcade.overlap(monkas, sushi, eatSushi, null, this)) {
			eatSush.play();
		}

		//Code for decreasing hearts
		if(life > 50 && life <= 75){
		heart4.alpha = .0;
		}
		if(life > 25 && life <= 50){
			heart3.alpha = .0;
		}
		if(life > 0 && life <= 25){
			heart2.alpha = .0;
		}
		if(life == 100) {
			heart4.alpha = 1;
			heart3.alpha = 1;
			heart2.alpha = 1;
		}

		//Code for decreasing the air bar
		if(air == 87.5) {
			airbar9.alpha = .0;
		} 
		if(air == 75) {
			airbar8.alpha = .0;
		}
		if(air == 62.5) {
			airbar7.alpha = .0;
		}
		if(air == 50) {
			airbar6.alpha = .0;
		}
		if(air == 37.5) {
			airbar5.alpha = .0;
		}
		if(air == 25) {
			airbar4.alpha = .0;
		}
		if(air == 12.5) {
			airbar3.alpha = .0;
		}
		if(air == 0) {
			airbar2.alpha = .0;
		}
		if(air == 100) {
			airbar2.alpha = 1;
			airbar3.alpha = 1;
			airbar4.alpha = 1;
			airbar5.alpha = 1;
			airbar6.alpha = 1;
			airbar7.alpha = 1;
			airbar8.alpha = 1;
			airbar9.alpha = 1;
		}

		//PLAYER MOVEMENT:
        if(cursors.right.isDown && cursors.up.isDown && air > 0){ //Polishes movement so you can press two cursors at once 
            monkas.body.velocity.y = -Mov;
            monkas.body.velocity.x = Mov;
            monkas.scale.setTo(scale,scale);
            monkas.animations.play('swim');
        }
        else if(cursors.left.isDown && cursors.up.isDown && air > 0){
            monkas.body.velocity.y = -Mov;
            monkas.body.velocity.x = -Mov
            monkas.scale.setTo(-scale,scale);
            monkas.animations.play('swim');
        }
        else if(cursors.right.isDown && cursors.down.isDown && air > 0){
            monkas.body.velocity.y = Up;
            monkas.body.velocity.x = Mov;
            monkas.scale.setTo(scale,scale);
            monkas.animations.play('swim');
        }
        else if(cursors.left.isDown && cursors.down.isDown && air > 0){
            monkas.body.velocity.y = Up;
            monkas.body.velocity.x = -Mov;
            monkas.scale.setTo(-scale,scale);
            monkas.animations.play('swim');
        }
        else if (cursors.right.isDown && air > 0){ //move right
            monkas.body.velocity.x = Mov;
            monkas.body.velocity.y = 0;
            monkas.scale.setTo(scale,scale);
            monkas.animations.play('swim');
        }
        else if(cursors.left.isDown && air > 0) { //move left
            monkas.body.velocity.x = -Mov;
            monkas.body.velocity.y = 0;
            monkas.scale.setTo(-scale,scale);
            monkas.animations.play('swim');
        }
        else if(cursors.up.isDown && air > 0){
            monkas.body.velocity.y = -Mov;
            monkas.animations.play('swim');
        
        }
        else if(cursors.down.isDown && air > 0){
            monkas.body.velocity.y = Mov;
            monkas.animations.play('swim');
        }
        else{
            monkas.body.velocity.x = 0;
            monkas.body.velocity.y = 0;
           // monkas.animations.stop(null,true);
        }

        //out of air
         if(cursors.right.isDown && cursors.up.isDown && air <= 0){ //Polishes movement so you can press two cursors at once 
            monkas.body.velocity.y = -Mo;
            monkas.body.velocity.x = Mo;
            monkas.scale.setTo(scale,scale);
            monkas.animations.play('swim');
        }
        else if(cursors.left.isDown && cursors.up.isDown && air <= 0){
            monkas.body.velocity.y = -Mo;
            monkas.body.velocity.x = -Mo;
            monkas.scale.setTo(-scale,scale);
            monkas.animations.play('swim');
        }
        else if(cursors.right.isDown && cursors.down.isDown && air <= 0){
            monkas.body.velocity.y = U;
            monkas.body.velocity.x = Mo;
            monkas.scale.setTo(scale,scale);
            monkas.animations.play('swim');
        }
        else if(cursors.left.isDown && cursors.down.isDown && air <= 0){
            monkas.body.velocity.y = U;
            monkas.body.velocity.x = -Mo;
            monkas.scale.setTo(-scale,scale);
            monkas.animations.play('swim');
        }
        else if (cursors.right.isDown && air <= 0){ //move right
            monkas.body.velocity.x = Mo;
            monkas.body.velocity.y = 0;
            monkas.scale.setTo(scale,scale);
            monkas.animations.play('swim');
        }
        else if(cursors.left.isDown && air <= 0) { //move left
            monkas.body.velocity.x = -Mo;
            monkas.body.velocity.y = 0;
            monkas.scale.setTo(-scale,scale);
            monkas.animations.play('swim');
        }
        else if(cursors.up.isDown && air <= 0){
            monkas.body.velocity.y = -Mo;
            monkas.animations.play('swim');
        
        }
        else if(cursors.down.isDown && air <= 0){
            monkas.body.velocity.y = Mo;
            monkas.animations.play('swim');
        }

        //AIR 
	    if(air <= 0) {
			life = life - .18;
		}

		if(game.physics.arcade.overlap(monkas, bubbles, airF, null, this)) {
			inhale.play('', 0, 0.25, false);	
		}

        //GameOver state changer
     	if(life <= 0) {
			game.state.start('GameOver4');
		}

        //temp state switcher
        if(hitdoor == true) {
        	
			game.state.start('ending');
			BG.destroy();
		}

	},

	//render: function() {
    //	game.debug.physicsGroup(enemies);
	//}
}