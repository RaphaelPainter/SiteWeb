import { 
    input_xaxis,
    input_yaxis
} from './inputs.mjs'; 

import {
    move_r
} from './grid.mjs'; 

import { 
    log
} from './log.mjs'; 
import { apply } from './tools.mjs';

import{
    units
}from '../main.mjs'; 


// RYTHM CONGIG
export var rythm_activated = true;
export var rythm_breakable = true;
export var rythm_bar_displayed = true;
export var numberOfTicks = 20;
export var rythm_char = '⯀';
export var time_between_ticks = 20;

//RYTHM
export function event_rythmBreakable(document, player_unit, subTick){
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
            subTick.idx = 1;  
            if(rythm_breakable){
                tick();
            } 
        }
  });
}
export function init_rythm_var(rythm){
    rythm.bar = document.getElementById("rythm_bar");
    rythm.text="";
    for(let i = 0;i<numberOfTicks;i++){
        rythm.text += rythm_char; 
    }
  }
  export function tick_withRythmBar(rythm, cursors,player_unit){
    rythm.subTick.idx++;
    rythm.bar.innerHTML = 
    rythm.text.substr(rythm.subTick.idx-2,numberOfTicks);
    if(!rythm.movedSinceLastTick){
        if( input_xaxis(cursors) != 0 || input_yaxis(cursors) != 0){
            if(!rythm_breakable){
                move_r(player_unit, input_xaxis(cursors), input_yaxis(cursors));
                tick();
            }
            rythm.movedSinceLastTick = true;
        }
    }
    if(rythm.subTick.idx > numberOfTicks){
        rythm.subTick.idx = 1;
        rythm.movedSinceLastTick = false;
    }
}
export function tick_noRythmBar(rythm, cursors,player_unit){
    rythm.subTick.idx++;
    if(!rythm.movedSinceLastTick){
        if( input_xaxis(cursors) != 0 || input_yaxis(cursors) != 0){
            if(!rythm_breakable){
                move_r(player_unit, input_xaxis(cursors), input_yaxis(cursors));
                tick();
            }
            rythm.movedSinceLastTick = true;
        }
    }
    if(rythm.subTick.idx > numberOfTicks){
        rythm.subTick.idx = 1;
        rythm.movedSinceLastTick = false;
    }
}
export function tick(){
    //TODO: units -> tick -> units.behavior -> units.play()
    
    apply(units, dosomething, "blarg")
}

function dosomething(unit, value){
    log(unit.x +" "+ value);
}

