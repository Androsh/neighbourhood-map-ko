'use strict';

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

    var styles = [
        {
            featureType: 'water',
            stylers: [
              { color: '#19a0d8' }
            ]
        },{
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [
              { color: '#ffffff' },
              { weight: 6 }
            ]
        },{
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [
              { color: '#e85113' }
            ]
        },{
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
              { color: '#efe9e4' },
              { lightness: -40 }
            ]
        },{
            featureType: 'transit.station',
            stylers: [
              { weight: 9 },
              { hue: '#e85113' }
            ]
        },{
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [
              { visibility: 'off' }
            ]
        },{
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [
              { lightness: 100 }
            ]
        },{
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
              { lightness: -100 }
            ]
        },{
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              { visibility: 'on' },
              { color: '#f0e4d3' }
            ]
        },{
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
              { color: '#efe9e4' },
              { lightness: -25 }
            ]
        }
    ];

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.507010, lng: -0.127760},
         zoom: 13,
         styles: styles,
         mapTypeControl: false
    });

    var locations = [
        {title: 'Victoria and Albert Museum', location: {lat: 51.496820, lng: -0.172169}},
        {title: 'The British Museum', location: {lat: 51.519587, lng: -0.126978}},
        {title: 'Museum of London', location: {lat: 51.517805, lng: -0.096746}},
        {title: 'Science Museum', location: {lat: 51.497970, lng: -0.174513}},
        {title: 'Natural History Museum', location: {lat: 51.496895, lng: -0.176410}},
        {title: 'National Maritime Museum', location: {lat: 51.481049, lng: -0.005257}},
        {title: 'Tate Modern', location: {lat: 51.507742, lng: -0.099346}},
        {title: 'Imperial War Museum', location: {lat: 51.495764, lng: -0.108318}},
        {title: 'National Army Museum', location: {lat: 51.486907, lng: -0.160508}},
        {title: 'V&A Museum of Childhood', location: {lat: 51.529208, lng: -0.054941}},
        {title: 'National Gallery', location: {lat: 51.509096, lng: -0.128288}}
    ];

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
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);

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
