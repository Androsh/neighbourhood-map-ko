// 'use strict';

var map;
//new blank array for all markers
var markers = [];

$(document).ready(function() {
    $('#menu').click(function() {
        $('#header').toggleClass('full'),
        $('.side-box').toggleClass('hide')
    })
})

//function to create new map
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.507010, lng: -0.127760},
         zoom: 12,
         styles: styles,
         mapTypeControl: false
    });

    var largeInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < locations.length; i++) {
        var position = locations[i].location;
        var title = locations[i].title;
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
        });
        markers.push(marker);
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        });

    }

}

function populateInfoWindow(marker, infowindow) {
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(map, marker);
        infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
        });
    }
}

function viewModel() {

    var self = this;
    this.query = ko.observable();
    this.title = ko.observable(locations.title);

    this.searchResults = ko.computed(function() {
        i = self.query();
        if(!i){
            return locations;
        }
        else{
            return ko.utils.arrayFilter(locations, function(location) {
                if(location.title.toLowerCase().indexOf(i) >= 0) {
                    return location;
                }
            });
        }
    })
}

ko.applyBindings(viewModel);



