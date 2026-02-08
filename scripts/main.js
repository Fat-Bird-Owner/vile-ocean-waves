Events.on(ContentInitEvent, e => { 
// lol
Planets.gier.visible = true;
Planets.gier.accessible = true;

//quietUnlock
});


Events.on(SchematicCreateEvent, event => {
    Vars.ui.hudfrag.showToast("Schematic Saved.");
})

Events.on(WorldLoadEvent, event => {
    Team.get(4).setPalette(Color.valueOf("77c44b"));
    Team.get(4).emoji = "[#77c44b][]";    
})
