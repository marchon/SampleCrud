var win = Titanium.UI.currentWindow;

var db = Titanium.Database.open('sample');
db.execute('CREATE TABLE IF NOT EXISTS sample_table (st_id INTEGER PRIMARY KEY, st_title TEXT, st_desc TEXT, st_date DATETIME DEFAULT CURRENT_TIMESTAMP)');


//This is the array we'll use to back the table view
var data = [];

//Get data for tableview

indx = 0;
var rows = db.execute("SELECT strftime('%m-%d', st_date) st_date, st_title, st_desc, st_id FROM sample_table");
while (rows.isValidRow()) {
	
	var row  = Ti.UI.createTableViewRow({height:'auto', touchEnabled: true, hasChild:false,backgroundColor:"#fff"}); 
	
	var title = Ti.UI.createLabel({ 
		text: rows.fieldByName('st_title'), 
		color: '#000', 
		top:5, 
		left:10, 
		height: 25,
		width:255,
		font:{fontWeight:'bold',fontSize:16}
	});
	var date = Ti.UI.createLabel({
		text: "Added\n" + rows.fieldByName('st_date'), 
		color: '#999', 
		right:10, 
		height: 'auto',
		textAlign: 'center',
		width: 45,
		font:{fontWeight:'normal',fontSize:11}
	});
	
	var dist = Ti.UI.createLabel({
		text: rows.fieldByName('st_desc'), 
		color: '#000', 
		top:30, 
		left:10, 
		bottom: 15,
		height:'auto',
		width:255,
		font:{fontWeight:'normal',fontSize:12}
	});
	
	row.st_title= rows.fieldByName('st_title');
	row.st_desc = rows.fieldByName('st_desc');
	row.st_id 	= rows.fieldByName('st_id');
	
	row.add(title);
	row.add(date);
	row.add(dist);
  	
  	data[indx] = row;
  	++indx;
  	
	rows.next();
}
rows.close();

// create table view
var tableview = Titanium.UI.createTableView({
	data:data,
	editable:true
});


//
//  create edit/cancel buttons for nav bar
//
var btn_edit = Titanium.UI.createButton({
	title:'Edit'
});

var btn_add = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.COMPOSE
});

var btn_cancel = Titanium.UI.createButton({
	title:'Cancel',
	style:Titanium.UI.iPhone.SystemButtonStyle.DONE
});



win.setRightNavButton(btn_edit);
win.setLeftNavButton(btn_add);
win.add(tableview);



// add delete event listener
tableview.addEventListener('delete',function(e) {
  db.execute("DELETE FROM sample_table WHERE st_id = ?", e.rowData.st_id);
});

btn_edit.addEventListener('click', function() {
	win.setRightNavButton(btn_cancel);
	tableview.editing = true;
});

btn_cancel.addEventListener('click', function() {
	win.setRightNavButton(btn_edit);
	tableview.editing = false;
});

btn_add.addEventListener('click', function() {

	var win = null;
	win = Titanium.UI.createWindow({
		backgroundColor:'#000',
		title:'Add Item',
		barColor:'#000',
		url:'form.js',
		st_id: null,
		st_title: null,
		st_desc: null,
		st_date: null,
		st_index: 0,
		action: 'add'
	});
	win.open({modal:true});
	
});

// create table view event listener
tableview.addEventListener('click', function(e) {
	
	var win = null;
	win = Titanium.UI.createWindow({
		backgroundColor:'#000',
		title:'Edit Item',
		barColor:'black',
		url:'form.js',
		st_id: e.rowData.st_id,
		st_title: e.rowData.st_title,
		st_desc: e.rowData.st_desc,
		st_date: e.rowData.st_date,
		st_index: e.index,
		action: 'edit'
	});
	win.open({modal:true});
	  

});





// Events for Appending the Data to tableview and
// inserting data into db
Ti.App.addEventListener("doAppendData",function(data){
	
	Ti.API.info("Call doAppendData");
	
	db.execute('INSERT INTO sample_table (st_title, st_desc) VALUES(?,?)', data.st_title, data.st_desc);
    var last = db.execute("SELECT strftime('%m-%d', st_date) st_date, st_id FROM sample_table ORDER BY st_id DESC LIMIT 1");
    
    var last_id = last.fieldByName('st_id');
    var st_date = last.fieldByName('st_date');
    
    var row  = Ti.UI.createTableViewRow({height:'auto', touchEnabled: true, hasChild:false,backgroundColor:"#FFFACD"}); 
	
	var title = Ti.UI.createLabel({ 
		text: data.st_title, 
		color: '#000', 
		top:5, 
		left:10, 
		height: 25,
		width:255,
		font:{fontWeight:'bold',fontSize:16}
	});
	
	var date = Ti.UI.createLabel({
		text: "Added\n" + st_date, 
		color: '#999', 
		right:10, 
		height: 'auto',
		textAlign: 'center',
		width: 45,
		font:{fontWeight:'normal',fontSize:11}
	});
	
	var desc = Ti.UI.createLabel({
		text: data.st_desc, 
		color: '#000', 
		top:30, 
		left:10, 
		bottom: 15,
		height:'auto',
		width:255,
		font:{fontWeight:'normal',fontSize:12}
	});
	
	row.st_title= data.st_title;
	row.st_desc = data.st_desc;
	row.st_id 	= data.st_id;
	
	row.add(title);
	row.add(date);
	row.add(desc);
	
	tableview.appendRow(row);	
});

// Events for Appending the Data to tableview and
// inserting data into db
Ti.App.addEventListener("doUpdateRow",function(data){
	
	Ti.API.info("Call doUpdateRow");
	  
	db.execute('UPDATE sample_table SET st_title = ?, st_desc = ? WHERE st_id = ?',data.st_title, data.st_desc, data.st_id);
    
    var row  = Ti.UI.createTableViewRow({height:'auto', touchEnabled: true, hasChild:false,backgroundColor:"#fff"}); 
	
	var title = Ti.UI.createLabel({ 
		text: data.st_title, 
		color: '#000', 
		top:5, 
		left:10, 
		height: 25,
		width:255,
		font:{fontWeight:'bold',fontSize:16}
	});
	
	var date = Ti.UI.createLabel({
		text: "Added\n" + data.st_date, 
		color: '#999', 
		right:10, 
		height: 'auto',
		textAlign: 'center',
		width: 45,
		font:{fontWeight:'normal',fontSize:11}
	});
	
	var desc = Ti.UI.createLabel({
		text: data.st_desc, 
		color: '#000', 
		top:30, 
		left:10, 
		bottom: 15,
		height:'auto',
		width:255,
		font:{fontWeight:'normal',fontSize:12}
	});
	
	row.st_title= data.st_title;
	row.st_desc = data.st_desc;
	row.st_date = data.st_date;
	row.st_id 	= data.st_id;
	
	row.add(title);
	row.add(date);
	row.add(desc);
	
	tableview.updateRow(data.index,row);
});
