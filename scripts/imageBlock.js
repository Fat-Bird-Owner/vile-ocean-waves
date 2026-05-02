const {content} = Vars;
const {atlas} = Core;
const block = content.block("message");

Events.on(TapEvent,event => {
try {
const {tile} = event;
const tileBlock = tile.block();
const {player} = event;

if (!tile || !tile.build || !player || !player.team() || player.team() != tile.team() || player.selectedBlock != null) return;
const image = atlas.find(tile.build.message.toString());
const dialog = new BaseDialog("Info");

if(image && image.found()){
dialog.cont.add(new Image(image)).size(image.width, image.height);
} else {
dialog.cont.add(tile.build.message.toString()); 
}

dialog.addCloseButton();
dialog.show();

} catch(e){
Vars.ui.showInfoToast(e + "[red] - ImageBlock",5);
}});
