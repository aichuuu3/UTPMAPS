let currentMarker = null;
let currentRoute = null;

function InicializarMapa() {
    var map = L.map('mapa', {
        center: [9.0247, -79.5317],
        zoom: 16,
        scrollWheelZoom: false,
        dragging: false,
        touchZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        tap: false,
        zoomControl: false
    });

    let bounds = map.getBounds();
    let sw = bounds.getSouthWest();
    let ne = bounds.getNorthEast();

    L.imageOverlay('../img/salones/pisosVF.JPG',
        [[sw.lat, sw.lng], [ne.lat, ne.lng]]
    ).addTo(map);

    map.setMaxBounds([[sw.lat, sw.lng], [ne.lat, ne.lng]]);

    return map;
}
var map = InicializarMapa();

function LimpiarMapa() {
    if (currentMarker) {
        map.removeLayer(currentMarker);
        currentMarker = null;
    }
    if (currentRoute) {
        map.removeLayer(currentRoute);
        currentRoute = null;
    }
}

function obtenerRutasPersonalizadas() {
    return {

        "Piso: 3, Salon: 3-301": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021999, -79.532540],  
            [9.026873, -79.532454],  
            [9.026894, -79.533119]  
        ],

        "Piso: 3, Salon: 3-302": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021999, -79.532540],  
            [9.027530, -79.532475],  
            [9.027785, -79.532926]  
        ],

        "Piso: 3, Salon: 3-303": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021999, -79.532540],  
            [9.027530, -79.532475],  
            [9.028060, -79.532025]  
        ],

        "Piso: 3, Salon: 3-304": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021999, -79.532540],  
            [9.027255, -79.532540],  
            [9.028102, -79.531231]  
        ],

        "Piso: 3, Salon: 3-305": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021999, -79.532540],  
            [9.027530, -79.532475],  
            [9.027530, -79.531231],  
            [9.026937, -79.531167]  
        ],

        "Piso: 3, Salon: 3-306": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021999, -79.532540],  
            [9.026767, -79.532518],  
            [9.026767, -79.531960]  
        ],

        "Piso: 3, Salon: 3-307": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021999, -79.532540],  
            [9.024945, -79.532497],  
            [9.024945, -79.531896]  
        ],

        "Piso: 3, Salon: 3-308": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021999, -79.532540],  
            [9.024351, -79.532497],  
            [9.024351, -79.531102],  
            [9.025072, -79.531081]  
        ],

        "Piso: 3, Salon: 3-309": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021978, -79.530351],  
            [9.023991, -79.530351],  
            [9.025072, -79.530115]  
        ],

        "Piso: 3, Salon: 3-310": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021978, -79.530351],  
            [9.024309, -79.530330], 
            [9.024288, -79.529171],   
            [9.025072, -79.529150]  
        ],

        "Piso: 3, Salon: 3-311": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021978, -79.530351],  
            [9.024309, -79.530330], 
            [9.024288, -79.527283],   
            [9.025072, -79.527304]  
        ],

        
        "Piso: 3, Salon: 3-312": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021978, -79.530351],  
            [9.024309, -79.530330], 
            [9.024330, -79.526339],   
            [9.025072, -79.526403]  
        ],

        "Piso: 3, Salon: 3-313": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021978, -79.530351],  
            [9.024309, -79.530330], 
            [9.024309, -79.525716],   
            [9.025072, -79.525802]  
        ],

        "Piso: 3, Salon: 3-314": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021978, -79.530351],  
            [9.024309, -79.530330], 
            [9.024373, -79.525330],   
            [9.023610, -79.525716]  
        ],

        "Piso: 3, Salon: 3-315": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021978, -79.530351],  
            [9.024309, -79.530330], 
            [9.024373, -79.526317],   
            [9.023610, -79.526317]  
        ],

        "Piso: 3, Salon: 3-316": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021978, -79.530351],  
            [9.024309, -79.530330], 
            [9.024373, -79.527240],   
            [9.023610, -79.527240]  
        ],

        "Piso: 3, Salon: 3-317": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021978, -79.530351],  
            [9.024309, -79.530330], 
            [9.024288, -79.529042],   
            [9.022571, -79.528978],   
            [9.022571, -79.528227]  
        ],

        "Piso: 3, Salon: 3-318": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021978, -79.530351],  
            [9.024309, -79.530330], 
            [9.024288, -79.529042],   
            [9.021660, -79.528978],   
            [9.021660, -79.528205]  
        ],

        
        "Piso: 3, Salon: 3-319": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021978, -79.530351],  
            [9.024309, -79.530330], 
            [9.024288, -79.529042],   
            [9.021681, -79.528978],   
            [9.021681, -79.529622]  
        ],

        "Piso: 3, Salon: 3-320": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021978, -79.530351],  
            [9.024309, -79.530330], 
            [9.024288, -79.529042],   
            [9.022614, -79.528978],   
            [9.022614, -79.529686]  
        ],

        "Piso: 4, Lab: 3-401": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021999, -79.532540],  
            [9.022910, -79.532497],   
            [9.022910, -79.533312],   
            [9.023610, -79.533312]  
        ],  

        "Piso: 4, Lab: 3-402": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021999, -79.532540],  
            [9.022910, -79.532497],   
            [9.022910, -79.533377],   
            [9.022147, -79.533377]  
        ],  

        "Piso: 4, Lab: 3-403": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021999, -79.532540],  
            [9.022910, -79.532497],   
            [9.022910, -79.535329],   
            [9.022147, -79.535329]  
        ],  

        "Piso: 4, Lab: 3-404": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021999, -79.532540],  
            [9.022910, -79.532497],   
            [9.022910, -79.536381],   
            [9.022147, -79.536381]  
        ],  

        "Piso: 4, Lab: 3-405": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021999, -79.532540],  
            [9.022910, -79.532497],   
            [9.022910, -79.537282],   
            [9.022147, -79.537282]  
        ],  

        "Piso: 4, Lab: 3-406": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021999, -79.532540],  
            [9.022910, -79.532497],   
            [9.022910, -79.537218],   
            [9.023610, -79.537218]  
        ],

        "Piso: 4, Lab: 3-407": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021999, -79.532540],  
            [9.022910, -79.532497],   
            [9.022910, -79.536252],   
            [9.023610, -79.536252]  
        ],

        "Piso: 4, Lab: 3-408": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021999, -79.532540],  
            [9.022910, -79.532497],   
            [9.022910, -79.535265],   
            [9.023610, -79.535265]  
        ],

        "Piso: 4, Lab: 3-409": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021999, -79.532540],  
            [9.022910, -79.532497],   
            [9.022910, -79.534321],   
            [9.023610, -79.534321]  
        ],

        "Piso: 4, Lab: 3-410": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021999, -79.532540],  
            [9.022910, -79.532497],   
            [9.022910, -79.534321],   
            [9.022147, -79.534321]  
        ],  


        "Piso: 4, Lab: 3-411": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021999, -79.532540],  
            [9.024479, -79.532454],   
            [9.024479, -79.533119]  
        ],

        "Piso: 4, Lab: 3-412": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021999, -79.532540],  
            [9.025199, -79.532454],   
            [9.025199, -79.533205]  
        ],

        "Piso: 4, Lab: 3-413": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021978, -79.530351],  
            [9.024309, -79.530330], 
            [9.024288, -79.529042],   
            [9.022614, -79.528978],   
            [9.022614, -79.529686]  
        ],

        "Piso: 4, Lab: 3-414": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021978, -79.530351],  
            [9.024309, -79.530330], 
            [9.024373, -79.527240],   
            [9.023610, -79.527240]  
        ],

        "Piso: 4, Lab: 3-415": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021978, -79.530351],  
            [9.024309, -79.530330], 
            [9.024373, -79.526317],   
            [9.023610, -79.526317]  
        ],

        "Piso: 4, Lab: 3-416": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021978, -79.530351],  
            [9.024309, -79.530330], 
            [9.024373, -79.525330],   
            [9.023610, -79.525716]  
        ],

        "Piso: 4, Lab: 3-417": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021978, -79.530351],  
            [9.024309, -79.530330], 
            [9.024309, -79.525716],   
            [9.025072, -79.525802]  
        ],

        "Piso: 4, Lab: 3-418": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021978, -79.530351],  
            [9.024309, -79.530330], 
            [9.024330, -79.526339],   
            [9.025072, -79.526403]  
        ],

        "Piso: 4, Lab: 3-419": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021978, -79.530351],  
            [9.024309, -79.530330], 
            [9.024288, -79.527283],   
            [9.025072, -79.527304]  
        ],

        "Piso: 4, Lab: 3-420": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021978, -79.530351],  
            [9.024309, -79.530330], 
            [9.024288, -79.529171],   
            [9.025072, -79.529150]  
        ],

        "Piso: 4, Lab: 3-421": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021978, -79.530351],  
            [9.023991, -79.530351],  
            [9.025072, -79.530115]  
        ],

        "Piso: 4, Lab: 3-422": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021999, -79.532540],  
            [9.024351, -79.532497],  
            [9.024351, -79.531102],  
            [9.025072, -79.531081]  
        ],

        "Piso: 4, Lab: 3-423": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021999, -79.532540],  
            [9.024945, -79.532497],  
            [9.024945, -79.531896]  
        ],

        "Piso: 4, Lab: 3-429": [
            [9.022900, -79.531800],  
            [9.021999, -79.531853],
            [9.021999, -79.532540],  
            [9.026873, -79.532454],  
            [9.026894, -79.533119]  
        ],
    };
}

