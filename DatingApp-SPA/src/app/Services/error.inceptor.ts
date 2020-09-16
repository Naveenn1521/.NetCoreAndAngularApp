import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error.status === 401) {
                    return throwError(error.statusText);
                }
                if (error instanceof HttpErrorResponse) {
                    const applicationError = error.headers.get('Application-Error');
                    if (applicationError) {
                        return throwError(applicationError);
                    }
                    const angularerrors = error.error;
                    let modelStateErrors = '';
                    if (angularerrors.erros && typeof angularerrors.erros === 'object') {
                        for (const key in angularerrors.erros) {
                            if (angularerrors.erros[key]) {
                                modelStateErrors += angularerrors.erros[key] + '\n';
                            }
                        }
                    }
                    return throwError(modelStateErrors || angularerrors || 'Server Error');
                }
            })
        );
    }
}

export const ErrorInterceptorProvider =  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
