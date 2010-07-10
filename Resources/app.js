// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

//Here's the first window...
var first = Ti.UI.createWindow({
  backgroundColor:"#999",
  title:"SampleCRUD",
  url: 'crud.js'
});

first.barColor = '#336699';

//Here's the nav group that will hold them both...
var navGroup = Ti.UI.iPhone.createNavigationGroup({
  window:first
});




//This is the main window of the application
var main = Ti.UI.createWindow();
main.add(navGroup);
main.open({
	transition:Ti.UI.iPhone.AnimationStyle.CURL_UP

});