import * as performance from "../performanceFirefox";
import mapPage from "../pages/map_page";
import * as data from "../test_data";

describe('Mapbox', () => {
    it('MVP version', async () => {
        mapPage.open();
        performance.startFPS();
        browser.execute((data) => (window as any)._executeFlyover(data), data.BERLIN_ZOOM);
        browser.waitUntil(
            () => mapPage.flyoverComplete.getText() === 'done',
            60000,
            'Flyover does not complete',
        );
        const fpsList = performance.getPFS();
        console.log(fpsList);
    });
});

