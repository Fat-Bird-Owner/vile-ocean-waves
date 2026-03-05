
Events.on(GeneratorPressureExplodeEvent, event => {

try {

// Find entity otherwise return if is then if the block type isnt the target's also return

var target = Vars.content.getByName(ContentType.block, "neoplasiaReactor");
  
  if(event.build != null){  
  if (event.build.block != target) return;

    var x = event.build.tileX();
    var y = event.build.tileY();
    var block = Vars.content.getByName(ContentType.block, "gr-sporeoplasma");  

    if (event.build.tile == null) return;
    if (block == null) return;

    Vars.ui.announce("[red]///Sporeoplasma Detected///",4.5);
    
    Timer.schedule(() => {  
    event.build.tile.setBlock(block,Team.get(4),1);
    }, 0.1);

  }
  
} catch(e)
Vars.ui.showInfoToast(e,3);
}
  
})
