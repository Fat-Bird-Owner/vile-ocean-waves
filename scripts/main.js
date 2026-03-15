Events.on(ContentInitEvent, e => {
try {

const kela = Vars.content.getByName(ContentType.planet, "gr-kela");

kela.techTree = Planets.gier.techTree;
kela.techTree.addPlanet(kela);

kela.defaultEnv = Planets.tantros.defaultEnv;

kela.generator = new SerpuloPlanetGenerator();
kela.generator = new SerpuloPlanetGenerator();

kela.meshLoader = () => new SunMesh(
    kela, 6, 5, 0.3, 1.7, 1.2, 1.0, 1.1,
    Color.valueOf("0a1d2e"),
    Color.valueOf("1c3a2c"),
    Color.valueOf("5c7a4a"),
    Color.valueOf("b0c46c")
);

kela.atmosphereColor = Color.valueOf("4be3ff");
kela.iconColor = Color.valueOf("7fffd4");

kela.reloadMesh();

// regenerate the mesh
kela.reloadMesh();

} catch(e){
Vars.ui.showInfoToast(e,5);
}
});





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
