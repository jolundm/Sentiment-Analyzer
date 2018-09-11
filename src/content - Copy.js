var smiley = document.createElement("div");
smiley.setAttribute("style", "position:absolute;z-index:10000;font-weight:bolder;font-size:100px;margin:-20px 0 0 -20px;");
smiley.setAttribute("id", "smiley");
var elements = document.getElementsByTagName('body');
elements[0].appendChild(smiley);
const APIKEY = "asd";
var xmouse = 0, ymouse = 0;
var toggle = false;

const smilestate = {
    '-1.0': "👿", '-1': "👿", '-0.9': "😡", '-0.8': "😭",
    '-0.7': "😩", '-0.6': "😖", '-0.5': "😢", '-0.4': "😓", '-0.3': "😔",
    '-0.2': "😨", '-0.1': "🙁", '0': "😐", '0.1': "🙂", '0.2': "😉", '0.3':
        "😀", '0.4': "😃", '0.5': "😄", '0.6': "😆", '0.7': "😁", '0.8': "🤗",
    '0.9': "😂", '1': "⭐", '1.0': "⭐"
};
const thinkingSmiley = "🤔";
window.onload = init;

function init() {
    if (window.Event) { document.captureEvents(Event.MOUSEMOVE); }
    document.onmousemove = getCursorXY;
}

function getCursorXY(e) {
    xmouse = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    ymouse = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
}

function postTextToGoogle(text) {
    let data = "{\n \"document\": {\n  \"type\": \"PLAIN_TEXT\",\n  \"content\": " + "\" " + text + "not sad\"\n },\n \"encodingType\": \"UTF8\"\n}";
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        this.readyState === 4 ? updateSmiley(this.responseText) : setDefaultSmiley();
    });
    // Update API KEY below.
<<<<<<< HEAD
    xhr.open("POST", "https://language.googleapis.com/v1/documents:analyzeSentiment?fields=documentSentiment&key=AIzaSyC__6ji-CHjg6a_h0_3h_UOHbdOSi4gOPM");
=======
    xhr.open("POST", "https://language.googleapis.com/v1/documents:analyzeSentiment?fields=documentSentiment&key="+APIKEY);
>>>>>>> 90fc4bc3b56ffac11fd84626fe9c25f44e0c7466
    xhr.setRequestHeader("Authorization", "Basic am9uYXRoYW4ubHVuZG1hcmtAbmV0bGlnaHQuY29tOlN0cmlkZXIwMTY1");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "fbb90407-987e-47f3-afae-10575c402392");
    xhr.send(data);
	
}

function updateSmiley(googleResponse) {
    let json = JSON.parse(googleResponse);
    let sScore = json.documentSentiment.score;
    // Optional Usage --> let sMagnitude = json.documentSentiment.magnitude;  
    let elem = document.getElementById("smiley")
    elem.innerHTML = smilestate[sScore];
    elem.style.top = ymouse + "px"; 
	elem.style.left = xmouse + "px";
}

function setDefaultSmiley() {
    let elem = document.getElementById("smiley");
    elem.innerHTML = thinkingSmiley;
    elem.style.top = ymouse + "px"; 
	elem.style.left = xmouse + "px";
}

function removeQuotations(text) { return text.replace(/['"]+/g, ''); }

document.addEventListener("click", function () {
	chrome.runtime.sendMessage({greeting: "isActive"}, function(response) {
		console.log(response.farewell);
		if(response.farewell) {
			let selection = window.getSelection().toString();
			if (selection.length > 10) { postTextToGoogle(removeQuotations(selection)); }
		}
		else {
			let elem = document.getElementById("smiley");
			elem.innerHTML = "";
		}
	});
});