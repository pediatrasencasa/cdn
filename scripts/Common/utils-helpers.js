/// <reference path="../bootstrap-datetimepicker.min.js" />
/// <reference path="../moment.min.js" />
$(function () {
    function showMore() {
        var consultId = $(this).data('id');
        $("div.short-description[data-id='" + consultId + "']").addClass("hide");
        $("div.full-description[data-id='" + consultId + "']").removeClass("hide");
    };

    $(".body-content, .main-panel").on("click", "a.consult-show-more", showMore);

    if ($.fn.datetimepicker) {
        const datePickerIcons = {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-chevron-up",
            down: "fa fa-chevron-down",
            previous: 'fa fa-chevron-left',
            next: 'fa fa-chevron-right',
            today: 'fa fa-screenshot',
            clear: 'fa fa-trash',
            close: 'fa fa-remove'
        };
        const datePickerTooltips = {
            today: 'Hoy',
            clear: 'Borrar fecha',
            close: 'Cerrar',
            selectMonth: 'Seleccionar mes',
            selectTime: 'Seleccionar hora',
            selectDate: 'Seleccionar fecha',
            prevMonth: 'Mes anterior',
            nextMonth: 'Próximo mes',
            selectYear: 'Seleccionar año',
            prevYear: 'Año anterior',
            nextYear: 'Próximo año',
            selectDecade: 'Seleccionar decada',
            prevDecade: 'Decada anterior',
            nextDecade: 'Próxima decada',
            prevCentury: 'Siglo anterior',
            nextCentury: 'Próximo siglo',

            pickMinute: 'Seleccionar minuto',
            pickHour: 'Seleccionar hora',
            pickSecond: 'Seleccionar seconda',

            incrementHour: 'Increment Hour',
            decrementHour: 'Decrement Hour',
            incrementMinute: 'Increment Minute',
            decrementMinute: 'Decrement Minute',
            incrementSecond: 'Increment Second',
            decrementSecond: 'Decrement Second',
            togglePeriod: 'Toggle Period'
        };

        $('.datetimepicker').datetimepicker({
            locale: 'es',
            showClose: true,
            useCurrent: false,
            icons: datePickerIcons,
            format: 'DD-MM-YYYY HH:mm',
            tooltips: datePickerTooltips
        });

        $('.datepicker, .datepicker2').datetimepicker({
            locale: 'es',
            showClose: true,
            useCurrent: false,
            format: 'DD-MM-YYYY',
            icons: datePickerIcons,
            tooltips: datePickerTooltips
        });

        $('.timepicker').datetimepicker({
            locale: 'es',
            format: 'HH:mm',
            showClose: true,
            useCurrent: false,
            icons: datePickerIcons,
            tooltips: datePickerTooltips
        });
    }

    if ($.fn.fancybox) {
        $(".fancybox").fancybox({
            padding: 1,
            helpers: {
                title: {
                    type: 'over'
                }
            }
        });
    }

    if (typeof NProgress !== undefined) {
        NProgress.start();

        $(window).load(function () {
            NProgress.done();
        });

        $.ajaxSettings.beforeSend = function () {
            NProgress.start();
        };
        $.ajaxSettings.complete = function () {
            NProgress.done();
        };
    }

    if ($.fn.timeago) {
        $("abbr.timeago, time.timeago").timeago();
    }
});