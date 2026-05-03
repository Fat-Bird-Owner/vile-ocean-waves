const {indexer} = Vars;
const block = Vars.content.block("meld-meld-synapse");

Events.on(BlockDestroyEvent, event => {
try {
const {tile} = event;
const blockTile = tile.block();
  
} catch(e){
Vars.ui.showInfoToast(e,5);
}});
