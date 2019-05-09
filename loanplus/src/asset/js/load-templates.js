$(function () {
    var base_url = window.location.protocol + "//" + window.location.host + "//";

    $.ajax({
        url: base_url + 'templates/header.html',
        async: false,
        success: function (content) {
            $('#header').append(content);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('error');
        }
    });

    $.ajax({
        url: base_url + 'templates/footer.html',
        async: false,
        success: function (content) {
            $('#footer').append(content);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('error');
        }
    });
});         