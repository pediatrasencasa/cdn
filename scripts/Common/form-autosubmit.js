(function ($) {
    $.fn.autosubmit = function () {
        this.submit(function (event) {
            event.preventDefault();
            var form = $(this);
            $.ajax({
                type: form.attr('method'),
                url: form.attr('action'),
                data: form.serialize()
            }).done(function (data) {
                // Optionally alert the user of success here...
            }).fail(function (data) {
                // Optionally alert the user of an error here...
            });
        });
        return this;
    };
})(jQuery);
/*
Html:
<form action="/blah" method="post" data-autosubmit>
  <!-- Form goes here -->
</form>

JS:
$(function() {
  $('form[data-autosubmit]').autosubmit();
});
*/ 
