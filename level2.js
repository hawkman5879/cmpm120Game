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