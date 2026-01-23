/*
Events.on(ContentInitEvent, e => { 
// lol
Planets.gier.visible = true;
Planets.gier.accessible = true;

var green = Team.green;

});
*/

Events.on(SchematicCreateEvent, event => {
    Vars.ui.hudfrag.showToast("Schematic Saved.");
})
