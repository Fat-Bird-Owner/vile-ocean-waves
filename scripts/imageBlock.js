const {content} = Vars;
const {atlas} = Core;
const block = content.block("message");

Events.on(TapEvent,event => {
try {
const {tile} = event;
const tileBlock = tile.block();
const {player} = event;

if (!tile || !tile.build || !player || !player.team() || player.team() != tile.team() || player.selectedBlock != null) return;
const message = tile.build.message.toString();
const slice = message.split(" ");
const image = slice[0];

if (slice.length >= 1){
const sentence = slice.slice(1).join(" ");
}
  
const contImage = atlas.find(tile.build.message.toString());
const dialog = new BaseDialog("Info");
  
if(image && image.found()){
dialog.cont.add(new Image(contImage)).size(image.width * 1.25, image.height * 1.25);
} else {
dialog.cont.add(tile.build.message.toString()); 
}

if (slice.length >= 1){
dialog.cont.row();
dialog.add(sentance);
}

dialog.addCloseButton();
dialog.show();

} catch(e){
Vars.ui.showInfoToast(e + "[red] - ImageBlock",5);
}});
