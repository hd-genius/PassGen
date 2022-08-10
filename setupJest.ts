import 'jest-preset-angular';

import * as nodeCrypto from 'crypto';
// Polyfill for jsdom
Object.defineProperty(global, 'crypto', {
    value: {
        getRandomValues: buffer => nodeCrypto.randomFillSync(buffer)
    }
});
