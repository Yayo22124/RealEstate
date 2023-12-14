document.addEventListener('DOMContentLoaded', function() {
    const lat = 20.209416;
    const lng = -98.007805;
    const map = L.map('map').setView([lat, lng], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright"> openstreetmap</a> contributors'
    }).addTo(map);
let marker;
    const geocoderService = L.esri.Geocoding.geocodeService()

    marker= new L.marker([lat,lng],
        {
            draggable: true,
            autoPan: true
        }
        ).addTo(map);

    marker.on('moveend',function(e){
        marker= e.target
        const positon = marker.getLatLng()
        console.log(`el usuariosolto el marcadoren las coordenadas: ${positon.lat}, ${positon.lng}`)
        map.panTo(new L.LatLng(positon.lat, positon.lng))

        geocoderService.reverse().latlng(positon,13).run(function(error,result){
            console.log(`Lainfromacióncalculadapor geocoder al intentar hacerla georreferencia invrsa es ${result}`)

            marker.bindPopup(result.address.LongLabel)
            document.querySelector('.street').textContent = result.address?.Address ?? ''
            document.querySelector('#street').value = result.address?.Address ?? ''
            document.querySelector('#lat').value = result.latlng?.lat ?? ''
            document.querySelector('#lng').value = result.latlng?.lng ?? ''
        })
    })
});