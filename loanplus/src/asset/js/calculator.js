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

    $("#totalyear-slide").slider({
        range: "min",
        min: min_value,
        max: max_value,
        step: 3,
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
    var int_pge = (interest / full) * 100;
    //$("#tbl_int_pge").html(int_pge.toFixed(2)+" %");
    //$("#tbl_loan_pge").html((100-int_pge.toFixed(2))+" %");

    var emi_str = emi.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    var loanAmount_str = loanAmount.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    var full_str = full.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    var int_str = interest.toFixed(0).toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");


    $("#emi").html(emi_str + " " + active_option.value);
    $("#tbl_emi").html(int_str + " " + active_option.value);
    $("#tbl_la").html(full_str + " " + active_option.value);
}