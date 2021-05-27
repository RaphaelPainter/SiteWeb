
import { 
    grid_width, grid_height,
    move_a,move_r,
    zoom_,
    new_,
    input_xaxis, input_yaxis,

    rythm_activated,rythm_bar_displayed,rythm_breakable, 
    numberOfTicks, rythm_char,time_between_ticks, 
    event_rythmBreakable,init_rythm_var
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

var rythm = {};
var subTick = {};
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
        if(rythm_bar_displayed){
            init_rythm_var(rythm);
            setInterval(tick_withRythmBar, time_between_ticks);
        }else{
            setInterval(tick_noRythmBar, time_between_ticks);
        }
    }
    if(rythm_breakable){
        event_rythmBreakable(document, player_unit, subTick);
    }
}



function update() {

}



function tick_withRythmBar(){
    subTick.idx++;
    rythm.bar.innerHTML = 
    rythm.text.substr(subTick.idx-2,numberOfTicks);
    if(!movedSinceLastTick){
        if( input_xaxis(cursors) != 0 || input_yaxis(cursors) != 0){
            if(!rythm_breakable){
                move_r(player_unit, input_xaxis(cursors), input_yaxis(cursors));
            }
            movedSinceLastTick = true;
        }
    }
    if(subTick.idx > numberOfTicks){
        subTick.idx = 1;
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




