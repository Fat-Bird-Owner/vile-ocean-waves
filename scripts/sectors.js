Planets.serpulo.sectors.each(s => {
try {
s.loadInfo();
  
const info = s.info;
var highest = 0;
var highestItem = Items.copper;
  
info.export.each(item => {
try{ 
const exportNum = info.getExport(item);
if (exportNum > highestItem){
highest = exportNum;
highestItem = item;
} 

} catch(e){
Vars.ui.showInfoToast(e,5);
}});

if (info.export != null) info.contentIcon = highestItem;

} catch(e){
Vars.ui.showInfoToast(e,5); 
}});
