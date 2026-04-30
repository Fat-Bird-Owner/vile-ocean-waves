Planets.serpulo.sectors.each(s => {
try { 
const info = s.info;
var highest = 0;
var highestItem = Items.copper;
  
info.export.each(item => {
try{ 
const exportNum = info.getExport(item);
  
if (exportNum > highest){
highest = exportNum;
highestItem = item;
} 

} catch(e){
Vars.ui.showInfoToast(e,5);
}});

if (info.export.size != 0) {
info.contentIcon = highestItem;
if (s.preset == null){
s.setName(highestItem.localizedName + " Production Site [grey](" + s.id + ")");
} else {
s.setName(s.preset.localizedName);
}
  
} else {
info.contentIcon = null;
}
  
} catch(e){
Vars.ui.showInfoToast(e,5); 
}});
