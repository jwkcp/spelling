$(document).ready(function() {
    chrome.runtime.getBackgroundPage(function(bgPage) {
        bgPage.executeInjectedScript(function(result) {

            if (!result.selText) {

                var $container = $('#container');

                $container
                    .empty()
                    .append("<h2>검사할 대상이 없습니다.</h2>")
                    .append("<div></div>");

                var $containerH2 = $container.find('h2'),
                    $containerDiv = $container.find('div');

                $containerH2
                    .css({
                        "text-align" : "center",
                        "font-weight" : "bold",
                        "font-size" : "large",
                        "margin-top" : "10px"
                    });

                $containerDiv
                    .append("<img src='images\\thinking.png\' width='100' height='100'/>")
                    .css({
                            "text-align" : "center",
                            "margin" : "20px"
                    });

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

                    $('#origin').text(result.selText);
                    $('#correct').html(json_obj.message.result.html);
                }
                else {
                    var $container = $('#container');

                    $container
                        .empty()
                        .append("<h2>맞춤법이 정확합니다.</h2>")
                        .append("<p>\"" + result.selText + "\"</p>")
                        .append("<div></div>");

                    var $containerH2 = $container.find('h2');
                    var $containerP = $container.find('p');
                    var $containerDiv = $container.find('div');

                    $containerH2
                        .css({
                        "text-align" : "center",
                        "font-weight" : "bold",
                        "font-size" : "large",
                        "margin-top" : "10px"
                    });


                    $containerP
                        .css({
                        "text-align" : "center",
                        "font-size" : "small",
                        "margin-top" : "5px",
                        "color" : "gray",
                        "font-style" : "Italic"
                    });

                    $containerDiv
                        .css({
                        "text-align" : "center",
                        "margin" : "20px"
                    })
                        .append("<img src='images\\fireworks.png\' width='100' height='100'/>");
                }
            };
            client.open("GET", url, false);
            client.send(null);
        });
    });
});