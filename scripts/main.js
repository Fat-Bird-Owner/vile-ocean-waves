var lastUpdate = 0
// Power button class

Events.on(BuildDamageEvent, event => {

try {

const source = event.source;
const build = event.build;

if (!build || !source) return;
    
const block = event.build.block;
const targetType = Vars.content.getByName(ContentType.block, "gr-power-cell");

if (block == targetType){
if (!build.power || !build.power.graph) return;

const damage = source.damage;
const minus = damage * -1.75;
const length = damage * 1.5;
    
build.power.graph.transferPower(minus);
Fx.generate.at(build.x,build.y);
    
Vars.ui.showInfoToast(minus,1.5);

Lightning.create(
    build.team,
    build.team.color,
    damage,
    build.x,
    build.y,
    Mathf.random(360),
    length
);
    
}
    
} catch(e){
Vars.ui.showInfoToast("error: " + e,1);
}
    
})



////////
Events.on(TapEvent, event => {
    try {
        
        if(Vars.state.updateId == lastUpdate) return;

        lastUpdate = Vars.state.updateId;
        
        const tile = event.tile;
        if (!tile || !tile.build) return;

        const target = Vars.content.getByName(ContentType.block, "copper-wall");

        const block = tile.block();
        if (block != target) return;

        const build = tile.build;

        Vars.ui.showInfoToast(build.team + " " + event.player.team(),1);
        
        if (build.team != event.player.team()) return;

        Vars.ui.showInfoToast("[tan]Wave: " + Vars.state.wave, 1.5);
        Vars.state.wavetime = 0;

        if (Fx.generate && Fx) {
            Fx.generate.at(build.x, build.y);
        }

        if (Sounds.click) {
            Sounds.click.at(build.x, build.y);
        }
    } catch (e) {
        // fails silently on iOS instead of crashing
        Vars.ui.showInfoToast("error: " + e,1);
    }
});
