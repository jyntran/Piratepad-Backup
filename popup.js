// Callback function
function callback(id){
  var status = document.getElementById('status');
  status.innerHtml = 'Downloading: '+id;
}

// Run our download script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.sync.get(["id","format" ], function(items) {	  
    var url = '';
    try { 
	  if (items.id === '')
	      throw "ID is blank!<br/>Please set one (right-click icon then Options).";
	  console.log(items.format);
      switch (items.format) {
        case "html":
	      url = 'http://piratepad.net/ep/pad/export/'+items.id+'/latest?format='+items.format;
		  break;
	    case "txt":
	      url = 'http://piratepad.net/ep/pad/export/'+items.id+'/latest?format='+items.format;
		  break;
	    case "bookmark":
	      url = 'http://piratepad.net/ep/pad/linkfile?padId='+items.id;
		  break;
      }	    
      console.log(url);
      var options = { 'url':url };
      chrome.downloads.download(options,callback(items.id));
	} catch(err) {
        var status = document.getElementById('status');
		status.innerHTML = "ERROR: " + err;
    };
  });
});