Events.on(TileChangeEvent, e => {
try{
const tile = e.tile;
const building = tile.build;

if (tile.block() instanceof StorageBlock){
building.linkedCore = Vars.player.core();
}
    
} catch(e){
Vars.ui.showText("bruv",e);
}});


var myTrackedBuildings = [];

Events.on(EventType.TileChangeEvent, e => {
    var b = e.tile.build;
    if(b && b.block == Blocks.copperWall){
        myTrackedBuildings.push(b);
    }
});

Events.on(EventType.BlockDestroyEvent, e => {
    var b = e.tile.build;
    myTrackedBuildings = myTrackedBuildings.filter(x => x != b);
});

Events.on(EventType.Trigger.draw, () => {
    for(var b of myTrackedBuildings){
        Draw.z(Layer.overlayUI);
        Draw.rect(
            Core.atlas.find("your-region-name"),
            b.x, b.y,
            b.block.size * 8, b.block.size * 8
        );
        Draw.reset();
    }
});


/*Events.on(EventType.WorldLoadEvent, e => {
    try{

        // only run in campaign sectors
        if(!Vars.state.isCampaign()) return;

        const sector = Vars.state.getSector();
        if(!sector) return;

        const tiles = Vars.world.tiles;

        const team = Team.crux; // enemy team

        const cores = new Seq();
        const spawns = new Seq();

        // collect enemy cores + spawn points
        Vars.world.tiles.each(tile => {
            try{
            if(tile.build){
                if(tile.build.team == team && tile.block() instanceof CoreBlock){
                    cores.add(tile.build);
                }
            }

            if(tile.overlay() == Blocks.spawn){
                spawns.add(tile);
            }
            } catch(e){
            Vars.ui.showText("bruv",e);
            }});

        // difficulty (0–1 usually)
        const difficulty = sector.threat;

        const gen = new BaseGenerator();

        // ⚠️ this is the important call
        gen.generate(tiles, cores, spawns, team, sector, difficulty);

        print("Generated enemy base");

    }catch(err){
        Vars.ui.showInfoToast(err, 10);
    }
});


Events.on(ClientLoadEvent, () => {
try{
        
    Vars.ui.settings.addCategory("[sky]Gier: Revitalized[]", Icon.menu, t => {

        // toggle
        t.checkPref("command-block-texture", false, b => {
        try{

        const block = Vars.content.block("gr-command-block");
                
        if (b == true){
        block.region = Core.atlas.find("gr-command-block");
        } else {
        block.region = Core.atlas.find("gr-command-block-modern");
        }
                
        } catch(e){
        Vars.ui.showInfoToast(e,10);
        }});
        // text input
              t.textPref("my-text", "default", s => {
            print("Text: " + s);
        });

    });
} catch(e){
Vars.ui.showText("bruh",e);
}});*/

Events.on(ClientLoadEvent, () =>{
try{
    
Attribute.add("beryllium");
Blocks.beryllicStoneWall.attributes.set(Attribute.get("beryllium"), 1);
Blocks.stoneWall.attributes.set(Attribute.get("beryllium"), 0.5);

Vars.content.block("gr-fissure-amalgam").stats.add(Stat.tiles, StatValues.blocks(Attribute.get("beryllium"), false, 1, true, false));
Vars.content.block("gr-fissure-amalgam").stats.add(Stat.output, StatValues.content(Blocks.berylliumWall));
Vars.content.block("gr-fissure-amalgam").addBar("ef", e => new Bar("Efficency", Pal.lightOrange, () => e && e.efficiency > 0 ? e.efficiency : 0));

Vars.ui.menufrag.addButton("Gier", new TextureRegionDrawable(Core.atlas.find("gr-command-block-modern")), () => {
try{

Vars.control.playSector(Planets.gier.sectors.get(0));
    
} catch(e){
Vars.ui.showText("bruv",e);
}})

} catch(e){
Vars.ui.showText("bruv",e);
}});


