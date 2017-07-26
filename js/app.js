var map;

var fsId = "CAJJ01O21YXUC50X4PZZYD4XLHPFWEGHXYARUNRQZOPCTUTQ";

var fsSecret = "F4J4RV4NMGQ2VFNP1Y4IEHBOEQ5WAXSSZWHIEYST4DOYPBTB";

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

    for(var i=0; i<locations.length; i++){
        addMarker(locations[i]);
    }

    // infoWindow = new google.maps.InfoWindow();

}
//function to add marker to the map
function addMarker(place){
  var latLong = {
    lat: place.location.lat,
    lng: place.location.lng
  };
  self.marker = new google.maps.Marker({
    map: map,
    animation: google.maps.Animation.DROP,
    position: latLong
  });

  if(self.marker){
    self.markerArray().push([latLong, self.marker]);
    google.maps.event.addListener(marker, "click", function(){
        stopAnimation();
        startAnimation(latLong);
        fourSquare(place);
    });
  }
}

//function to remove all the marker from the map
function removeMarker(){
  for(var i=0; i<self.markerArray().length; i++){
    self.markerArray()[i][1].setVisible(false);
  }
}

//fuction show all the makers on the map
function showMarker(){
  for(var i=0; i<self.markerArray().length; i++){
    self.markerArray()[i][1].setVisible(true);
  }
}

//function to display bounce animation on the marker when clicked.
function startAnimation(latLong){
  ko.computed(function(){
    ko.utils.arrayForEach(self.markerArray(), function(m){
      if(latLong.lat === m[0].lat && latLong.lng === m[0].lng){
        m[1].setVisible(true);
        m[1].setAnimation(google.maps.Animation.BOUNCE);
      }
    });
  });
}

//function to stop the animation on markers.
function stopAnimation(){
  for(var i=0; i<self.markerArray().length; i++){
    self.markerArray()[i][1].setAnimation(null);
  }
}

function fourSquare(place){
  var venue_id = place.venue_id;
  var url = "https://api.foursquare.com/v2/venues/"+venue_id+"?client_id="+fsId+"&client_secret="+fsSecret+"&v="+20170101+"";

  //function to make ajax request.
  $.ajax({
    url: url,
    dataType: "json",
    async: true,
    success: function (data){
        self.place_name(data.response.venue.name);
        self.place_description(data.response.venue.description);
    },
    error: function() {
        alert("Something's wrong!!!");
    }
  });

}

function viewModel() {
    var self = this;
    this.markerArray = ko.observableArray([]);
    this.query = ko.observable();
    this.place_name = ko.observable();
    this.place_description = ko.observable();
    this.searchResults = ko.computed(function() {
        i = self.query();
        if(!i){
            showMarker();
            return locations;
        }
        else{
            removeMarker();
            return ko.utils.arrayFilter(locations, function(place) {
                if(place.title.toLowerCase().indexOf(i) >= 0) {
                    addMarker(place);
                    return place;
                }
            });
        }
    })

    this.viewLocations = function(place){
        var latLong = {lat: place.location.lat, lng: place.location.lng};
        stopAnimation();
        startAnimation(latLong);
        fourSquare(place);
    };
}

ko.applyBindings(viewModel);
