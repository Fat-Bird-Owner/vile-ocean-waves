var lastUpdate = 0

// Power button class
var lastUpdate = 0

Events.on(TapEvent, event => {
    try {
        
        if(Vars.state.updateId == lastUpdate) return;

        lastUpdate = Vars.state.updateId;
        
        const tile = event.tile;
        if (!tile || !tile.build) return;

        const target = Vars.content.getByName(ContentType.block, "gr-button");
        const effect = Vars.content.getByName(ContentType.block, "gr-button-tap").generateEffect;

        const block = tile.block();
        if (block != target) return;

        const build = tile.build;

        //Vars.ui.showInfoToast(build.team + " " + event.player.team(),1);
        
        if (build.team != event.player.team()) return;
        if (build.power && build.power.status) {
            const pow = target.powerProduction * 60;

            build.power.status = 1;
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
