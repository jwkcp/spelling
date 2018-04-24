function executeInjectedScript(callback) {
    chrome.tabs.executeScript(null, {file: 'contents.js'});
    chrome.runtime.onMessage.addListener(function(msg) {
        callback(msg);
    });
}