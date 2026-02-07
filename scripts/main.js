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
    var green = Team.get(4);
    green.setPalette(Color.valueOf("4d4e58"));
})
