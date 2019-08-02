class MapPage {
    open() {
        browser.url('/');
    }

    get flyoverComplete() {
        return $('#flyoverComplete');
    }
}

export default new MapPage();
