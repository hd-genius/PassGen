import 'jest-preset-angular';

import * as nodeCrypto from 'crypto';
Object.defineProperty(global, 'crypto', {
    value: {
        getRandomValues: buffer => nodeCrypto.randomFillSync(buffer)
    }
});