Events.on(BlockInfoEvent, () => {
try{

const block = Vars.content.block("gr-command-block");
const cont = Vars.ui.content.cont;

if (Vars.player.selectedBlock != block) return;

cont.row()
cont.add("[accent]<Commands>[lightgrey]").left().row();
cont.add().height(3).row()
cont.image().color(Pal.accent).height(3).width(400).left().row();


cont.add("- Clear all units").left().row();
cont.add("- Stop player unit").left().row();
cont.add("- Change team").left().row();
cont.add("- Toggle canGameOver").left().row();
cont.add("- Toggle editor [gray](saving while enabled crashes)[]").left().row();
cont.add("- Toggle disableUnitCap").left().row();
cont.add("- Spawn unit").left().row();
cont.add("- Get current unit [gray](saves to spawn unit)[]").left().row();
cont.add("- Unit library [gray](Only accesses vanilla units)[]").left().row();
cont.add("- Fill core").left().row();
        
} catch(e){
Vars.ui.showText("vruh",e);    
}});

/*
Events.on(TileChangeEvent, e => {
try{

Vars.ui.showInfoToast("works",2.5);
        
const tile = e.tile;
const floor = tile.floor();
const block = tile.block();
const targetFloor = Vars.content.block("grass");
const targetBlock = Vars.content.block("copper-wall");

if (floor != targetFloor) return;

var x = tile.x;
var y = tile.y;

if (Math.random() < 0.5){
    x += Math.random() < 0.5 ? 1 : -1;
} else {
    y += Math.random() < 0.5 ? 1 : -1;
}

const overlapTile = Vars.world.tile(x,y);

if (overlapTile.floor() == targetFloor){
Timer.schedule(() => {
overlapTile.setFloor(Vars.content.block("shallow-water"));
}, 0.1);
}
        
} catch(e){
Vars.ui.showInfoToast(e,10);
}});
*/
var lastUnit = "";
var lastCommand = "";

