
$(function () {

    var ajaxFormSubmit = function () {
        var $form = $(this);

        var options = {
            url: $form.attr("action"),
            type: $form.attr("method"),
            data: $form.serialize()
        };

        $.ajax(options).done(function (data) {
            var $target = $($form.attr("data-pnc-target"));
            var $newHtml = $(data);
            $target.replaceWith($newHtml);
            $newHtml.effect("highlight");

            //check for modal and close it
            var $modal = $($form.attr("data-modal"));
            if ($modal) {
                console.log($modal);
                $modal.modal('hide');
            }
        });

        return false;
    };

    var submitAutocompleteForm = function (event, ui) {

        var $input = $(this);
        $input.val(ui.item.label);

        var $form = $input.parents("form:first");
        $form.submit();
    };

    var createAutocomplete = function () {
        var $input = $(this);

        var options = {
            source: $input.attr("data-pnc-autocomplete"),
            select: submitAutocompleteForm
        };

        $input.autocomplete(options);
    };

    var getPage = function () {
        var $a = $(this);

        var _url = $a.attr("href");
        if (_url == undefined || _url == '') {
            return false;
        }

        var options = {
            url: $a.attr("href"),
            data: $($a.parents("div.pagedList").attr("data-pnc-form")).serialize(),
            type: "get"
        };

        $.ajax(options).done(function (data) {
            var target = $a.parents("div.pagedList").attr("data-pnc-target");
            $(target).html(data);
        });
        return false;

    };

    $("form[data-pnc-ajax='true']").submit(ajaxFormSubmit);
    $("input[data-pnc-autocomplete]").each(createAutocomplete);

    $(".body-content, .main-panel").on("click", ".pagedList a", getPage);

});