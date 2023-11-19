var mapSetup = function() {
	var styles = [
  {
    "featureType": "poi",
    "stylers": [
      { "saturation": -100 }
    ]
  },{
    "featureType": "administrative",
    "stylers": [
      { "saturation": -100 }
    ]
  },{
    "featureType": "landscape",
    "stylers": [
      { "saturation": -100 }
    ]
  },{
    "featureType": "water",
    "stylers": [
      { "saturation": -50 }
    ]
  },{
    "featureType": "road",
    "stylers": [
      { "saturation": -100 }
    ]
  },{
    "featureType": "transit"  }
];

	//var image = 'img/flag.png';
	var myLatlng = new google.maps.LatLng( 35.6707842, 139.688467 );
	var mapOptions = {
		center: myLatlng,
		zoom: 15,
	  panControl: true,
		zoomControl: true,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		overviewMapControl: false,
		scrollwheel: false,
		zoomControlOptions: {
	        style: google.maps.ZoomControlStyle.LARGE,
	        position: google.maps.ControlPosition.LEFT_CENTER
	    },
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		styles: styles
	};
	var map = new google.maps.Map( $("#mapCanvas")[0], mapOptions );

	var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      //icon: image,
      title: 'HYS INC.'
  });

}