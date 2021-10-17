//APPLY TO ALL
export function apply(group, fun, ... param){
    group.getChildren().forEach(e => {
        fun(e, param);
    });
}
