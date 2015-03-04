(function() {
var contacts = [];
var prevScroll=0, nextScroll = 1;

document.getElementById('pane-side').scrollTop = 0;



var int = setInterval(function(){

	var latestElement = document.getElementsByClassName('chat-time')[0].innerHTML;
	console.log(latestElement)
  if ( prevScroll == nextScroll || /([\d]{1,2}\/){2}\d{4}/.test(latestElement) ){
  	//alert(JSON.stringify(contacts));
    clearInterval(int);
    var finalVal = '';

    for (var j = 0; j < contacts.length; j++) {
        var innerValue = contacts[j];
        var result = innerValue.replace(/"/g, '""');
        if (result.search(/("|,|\n)/g) >= 0)
            result = '"' + result + '"';
        if (j > 0)
            finalVal += '\n';
        finalVal += result;
    }
    if (contacts.length == 0)
    {

    }

	var pom = document.createElement('a');
	pom.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(finalVal));
	pom.setAttribute('download', 'test.csv');
	var z = confirm("Download csv?")
	z && pom.click();
    return;
  } 
  var data = document.getElementsByClassName('chat-title');
  var tempContacts = [];
  Array.prototype.forEach.call(data, function(divi) {
    var temp = divi.firstChild.getAttribute('title');

    var f = contacts.filter(function(item){
    	return temp == item; 
    })
    if (f.length == 0 && /^\+/.test(temp)) {
      console.log(temp);
      tempContacts.push(temp);
    }
  });
  contacts = contacts.concat(tempContacts);
  //contacts.splice(0,contacts.length-1);
  prevScroll = nextScroll;
  document.getElementById('pane-side').scrollTop += 390;
  nextScroll = document.getElementById('pane-side').scrollTop;
},1000);

})();