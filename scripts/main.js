var lastBuild = "";

Events.on(TapEvent, event => {
try {


const tile = event.tile;
const build = tile.build;
const block = tile.block;
const target = Vars.ui.content.getByName(ContentType.block, "phase-wall");

    
if (!build || block != target) return;
if (build != lastBuild){
lastBuild = build;
sounds.click.at(build.x,build.y);
}

build.kill();    

/// end   
} catch (e)
Vars.ui.showInfoToast(e,3);
}});






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

Vars.ui.settings.
    
} catch(e) {
Vars.ui.showInfoToast(e);
}

})
