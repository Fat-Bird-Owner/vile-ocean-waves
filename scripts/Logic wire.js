Events.on(TapEvent, event => {
    try{
        const tile = event.tile;
        if(tile == null) return;

        const targetBlock = Vars.content.block("surge-router");
        if(!tile.build || tile.block() != targetBlock) return;

        function nearby(build){
            const newTile = build.tile;
            Fx.generate.at(newTile.build.x, newTile.build.y);
            
            const nextTile = newTile.nearby(build.rotation);
            if(nextTile == null) return;
            
            nearby(nextTile.build);
        }

        Fx.generate.at(tile.build.x, tile.build.y);
        nearby(tile.build);

    }catch(e){
        Vars.ui.showInfoToast(String(e), 5);
    }
});
