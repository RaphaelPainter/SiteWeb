
const logMode = false;
function log(msg){
    if(logMode){
        console.log("units.mjs: " + " " + msg)
    }
}

export function apply(group, fun, ... param){
    group.getChildren().forEach(e => {
        fun(e, param);
    });
}

export const world_offset_height= 50;
export const world_offset_width = 50;

export const grid_width = 10;
export const grid_height= 10;

export const grid_gap_height = 1;
export const grid_gap_width= 1;

export const tile_height = 64;
export const tile_width= 64;


export function refreshPosition(unit){
        unit.setX(world_offset_width+unit.idx *(tile_width+grid_gap_width)*zoom)
        unit.setY(world_offset_height+unit.idy *(tile_height+grid_gap_height)*zoom)
    }

export function move_a(unit,width_idx,height_idx){
    if(isValidPosition(width_idx, height_idx)){
        unit.idx = width_idx;
        unit.idy = height_idx;
        refreshPosition(unit)
        log(unit.texture.key + "=>"+height_idx+","+width_idx)
    }else{
        log(unit.texture.key + "=/>"+height_idx+","+width_idx)
    }
}

export function move_r(unit,height_offset , width_offset){
    move_a(unit,unit.idx+height_offset , unit.idy+width_offset)
} 

export function isValidPosition(height_idx,width_idx){
    if(height_idx < 0 || height_idx >= grid_height){
        return false;
    }else if(width_idx < 0 || width_idx >= grid_width){ 
        return false;
    }else{
        return true;
    }
}

export function new_(spriteName, group){
    let sprite = group.create(0,0,spriteName);
    sprite.setScale(zoom);
    return sprite;
}

export function input_yaxis(cursors){
    if(cursors.up.isUp && cursors.down.isUp){
        return 0;
    }else if(cursors.up.isDown){
        return -1;
    }else if(cursors.down.isDown){
        return 1;
    }
}

export function input_xaxis(cursors){
    if(cursors.right.isUp && cursors.left.isUp){
        return 0;
    }else if(cursors.left.isDown){
        return -1;
    }else if(cursors.right.isDown){
        return 1;
    }
}

export var zoom = 0.5;


export function zoom_group(value, group){
    apply(group, zoom_unit, value);
    apply(group, refreshPosition)
}

function zoom_unit(unit, value){
    unit.setScale(value)
}

export function resizeWorld(value, ... groups){
    zoom = value;
    groups.forEach(e=> {zoom_group(value, e)})
}

export function zoom_(){
    return zoom;
}

export function zoomEvent(event, player, tiles) {
    if(event.deltaY < 0 && zoom_() < 4.5 ){
        resizeWorld(zoom_()-event.deltaY/100*0.25, player, tiles);
    }else if(event.deltaY > 0 && zoom_() > 0.5 ){
        resizeWorld(zoom_()-event.deltaY/100*0.25, player, tiles);
    }
}


export var rythm_activated = true;
export var rythm_breakable = false;
export var rythm_bar_displayed = true;
export var numberOfTicks = 20;
export var rythm_char = '⯀';
export var time_between_ticks = 20;

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
    console.log("bla");
}


