Events.on(ClientLoadEvent, e => { 

Vars.ui.showInfoText("[red]Warning![]","[]Gier's world generation is bound to be terrible");

})

// catch the signal for when schematic is made.
// listen for the event where a unit is destroyed
Events.on(GeneratorPressureExplodeEvent, event => {
  // display toast on top of screen when the unit was a player
  if(event.build != null){
  if (event.build.block != Blocks.neoplasiaReactor) return;

    Vars.ui.showInfoToast(event.build.tileX(),2);

    var x = event.build.tileX();
    var y = event.build.tileY();
       
    if (event.build.tile == null) return;

    Timer.schedule(() => {
    event.build.tile.setBlock(Blocks.coreShard,Team.get(6),1);
    }, 0.2);


  }
})

Events.on(BuildDamageEvent, event => {

    //Vars.ui.hudfrag.showToast(event.build.block.name);
    Timer.schedule(() => {
        
    if (event.build.block.name != "surge-wall") return;
    
    event.build.kill();
    UnitTypes.mono.spawn(event.build.team,event.build.x,event.build.y);
    }, 0.01);

})

Events.on(SectorCaptureEvent, event => {
    // Read is there a preset most likely a numbered sector is is null
    if (event.sector.preset == null) return;
    // if it is a preset find the planet's name
    
    if (event.sector.preset.planet.name != "vow-besualia") return;

    // wait for when after the rule is disabled
    Timer.schedule(() => {
    Vars.state.rules.disableWorldProcessors = false;
    //Vars.ui.hudfrag.showToast("Pathetic.");
    }, 0.2);

})

Events.on(WorldLoadEvent, event => {
    Team.get(4).setPalette(Color.valueOf("77c44b"));
    Team.get(4).emoji = "[#77c44b][]"; 
    
    Team.get(5).setPalette(Color.valueOf("db7827"));
    Team.get(5).emoji = "[#db7827][]";  
    
})
