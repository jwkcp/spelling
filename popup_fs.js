document.addEventListener('DOMContentLoaded', function() {
    // jQuery 로드 확인
    if (typeof $ === 'undefined') {
        console.error('jQuery is not loaded');
        return;
    }

    function loadSpellCheckData() {
        chrome.storage.local.get(['target', 'result', 'labelClass', 'labelValue'], function(data) {
            if (chrome.runtime.lastError) {
                console.error('Failed to load data:', chrome.runtime.lastError);
                return;
            }
            
            $("#fs-header-result").addClass(data.labelClass);
            $("#fs-header-result").text(data.labelValue);
            
            $("#fs-contents-target").html(data.target);
            $("#fs-contents-result").html(data.result);

            // 마우스 오버 이벤트 핸들러
            const $resultElement = $('#fs-contents-result');
            const resultHtml = data.result;
            const resultText = $('<div>').html(resultHtml).text();

            $resultElement.off('mouseenter mouseleave');
            $resultElement.on('mouseenter', function() {
                $(this).html(resultText);
            });

            $resultElement.on('mouseleave', function() {
                $(this).html(resultHtml);
            });
        });
    }

    // 메시지 수신 리스너
    window.addEventListener('message', function(event) {
        if (event.data.type === 'LOAD_SPELL_CHECK_DATA') {
            loadSpellCheckData();
        }
    });

    // 페이지 로드 시에도 시도
    document.addEventListener('DOMContentLoaded', loadSpellCheckData);
});