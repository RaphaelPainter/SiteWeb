
const logMode = true;
function log(msg){
    if(logMode){
        console.log("units.mjs: " + " " + msg)
    }
}
export const world_offset_height= 50;
export const world_offset_width = 50;

export const grid_width = 100;
export const grid_height= 100;

export const grid_gap_height = 1;
export const grid_gap_width= 1;

export const tile_height = 64;
export const tile_width= 64;


export function apply(units, fun){
    units.array.forEach(e => {
        fun(e);
    });
}

export function refreshPosition(unit){
        unit.setX(world_offset_width+unit.idx *(tile_width+grid_gap_width))
        unit.setY(world_offset_height+unit.idy *(tile_height+grid_gap_height))
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



