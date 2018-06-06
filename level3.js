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