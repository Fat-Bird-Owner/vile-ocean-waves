
Events.on(ContentInitEvent, e => { 
// lol
Planets.gier.visible = true;
Planets.gier.accessible = true;

// green.color = Color.valueOf("ffd37f");
});


Events.on(SchematicCreateEvent, event => {
    Vars.ui.hudfrag.showToast("Schematic Saved.");
})

Events.on(SectorLaunchLoadoutEvent, event => {
   Vars.ui.hudfrag.showToast(event.sector.captureWave);
})
