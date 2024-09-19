window.onload = function () {
    var title = "Pediatras en Casa";

    var lanLog = document.head.querySelector("[name='geo.position']").content.split(";");

    var myLatLng = new google.maps.LatLng(parseFloat(lanLog[0]), parseFloat(lanLog[1]));

    var options = {
        center: myLatLng,
        center: myLatLng,
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        draggable: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 16
    };
    var div = document.getElementById('googleMap');
    var map = new google.maps.Map(div, options);

    var infowindow = new google.maps.InfoWindow();
    infowindow.setContent(decodeURIComponent(title));

    var marker = new google.maps.Marker({
        map: map,
        title: title,
        position: myLatLng,
        icon: 'https://cdn.pediatrasencasa.com/content/icons/map-marker.png'
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });

};