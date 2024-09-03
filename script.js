var map;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, function(error) {
            if (error.code === error.TIMEOUT) {
                // Reintentar si hubo un timeout
                getLocation();
            } else {
                showError(error);
            }
        }, {
            enableHighAccuracy: true, // Solicita la máxima precisión
            timeout: 10000, // Espera máxima de 10 segundos
            maximumAge: 0 // No usar posiciones anteriores
        });
    } else {
        alert("La geolocalización no es soportada por este navegador.");
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var accuracy = position.coords.accuracy; // Precisión en metros

    // Ajustar el nivel de zoom según la precisión de la ubicación
    var zoomLevel = accuracy < 50 ? 18 : 15;

    // Inicializar el mapa con la ubicación y el nivel de zoom adecuado
    map = L.map('map').setView([lat, lon], zoomLevel);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Agregar un marcador en la ubicación actual con una ventana emergente que muestra la precisión
    L.marker([lat, lon]).addTo(map)
        .bindPopup("¡Aquí estás con una precisión de " + accuracy + " metros!")
        .openPopup();
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("El usuario negó la solicitud de geolocalización.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("La información de ubicación no está disponible.");
            break;
        case error.TIMEOUT:
            alert("La solicitud de ubicación ha caducado.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Se produjo un error desconocido.");
            break;
    }
}
