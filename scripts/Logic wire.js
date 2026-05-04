Events.on(TapEvent, event => {
    try{
        const tile = event.tile;
        if(tile == null) return;

        const targetBlock = Vars.content.block("surge-router");
        if(!tile.build || tile.block() != targetBlock) return;

        function nearby(build){
        try {
        if (!build.build || build.block().rotate == false || build.block.size > 1) return;
        const frontBuild = build.nearbyBuild(build.build.rotation);
        if (!frontBuild || !build) return;
            
        Fx.generate.at(frontBuild.x, frontBuild.y);
        nearby(frontBuild.tile);
        } catch(e){
        Vars.ui.showInfoToast(e + " - Inner", 5);   
        }}

        Fx.generate.at(tile.worldx(), tile.worldy());
        
        Time.run(0.25 * 60, () => nearby(tile));

    }catch(e){
        Vars.ui.showInfoToast(String(e), 5);
    }
});
