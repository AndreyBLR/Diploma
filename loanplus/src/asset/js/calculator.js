const select_element = document.querySelector('#currency-select');

(function ($) {

    select_element.addEventListener('change', (event) => {

        var active_option = select_element.options[select_element.selectedIndex];

        var min = parseFloat(active_option.getAttribute("min-principal"));
        var max = parseFloat(active_option.getAttribute("max-principal"));

        $("#pricipal-slide").slider("option", "min", min);
        $("#pricipal-slide").slider("option", "value", min);
        $("#pricipal-slide").slider("option", "max", max);
        $("#pricipal").text(min);

        min = parseFloat(active_option.getAttribute("min-month"));
        max = parseFloat(active_option.getAttribute("max-month"));

        $("#totalyear-slide").slider("option", "min", min);
        $("#totalyear-slide").slider("option", "value", min);
        $("#totalyear-slide").slider("option", "max", max);
        if (active_option.hasAttribute("step-month")) {
            var step = parseFloat(active_option.getAttribute("step-month"));
            $("#totalyear-slide").slider("option", "step", step);
        }
        $("#totalyear").text(min);

        min = parseFloat(active_option.getAttribute("min-interest"));
        max = parseFloat(active_option.getAttribute("max-interest"));

        $("#intrest-slide").slider("option", "min", min);
        $("#intrest-slide").slider("option", "value", min);
        $("#intrest-slide").slider("option", "max", max);
        $("#intrest").text(min);

        $("#currency-span").text(event.currentTarget.value);

        loan_calculate(event.currentTarget);
    });

    active_option = select_element.options[select_element.selectedIndex];

    initialize_sliders(active_option);
    loan_calculate(active_option);

})(jQuery);

function initialize_sliders(active_option) {

    $("#currency-span").text(active_option.value);

    var min_value = parseFloat(active_option.getAttribute("min-principal"));
    var max_value = parseFloat(active_option.getAttribute("max-principal"));

    $("#pricipal-slide").slider({
        range: "min",
        min: min_value,
        max: max_value,
        value: min_value,
        step: 1000,
        slide: function (event, ui) {
            $("#pricipal").text(ui.value);
            loan_calculate(select_element.options[select_element.selectedIndex]);
        }
    });
    $("#pricipal").text($("#pricipal-slide").slider("value"));

    min_value = parseFloat(active_option.getAttribute("min-month"));
    max_value = parseFloat(active_option.getAttribute("max-month"));
    var step = 3;
    if (active_option.hasAttribute("step-month")) {
        step = parseFloat(active_option.getAttribute("step-month"));
    }
    $("#totalyear-slide").slider({
        range: "min",
        min: min_value,
        max: max_value,
        step: step,
        value: min_value,
        slide: function (event, ui) {
            $("#totalyear").text(ui.value);
            loan_calculate(select_element.options[select_element.selectedIndex]);
        }
    });
    $("#totalyear").text($("#totalyear-slide").slider("value"));

    min_value = parseFloat(active_option.getAttribute("min-interest"));
    max_value = parseFloat(active_option.getAttribute("max-interest"));

    $("#intrest-slide").slider({
        range: "min",
        min: min_value,
        max: max_value,
        step: 0.1,
        value: min_value,
        slide: function (event, ui) {
            $("#intrest").text(ui.value);
            loan_calculate(select_element.options[select_element.selectedIndex]);
        }
    });
    $("#intrest").text($("#intrest-slide").slider("value"));
}


function loan_calculate(active_option) {
    var loanAmount = $("#pricipal").text();
    var numberOfMonths = $("#totalyear").text();
    var rateOfInterest = $("#intrest").text();

    var monthlyInterestRatio = (rateOfInterest / 100) / 12;

    var top = Math.pow((1 + monthlyInterestRatio), numberOfMonths);
    var bottom = top - 1;
    var sp = top / bottom;
    var emi = ((loanAmount * monthlyInterestRatio) * sp);
    var full = numberOfMonths * emi;
    var interest = full - loanAmount;

    var emi_str = emi.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    var full_str = full.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    var int_str = interest.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    $("#emi").html(emi_str + " " + active_option.value);
    $("#tbl_emi").html(int_str + " " + active_option.value);
    $("#tbl_la").html(full_str + " " + active_option.value);

    var loantable = $("#loantable");

    if (loantable.length) {
        var detailDesc = "<thead><tr class='table-head'><th>Номер Платежа</th><th>Начальный Баланс</th><th>Платёж</th><th>Основной Долг</th><th>Сумма Процентов</th><th>Конечный Баланс</th></thead>";
        var bb = parseInt(loanAmount);
        var int_dd = 0;
        var pre_dd = 0;
        var end_dd = 0;
        for (var j = 1; j <= numberOfMonths; j++) {
            int_dd = bb * (rateOfInterest / 100 / 12);
            pre_dd = emi.toFixed(2) - int_dd.toFixed(2);
            end_dd = bb - pre_dd.toFixed(2);
            detailDesc += "<tbody>";
            detailDesc +=
                "<tr><td>" +
                j +
                "</td><td>" +
                bb.toFixed(2) +
                "</td><td>" +
                emi.toFixed(2) +
                "</td><td>" +
                pre_dd.toFixed(2) +
                "</td><td>" +
                int_dd.toFixed(2) +
                "</td><td>" +
                end_dd.toFixed(2) +
                "</td></tr>";
            bb = bb - pre_dd.toFixed(2);
        }
        detailDesc += "</tbody>";
        loantable.html(detailDesc);
    }





}