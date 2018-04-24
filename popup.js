$(document).ready(function() {
    function spellChecker(origin_text, callback) {
        var url = 'https://m.search.naver.com/p/csearch/ocontent/spellchecker.nhn?_callback=window.__jindo2_callback._spellingCheck_0&q=';
        var client = new XMLHttpRequest();
        var json_text = '';
        var json_obj = '';

        url += origin_text;

        client.onreadystatechange = function () {
            if (client.readyState === XMLHttpRequest.DONE && client.status === 200) {
                json_text = client.responseText.replace("window.__jindo2_callback._spellingCheck_0(", "").replace(");", "");
                json_obj = JSON.parse(json_text);

                if ("function" === typeof callback) {
                    callback(
                        json_obj.message.result.html,
                        json_obj.message.result.errata_count
                    );
                }
            }
        }

        client.open("GET", url, true);
        client.send(null);
    }

    var keepResultHtml;
    var keepResultText;

    $("#check-fs-link").click(function () {
        if (keepResultText) {
            window.open("popup_fs.html", "popup_window", "width=" + screen.availWidth + ", height=" + screen.availHeight + ", scrollbars=no");
        }
        else {
            $("#check-fs-link").text("맞춤법 검사를 먼저 해야 해요!");
        }
    });

    $('#check-result').mouseenter(function () {
        if (keepResultText) {
            $('#check-result').html(keepResultText);
        }
    });

    $('#check-result').mouseleave(function () {
        if (keepResultHtml) {
            $('#check-result').html(keepResultHtml);
        }
    });

    $("#check-button").click(function() {

        var origin_text = $("#check-target").val();
        var $check_result_label = $('#check-result-label');

        if ("" == $.trim(origin_text)) {
            $('#check-result').text("");
            $check_result_label.removeClass("label-default label-success label-danger").addClass("label-default");
            $check_result_label.text("결과");
            return;
        }

        spellChecker(origin_text, function(result_html, error_count) {
            $('#check-result').html(result_html);

            if (0 < error_count) {
                $check_result_label.removeClass("label-default label-success label-danger").addClass("label-danger");
                $check_result_label.text("맞춤법이 틀렸습니다 (" + error_count + ")");
            }
            else {
                $check_result_label.removeClass("label-default label-success label-danger").addClass("label-success");
                $check_result_label.text("맞춤법이 정확합니다");
            }

            keepResultHtml = result_html;
            keepResultText = $('#check-result').text();
        });
    });

    $("#check-target").keypress(function(e) {
        if (e.keyCode == 13) {
            $("#check-button").click();
        }
    });



    chrome.runtime.getBackgroundPage(function(bgPage) {
        bgPage.executeInjectedScript(function(result) {
            if (!result.selText) {
                $('#check-target').attr({
                    "placeholder": "검사할 대상을 마우스로 드레그하거나, 여기에 직접 입력하여 맞춤법 검사를 할 수 있습니다. (단축키: 윈도우 Ctrl+Shift+E, 맥 Cmd+Shift+E)"
                }).focus();

                return;
            }

            $("#check-target").text(result.selText);
            $("#check-button").click();
        });
    });
});