const blocks = [
"meld-meld-node",
"mele-meld-surppressor"
];

Events.on(BlockDestroyEvent, event => {
try {
const {tile} = event;
let found = false;
  
const targetFloor = Vars.content.block("meld-meld-crystal-floor");
const transitFloor = Vars.content.block("meld-meld-melting-floor");
const finalFloor = Vars.content.block("meld-meld-swampland");
  
for (let i = 0; i < blocks.length; i++){
if (tile.block() == Vars.content.block(blocks[i])) found = true;
}

if (!found) return;
let dur = 0.25;
let range = 8;

if (tile.block().name == blocks[1]){
range += 4;
}
  
tile.circle(range, Intc2.of((x, y) => {
    try {

        const t = Vars.world.tile(x, y);
        if (!t || !t.floor() || t.floor() != targetFloor) return;

        dur += Mathf.random(0.15, 0.35);

        Time.runTask(dur, () => {

            t.setFloor(transitFloor);

            Fx.vapor.at(
                t.worldx(),
                t.worldy(),
                Color.valueOf(Vars.content.item("meld-meld").color)
            );

            Time.runTask(1.22, () => {

                t.setFloor(finalFloor);

                Fx.vapor.at(
                    t.worldx(),
                    t.worldy(),
                    Color.valueOf(Vars.content.item("meld-meld").color)
                );

            });

        });

    } catch(e){
        Vars.ui.showInfoToast(e, 5);
    }
}));


} catch(e){
Vars.ui.showInfoToast(e,5);
}});
