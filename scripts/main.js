var lastUpdate = 0

Events.on(TapEvent, event => {
    try {
        
        if(Vars.state.updateId == lastUpdate) return;

        lastUpdate = Vars.state.updateId;
        
        const tile = event.tile;
        if (!tile || !tile.build) return;

        const block = tile.block();
        if (block != Blocks.combustionGenerator) return;

        const build = tile.build;

        if (build.power && build.power.grapha) {
            build.power.graph.transferPower(15);
        }

        if (Fx.dooropenlarge) {
            Fx.dooropenlarge.at(build.x, build.y);
        }

        if (Sounds.click) {
            Sounds.click.at(build.x, build.y);
        }
    } catch (e) {
        // fails silently on iOS instead of crashing
        Vars.ui.showInfoToast("iOS safe error: " + e,1);
    }
});
