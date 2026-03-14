try{

function extendJS(){
    const Base = arguments[0];
    const def = arguments[arguments.length - 1];

    const args = [Base, def];
    for(let i = 1; i < arguments.length - 1; i++){
        args.push(arguments[i]);
    }

    const instance = JavaAdapter.apply(null, args);

    for(let k in def){
        if(typeof def[k] !== "function"){
            instance[k] = def[k];
        }
    }

    return instance;
}
    // using your extend() polyfill


const screamConveyor = extendJS(Conveyor, "scream-conveyor", {

    placed(tile){
        this.super$placed(tile);

        Vars.ui.showInfoToast("AAAA", 2);
    }

});


}catch(e){
    Vars.ui.showText("e",e,Align.center);
}
