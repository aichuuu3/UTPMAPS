var map = L.map('mapita').setView([9.0247, -79.5317], 16); // Establecer el mapa

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Variable para almacenar la ruta actual y el marcador actual
let currentRoute = null;
let currentMarker = null;

// Función para obtener la ruta usando la API de OSRM
function getRoute(userLocation, markerLocation) {
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${userLocation[1]},${userLocation[0]};${markerLocation[1]},${markerLocation[0]}?overview=full&geometries=polyline`;

    fetch(osrmUrl)
        .then(response => response.json())
        .then(data => {
            const route = data.routes[0].geometry;
            const latlngs = decodePolyline(route);

            // Eliminar la ruta anterior, si existe
            if (currentRoute) {
                map.removeLayer(currentRoute); // Eliminar la ruta anterior
            }

            // Dibujar la nueva ruta en el mapa
            currentRoute = L.polyline(latlngs, { color: 'purple', weight: 4, opacity: 0.7 }).addTo(map);

            // Ajustar el mapa para que la ruta sea visible
            map.fitBounds(currentRoute.getBounds());
        })
        .catch(error => {
            alert('Error al obtener la ruta');
            console.error(error);
        });
}

// Función para decodificar la polilínea
function decodePolyline(polyline) {
    let index = 0, len = polyline.length, lat = 0, lng = 0, array = [];
    while (index < len) {
        let shift = 0, result = 0, byte;
        do {
            byte = polyline.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);
        let deltaLat = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lat += deltaLat;

        shift = 0;
        result = 0;
        do {
            byte = polyline.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);
        let deltaLng = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lng += deltaLng;

        array.push([lat / 1E5, lng / 1E5]);
    }
    return array;
}

function borrarlocalizaciones(polyline){
    // Eliminar el marcador anterior, si existe
    if (polyline) {
        map.removeLayer(polyline);

        //Crea la nueva linea xd
        currentRoute = L.polyline(latlngs, { color: 'purple', weight: 4, opacity: 0.7 }).addTo(map);
    }
}

async function obtenerCoordenadasEdificio(numeritoCondenado, tipo) {
    try {
        const respuesta = await fetch(`http://localhost:5076/api/Edificios/${encodeURIComponent(numeritoCondenado)}`);
        if (!respuesta.ok) {
            throw new Error("Error al obtener los datos del edificio");
        }
        const datos = await respuesta.json();
        if(tipo === 'string'){
        return datos.coordenadasEdificio;
        }else if (tipo === 'int'){
            return datos.codIcono;
        }else {
            throw new Error("Tipo de dato no válido");
        }
    } catch (error) {
        console.error("Error al obtener los datos del edificio:", error);
        return null;
    }
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

