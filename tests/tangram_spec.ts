import * as performance from "../performanceFirefox";
import mapPage from "../pages/map_page";
import * as data from "../test_data";

declare var map;

describe('Tangram', () => {
    it('MVP version', async () => {
        mapPage.open();
        performance.startFPS();
        browser.execute((data) => {
            for (let i = 0; i < data.length; i += 1) {
                setTimeout(
                    function () {
                        map.flyTo([data[i].lat, data[i].long], data[i].zoomLevel)
                    },
                    2000 * (i + 1),
                );
            }
            setInterval(function () {
                if (map.getZoom() === 15) {
                    document.getElementById("flyoverComplete")!.innerHTML = "done";
                }
            }, 2000);

        }, data.BERLIN_ZOOM);

        browser.waitUntil(
            () => mapPage.flyoverComplete.getText() === 'done',
            60000,
            'Flyover does not complete',
        );
        const fpsList = performance.getPFS();
        console.log(fpsList);
    });
});

