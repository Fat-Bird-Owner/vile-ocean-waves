Events.on(TapEvent, event => {
    try{
        const tile = event.tile;
        if(tile == null) return;

        const targetBlock = Vars.content.block("surge-router");
        if(tile.block() != targetBlock) return;

        function nearby(build){
            const tile = build.tile;
            Fx.generate.at(build.x, build.y);
            
            const nextTile = tile.nearbyBuild(build.rotation);
            if(nextTile == null) return;
            
            nearby(nextTile);
        }
            
        nearby(tile.build);

    }catch(e){
        Vars.ui.showInfoToast(String(e), 5);
    }
});
