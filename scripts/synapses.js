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

            delay += Mathf.random(0.1, 0.2) * 60;

            Time.run(delay, () => {
                if(b && !b.dead){
                    b.kill();
                }
            });

        }
    );

} catch(e){
    Vars.ui.showInfoToast(e + "", 5);
}
});
