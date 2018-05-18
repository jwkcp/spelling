function executeInjectedScript(callback) {
    // 원래 코드 부분
    chrome.tabs.executeScript(null, {file: 'contents.js'});
    chrome.runtime.onMessage.addListener(function(msg) {
        callback(msg);
    });
}
