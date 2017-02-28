$(document).ready(function() {
    var parentTarget = $("#check-target", opener.document).val();
    var parentResult = $("#check-result", opener.document).html();
    var labelClass = $("#check-result-label", opener.document).attr('class');
    var labelValue = $("#check-result-label", opener.document).text();

    var keepResultHtml = parentResult;
    var keepResultText = $("#check-result", opener.document).text();

    $('#fs-contents-result').mouseenter(function () {
        if (keepResultText) {
            $('#fs-contents-result').html(keepResultText);
        }
    });

    $('#fs-contents-result').mouseleave(function () {
        if (keepResultHtml) {
            $('#fs-contents-result').html(keepResultHtml);
        }
    });

    $("#fs-header-result").addClass(labelClass);
    $("#fs-header-result").text(labelValue);

    $("#fs-contents-target").html(parentTarget);
    $("#fs-contents-result").html(parentResult);
})