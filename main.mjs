
import { 
    grid_width, grid_height,
    move_a,move_r,
    zoom_,
    new_,
    input_xaxis, input_yaxis,

    rythm_activated,rythm_var_displayed,rythm_breakable, 
    numberOfTicks, rythm_char,time_between_ticks
} from './modules/units.mjs'; 


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
};

var tiles;

var player;
var player_unit

var cursors;

var rythm_bar;
var rythm_text="";
var subTick_idx = 0;
var movedSinceLastTick = false;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('tile', 'assets/tile.png');
    this.load.image('player', 'assets/player.png');
}

function create ()
{
    console.clear();
    // grid
    tiles = this.physics.add.staticGroup();
    for(let i = 0;i<grid_height;i++){
        for(let j = 0;j<grid_width;j++){
           let tile = new_('tile',tiles);
           move_a(tile, i, j);
        }
    }

    //player
    player = this.physics.add.staticGroup();
    player_unit = player.create(0,0,'player');
    player_unit.setScale(zoom_());
    move_a(player_unit, 0, 0);

    //user inputs
    cursors = this.input.keyboard.createCursorKeys();
    
    //setup tick calls
    if(rythm_activated){
        if(rythm_var_displayed){
            rythm_bar = document.getElementById("rythm_bar");
            for(let i = 0;i<numberOfTicks;i++){
                rythm_text += rythm_char; 
            }
            setInterval(tick_withRythmBar, time_between_ticks);
        }else{
            setInterval(tick_noRythmBar, time_between_ticks);
        }
    }
    
}



function update() {

}


if(rythm_breakable){
    document.addEventListener('keydown', (e) => {
        if(!e.repeat ){
            if(e.keyCode == 39 ){
                move_r(player_unit, 1,0);
            }if(e.keyCode == 37 ){
                move_r(player_unit, -1,0);
            }if(e.keyCode == 38 ){
                move_r(player_unit, 0,-1);
            }if(e.keyCode == 40 ){
                move_r(player_unit, 0,1);
            }
            subTick_idx = 1;
        }
  });
}
function tick_withRythmBar(){
    subTick_idx++;
    rythm_bar.innerHTML = 
    rythm_text.substr(subTick_idx-2,numberOfTicks);
    if(!movedSinceLastTick){
        if( input_xaxis(cursors) != 0 || input_yaxis(cursors) != 0){
            if(!rythm_breakable){
                move_r(player_unit, input_xaxis(cursors), input_yaxis(cursors));
            }
            movedSinceLastTick = true;
        }
    }
    if(subTick_idx > numberOfTicks){
        subTick_idx = 1;
        movedSinceLastTick = false;
    }
}
function tick_noRythmBar(){
    subTick_idx++;
    if(!movedSinceLastTick){
        if( input_xaxis(cursors) != 0 || input_yaxis(cursors) != 0){
            if(!rythm_breakable){
                move_r(player_unit, input_xaxis(cursors), input_yaxis(cursors));
            }
            movedSinceLastTick = true;
        }
    }
    if(subTick_idx > numberOfTicks){
        subTick_idx = 1;
        movedSinceLastTick = false;
    }
}




