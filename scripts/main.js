try{

function radarBuild(tile){
try{

if(tile == null || tile.build == null) return;
const build = tile.build;

// pause check
if(Vars.state.isPaused()){
    Timer.schedule(() => radarBuild(tile), 0.25);
    return;
}

Lightning.create(
build.team,
build.team.color,
20,
build.x,
build.y,
Mathf.random(360),
20
);

Timer.schedule(() => radarBuild(tile), 1);

} catch(e){
Vars.ui.showInfoToast(e,5);
}
}



// when placed
Events.on(BlockBuildEndEvent, e => {
try{
if(!e.breaking){
    radarBuild(e.tile);
}
} catch(e) {
Vars.ui.showInfoToast(e,5);
}
});

// when loading a save
Events.on(WorldLoadEvent, e => {

Timer.schedule(() => {

Vars.world.tiles.each(tile => {
    if(tile.build && tile.block == Blocks.copperWall){
        radarBuild(tile);
    }
});
    
},0.05);

});





Events.on(SectorLaunchEvent, event => {
try {

const sector = event.sector;
const info = sector.info;
  
  if (sector && info){
  const attempts = info.attempts;

  Timer.schedule(() => {  
  Vars.ui.showInfoFade("Attempt [accent]" + attempts,4.5); 
  }, 2.667);

}

  
} catch(e){
    Timer.schedule(() => {  
Vars.ui.showText("e",e,Align.center);
    },1.5);
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

const display = Core.bundle.get("mod.gr.display");
const title = Core.bundle.get("mod.gr.mail");
  
MapResizeDialog.maxSize = 2500;
Vars.ui.showText(title,display,Align.center);
    
} catch(e) {
Vars.ui.showText("Not work",e,Align.center);
}

})


} catch(e){
Vars.ui.showText("Not work",e,Align.center);
}