async function generarLocalizacion() {
    navigator.geolocation.getCurrentPosition(async function (position) {
        var lati = position.coords.latitude;
        var long = position.coords.longitude;
        let opUno = document.getElementById('op1').checked;
        let opTres = document.getElementById('op3').checked;
        let opCuatro = document.getElementById('op4').checked;
        let opPost1 = document.getElementById('opPost').checked;
        // Obtener ubicación del usuario
        let ubicacion = [lati, long];
        var ubicacionEdificio;
        var ubicEd;
        var la;
        var lo;
        var coorEd;
    
        var icono;
        var icUrl;
        
        // Limpiar los radios
        const radio = document.querySelectorAll('input[type="radio"]');
        radio.forEach((item) => {
            if (item !== radio) {
                item.checked = false;
            }
        });
        
        // Verificar qué opción fue seleccionada y calcular la ruta
        switch (true) {
            case opUno:
                ubicacionEdificio = await obtenerCoordenadasEdificio(3, 'string');
                ubicEd = ubicacionEdificio.split(" ");
                la = Number(ubicEd[0]);
                lo = Number(ubicEd[1]);
                coorEd = [la,lo];
                icono= await obtenerCoordenadasEdificio(3, 'int');
                icUrl= await iconoUrl(icono);
                // Definir ubicación y icono del Edificio 1
                const edificioUno = coorEd;
                const customIconUno = L.icon({
                    iconUrl: icUrl, // Ruta del icono específico para el edificio 3
                    iconSize: [60, 60],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -40]
                });

                const userIcon = L.icon({
                    iconUrl: 'img/mapa/usuarioIcono1.png', // Ruta del icono para la ubicación del usuario
                    iconSize: [50, 50],
                    iconAnchor: [25, 50],
                    popupAnchor: [0, -50]
                });

                // Eliminar el marcador anterior, si existe
                if (currentMarker && userMarker) {
                    map.removeLayer(currentMarker);
                    map.removeLayer(userMarker);
                }
                
                // Llamar a la API de rutas
                getRoute(ubicacion, edificioUno);

                // Crear el marcador para Edificio 1
                currentMarker = L.marker(edificioUno, { icon: customIconUno }).addTo(map)
                    .bindPopup("Edificio 1")
                    .openPopup();
                
                //Crea marcador para el usuario
                userMarker = L.marker(ubicacion, { icon: userIcon }).addTo(map)
                    .bindPopup("Tu ubicación actualmente")
                    .openPopup();
                borrarlocalizaciones(polyline);
                break;

            case opTres:
                ubicacionEdificio = await obtenerCoordenadasEdificio(4, 'string');
                ubicEd = ubicacionEdificio.split(" ");
                la = Number(ubicEd[0]);
                lo = Number(ubicEd[1]);
                coorEd = [la,lo];
                icono= await obtenerCoordenadasEdificio(4, 'int');
                icUrl= await iconoUrl(icono);
                // Definir ubicación y icono del Edificio 3
                const edificioTres = coorEd;
                const customIconTres = L.icon({
                    iconUrl: icUrl, // Ruta del icono específico para el edificio 3
                    iconSize: [60, 60],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -40]
                });

                const userIconTres = L.icon({
                    iconUrl: 'img/mapa/usuarioIcono1.png', // Ruta del icono para la ubicación del usuario
                    iconSize: [50, 50],
                    iconAnchor: [25, 50],
                    popupAnchor: [0, -50]
                });

                // Eliminar el marcador anterior, si existe
                if (currentMarker && userMarker) {
                    map.removeLayer(currentMarker);
                    map.removeLayer(userMarker);
                }
                
                // Llamar a la API de rutas
                getRoute(ubicacion, edificioTres);

                // Crear el marcador para Edificio 3
                currentMarker = L.marker(edificioTres, { icon: customIconTres }).addTo(map)
                    .bindPopup("Facultad de Ingeniería de Sistemas Computacionales")
                    .openPopup();
                
                userMarker = L.marker(ubicacion, { icon: userIconTres }).addTo(map)
                    .bindPopup("Tu ubicación actualmente")
                    .openPopup();

                borrarlocalizaciones(polyline);
                break;

            case opCuatro:
                ubicacionEdificio = await obtenerCoordenadasEdificio(5, 'string');
                ubicEd = ubicacionEdificio.split(" ");
                la = Number(ubicEd[0]);
                lo = Number(ubicEd[1]);
                coorEd = [la,lo];
                icono= await obtenerCoordenadasEdificio(5, 'int');
                icUrl= await iconoUrl(icono);
                // Definir ubicación y icono del Edificio 4
                const edificioCuatro = coorEd;
                const customIconCuatro = L.icon({
                    iconUrl: icUrl, // Ruta del icono específico para el edificio 3
                    iconSize: [45, 45],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -40]
                });

                const userIconCuatro = L.icon({
                    iconUrl: 'img/mapa/usuarioIcono1.png', // Ruta del icono para la ubicación del usuario
                    iconSize: [50, 50],
                    iconAnchor: [25, 50],
                    popupAnchor: [0, -50]
                });

                // Eliminar el marcador anterior, si existe
                if (currentMarker && userMarker) {
                    map.removeLayer(currentMarker);
                    map.removeLayer(userMarker);
                }

                // Llamar a la API de rutas
                getRoute(ubicacion, edificioCuatro);

                // Crear el marcador para Edificio 4
                currentMarker = L.marker(edificioCuatro, { icon: customIconCuatro }).addTo(map)
                    .bindPopup("Edificio 4")
                    .openPopup();
                
                userMarker = L.marker(ubicacion, { icon: userIconCuatro }).addTo(map)
                    .bindPopup("Tu ubicación actualmente")
                    .openPopup();
                
                borrarlocalizaciones(polyline);
                break;

            case opPost1:
                ubicacionEdificio = await obtenerCoordenadasEdificio(6, 'string');
                ubicEd = ubicacionEdificio.split(" ");
                la = Number(ubicEd[0]);
                lo = Number(ubicEd[1]);
                coorEd = [la,lo];
                icono= await obtenerCoordenadasEdificio(6, 'int');
                icUrl= await iconoUrl(icono);
                // Definir ubicación y icono del Edificio de Postgrado
                const edificioPostgrado = coorEd;
                const customIconPostgrado = L.icon({
                    iconUrl: icUrl, // Ruta del icono específico para el edificio 3
                    iconSize: [45, 45],
                    iconAnchor: [20, 40],
                    popupAnchor: [0, -40]
                });

                const userIconPost = L.icon({
                    iconUrl: 'img/mapa/usuarioIcono1.png', // Ruta del icono para la ubicación del usuario
                    iconSize: [50, 50],
                    iconAnchor: [25, 50],
                    popupAnchor: [0, -50]
                });

                // Eliminar el marcador anterior, si existe
                if (currentMarker && userMarker) {
                    map.removeLayer(currentMarker);
                    map.removeLayer(userMarker);
                }

                // Llamar a la API de rutas
                getRoute(ubicacion, edificioPostgrado);

                // Crear el marcador para Edificio de Postgrado
                currentMarker = L.marker(edificioPostgrado, { icon: customIconPostgrado }).addTo(map)
                    .bindPopup("Edificio de Postgrado")
                    .openPopup();

                userMarker = L.marker(ubicacion, { icon: userIconPost }).addTo(map)
                    .bindPopup("Tu ubicación actualmente")
                    .openPopup();

                borrarlocalizaciones(polyline);
                break;

            default:
                break;
        }
    });
}