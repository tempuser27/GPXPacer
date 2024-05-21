document.getElementById('gpxFile').addEventListener('change', function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    
    reader.onload = function(e) {
        var gpx = e.target.result;
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(gpx, "application/xml");

        var map = L.map('map').setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19
        }).addTo(map);

        var gpxLayer = new L.GPX(gpx, {
            async: true
        }).on('loaded', function(e) {
            map.fitBounds(e.target.getBounds());
        }).addTo(map);
    };

    reader.readAsText(file);
});