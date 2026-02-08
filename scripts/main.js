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
    Team.get(4).setPalette(Color.valueOf("a1d463"));
    Team.get(4).emoji = "[#a1d463][]";
})
