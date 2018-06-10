//MAIN MENU STATE
// define MainMenu state and methods
var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
		console.log('MainMenu: preload');
		
		//loading assets
		//game.load.image('Back', 'assets/img/background.png');
		//game.load.image('Mid', 'assets/img/midground.png');
		game.load.image('Menu', 'assets/img/menu.png');
		
		game.load.audio('Mclick', 'assets/audio/menuclick.mp3');
	},
	create: function() {
		console.log('MainMenu: create');

		Mclick = game.add.audio('Mclick', 1, false);
		
		game.add.sprite(0, 0, 'Menu');
		

		/*midground
		midground = game.add.sprite(0, 0, 'Mid');	
		midground.scale.setTo(3, 3);*/

		/*//Main beginning menu ----> just the text that shows up
		game.add.text(150, 175, 'SUSHI HUNTERS', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 210, 'By Nick, Brian, and Marcos', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 255, 'PRESS R TO START', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 255, 'PRESS C for credits', { fontSize: '32px', fill: '#7B241C' });*/

	},
	update: function() {
		// main menu logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Story');
			Mclick.play();
		}
		//goes to credits state
		if(game.input.keyboard.isDown(Phaser.Keyboard.C)) {
			game.state.start('credits');
			Mclick.play();
		}
		//goes to instructions state
		if(game.input.keyboard.isDown(Phaser.Keyboard.X)) {
			game.state.start('instructions');
			Mclick.play();
		}
	}
}

//CREDITS STATE
var credits = function(game) {};
credits.prototype = {
	preload: function() {
		console.log('MainMenu: preload');
		game.load.image('Credits', 'assets/img/credits.png');
		game.load.audio('Mclick', 'assets/audio/menuclick.mp3');
	},
	create: function() {
		console.log('MainMenu: create');
		
		game.add.image(0, 0, 'Credits');
		Mclick = game.add.audio('Mclick', 1, false);
		
		game.add.sprite(0, 0, 'Credits');
		/*game.add.text(115, 210, 'TEMP CREDITS STATE', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 255, 'PRESS R TO START', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 300, 'Goes Back to MainMenu', { fontSize: '32px', fill: '#7B241C' });*/


	},
	update: function() {
		//state switching logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.C)) {
			game.state.start('MainMenu');
			Mclick.play();
		}

			
	}
}

//Instruction STATE
var instructions = function(game) {};
instructions.prototype = {
	preload: function() {
		console.log('MainMenu: preload');
		
		game.load.image('how2play', 'assets/img/how2play.png');
		game.load.atlas('danny', 'assets/img/DannyDeDiver.png', 'assets/img/DannyDeDiver.json');
		game.load.atlas('MOBSP', 'assets/img/MOBSP.png', 'assets/img/MOBSP.json');
		game.load.audio('Mclick', 'assets/audio/menuclick.mp3');

	},
	create: function() {
		console.log('MainMenu: create');

		game.add.image(0, 0, 'how2play');
		Mclick = game.add.audio('Mclick', 1, false);
		
		monkas = game.add.sprite(200,330,'danny', 'swimmer1'); 
	    game.physics.arcade.enable(monkas); //Charcater got some physics
	    monkas.anchor.x = .5;
	    monkas.anchor.y = .5;
	    monkas.scale.setTo(0.3, 0.3);
		
		monkas.animations.add('swim', Phaser.Animation.generateFrameNames('swimmer', 1 , 6, '', 1), 10, true);
	    monkas.animations.play('swim');

		/*game.add.text(115, 210, 'TEMP Instruction STATE', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 255, 'PRESS R TO START', { fontSize: '32px', fill: '#7B241C' });*/
	},
	update: function() {
		// main menu logic
		
		monkas.animations.play('swim');
		
		if(game.input.keyboard.isDown(Phaser.Keyboard.X)) {
			game.state.start('MainMenu');
			Mclick.play();
		}
	}
}

//STORY STATE
var Story = function(game) {};
Story.prototype = {
	preload: function() {
		console.log('MainMenu: preload');
		
		game.load.image('Story', 'assets/img/story.png');
		//game.load.image('background', 'assets/img/TitleScreen.png');

	},
	create: function() {
		console.log('MainMenu: create');
		
		game.add.image(0, 0, 'Story');
		/*game.add.text(115, 210, 'TEMP STORY STATE', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 255, 'PRESS R TO START', { fontSize: '32px', fill: '#7B241C' });*/

		//var background = game.add.sprite(0, 0, 'background');
	},
	update: function() {
		// main menu logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Level1');
		}
	}
}

