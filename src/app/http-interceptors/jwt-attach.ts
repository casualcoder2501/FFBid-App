import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()

// class exported to supporting index.ts file and exported for implementation
export class JwtAttachInterceptor implements HttpInterceptor {

    // This function appends the json web token that is stored in session storage
    // to every http request being sent out. The token is appended to the header 
    // 'Authorization' property for consumption by the server.
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = JSON.parse(sessionStorage.getItem('id_token'));

        if (token) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', token)
            });
            return next.handle(cloned)
        } else {
            return next.handle(req);
        }

    }
}