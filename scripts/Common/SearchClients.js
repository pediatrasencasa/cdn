//view model
function ClientVM() {
    var _self = this;
    _self.ApiUrl = "/api/common/search/";
    _self.minChar = 3;
    _self.loading = ko.observable(false);
    _self.isFocused = ko.observable(false);
    _self.didSearch = ko.observable(false);
    _self.noResults = ko.observable(false);
    _self.searchTerm = ko.observable('');
    _self.selectedClient = ko.observable(null);
    _self.resultList = ko.observableArray();
    _self.searchClient = function () {
        _self.resultList(null);
        _self.selectedClient(null);
        _self.noResults(false);
        var txt = _self.searchTerm();
        if (txt.trim().length >= _self.minChar) {
            _self.didSearch(true);
            _self.loading(true);
            //search in db
            $.getJSON(_self.ApiUrl + "clients?term=" + txt + '&v=' + new Date().getTime())
                .then(function (response) {
                //success                
                _self.resultList(response);
                if (_self.resultList().length == 0) {
                    _self.noResults(true);
                }
                _self.loading(false);
            }, function (err) {
                //error
                _self.loading(false);
            });
        }
        else {
            //TODO: show an error msg about entering more characters
            _self.loading(false);
        }
    };
    _self.selectClient = function (data) {
        _self.loading(false);
        $.getJSON(_self.ApiUrl + "details/" + data.documentId + '?v=' + new Date().getTime())
            .then(function (response) {
            //success                
            _self.selectedClient(response);
            _self.resultList(null);
            $('html, body').animate({
                scrollTop: $("#SearchTerm").offset().top || 195
            }, 800);
        }, function (err) {
            //error
        });
    };
    _self.clearAll = function () {
        _self.resultList(null);
        _self.isFocused(true);
        _self.selectedClient(null);
        _self.searchTerm('');
    };
}
//template component
ko.components.register('client-list', {
    viewModel: function (params) {
        this.data = ko.observable(params.value);
    },
    template: "<a href='javascript:;' class='list-group-item'>"
        + "<h4 class='list-group-item-heading'>"
        + "<span data-bind=\"text: data().name\"></span> <small data-bind=\"text:'('+ data().documentId +')'\"></small>"
        + "</h4></a>"
});
//apply knockoutjs
ko.applyBindings(new ClientVM());
