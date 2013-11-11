var db = window.openDatabase("Sparkle", "1.0", "SparkleDB", 200000);
db.transaction(populateDB, errorCB, successCB);

function populateDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS constructionRadiance (id INT PRIMARY KEY, recentVal INT, updateText TEXT , imageSrc CHAR(100), month CHAR(40))');
}


function errorCB(tx, err) {
	//alert("Error processing SQLInsert: "+err);
}

function errorBCB(tx, err) {
	//alert("Error processing SQLExtract: "+err);
	alert("Please connect to internet");
    pageLoader('helperHTML/aboutSparkle.html', 2);
}

function queryInsertDB(tx) {		
	var insertRequest = 'INSERT OR IGNORE INTO constructionRadiance VALUES ('+parseInt(idConstruction)+','+parseInt(recentUpdate)+',"'+updateTextConstruction.toString()+'","'+srcImgConstruction.toString()+'","'+monthConstruction.toString()+'")';
	//alert(insertRequest);
	tx.executeSql(insertRequest);
	
	//alert("query");
}

function queryExtractDB(tx) {
	tx.executeSql('SELECT * FROM constructionRadiance', [], querySuccess, errorBCB);
}

function querySuccess(tx, results) {
    var len = results.rows.length;
   // alert("Construction table: " + len + " rows found.");
    if(len > 0){
    	for (var i=0; i<len; i++){
        	// Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).updateText);
    		recentUpdate = results.rows.item(i).recentVal;
			 updateTextConstruction = results.rows.item(i).updateText;
			 monthConstruction = results.rows.item(i).month;
			 srcImgConstruction = results.rows.item(i).imageSrc;
			 srcImgConstruction = srcImgConstruction.toString();
			 
			 var appendText = '<h3 id="recentanchor'+recentUpdate+'"></h3><div id="recentdiv'+recentUpdate+'"><p id="recentparagraph'+recentUpdate+'"></p></div> ';
				
				   		  $("#accordion").append(appendText);
						  $("#recent"+recentUpdate).show();
						  $("#recentanchor"+recentUpdate).html(monthConstruction);
						  $("#recentparagraph"+recentUpdate).append("<div style='cursor:pointer;' onclick=updateConstructionImage('"+srcImgConstruction+"')><img src='img/dot.png'/><span>"+updateTextConstruction+"</span></div>");
						  if(!defaultImage){
							  updateConstructionImage(srcImgConstruction);
							  defaultImage = true;
						  }
    	}
    	$(function() {
		   $( "#accordion" ).accordion({ active: false, collapsible: true });
		 });
		 return;
    }
    else {
    	alert("Please connect to internet");
    	pageLoader('helperHTML/aboutSparkle.html', 2);
    	}
    
}


function successCB() {
    //alert("success!");
}