Events.on(EventType.TapEvent, e => {
    try {
        if (!e || !e.tile || !e.player) return;

        const tile = e.tile;
        const player = e.player;

        if (!tile.block() || player.selectedBlock != null) return;

        const block = tile.block();
        const build = tile.build;

        if (!build) return;
        const buildTeam = build.team;

        const target = Vars.content.block("copper-wall");

        if (block != target) return;

        Sounds.click.at(build.x, build.y);

        Vars.ui.showMenu(
            "<Commands List>",
            "[lightgrey]Free will at last. [red]<Crashes is possibles>[]",
            [
                ["Clear Units"],
                ["Stop Player"],
                ["Change Team"],
                ["Toggle canGameover"],
                ["Toggle Editor"],
                ["Toggle disableUnitCap"],
                ["Spawn Unit"],
                ["Get Current Unit"],
                ["Unit Library [grey]<Vanilla Only>[]"],
                ["Fill Core"],
                ["Run Javascript"],
                ["Close"]
            ],
            i => {

                if (i == 0) {

                    Sounds.uiButton.play();
                    Groups.unit.clear();
                    Vars.ui.hudfrag.showToast(Icon.tree, "[green]All units cleared");

                } else if (i == 1) {
                    try {

                        Sounds.uiButton.play();
                        const p = Vars.player;
                        if (!p) {
                            Vars.ui.hudfrag.showToast(Icon.tree, "[grey]Player does not exist.");
                            return;
                        }
                        const unit = p.unit();

                        if (!unit) {
                            Vars.ui.hudfrag.showToast(Icon.tree, "[grey]No unit found");
                            return;
                        }

                        unit.apply(StatusEffects.unmoving, 9999 * 60);
                        Vars.ui.hudfrag.showToast(Icon.tree, "[grey]Stopped player unit");

                    } catch (err) {
                        Vars.ui.showInfoToast("err: " + err, 5);
                    }

                } else if (i == 2) {
                    try {

                        Vars.ui.showTextInput("Change Team", "Enter team id", 100, lastUnit, true, text => {
                        try{

                        Sounds.uiButton.play();
                        const p = Vars.player;
                        if (!p) {
                            Vars.ui.showInfoToast("Wheres the player vro.", 3);
                            return;
                        }

                        const currentTeam = p.team();
                        const newTeam = Team.get(text);

                        p.team(newTeam);
                        Vars.ui.hudfrag.showToast(Icon.tree, "[accent]Team changed");

                        } catch(e){
                        Vars.ui.showInfoToast(e,10);
                        }});

                    } catch (err) {
                        Vars.ui.showInfoToast(String(err), 15);
                    }} else if (i == 3){
                        try{

                    Sounds.uiButton.play();
                    const gameOver = Vars.state.rules.canGameOver;
                    Vars.state.rules.canGameOver = !gameOver;

                    Vars.ui.hudfrag.showToast(Icon.tree, "[accent]Toggled canGameOver: [lightgrey]" + !gameOver);
                        
                    } catch(e){
                    Vars.ui.showInfoToast(e,5);    
                    }} else if (i == 4){
                        try {

                    const editor = Vars.state.rules.editor;
                    Vars.state.rules.editor = !editor;

                    Vars.ui.hudfrag.showToast(Icon.tree, "[accent]Toggled editor: [lightgrey]" + !editor);
                             
                    } catch(e){
                    Vars.ui.showInfoToast(e,5);  
                    }} else if (i == 5){
                        try{

                    Sounds.uiButton.play();
                    const disableUnitCap = Vars.state.rules.disableUnitCap;
                    Vars.state.rules.disableUnitCap = !disableUnitCap;

                    Vars.ui.hudfrag.showToast(Icon.tree, "[accent]Toggled disableUnitCap: [lightgrey]" + !disableUnitCap);
                            
                    } catch(e){
                    Vars.ui.showInfoToast(e,10);
                    }} else if (i == 6){
                        try{

                    Sounds.uiButton.play();
                    Vars.ui.showTextInput("SpawnUnit", "Enter unit's internal name (modName-fileName)", 100, lastUnit, false, text => {
                        try{
                    lastUnit = text;
                    const unit = Vars.content.getByName(ContentType.unit, text);

                    if (unit == null){
                    Vars.ui.hudfrag.showToast(Icon.chat,"[red]Unit Invalid[]");
                    return;
                    }
                        
                    unit.spawn(buildTeam,build.x,build.y,90);
                    Sounds.waveSpawn.at(build.x,build.y);
                    Fx.spawn.at(build.x,build.y);
                            
                    Vars.ui.hudfrag.showToast(Icon.chat, "[accent]Spawned in a(n) []" + unit.localizedName);

                    } catch(e){
                    Vars.ui.showInfoToast(e,5);
                    }});

                            

                    } catch(e){
                    Vars.ui.showInfoToast(e,5);
                    }} else if (i == 7){
                        try{

                    Sounds.uiButton.play();
                    const unit = Vars.player.unit();
                    if (!unit) return;
                    const type = unit.type.name;
                    lastUnit = type;
                    Vars.ui.hudfrag.showToast(Icon.eye,"[lightgrey]Copied to spawn unit");
                            
                    } catch(e){
                    Vars.ui.showInfoToast(e,5);
                    }} else if(i == 8){
                    try{

                    Sounds.uiButton.play();
                    var units = [];
                        
                   Object.keys(UnitTypes).forEach(unit => {
                    try{
                    if (unit != null || unit != "load"){
                    units.push(unit);
                    }} catch(e){
                    Vars.ui.showInfoToast(e,10);
                    }});

                    Vars.ui.showStartupInfo(units.join(" "));
                    
                    } catch(e){
                    Vars.ui.showInfoToast(e,10);
                    }} else if(i == 9){

                    Sounds.uiButton.play();
                    let core = Vars.player.core();
                    let amount = 0;
                    
                    Vars.content.items().each(item => {
                    try{
                        
                    core.items.set(item, core.storageCapacity);
                    amount++;
                    } catch(e){
                    Vars.ui.showInfoToast(e,15);
                    }});

                    Vars.ui.hudfrag.showToast(Icon.effect,"[accent]Filled core with []" + amount + "[accent] different items");
                    
                    } else if (i == 10){
                    try{

                    Sounds.uiButton.play();
                    Vars.ui.showTextInput("<Run Javascript>", "May break the game depending on the script", 100, lastCommand, false, text => {
                    try{      

                    const error = "[red]Error Found";
                    lastCommand = text;
                    eval("try{ " + text + "} catch(e) { Vars.ui.showText(error,e)}");
                    
                    Sounds.waveSpawn.play();
                    Vars.ui.hudfrag.showToast(Icon.chat, "[accent]Ran: []" + text);
                    
                    } catch(e){
                    Vars.ui.showInfoToast(e,10);
                    }});
                        
                    } catch(e){
                    Vars.ui.showInfoToast(e,10);       
                    }}
            }
        );

    } catch (err) {
        Vars.ui.showInfoToast(String(err), 5);
    }
});


