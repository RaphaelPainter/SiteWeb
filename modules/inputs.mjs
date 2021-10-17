
// PLAYER INPUT
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