//Auntoinvocacion
(function () {
    const lat = 20.209416;
    const lng = -98.007805;
    const map = L.map('map').setView([lat, lng], 16);
    let marker
    const geocoderService = L.esri.Geocoding.geocodeService();
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    marker = new L.marker([lat, lng], {
        draggable: true, //Puedes mover
        autoPan: true,
    }).addTo(map);


    marker.on('moveend', function (e) { 
        marker = e.target
        const position = marker.getLatLng()
        console.log(`El usuario solto el marcador en las coordenadas:${position.lat}, ${position.lng}`)
        map.panTo(new L.LatLng(position.lat, position.lng))

        geocoderService.reverse().latlng(position, 13).run(function (error, result) {
            console.log(`La informacion calculada por geocoder al intentar hacer la georeferencia inversa es:${result}`)

            marker.bindPopup(result.address.LongLabel)
            document.querySelector('.street').textContent = result.address?.Address ?? '';
            document.querySelector('#street').value = result.address?.Address ?? '';
            result.
            document.querySelector('#lat').value = result.latlng?.lat ?? '';
            document.querySelector('#lng').value = result.latlng?.lng ?? '';
        })
    })
})();