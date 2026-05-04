

Events.on(TapEvent, event => {
    try{
        const tile = event.tile;
        if(tile == null) return;

        const targetBlock = Vars.content.block("surge-router");
        let heating = [];
        if(!tile.build || tile.block() != targetBlock) return;

        function nearby(build){
        try {
        if (!build.build || build.block().rotate == false || build.block.size > 1) return;
        const frontBuild = build.nearbyBuild(build.build.rotation);
        if (!frontBuild || !build) return;
            
        Fx.generate.at(frontBuild.x, frontBuild.y);
        for (let i = 0; i < heating.length; i++){
        if (heating[i] == frontBuild) {
        frontBuild.damage(3);
        heating.splice(i, 1);
        Fx.turbinegenerate.at(frontBuild.x, frontBuild.y);
        }
        }
        
        heating.push(frontBuild);
        if (heating.length > 10) heating.shift();
            
        Time.run(0.05 * 60, () => {
        try {
        if (!frontBuild || !frontBuild.isValid()) return;
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
