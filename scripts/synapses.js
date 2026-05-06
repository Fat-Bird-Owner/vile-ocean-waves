const {indexer} = Vars;
const block = Vars.content.block("gr-embankment-seal");

Events.on(BlockDestroyEvent, event => {
try {

    const {tile} = event;
    if(!tile) return;

    const blockTile = tile.block();
    if(blockTile != block) return;

    const build = tile.build;
    if(!build) return;

    let delay = 0;

    indexer.eachBlock(
        build.team,
        build.x,
        build.y,
        8 * Vars.tilesize,
        b => b.block != block,
        b => {

            delay += Mathf.random(0.025, 0.05);

            Time.run(delay * 60, () => {
                if(b && !b.dead){
                    Fx.flakExplosionBig.at(b.x, b.y);
                    b.kill();
                }
            });

        }
    );

} catch(e){
    Vars.ui.showInfoToast(e + "", 5);
}
});
