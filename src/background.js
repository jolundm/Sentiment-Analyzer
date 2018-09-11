var toggle = false;

function toggleSwitch(){
  toggle = !toggle;
  if(toggle==false) {chrome.browserAction.setIcon({path:"res/NeutralFace32-Disable.png"});}
  else {chrome.browserAction.setIcon({path:"res/NeutralFace32.png"});}
}

chrome.browserAction.onClicked.addListener(function(tab) 
        { 
            toggleSwitch();
        });

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "isActive")
      sendResponse({farewell: toggle});
  });
