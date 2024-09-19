$(function () {
    $('[data-toggle="tooltip"]').tooltip(); // getbootstrap.com/javascript/#tooltips

    $('[data-toggle="popover"]').popover()  // getbootstrap.com/javascript/#popovers

    if (jQuery && jQuery.fn && jQuery.fn.select2 !== undefined) {
        $.fn.select2.defaults.set("theme", "bootstrap");
    }
});