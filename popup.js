$(document).ready(function() {
    chrome.runtime.getBackgroundPage(function(bgPage) {
        bgPage.executeInjectedScript(function(result) {

            if (!result.selText) {
                $(container).css("width", "300px");
                $(container).css("height", "150px");
                $(container).css("text-align", "center");
                $(container).css("font-weight", "bold");
                $(container).css("font-size", "large");
                $(container).css("padding", "20px");
                $(container).html("검사할 대상이 없습니다.<br/><br/><br/><img src=\"images\\thinking.png\" width=\"100\" height=\"100\">");
                return;
            }

            var url = 'https://m.search.naver.com/p/csearch/dcontent/spellchecker.nhn?_callback=window.__jindo2_callback._spellingCheck_0&q=';

            url += result.selText;

            var client = new XMLHttpRequest();
            var json_text = '';
            var json_obj = '';

            client.onreadystatechange = function () {
                json_text = client.responseText.replace("window.__jindo2_callback._spellingCheck_0(", "").replace(");", "");
                json_obj = JSON.parse(json_text);

                if (0 < json_obj.message.result.errata_count) {

                    $(origin).text(result.selText);
                    //$(correct).text(json_obj.message.result.html);
                    $(correct).html(json_obj.message.result.html);
                }
                else {
                    $(container).css("width", "300px");
                    $(container).css("height", "150px");
                    $(container).css("text-align", "center");
                    $(container).css("font-weight", "bold");
                    $(container).css("font-size", "large");
                    $(container).css("padding", "20px");
                    $(container).html("맞춤법이 정확합니다.<br/><br/><br/><img src=\"images\\fireworks.png\" width=\"100\" height=\"100\">");
                }
            };
            client.open("GET", url, false);
            client.send(null);
        });
    });
});