function ObtenerRutaManual(userLocation, salonNombre, map) { 
    const rutasPersonalizadas = obtenerRutasPersonalizadas();
    const ruta = rutasPersonalizadas[salonNombre];

    if (ruta) {
        currentRoute = L.polyline(ruta, { color: 'blue', weight: 4, opacity: 0.8 }).addTo(map);
    }
}

function DefinirUbicacionUsuario(callback) {
    var userLat = 9.022900;  
    var userLon = -79.531800;  

    callback({ coords: { latitude: userLat, longitude: userLon } });
}

function ObtenerSalonesPorFacultad(facultad) {
    var facultades = {
        'facultad': [
            { nombre: 'Piso: 3, Salon: 3-301', lat: 9.026894, lon: -79.533119 },
            { nombre: 'Piso: 3, Salon: 3-302', lat: 9.028039, lon: -79.532990 },
            { nombre: 'Piso: 3, Salon: 3-303', lat: 9.028060, lon: -79.532025 },
            { nombre: 'Piso: 3, Salon: 3-304', lat: 9.028102, lon: -79.531231 },
            { nombre: 'Piso: 3, Salon: 3-305', lat: 9.026937, lon: -79.531167 },
            { nombre: 'Piso: 3, Salon: 3-306', lat: 9.026767, lon: -79.531960 },
            { nombre: 'Piso: 3, Salon: 3-307', lat: 9.024945, lon: -79.531896 },
            { nombre: 'Piso: 3, Salon: 3-308', lat: 9.025072, lon: -79.531081 },
            { nombre: 'Piso: 3, Salon: 3-309', lat: 9.025072, lon: -79.530115 },
            { nombre: 'Piso: 3, Salon: 3-310', lat: 9.025072, lon: -79.529150 },
            { nombre: 'Piso: 3, Salon: 3-311', lat: 9.025072, lon: -79.527304 },
            { nombre: 'Piso: 3, Salon: 3-312', lat: 9.025072, lon: -79.526403 },
            { nombre: 'Piso: 3, Salon: 3-313', lat: 9.025072, lon: -79.525802 },
            { nombre: 'Piso: 3, Salon: 3-314', lat: 9.023631, lon: -79.525716 },
            { nombre: 'Piso: 3, Salon: 3-315', lat: 9.023631, lon: -79.526317 },
            { nombre: 'Piso: 3, Salon: 3-316', lat: 9.023631, lon: -79.527240 },
            { nombre: 'Piso: 3, Salon: 3-317', lat: 9.022571, lon: -79.528227 },
            { nombre: 'Piso: 3, Salon: 3-318', lat: 9.021660, lon: -79.528205 },
            { nombre: 'Piso: 3, Salon: 3-319', lat: 9.021681, lon: -79.529622 },
            { nombre: 'Piso: 3, Salon: 3-320', lat: 9.022614, lon: -79.529686 },
            { nombre: 'Piso: 4, Lab: 3-401', lat: 9.023610, lon: -79.533312 },
            { nombre: 'Piso: 4, Lab: 3-402', lat: 9.022147, lon: -79.533377 },
            { nombre: 'Piso: 4, Lab: 3-403', lat: 9.022147, lon: -79.535329 },
            { nombre: 'Piso: 4, Lab: 3-404', lat: 9.022147, lon: -79.536381 },
            { nombre: 'Piso: 4, Lab: 3-405', lat: 9.022147, lon: -79.537282 },
            { nombre: 'Piso: 4, Lab: 3-406', lat: 9.023610, lon: -79.537218 },
            { nombre: 'Piso: 4, Lab: 3-407', lat: 9.023610, lon: -79.536252 },
            { nombre: 'Piso: 4, Lab: 3-408', lat: 9.023610, lon: -79.535265 },
            { nombre: 'Piso: 4, Lab: 3-409', lat: 9.023610, lon: -79.534321 },
            { nombre: 'Piso: 4, Lab: 3-410', lat: 9.022147, lon: -79.534321 },
            { nombre: 'Piso: 4, Lab: 3-411', lat: 9.024479, lon: -79.533205 }, 
            { nombre: 'Piso: 4, Lab: 3-412', lat: 9.025199, lon: -79.533205 },  
            { nombre: 'Piso: 4, Lab: 3-413', lat: 9.022614, lon: -79.529686 },
            { nombre: 'Piso: 4, Lab: 3-414', lat: 9.023631, lon: -79.527240 },
            { nombre: 'Piso: 4, Lab: 3-415', lat: 9.023631, lon: -79.526317 },
            { nombre: 'Piso: 4, Lab: 3-416', lat: 9.023631, lon: -79.525716 },
            { nombre: 'Piso: 4, Lab: 3-417', lat: 9.025072, lon: -79.525802 },
            { nombre: 'Piso: 4, Lab: 3-418', lat: 9.025072, lon: -79.526403 },
            { nombre: 'Piso: 4, Lab: 3-419', lat: 9.025072, lon: -79.527304 },
            { nombre: 'Piso: 4, Lab: 3-420', lat: 9.025072, lon: -79.529150 },
            { nombre: 'Piso: 4, Lab: 3-421', lat: 9.025072, lon: -79.530115 },
            { nombre: 'Piso: 4, Lab: 3-422', lat: 9.025072, lon: -79.531081 },
            { nombre: 'Piso: 4, Lab: 3-423', lat: 9.024945, lon: -79.531896 },

            { nombre: 'Piso: 4, Lab: 3-429', lat: 9.026894, lon: -79.533119 },
        ] 

    }; 

    return facultades[facultad] || [];
}

