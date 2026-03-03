var lastUpdate = 0

Events.on(TapEvent, event => {
    try {
        
        if(Vars.state.updateId == lastUpdate) return;

        lastUpdate = Vars.state.updateId;
        
        const tile = event.tile;
        if (!tile || !tile.build) return;

        const target = Blocks.combustionGenerator;
        
        const block = tile.block();
        if (block != target) return;

        const build = tile.build;

        if (build.power && build.power.graph) {
            const pow = target.powerProduction * 60;

            build.power.graph.transferPower(pow);
        }

        if (Fx.dooropenlarge) {
            Fx.dooropenlarge.at(build.x, build.y);
        }

        if (Sounds.click) {
            Sounds.click.at(build.x, build.y);
        }
    } catch (e) {
        // fails silently on iOS instead of crashing
        Vars.ui.showInfoToast("error: " + e,1);
    }
});
