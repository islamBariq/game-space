import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, ɵHttpInterceptingHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { observable, Observable, throwError as observableThrowError } from "rxjs";
import { catchError } from 'rxjs/operators'
@Injectable()

export class HttpErrorInterceptor implements HttpInterceptor{
    constructor(){}

    intercept(
        req:HttpRequest<any>,
        next:HttpHandler
    ):Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            catchError((error: any) => {
                console.log(error)
                return observableThrowError(error)
            })
        )
    }
}

