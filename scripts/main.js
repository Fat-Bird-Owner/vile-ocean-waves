Events.on(ClientLoadEvent, e => { 

Vars.ui.showInfoText("[red]Warning![]","[]Gier's world generation is bound to be terrible);

});

// catch the signal for when schematic is made.
Events.on(SchematicCreateEvent, event => {
    Vars.ui.hudfrag.showToast("Schematic Saved.");
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
