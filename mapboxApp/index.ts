let map: mapboxgl.Map;

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
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: zoom,
    });

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
            map.off('idle', renderCallback);
            document.getElementById("flyoverComplete")!.innerHTML = "done";
        }
    };
    map.on('idle', renderCallback);
}

(window as any)._initMap = initMap;
(window as any)._getMap = getMap;
(window as any)._executeFlyover = executeFlyover;

