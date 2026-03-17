Events.on(ResearchEvent, e => {
try {
const content = e.content;
  const gier = Planets.gier;
    const wave = Vars.state.wave;
    
const target = Vars.content.getByName(ContentType.status, "gr-dedrone");
  if (content == target && wave == 1){
    if (Vars.state.isGame() != true && Vars.state.getPlanet() == gier) return;

  Vars.ui.hudfrag.showToast("[red]Dedrone Enabled");

  const facility = Vars.content.getByName(ContentType.block,"gr-drone-facility");
    const dropzone = Vars.content.getByName(ContentType.block,"gr-facility-dropzone");
      const banned = Vars.state.rules.bannedBlocks;

  banned.add(facility);
    banned.add(dropzone);

  }
// Dedrone Endregion

const target = Vars.content.getByName(ContentType.status, "gr-reinforced");
  if (content == target && wave == 1){
    if (Vars.state.isGame() != true && Vars.state.getPlanet() == gier) return;

  Vars.ui.hudfrag.showToast("[red]Reinforced Enabled");

  Vars.state.rules.teams.get(5).unitHealthMultiplier = 1.45;
    
  }

} catch(e){
Vars.ui.showInfoToast(e,5);
}});
// Reinforced endregion

Events.on(SectorLaunchEvent, event => {
try {

const target = Vars.content.getByName(ContentType.status,"gr-dedrone");
target.clearUnlock();

} catch(e){
Timer.schedule(() => {  
Vars.ui.showText("e",e,Align.center);
},1.5);
}});


/*
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






*/
