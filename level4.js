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


        //GameOver state changer
     	if(life <= 0) {
			game.state.start('GameOver4');
		}


        //temp state switcher
        if(hitdoor == true) {
			game.state.start('GameOver');
		}


	}
}