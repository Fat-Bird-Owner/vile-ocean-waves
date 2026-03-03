var lastUpdate = 0

// Power button class

Events.on(TapEvent, event => {
    try {
        
        if(Vars.state.updateId == lastUpdate) return;

        lastUpdate = Vars.state.updateId;
        
        const tile = event.tile;
        if (!tile || !tile.build) return;

        const target = Vars.content.getByName(ContentType.block, "siliconSmelter");
        const effect = Fx.dooropenlarge

        const block = tile.block();
        if (block != target) return;

        const build = tile.build;

        //Vars.ui.showInfoToast(build.team + " " + event.player.team(),1);
        
        if (build.team != event.player.team()) return;
        if (build.items) {

        const sand = build.items.get(Items.sand);
        const coal = build.items.get(Items.coal);

        if (coal >= 1 && sand >= 2){

        build.handleStack(Items.silicon,1,null);
        build.removeStack(Items.sand,2,null);
        build.removeStack(Items.coal,1,null);
            
        }
            
        }

        if (effect) {
            effect.at(build.x, build.y);
        }

        if (Sounds.click) {
            Sounds.click.at(build.x, build.y);
        }
    } catch (e) {
        // fails silently on iOS instead of crashing
        Vars.ui.showInfoToast("error: " + e,1);
    }
});

////////
Events.on(TapEvent, event => {
    try {
        
        if(Vars.state.updateId == lastUpdate) return;

        lastUpdate = Vars.state.updateId;
        
        const tile = event.tile;
        if (!tile || !tile.build) return;

        const target = Vars.content.getByName(ContentType.block, "copper-wall");

        const block = tile.block();
        if (block != target) return;

        const build = tile.build;

        Vars.ui.showInfoToast(build.team + " " + event.player.team(),1);
        
        if (build.team != event.player.team()) return;

        Vars.ui.showInfoToast("[tan]Wave: " + Vars.state.wave, 1.5);
        Vars.state.wavetime = 0;

        if (Fx.generate && Fx) {
            Fx.generate.at(build.x, build.y);
        }

        if (Sounds.click) {
            Sounds.click.at(build.x, build.y);
        }
    } catch (e) {
        // fails silently on iOS instead of crashing
        Vars.ui.showInfoToast("error: " + e,1);
    }
});
