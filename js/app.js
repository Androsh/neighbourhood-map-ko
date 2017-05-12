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

// var AddMarker = function(place){
//         var myLatLng = { lat:place.location.lat,
//                          lng:place.location.lng };
//         self.marker = new google.maps.Marker({
//             map:map,
//             animation: google.maps.Animation.DROP,
//             position: myLatLng
//         });
//         if(self.marker){
//             self.markersArray().push([myLatLng,
//                                      self.marker]);
//             google.maps.event.addListener(marker, 'click', function() {
//                 // stopAnimation();
//                 // startAnimation(myLatLng)
//                 // FoursquareData(place);
//             });
//         }
// };

// var removeMarkers = function(){
//     for(var x=0; x<self.markersArray().length; x++ ){
//         self.markersArray()[x][1].setMap(null);
//     }

// var viewModel = function() {

//     var self = this;
//     this.query = ko.observable();
//     this.markersArray = ko.observableArray([]);


//     // this.locations = ko.observableArray([]);

//     this.searchResults = ko.computed(function() {
//         q = self.query();
//         if(!q){
//             // showMarkers();
//             return locations;
//         }
//         else{
//             removeMarkers();
//             return ko.utils.arrayFilter(locations, function(location) {
//                 if(location.title.toLowerCase().indexOf(q) >= 0) {
//                     AddMarker(place);
//                     return location;
//                 }
//             });
//         }
//     })
//     // this.title = ko.observable();

//     // searchQuery: ko.observable(''),
// }

// ko.applyBindings(viewModel);



