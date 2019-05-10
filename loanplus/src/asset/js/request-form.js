$(function () {
    $("#send-request").click(function (e) {
        var sum = $("#lamount-request")[0].value;
        var name = $("#fname-request")[0].value;
        var email = $("#email-request")[0].value;
        var phone = $("#phone-request")[0].value;
        var text = $("#text-request")[0].value;

        console.log(sum);
        e.preventDefault();
    });
})

