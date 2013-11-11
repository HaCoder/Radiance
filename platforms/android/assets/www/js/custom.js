/* main menu page loader */
function mainPageLoader(location,pageNumber) {
	$(".content").load("mainMenu/"+location,function(){
	
	
	
	});
}

/* sub menu page loader */
function subPageLoader(location,pageNumber) {
	$(".content").load("subMenu/"+location,function(){
	
	
	
	});
}

/* save construction image to sd card and return its path */
function saveDataToDB(src) {
		var localPath,fileURL;
        var remoteFile = src.toString();
        var localFileName = remoteFile.substring(remoteFile.lastIndexOf('/')+1);
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
            fileSystem.root.getFile(localFileName, {create: true, exclusive: false}, function(fileEntry) {
                localPath = fileEntry.fullPath;
                fileURL = fileEntry.toURL();
                
                //if (device.platform === "Android" && localPath.indexOf("file://") === 0) {
                    localPath = localPath.substring(7);
                //}
                var ft = new FileTransfer();
                ft.download(remoteFile,localPath, function(entry) {
						//alert("Download Complete");
						//document.getElementById("downloadingGif").style.display = "none";
                    }, failDB);
            }, failDB);


        }, failDB);
        //localPath=localPath+''+localFileName;
        return localPath;
    }

function failDB() {
		//alert("Please Connect To Internet");    
    }
    