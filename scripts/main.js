Events.on(PlayerChatEvent, event => {
try{
  
if (event.message != null){

var string = event.message;
const playerUnit = event.player.unit;
var input = string.split(" ");

if (input[1] === "!spawn"){

const unit = Vars.content.getByName(ContentType.unit, input[2]);

if (!unit) return;
unit.spawn(player.team,player.x,player.y,player.rotation);

}else{
Vars.ui.showInfoToast("[red]" + input[2] + " Not found",2);
}

///
}

} catch(e){
Vars.ui.showInfoToast(e);
}

///
})






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