//GAMEOVER 1 STATE
var GameOver1 = function(game) {};
GameOver1.prototype = {
	preload: function() {
		console.log('MainMenu: preload');
		game.load.image('GameOver', 'assets/img/gameover.png');
		


	},
	create: function() {
		console.log('MainMenu: create');
		
		game.add.image(0, 0, 'GameOver');
		/*game.add.text(115, 210, 'TEMP GAMEOVER STATE', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 255, 'PRESS R TO START', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 300, 'Goes Back To Lvl 1 ATM', { fontSize: '32px', fill: '#7B241C' });*/


	},
	update: function() {
		// main menu logic
		
		if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
			air = 100;
			life = 100;
			game.state.start('Level1');
		}
	}
}

//GAMEOVER 2 State
var GameOver2 = function(game) {};
GameOver2.prototype = {
	preload: function() {
		console.log('MainMenu: preload');
		game.load.image('GameOver', 'assets/img/gameover.png');
		


	},
	create: function() {
		console.log('MainMenu: create');
		
		game.add.image(0, 0, 'GameOver');
		/*game.add.text(115, 210, 'TEMP GAMEOVER STATE', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 255, 'PRESS R TO START', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 300, 'Goes Back To Lvl 1 ATM', { fontSize: '32px', fill: '#7B241C' });*/


	},
	update: function() {
		// main menu logic
		
		if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
			air = 100;
			life = 100;
			game.state.start('Level2');
		}		
	}
}

//GAMEOVER 3 State
var GameOver3 = function(game) {};
GameOver3.prototype = {
	preload: function() {
		console.log('MainMenu: preload');
		game.load.image('GameOver', 'assets/img/gameover.png');
		

	},
	create: function() {
		console.log('MainMenu: create');
		
		game.add.image(0, 0, 'GameOver');
		/*game.add.text(115, 210, 'TEMP GAMEOVER STATE', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 255, 'PRESS R TO START', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 300, 'Goes Back To Lvl 1 ATM', { fontSize: '32px', fill: '#7B241C' });*/


	},
	update: function() {
		// main menu logic
		
		if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
			air = 100;
			life = 100;
			game.state.start('Level3');
		}	
	}
}

//GAMEOVER 4 State
var GameOver4 = function(game) {};
GameOver4.prototype = {
	preload: function() {
		console.log('MainMenu: preload');
		game.load.image('GameOver', 'assets/img/gameover.png');
		


	},
	create: function() {
		console.log('MainMenu: create');
		
		game.add.image(0, 0, 'GameOver');
		/*game.add.text(115, 210, 'TEMP GAMEOVER STATE', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 255, 'PRESS R TO START', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 300, 'Goes Back To Lvl 1 ATM', { fontSize: '32px', fill: '#7B241C' });*/


	},
	update: function() {
		// main menu logic
		
		if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
			air = 100;
			life = 100;
			game.state.start('Level4');
		}		
	}
}

//Ending State
var ending = function(game) {};
ending.prototype = {
	preload: function() {
		console.log('MainMenu: preload');
		game.load.image('End', 'assets/img/end.png');


	},
	create: function() {
		console.log('MainMenu: create');
		
		game.add.image(0, 0, 'End');
		/*game.add.text(115, 210, 'TEMP ending STATE', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 255, 'PRESS R TO START', { fontSize: '32px', fill: '#7B241C' });
		game.add.text(115, 300, 'Goes Back To MainMenu', { fontSize: '32px', fill: '#7B241C' });*/


	},
	update: function() {
		//end game logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
			game.state.start('MainMenu');
		}
	
	}
}

//AIR FUNCTIONS:
function subAir(){
	air = air - 12.5;
}

function airF(monkas, bubbles){
	air = 100;
}

//when enemies hit player
function subLife(monkas,enemies){
	enemies.destroy();
	life = life - 25;
}

function eatSushi(monkas, sushi) {
	sushi.destroy();
	if(life == 100){
		life = life;
	} else{
		life = 100;
	}
}



//add states to StateManager and start MainMenu
game.state.add('MainMenu', MainMenu);
game.state.add('credits', credits);
game.state.add('instructions', instructions);
game.state.add('Story', Story);
game.state.add('Level1', Level1);
game.state.add('Level2', Level2);
game.state.add('Level3', Level3);
game.state.add('Level4', Level4);
game.state.add('GameOver1', GameOver1);
game.state.add('GameOver2', GameOver2);
game.state.add('GameOver3', GameOver3);
game.state.add('GameOver4', GameOver4);
game.state.add('ending', ending);
game.state.start('MainMenu');