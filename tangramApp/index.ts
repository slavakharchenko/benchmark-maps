declare var map, layer, L, Tangram;

interface FlyoverLocation {
    lat: number;
    long: number;
    zoomLevel: number;
    tilt: number;
}

function initMap(
    center: [number, number] = [13.405, 52.52],
    zoom: number = 0,
) {
    map = L.map('map');
    layer = Tangram.leafletLayer({
        scene: {
            import: [
                'https://www.nextzen.org/carto/bubble-wrap-style/10/bubble-wrap-style.zip',
                'https://www.nextzen.org/carto/bubble-wrap-style/10/themes/bubble-wrap-road-shields-international.zip',
                'https://www.nextzen.org/carto/refill-style/11/themes/label-10.zip',
            ],
            sources: {
                mapzen: {
                    url: 'https://{s}.tile.nextzen.org/tilezen/vector/v1/512/all/{z}/{x}/{y}.mvt',
                    url_subdomains: ['a', 'b', 'c', 'd'],
                    url_params: {
                        api_key: 'vFHlEZ15SXG-Imi5Y45gCQ'
                    },
                    tile_size: 512,
                    max_zoom: 20,
                }
            }
        },
        introspection: true,
        attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | <a href="http://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a> | <a href="https://www.nextzen.com/" target="_blank">Nextzen</a>'
    });
    layer.addTo(map);
    map.setView(center, zoom);
}

initMap();

function getMap() {
    if (map === undefined){
        throw new Error();
    }
    return map;
}

function executeFlyover(locations: FlyoverLocation[]) {
    const renderCallback = () => {
        if(locations.length > 0) {
            const location = locations.shift();
            map.flyTo({
                center: [location!.long, location!.lat],
                zoom: location!.zoomLevel,
                pitch: location!.tilt,
            });
        } else {
            map.off('zoomend', renderCallback);
            document.getElementById("flyoverComplete")!.innerHTML = "done";
        }
    };

    // Events does not work correctly
    // map.on('zoomend', renderCallback);
    // layer.scene.subscribe({view_complete: renderCallback});
}

(window as any)._initMap = initMap;
(window as any)._getMap = getMap;
(window as any)._executeFlyover = executeFlyover;