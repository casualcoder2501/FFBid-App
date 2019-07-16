import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtAttachInterceptor } from './jwt-attach';;

/** Http interceptor providers in outside-in order */

// exported for import into the primary app module's 'providers' property
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtAttachInterceptor, multi: true },
];