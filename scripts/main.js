
Events.on(ContentInitEvent, e => { 
// lol
Planets.gier.visible = true;
Planets.gier.accessible = true;

// green.color = Color.valueOf("ffd37f");

//quietUnlock
    
});


Events.on(SchematicCreateEvent, event => {
    Vars.ui.hudfrag.showToast("Schematic Saved.");
})

Events.on(PlayEvent, event => {

Object.keys(Blocks).forEach(function (b) {
if(Blocks[b] != null) {
Blocks[b].quietUnlock();
}});

})
