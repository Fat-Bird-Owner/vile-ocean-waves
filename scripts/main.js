
Events.on(ContentInitEvent, e => { 
// lol
Planets.gier.visible = true;
Planets.gier.accessible = true;

// green.color = Color.valueOf("ffd37f");

//quietUnlock
Blocks.disassembler:quietUnlock();
});


Events.on(SchematicCreateEvent, event => {
    Vars.ui.hudfrag.showToast("Schematic Saved.");
})
