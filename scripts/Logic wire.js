Events.on(TapEvent, event => {
    try{
        const tile = event.tile;
        if(tile == null) return;

        const targetBlock = Vars.content.block("gr-signal");
        const wireBlock = Vars.content.block("gr-circuit-wire");
        let heating = [];
        if(!tile.build || tile.block() != targetBlock) return;

        function nearby(build){
        try {
        if (!build.build || build.block().rotate == false || build.block.size > 1 || Vars.state.isPaused() || !Vars.state.isPlaying()) return;
        const frontBuild = build.nearbyBuild(build.build.rotation);
        if (!frontBuild || !build || frontBuild.block != wireBlock) return;
        const {block} = frontBuild;
        const circuitRate = block.attributes.get(Attribute.get("circuitRate"));
        const circuitHeatingDamage = block.attributes.get(Attribute.get("circuitHeatDamage"));
            
        Fx.dooropen.at(frontBuild.x, frontBuild.y, frontBuild.block.size);
        for (let i = 0; i < heating.length; i++){
        if (heating[i] == frontBuild) {
        frontBuild.damage(circuitHeatingDamage);
        heating.splice(i, 1);
        Fx.turbinegenerate.at(frontBuild.x, frontBuild.y);
        return;
        }
        }
        
        heating.push(frontBuild);
        if (heating.length > 100) heating.shift();
            
        Time.run((1/circuitRate) * 60, () => {
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
