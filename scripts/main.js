
Events.on(GeneratorPressureExplodeEvent, event => {

// Find entity otherwise return if is then if the block type isnt the target's also return

var target = Vars.content.getByName(ContentType.block, "neoplasiaReactor");
  
  if(event.build != null){  
  if (event.build.block != target) return;

    Vars.ui.showInfoToast(event.build.tileX(),2);

    var x = event.build.tileX();
    var y = event.build.tileY();
    var block = Vars.content.getByName(ContentType.block, "gr-sporeoplasma");  

    if (event.build.tile == null) return;
    if (block == null) return;
    
    Timer.schedule(() => {  
    event.build.tile.setBlock(block,Team.get(4),1);
    Vars.ui.announce("[red]///Sporeoplasma Detected///",4.5);
    }, 0.1);

  }
})

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
