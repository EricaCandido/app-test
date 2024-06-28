import { makeStateKey } from '@angular/core';

export const envStateKey = makeStateKey<{ data: string }>('env');
