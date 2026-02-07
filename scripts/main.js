
Events.on(ContentInitEvent, e => { 
// lol
Planets.gier.visible = true;
Planets.gier.accessible = true;

// green.color = Color.valueOf("ffd37f");
});


Events.on(SchematicCreateEvent, event => {
    Vars.ui.hudfrag.showToast("Schematic Saved.");
})

Events.on(Trigger.importMod, event => {
    Vars.ui.hudfrag.showToast("Successfully imported.");
})

Events.on(Trigger.teamCoreDamage, event => {
Vars.ui.hudfrag.showToast("[red]Core damaged.");
})
