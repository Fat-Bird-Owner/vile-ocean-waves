var lastBuild = null;

Events.on(TapEvent, e => {
try {

const tile = e.tile;
const build = tile.build;
if (build == null) return;
if (lastBuild == build){
build.kill();
}

Fx.mineBig.at(build.x,build.y);
lastBuild = build;
    
} catch(e){
Vars.ui.showInfoToast(e,5);
}});




Events.on(UnitCreateEvent, e => {
try{
const spawner = e.spawner;
const unit = e.unit;

if (spawner.block != Blocks.unitCargoLoader) return;

Vars.ui.showInfoToast("works",5);
    
if (spawner.items.has(Items.titanium,45) && spawner.items.has(Items.thorium,65)) {
    unit.kill();
    UnitTypes.mega.spawn(spawner.team, spawner.x, spawner.y);

    spawner.removeStack(Items.titanium,45);
    spawner.removeStack(Items.thorium,65);
}


} catche(e){
Vars.ui.showInfoToast(e,5);
}});



/*
Events.on(ResearchEvent, e => {
    try {
        const content = e.content;
        Vars.ui.showInfoToast("Researched: " + content.name, 3);

        const gier = Planets.gier;

        if (!Vars.state.isGame() || Vars.state.getPlanet() != gier) return;

        //const target = Vars.content.getByName(ContentType.status, "gr-dedrone");

        if (content.name == "gr-dedrone") {
            Vars.ui.hudfrag.showToast("[red]Dedrone Enabled");

            const facility = Vars.content.getByName(ContentType.block,"gr-drone-facility");
            const dropzone = Vars.content.getByName(ContentType.block,"gr-facility-dropzone");

            Vars.state.rules.bannedBlocks.add(facility);
            Vars.state.rules.bannedBlocks.add(dropzone);
        }

        //const target2 = Vars.content.getByName(ContentType.status, "gr-reinforced");

        if (content.name == "gr-reinforced") {
            Vars.ui.hudfrag.showToast("[red]Reinforced Enabled");

            Team.get(5).unitHealthMultiplier = 1.45;
        }

    } catch(err){
        Vars.ui.showInfoToast(err, 5);
    }
});


Events.on(SectorLaunchEvent, event => {
try {
Vars.ui.showInfoToast("planet: " + Vars.state.getPlanet(), 3);
    
Vars.content.getByName(ContentType.status,"gr-dedrone").clearUnlock();
//Vars.content.getByName(ContentType.status,"gr-reinforced").clearUnlock();

} catch(e){
Timer.schedule(() => {  
Vars.ui.showText("e",e,Align.center);
},1.5);
}});



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
