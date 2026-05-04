Events.on(TapEvent, event => {
    try{
        const tile = event.tile;
        if(tile == null) return;

        const targetBlock = Vars.content.block("surge-router");
        if(!tile.build || tile.block() != targetBlock) return;

        function nearby(build){
        try {
        const buildTile = tile;
        const frontBuild = tile.nearbyBuild(buildTile.build.rotation);
        if (!frontBuild) return;
            
        Fx.generate.at(frontBuild.x, frontBuild.y);
        nearby(frontBuild);
        } catch(e){
        Vars.ui.showInfoToast(e + " - Inner", 5);   
        }}

        Fx.generate.at(tile.worldx(), tile.worldy());
        nearby(tile);

    }catch(e){
        Vars.ui.showInfoToast(String(e), 5);
    }
});
