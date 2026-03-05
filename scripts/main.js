Events.on(PlayerChatEvent, event => {
    try {
        if (!event.player.isLocal()) return; // only run once
        if (!event.message) return;

        var parts = event.message.split(" ");
        if (parts[0] !== "!spawn") return;

        const unitType = Vars.content.getByName(ContentType.unit, parts[1]);
        if (!unitType) {
            Vars.ui.showInfoToast("[red]Unit not found: " + parts[1], 2);
            return;
        }

        const player = event.player;
        const pUnit = player.unit();
        if (!pUnit) return;

        unitType.spawn(player.team(), pUnit.x, pUnit.y);
        return;
    } catch (e) {
        Vars.ui.showInfoToast(e.toString(), 3);
    }
});






Events.on(GeneratorPressureExplodeEvent, event => {

try {
// Find entity otherwise return if is then if the block type isnt the target's also return

var target = Vars.content.getByName(ContentType.block, "neoplasia-reactor");
  
  if(event.build && event.build.block == target){  
  
    var x = event.build.x;
    var y = event.build.y;
    var block = Vars.content.getByName(ContentType.block, "gr-sporeoplasma");  

    if (!event.build.tile || !block) return;

    Vars.ui.announce("[red]///Sporeoplasma Detected///",4.5);
    
    Timer.schedule(() => {  
    event.build.tile.setBlock(block,Team.get(4),1);
    }, 0.15);

  }
  
} catch(e){
Vars.ui.showInfoToast(e,3);
}
  
})




Events.on(ClientLoadEvent, e => { 
  
try{
Vars.ui.showStartupInfo("[]Gier's world generation is bound to be terrible");
} catch(e) {
Vars.ui.showInfoToast(e);
}
  
})
