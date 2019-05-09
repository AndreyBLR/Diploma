$(function () {
    $.ajax({
        url: 'templates/header.html',
        async: false,
        success: function (content) {
            $('#header').append(content);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('error');
        }
    });

    $.ajax({
        url: 'templates/footer.html',
        async: false,
        success: function (content) {
            $('#footer').append(content);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('error');
        }
    });
});         