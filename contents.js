// 선택된 텍스트를 팝업으로 전달하는 함수
function sendSelectedText() {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
        chrome.runtime.sendMessage({
            type: "getSelectedText",
            text: selectedText
        });
    }
}

// 확장 프로그램이 활성화될 때 실행
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "checkSelection") {
        sendSelectedText();
    }
});