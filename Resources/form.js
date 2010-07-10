var form 		= Titanium.UI.currentWindow;

var action 		= Ti.UI.currentWindow.action;

var st_id 		= Ti.UI.currentWindow.st_id;
var st_title 	= Ti.UI.currentWindow.st_title;
var st_desc		= Ti.UI.currentWindow.st_desc;
var st_date		= Ti.UI.currentWindow.st_date;
var st_index	= Ti.UI.currentWindow.st_index;


var t1 = Titanium.UI.createTextField({
	value: st_title,
	width:300,
	height:40,
	top: 10,
	color:'#000',
	font:{fontSize:14},
    backgroundColor: '#fff',
    autocorrect:false,
	hintText:'Enter a Title',
	paddingLeft: 8,
	borderWidth:2,
    borderColor:'#fff',
    borderRadius:5,
	appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT
});
t1.addEventListener('return', function() {
	t1.blur();
});
t1.addEventListener('change', function(e) {
	st_title = e.value;
});

form.addEventListener("open", function(event, type) {
    t1.focus();
});

var t2 = Titanium.UI.createTextArea({
    value: st_desc,
	height:120,
    width:300,
    top:60,
    font:{fontSize:14},
    color:'#000',
    textAlign:'left',
    borderWidth:2,
    borderColor:'#fff',
    borderRadius:5,
    appearance:Titanium.UI.KEYBOARD_APPEARANCE_ALERT,   
	hintText:'Enter a Title'
});
t2.addEventListener('return', function() {
	t2.blur();
});
t2.addEventListener('change', function(e) {
	st_desc = e.value;
});




var b1 = Titanium.UI.createButtonBar({
	labels:['Save'],
	backgroundColor:'maroon',
	style:Titanium.UI.iPhone.SystemButtonStyle.BAR
});

var b2 = Titanium.UI.createButton({
	title:'Cancel',
	style:Titanium.UI.iPhone.SystemButtonStyle.BAR
});



t1.addEventListener("change", function(e) {
	if (e.value == '') {
    	form.setRightNavButton();
  	} else {
    	form.setRightNavButton(b1);
	}
});

t2.addEventListener("change", function(e) {
	if (e.value != '') {
    	form.setRightNavButton(b1);
	}
});

//Add event listener for save button
b1.addEventListener("click", function(e) {
	if (action == 'edit') {
    	var update_data = {index:st_index, title:st_title, st_title: st_title, st_desc: st_desc, st_id: st_id, st_date: st_date};
		Ti.App.fireEvent("doUpdateRow",update_data);    
	}
	
 	if (action == 'add') {
    	var add_data = {index:st_index, title:st_title, st_title: st_title, st_desc: st_desc, st_date: st_date};
		Ti.App.fireEvent("doAppendData",add_data);    
  	}
  	form.close();
});

//Add event listener for cancel button
b2.addEventListener('click',function() {
	form.close();
});



form.setLeftNavButton(b2);
form.add(t1);
form.add(t2);