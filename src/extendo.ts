import * as Bowser from 'bowser';

export class Extendo {
    private browser: Bowser.Parser.Parser | null;

    constructor() {
        try {
            this.browser = Bowser.getParser(window.navigator.userAgent);
        } catch {
            this.browser = null;
        }
    }

    public async isExtensionInstalled(extensionId: string, filePath: string) {
        try {
            if (!this.browser) {
                return false;
            }

            if (!this.isChromium()) {
                return false;
            }

            let res = false;
            await fetch(`chrome-extension://${extensionId}/${filePath}`)
                .then(() => { res = true; })
                .catch(() => { res = false; });

            return res;
        } catch {
            return false;
        }
    }

    private isChromium() {
        return this.browser && this.browser.getEngine().name === 'Blink';
    }
}