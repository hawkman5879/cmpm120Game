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
			air = 100;
			life = 100;
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

function resettrident(trident) {
	trident.kill();
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

//AIR FUNCTIONS:
function subAir(){
	air = air - 20;
	airText.text = 'Air: ' + air;
}

function airF(monkas, bubbles){
	air = 100;
	airText.text = 'Air: ' + air;

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