//LEVEL 2 STATE

var Level2 = function(game) {};
Level2.prototype = {

	preload: function() {
	    game.load.tilemap('level2', 'assets/img/level2_tiledmap.json', null, Phaser.Tilemap.TILED_JSON);
	    game.load.spritesheet('tilesheet', 'assets/img/tilespritesheet.png', 32, 32);
	    game.load.atlas('MOBSP', 'assets/img/MOBSP.png', 'assets/img/MOBSP.json')
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

	    //enemies being added
	    enemies = game.add.group();
	    enemies.enableBody = true;	//anything in group will have physics applied	    
	    map.createFromObjects('enemies', 1275, 'MOBSP', 'Jellyfish1', true, true, enemies, Jellyfish);
	    map.createFromObjects('enemies', 1270, 'MOBSP', 'eelrock11', true, true, enemies);
	    map.createFromObjects('enemies', 1300, 'MOBSP', 'urchin', true, true, enemies);
	    map.createFromObjects('enemies', 1281, 'MOBSP', 'shark1', true, true, enemies, shark);

	    //creates furniture/other single background pieces
	    furniture = game.add.group();
	    map.createFromObjects('furniture', 1253, 'MOBSP', 'box_2x1', true, true, furniture);
	    map.createFromObjects('furniture', 1252, 'MOBSP', 'box', true, true, furniture);
	    map.createFromObjects('furniture', 1250, 'MOBSP', 'barrel_side', true, true, furniture);
	    map.createFromObjects('furniture', 1298, 'MOBSP', 'table', true, true, furniture);
	    map.createFromObjects('furniture', 1301, 'MOBSP', 'plant', true, true, furniture);
	    map.createFromObjects('furniture', 1308, 'MOBSP', 'safe', true, true, furniture);
	    map.createFromObjects('furniture', 1307, 'MOBSP', 'cup', true, true, furniture);
	    map.createFromObjects('furniture', 1258, 'MOBSP', 'column', true, true, furniture);
	    map.createFromObjects('furniture', 1306, 'MOBSP', 'coat', true, true, furniture);
	    map.createFromObjects('furniture', 1257, 'MOBSP', 'coathanger', true, true, furniture);
	    map.createFromObjects('furniture', 1259, 'MOBSP', 'drawers', true, true, furniture);
	    map.createFromObjects('furniture', 1305, 'MOBSP', 'bench', true, true, furniture);
	    map.createFromObjects('furniture', 1251, 'MOBSP', 'bigdrawers', true, true, furniture);

	    //creates bubbles/ hitboxes
	    bubbles = game.add.group();
	    bubbles.enableBody = true; //sets physics on bubbles
	    var bubble = bubbles.create(2700, 800, 'atlasItems', 'bubble');
	    bubble.body.setSize(40, 60, 30, 50);
	    bubble = bubbles.create(120, 400, 'atlasItems', 'bubble');
	    bubble.body.setSize(40, 60, 50, 30);
	    bubble = bubbles.create(100, 1700, 'atlasItems', 'bubble');
	    bubble.body.setSize(40, 60, 50, 30);
	    bubble = bubbles.create(3350, 2100, 'atlasItems', 'bubble');
	    bubble.body.setSize(40, 60, 50, 30);
	    bubble = bubbles.create(4700, 200, 'atlasItems', 'bubble');
	    bubble.body.setSize(40, 60, 50, 30);
	    bubbles.scale.setTo(0.5, 0.5);

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





	    //camera for health bar and air
	    lifeText = game.add.text(20, 20, "Life: " + life, {font: "24px Arial", fill: "#ffffff", align: "left"});
	    lifeText.fixedToCamera = true;
	    lifeText.cameraOffset.setTo(20, 20);

	   	airText = game.add.text(20, 20, "Air: " + air, {font: "24px Arial", fill: "#ffffff", align: "left"});
	    airText.fixedToCamera = true;
	    airText.cameraOffset.setTo(20, 40);

	    timer = game.time.events.loop(3000, subAir,this);





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

		//when player hits enemey
		game.physics.arcade.overlap(monkas,enemies,subLife,null,this);	

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

        //GameOver state changer
     	if(life <= 0) {
			game.state.start('GameOver2');
		}


                //temp state switcher
        if(hitdoor == true) {
			game.state.start('Level3');
		}

		if(game.physics.arcade.overlap(monkas, bubbles, airF, null, this)) {
			//noises effect goes here
		}
	}
}

