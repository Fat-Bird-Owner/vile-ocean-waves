const block = Vars.content.block("meld-sap-extractor");

const block2 = Vars.content.block("meld-earthen-wall-fissure"); 
const block3 = Vars.content.block("meld-floor-nectar"); 

const liquid = Vars.content.liquid("meld-valid");

const seq = new Seq();
seq.addAll([block2, block3]);

block.stats.replace(Stat.tiles, StatValues.content(seq));
block.stats.remove(Stat.input);

Events.on(TileChangeEvent, e => {
try {
const {tile} = e;
const {build} = tile;

if (!tile || !build || build.block != block || !build.liquid) return;
build.liquid.set(liquid, build.block.liquidCapacity);

} catch(e){
Vaes.ui.showInfoToast(e,5); 
}
});
