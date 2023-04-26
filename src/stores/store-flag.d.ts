import 'quasar/dist/types/feature-flag';
import { Router } from 'vue-router';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    readonly router: Router;
  }
}

declare module 'quasar/dist/types/feature-flag' {
  interface QuasarFeatureFlags {
    store: true;
  }
}
