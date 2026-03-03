var lastUpdate = 0

Events.on(TapEvent, event => {
    try {
        
        if(Vars.state.updateId == lastUpdate) return;

        lastUpdate = Vars.state.updateId;
        
        const tile = event.tile;
        if (!tile || !tile.build) return;

        const target = Vars.content.getByName(ContentType.block, "gr-button");
        
        const block = tile.block();
        if (block != target) return;

        const build = tile.build;

            Vars.ui.showInfoToast(build.team + " " + event.player.team,1);
        
        if (build.team != event.player.team) return;
        if (build.power && build.power.graph) {
            const pow = target.powerProduction * 60;

            build.power.graph.transferPower(pow);
        }

        if (block.generateEffect) {
            block.generateEffect.at(build.x, build.y);
        }

        if (Sounds.click) {
            Sounds.click.at(build.x, build.y);
        }
    } catch (e) {
        // fails silently on iOS instead of crashing
        Vars.ui.showInfoToast("error: " + e,1);
    }
});
