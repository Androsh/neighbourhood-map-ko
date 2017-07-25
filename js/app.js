var map;

var fs_lientID

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
      showInfoWindow();
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
  var currentDate = new Date();
  var day = currentDate.getDate();
  var month= currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();

  if(day < 10){
    day = "0" + day;
  }

  if(month < 10){
    month = "0" + month;
  }

  var today = ""+year+month+day+"";
  var venue_id = place.venue_id;
  var url = "https://api.foursquare.com/v2/venues/"+venue_id+"?client_id="+fsId+"&client_secret="+fsSecret+"&v="+today+"";

  // Ajax function is called here
  $.ajax({
    url: url,
    dataType: "json",
    async: true
  }).success(function(data){
    // If call is successfull stores data in the variables.
    self.place_name(data.response.venue.name);
    self.place_description(data.response.venue.description);
    self.place_image(data.response.venue.bestPhoto.prefix + "320x200" + data.response.venue.bestPhoto.suffix);
    self.place_rating("Rating : " + data.response.venue.rating);
    if(data.response.venue.contact.phone !== undefined || data.response.venue.contact.phone !== null){
        self.place_contact("Contact number : "+data.response.venue.contact.phone);
    }
  }).error(function(data){
    // If call is unsuccessfull this function is called.
    fourSquareApiLoadError();
  });

}

function viewModel() {

    var self = this;
    this.markerArray = ko.observableArray([]);
    this.query = ko.observable();
    this.title = ko.observable(locations.title);

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
        showInfoWindow();
    };
}

ko.applyBindings(viewModel);
