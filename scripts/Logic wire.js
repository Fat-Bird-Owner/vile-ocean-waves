const block = Vars.content.block("gr-circuit-wire");
const rate = block.attributes.get(Attribute.get("circuitRate"));

const circuitUnit = new StatUnit(
    "circuit-rate",
    "[teal]" + String.fromCharCode(Iconc.link) + "[]"
);

block.stats.remove(Stat.speed);
block.stats.add(Stat.speed, rate, circuitUnit);

Events.on(TapEvent, event => {
    try{
        const tile = event.tile;
        if(tile == null) return;

        const targetBlock = Vars.content.block("surge-router");
        let heating = [];
        if(!tile.build || tile.block() != targetBlock) return;

        function nearby(build){
        try {
        if (!build.build || build.block().rotate == false || build.block.size > 1 || Vars.state.isPaused() || !Vars.state.isPlaying()) return;
        const frontBuild = build.nearbyBuild(build.build.rotation);
        if (!frontBuild || !build) return;
            
        Fx.generate.at(frontBuild.x, frontBuild.y);
        for (let i = 0; i < heating.length; i++){
        if (heating[i] == frontBuild) {
        frontBuild.damage(frontBuild.block.health / 4);
        heating.splice(i, 1);
        Fx.turbinegenerate.at(frontBuild.x, frontBuild.y);
        return;
        }
        }
        
        heating.push(frontBuild);
        if (heating.length > 100) heating.shift();
            
        Time.run(0.05 * 60, () => {
        try {
        if (!frontBuild || !frontBuild.isValid() || Vars.state.isPaused() || !Vars.state.isPlaying()) return;
        if (!frontBuild.tile || !heating) return;

        nearby(frontBuild.tile);
        } catch(e){
        Vars.ui.showInfoToast(e + "inner", 5); 
        }});
            
        } catch(e){
        Vars.ui.showInfoToast(e + " - Inner", 5);   
        }}

        Fx.generate.at(tile.worldx(), tile.worldy());
        nearby(tile);

    }catch(e){
        Vars.ui.showInfoToast(String(e), 5);
    }
});
