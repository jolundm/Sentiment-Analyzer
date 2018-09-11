var toggle = false;

function toggleSwitch() {
  toggle = !toggle;
  if (!toggle) { chrome.browserAction.setIcon({ path: "res/NeutralFace32-Disable.png" }); }
  else { chrome.browserAction.setIcon({ path: "res/NeutralFace32.png" }); }
}

chrome.browserAction.onClicked.addListener(function (tab) { toggleSwitch(); });

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.greeting == "isActive") { sendResponse({ isToggled: toggle }); }
  });