/*
var lastBuild = null;

Events.on(TapEvent, e => {
try{
const tile = e.tile;
const block = tile.block();
const player = e.player;
const build = tile.build;

if (build != lastBuild){
lastBuild = build;
return;
}
    
if (player.team() != tile.team() || player.selectedBlock != null) return;

const crafters = [
Vars.content.block("gr-melting-port"),
Vars.content.block("gr-lead-melting-port")
];

if (block == crafters[0] || block == crafters[1] || block == crafters[2]){
Sounds.click.at(tile.worldx(),tile.worldy());
}

const buildTeam = build.team;


const blockTile = build.tile;
if (block == crafters[0]){
blockTile.setBlock(crafters[1], buildTeam);
} else if (block == crafters[1]) {
blockTile.setBlock(crafters[0], buildTeam);
} else {
return;
}

if (blockTile.block() != block){
Fx.select.at(blockTile.worldx(),blockTile.worldy());
}
  
} catch(e){
Vars.ui.showInfoToast(e,5);
}});




var cyanogenFx = null;
var waterFx = null;
var galliumFx = null;
var cryoFx = null;

Events.on(ContentInitEvent, e => {
try {
cyanogenFx = new WrapEffect(Fx.artilleryTrailSmoke, Color.valueOf("89e8b699"));
waterFx = new WrapEffect(Fx.artilleryTrailSmoke, Color.valueOf("596ab8ff"));
galliumFx = new WrapEffect(Fx.artilleryTrailSmoke, Color.valueOf("9a9dbf"));
cryoFx = new WrapEffect(Fx.artilleryTrailSmoke, Color.valueOf("6ecdecff"));
    
Liquids.gallium.hidden = false;
Liquids.gallium.coolant = true;
} catch(e){
Vars.ui.showInfoToast(e,5);
}});




Events.on(UnitCreateEvent, e => {
try {

const unit = e.unit;
const spawner = e.spawner;
if (spawner == null) return;

const type = spawner.block;
const target =  Vars.content.getByName(ContentType.block,"gr-imprinter");

if (type == target && spawner.liquids != null){

if (spawner.liquids.get(Liquids.cyanogen) >= 10){
unit.apply(StatusEffects.overdrive,9999);
spawner.liquids.remove(Liquids.cyanogen,10);
cyanogenFx.at(spawner.x,spawner.y);    
}

if (spawner.liquids.get(Liquids.water) >= 10){
unit.apply(StatusEffects.fast,9999);
spawner.liquids.remove(Liquids.water,10);
waterFx.at(spawner.x,spawner.y);
}

if (spawner.liquids.get(Liquids.cryofluid) >= 10){
unit.apply(StatusEffects.overclock,9999);
spawner.liquids.remove(Liquids.cryofluid,10);
cryoFx.at(spawner.x,spawner.y);
}

if (spawner.liquids.get(Liquids.gallium) >= 10){
unit.apply(StatusEffects.shielded,9999);
spawner.liquids.remove(Liquids.gallium,10);
galliumFx.at(spawner.x,spawner.y);
}
}
    
} catch(e){
Vars.ui.showInfoToast(e,5);
}});

Events.on(ResearchEvent, e => {
    try {
        const content = e.content;
        const gier = Planets.gier;

        if (!Vars.state.isGame() || Vars.state.getPlanet() != gier || Vars.state.wave != 1) return;

        const drone = Vars.content.getByName(ContentType.status, "gr-dedrone");
        const reinforced = Vars.content.getByName(ContentType.status, "gr-reinforced");
        const delisted = Vars.content.getByName(ContentType.status, "gr-delisted");
    
        if (content == drone) {
            drone.clearUnlock();
            const facility = Vars.content.getByName(ContentType.block,"gr-drone-facility");
            const dropzone = Vars.content.getByName(ContentType.block,"gr-facility-dropzone");

            const count = Groups.build.count(b => 
            b != null && b.isValid() && (b.block === facility || b.block === dropzone)
            );
            if (count != 0){
            Vars.ui.hudfrag.showToast(Icon.settings, "[red]Modifier building on the map");
            return;
            }
            
            Vars.ui.hudfrag.showToast(Icon.settings, "[tan]Dedrone[red] Enabled");
            Vars.state.rules.bannedBlocks.add(facility);
            Vars.state.rules.bannedBlocks.add(dropzone);
        }

        if (content == reinforced) {
            Vars.ui.hudfrag.showToast(Icon.settings, "[lightgrey]Reinforced[red] Enabled");

            Vars.state.rules.teams.get(Team.get(5)).unitHealthMultiplier = 1.45;
            reinforced.clearUnlock();
        }

        if (content == delisted) {
            delisted.clearUnlock();
            const outpost = Vars.content.getByName(ContentType.block,"gr-outpost");

            const count = Groups.build.count(b => b.block === outpost);
            if (count != 0){
            Vars.ui.hudfrag.showToast(Icon.settings, "[red]Modifier building on the map");
            return;
            }
        
            Vars.ui.hudfrag.showToast(Icon.settings, "[accent]Delisted[red] Enabled");
            Vars.state.rules.bannedBlocks.add(outpost);
        }

        drone.clearUnlock();
        reinforced.clearUnlock();
        delisted.clearUnlock();   
        
    } catch(err){
        Vars.ui.showInfoToast(err, 5);
    }
});


Events.on(SectorLaunchEvent, event => {
try {
Vars.ui.showInfoToast("planet: " + Vars.state.getPlanet(), 3);
    
const dedrone = Vars.content.getByName(ContentType.status,"gr-dedrone");
dedrone.clearUnlock();

const reinforced = Vars.content.getByName(ContentType.status,"gr-reinforced");
reinforced.clearUnlock();

const delisted = Vars.content.getByName(ContentType.status,"gr-delisted");
delisted.clearUnlock();
    
} catch(e){
Timer.schedule(() => {  
Vars.ui.showText("e",e,Align.center);
},1.5);
}});

Events.on(GeneratorPressureExplodeEvent, event => {

try {
// Find entity otherwise return if is then if the block type isnt the target's also return

var target = Vars.content.getByName(ContentType.block, "gr-sporeoplasmic-cultivator");
  
  if(event.build && event.build.block == target){  
  
    var x = event.build.x;
    var y = event.build.y;
    var block = Vars.content.getByName(ContentType.block, "gr-sporeoplasma");  

    if (!event.build.tile || !block) return;
    
    Timer.schedule(() => {  
    event.build.tile.setBlock(block,Team.get(4),1);
    }, 0.15);

  }
  
} catch(e){
Vars.ui.showInfoToast(e,3);
}
  
})

Events.on(BuildDamageEvent, e => {
try{
const build = e.build;
const source = e.source;
const damage = source.damage;

const block = build.block;
const target = Vars.content.getByName(ContentType.block,"gr-dummy");

if (block != target || build == null || source == null) return;

Vars.ui.showLabel("[red]" + damage,500,0.5,build.x,build.y);
    
} catch(e){
Vars.ui.showInfoToast(e,6);
}});

let routHealth = null;
let routSpeed = null;
let routArmor = null;
let routWeapons = null;

Events.on(ContentInitEvent, e => {
try{
const routerGod = Vars.content.getByName(ContentType.unit,"gr-router-god");
routHealth = routerGod.health;
routSpeed = routerGod.speed;
routArmor = routerGod.armor;
routWeapons = routerGod.weapons;


} catch(e){
Vars.ui.showText("Not work",e,Align.center);
}});

/*
var lastUnit = "";

Events.on(EventType.TapEvent, e => {
    try {
        if (!e || !e.tile || !e.player) return;

        const tile = e.tile;
        const player = e.player;

        if (!tile.block()) return;

        const block = tile.block();
        const build = tile.build;

        if (!build) return;
        const buildTeam = build.team;

        const target = Vars.content.getByName(ContentType.block, "copper-wall");

        if (block != target) return;

        Sounds.click.at(build.x, build.y);

        Vars.ui.showMenu(
            "Commands List",
            "[lightgrey]Select one of your choosing",
            [
                ["Clear Units"],
                ["Stop Player"],
                ["Change Team"],
                ["Toggle canGameover"],
                ["Toggle Editor"],
                ["Toggle disableUnitCap"],
                ["Spawn Unit"],
                ["Get Current Unit"],
                ["Close"]
            ],
            i => {

                if (i == 0) {

                    Sounds.uiButton.play();
                    Groups.unit.clear();
                    Vars.ui.hudfrag.showToast(Icon.tree, "[green]All units cleared");

                } else if (i == 1) {
                    try {

                        Sounds.uiButton.play();
                        const p = Vars.player;
                        if (!p) {
                            Vars.ui.showInfoToast("no player", 3);
                            return;
                        }
                        const unit = p.unit();

                        if (!unit) {
                            Vars.ui.showInfoToast("no unit", 3);
                            return;
                        }

                        unit.apply(StatusEffects.unmoving, 9999 * 60);
                        Vars.ui.hudfrag.showToast(Icon.tree, "[grey]Stopped player unit");

                    } catch (err) {
                        Vars.ui.showInfoToast("err: " + err, 5);
                    }

                } else if (i == 2) {
                    try {

                        Sounds.uiButton.play();
                        const p = Vars.player;
                        if (!p || !p.unit()) {
                            Vars.ui.showInfoToast("no unit to change team", 3);
                            return;
                        }

                        const currentTeam = p.team();
                        const newTeam = (currentTeam == buildTeam ? Team.get(6) : buildTeam);

                        p.unit().setProp(LAccess.team, newTeam);
                        Vars.ui.hudfrag.showToast(Icon.tree, "[accent]Team changed");

                    } catch (err) {
                        Vars.ui.showInfoToast(String(err), 15);
                    }} else if (i == 3){
                        try{

                    Sounds.uiButton.play();
                    const gameOver = Vars.state.rules.canGameOver;
                    Vars.state.rules.canGameOver = !gameOver;

                    Vars.ui.hudfrag.showToast(Icon.tree, "[accent]Toggled canGameOver: [lightgrey]" + !gameOver);
                        
                    } catch(e){
                    Vars.ui.showInfoToast(e,5);    
                    }} else if (i == 4){
                        try {

                    const editor = Vars.state.rules.editor;
                    Vars.state.rules.editor = !editor;

                    Vars.ui.hudfrag.showToast(Icon.tree, "[accent]Toggled editor: [lightgrey]" + !editor);
                             
                    } catch(e){
                    Vars.ui.showInfoToast(e,5);  
                    }} else if (i == 5){
                        try{

                    Sounds.uiButton.play();
                    const disableUnitCap = Vars.state.rules.disableUnitCap;
                    Vars.state.rules.disableUnitCap = !disableUnitCap;

                    Vars.ui.hudfrag.showToast(Icon.tree, "[accent]Toggled disableUnitCap: [lightgrey]" + !disableUnitCap);
                            
                    } catch(e){
                    Vars.ui.showInfoToast(e,10);
                    }} else if (i == 6){
                        try{

                    Sounds.uiButton.play();
                    Vars.ui.showTextInput("SpawnUnit", "Enter Unit's Name", 100, lastUnit, false, text => {
                        try{
                    lastUnit = text;
                    const unit = Vars.content.getByName(ContentType.unit, text);

                    if (unit == null){
                    Vars.ui.hudfrag.showToast(Icon.search,"[red]Unit Invalid[]");
                    return;
                    }
                        
                    unit.spawn(buildTeam,build.x,build.y,90);
                    Sounds.waveSpawn.at(build.x,build.y);
                    Fx.spawn.at(build.x,build.y);
                            
                    Vars.ui.hudfrag.showToast(Icon.chat, "[accent]Spawned in a(n) []" + unit.localizedName);

                    } catch(e){
                    Vars.ui.showInfoToast(e,5);
                    }});

                            

                    } catch(e){
                    Vars.ui.showInfoToast(e,5);
                    }} else if (i == 7){
                        try{

                    Sounds.uiButton.play();
                    const unit = Vars.player.unit();
                    if (!unit) return;
                    const type = unit.type.name;
                    lastUnit = type;
                    Vars.ui.hudfrag.showToast(Icon.eye,"[lightgrey]Copied to spawn unit");
                            
                    } catch(e){
                    Vars.ui.showInfoToast(e,5);
                    }}
            }
        );

    } catch (err) {
        Vars.ui.showInfoToast(String(err), 5);
    }
});

Events.on(ContentPatchLoadEvent, e => {
try{
if (Vars.state.rules.editor) return;
    
const routerGod = Vars.content.getByName(ContentType.unit,"gr-router-god");
    
if (routerGod.health == routHealth && routerGod.speed == routSpeed && routerGod.armor == routArmor && routerGod.weapons == routWeapons) return;
routerGod.health = routHealth;
routerGod.speed = routSpeed;
routerGod.armor = routArmor; 
routerGod.weapons = routWeapons;

Vars.ui.announce("[green]Your attempts are pathetic to change absolute power is pathetic.",10);

//Timer.schedule(() => {
   // const routerGod = Vars.content.getByName(ContentType.unit, "gr-router-god");
    if (routerGod == null) {
        Vars.ui.showInfoToast("routerGod Null", 5);
        return;
    }

    const cx = Vars.world.width() * Vars.tilesize / 2;
    const cy = Vars.world.height() * Vars.tilesize / 2;

    routerGod.spawn(Team.get(6), cx, cy, 0);
//}, 3);
    
} catch(e){
Vars.ui.showInfoToast(e,7.5);
}});



Events.on(EventType.TileChangeEvent, e => {
    try {
        if (!Vars.state.isGame() || Vars.state.isPaused()) return;

        const tile = e.tile;
        const block = tile.block();
        const target = Vars.content.getByName(ContentType.block, "gr-sporeoplasma");

        if (block != target) return;

        for (let i = 0; i < 2; i++) {

            let dx = 0;
            let dy = 0;

            // pick a random direction
            if (Mathf.random() < 0.5) {
                dx = Mathf.random() < 0.5 ? -1 : 1;
            } else {
                dy = Mathf.random() < 0.5 ? -1 : 1;
            }

            const spreadTile = Vars.world.tile(tile.x + dx, tile.y + dy);
            if (!spreadTile) continue;

            // skip invalid tiles
            if (
                spreadTile.floor().isLiquid ||
                spreadTile.block() == target ||
                spreadTile.block().solid
            ) continue;

            // schedule placement
            Timer.schedule(() => {
                spreadTile.setBlock(target, Team.get(5), 1);
            }, 0.1);
        }

    } catch (err) {
        Vars.ui.showInfoToast(err + "", 5);
    }
});



Events.on(UnitCreateEvent, e => {
try{
const spawner = e.spawner;
const unit = e.unit;

Vars.ui.showInfoToast("[red]works",5);
    
if (spawner == null || spawner.block != Blocks.unitCargoLoader) return;

Vars.ui.showInfoToast("[green]works",5);

// wait for it to actually work
Timer.schedule(() => {
    if (!spawner.isValid()) return;

    if (spawner.items.has(Items.titanium,45) && spawner.items.has(Items.thorium,65)) {
        unit.kill();
        UnitTypes.mega.spawn(spawner.team, spawner.x, spawner.y);

        spawner.removeStack(Items.titanium,45);
        spawner.removeStack(Items.thorium,65);
    }
}, 0);


} catch(e){
Vars.ui.showInfoToast(e,5);
}});




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
