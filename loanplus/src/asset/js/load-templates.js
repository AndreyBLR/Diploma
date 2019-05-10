$(function () {
    var base_url = window.location.protocol + "//" + window.location.host + "//";

    if ($('#header').length) {
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
    }

    if ($('#footer').length) {
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
    }

    if ($('#request-form').length) {
        $.ajax({
            url: base_url + 'templates/request_form.html',
            async: false,
            success: function (content) {
                $('#request-form').append(content);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('error');
            }
        });
    }
});


