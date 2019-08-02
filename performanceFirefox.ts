interface startFPS {
    (timeStart: number, fpsList: number[], currentCount: number): void
    fps?: number;
    counter?: number;
}

export function startFPS() {
    browser.execute(
        function () {
            let frameCount: startFPS= function (timeStart, fpsList, currentCount) {
                let now = performance.now();
                let duration = now - timeStart;

                if (duration < 1000) {
                    frameCount.counter++;
                } else {
                    let lastCount = (window as any).mozPaintCount;
                    if (lastCount > currentCount) {
                        frameCount.fps = frameCount.counter;
                        frameCount.counter = 0;
                        fpsList.push(frameCount.fps);
                        currentCount = lastCount;

                        timeStart = now;
                        console.log(fpsList);
                    } else {
                        frameCount.counter = 0;
                        timeStart = now;
                    }
                }
                (window as any)._fpsList = fpsList;
                requestAnimationFrame(() => frameCount(timeStart, fpsList, currentCount));
            };
            frameCount.counter = 0;
            frameCount.fps = 0;
            frameCount(performance.now(), [], 0);
        }
    );
}
export function getPFS() {
    return browser.execute(
        function () {
            console.log('in function:', (window as any)._fpsList);
            return (window as any)._fpsList;
        }
    );
}