function MostrarFacultades(selectElement) {
    var facultad = selectElement.value;
    var salon = document.getElementById('salon');
    var salonesContainer = document.getElementById('salonesContainer');

    salon.innerHTML = '<option value="" disabled selected>Selecciona un Salon</option>';

    var facultades = ObtenerSalonesPorFacultad(facultad);
    
    facultades.forEach(function(salonf) {
        var option = document.createElement('option');
        option.value = salonf.nombre;
        option.textContent = salonf.nombre;
        salon.appendChild(option);
    });

    salonesContainer.style.display = 'block';
}

async function iconoUrl(codIcono) {
    try {
        const respuesta = await fetch(`http://localhost:5076/api/Iconoes/${encodeURIComponent(codIcono)}`);
        if (!respuesta.ok) {
            throw new Error("Error al obtener el icono");
        }
        const datos = await respuesta.json();
        return datos.nomIcono;
    } catch (error) {
        console.error("Error al obtener el icono", error);
        return null;
    }
}

async function GenerarLocalizacion(selectElement) {
    var salonNombre = selectElement.value;
    var facultad = document.getElementById('facultad').value;
    var facultades = ObtenerSalonesPorFacultad(facultad);
    var icUrl= await iconoUrl(7)
    var salonSeleccionado = facultades.find(function(salon) {
        return salon.nombre === salonNombre;
    });

    if (salonSeleccionado) {
        var salonLatLng = [salonSeleccionado.lat, salonSeleccionado.lon];

        LimpiarMapa();

        var userIcon = L.icon({
            iconUrl: '../img/salones/usuarioIcono.png',
            iconSize: [45, 45],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        var salonIcon = L.icon({
            iconUrl: icUrl,
            iconSize: [45, 45],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });

        currentMarker = L.marker(salonLatLng, { icon: salonIcon })
            .addTo(map)
            .bindPopup(salonSeleccionado.nombre, { closeOnClick: false, autoClose: false ,  offset: L.point(0, 20)})
            .openPopup();

        map.setView(salonLatLng, 16);

        DefinirUbicacionUsuario(function(position) {
            var userLat = position.coords.latitude;
            var userLon = position.coords.longitude;

            var userMarker = L.marker([userLat, userLon], { icon: userIcon })
                .addTo(map)
                .bindPopup('Tu ubicación actual');  

            userMarker.on('click', function() {
                this.openPopup();
            });

            ObtenerRutaManual([userLat, userLon], salonNombre, map);
        });
    }
}

map.on('click', function (e) {
    var lat = e.latlng.lat.toFixed(6); 
    var lng = e.latlng.lng.toFixed(6);

    L.popup()
        .setLatLng(e.latlng)
        .setContent(`Coordenadas: ${lat}, ${lng}`)
        .openOn(map);

    console.log(`Latitud: ${lat}, Longitud: ${lng}`);
});