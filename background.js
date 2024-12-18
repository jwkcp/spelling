chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "executeScript") {
    chrome.tabs.query({active: true, currentWindow: true}, async (tabs) => {
      try {
        await chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          files: ['contents.js']
        });
        // 스크립트 실행 후 선택된 텍스트 확인 요청
        chrome.tabs.sendMessage(tabs[0].id, {type: "checkSelection"});
      } catch (err) {
        console.error('Failed to execute script:', err);
      }
    });
    return true;
  }
  
  if (message.type === "getSelectedText") {
    // 팝업이 열려있을 때만 메시지 전달
    chrome.runtime.sendMessage({
      type: "setSelectedText",
      text: message.text
    }).catch(() => {
      // 팝업이 닫혀있을 경우 에러 무시
      console.log("Popup is closed");
    });
    return true;
  }
});

// 단축키 명령 리스너
chrome.commands.onCommand.addListener((command) => {
  if (command === "_execute_action") {
    chrome.action.openPopup();
  }
});
