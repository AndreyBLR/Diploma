(function ($) {

    const select_element = document.querySelector('#currency-select');

    select_element.addEventListener('change', (event) => {

        var active_option = select_element.options[select_element.selectedIndex];

        var min = parseFloat(active_option.getAttribute("min-principal"));
        var max = parseFloat(active_option.getAttribute("max-principal"));

        $("#pricipal-slide").slider("option", "min", min);
        $("#pricipal-slide").slider("option", "value", min);
        $("#pricipal-slide").slider("option", "max", max);
        $("#pricipal").text(min);

        min = parseFloat(active_option.getAttribute("min-interest"));
        max = parseFloat(active_option.getAttribute("max-interest"));

        $("#intrest-slide").slider("option", "min", min);
        $("#intrest-slide").slider("option", "value", min);
        $("#intrest-slide").slider("option", "max", max);
        $("#intrest").text(min);

        $("#currency-span").text(event.currentTarget.value);

        loancalculate();
    });

    var active_option = select_element.options[select_element.selectedIndex];

    $("#currency-span").text(active_option.value);

    var min = parseFloat(active_option.getAttribute("min-principal"));
    var max = parseFloat(active_option.getAttribute("max-principal"));

    $("#pricipal-slide").slider({
        range: "min",
        min: min,
        max: max,
        value: min,
        step: 1000,
        slide: function (event, ui) {
            $("#pricipal").text(ui.value);
            loancalculate();
        }
    });
    $("#pricipal").text($("#pricipal-slide").slider("value"));

    min = parseFloat(active_option.getAttribute("min-month"));
    max = parseFloat(active_option.getAttribute("max-month"));

    $("#totalyear-slide").slider({
        range: "min",
        min: min,
        max: max,
        step: 3,
        value: min,
        slide: function (event, ui) {
            $("#totalyear").text(ui.value);
            loancalculate();
        }
    });
    $("#totalyear").text($("#totalyear-slide").slider("value"));

    min = parseFloat(active_option.getAttribute("min-interest"));
    max = parseFloat(active_option.getAttribute("max-interest"));

    $("#intrest-slide").slider({
        range: "min",
        min: min,
        max: max,
        step: 0.1,
        value: min,
        slide: function (event, ui) {
            $("#intrest").text(ui.value);
            loancalculate();
        }
    });
    $("#intrest").text($("#intrest-slide").slider("value"));

    loancalculate();
})(jQuery);

function loancalculate() {
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
    var int_pge = (interest / full) * 100;
    //$("#tbl_int_pge").html(int_pge.toFixed(2)+" %");
    //$("#tbl_loan_pge").html((100-int_pge.toFixed(2))+" %");

    var emi_str = emi.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    var loanAmount_str = loanAmount.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    var full_str = full.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    var int_str = interest.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");


    $("#emi").html(emi_str);
    $("#tbl_emi").html(int_str);
    $("#tbl_la").html(full_str);
}