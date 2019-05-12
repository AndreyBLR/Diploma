$(function () {
    $("#send-request").click(function (e) {
        var sum = $("#lamount-request")[0].value;
        var name = $("#fname-request")[0].value;
        var email = $("#email-request")[0].value;
        var phone = $("#phone-request")[0].value;
        var text = $("#text-request")[0].value;

        var emailBody = 'Имя: ' + name + '%0A'; //%0A - символ новой строки
        emailBody += 'Сумма: ' + sum + '%0A';
        emailBody += 'Email: ' + email + '%0A';
        emailBody += 'Тел: ' + phone + '%0A%0A%0A';
        emailBody += 'Доп. информация: ' + text;


        window.location.assign('mailto:support@ideabank.com?subject=Заявка&body=' + emailBody);
        e.preventDefault();
    });
})

