import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {

    constructor(){}
    intercept(
        req:HttpRequest<any>,
        next:HttpHandler
    ):Observable<HttpEvent<any>> {

        req = req.clone({
            setHeaders:{
                
                "x-rapidapi-key": "af9c036759msh68de47004f76c71p1838ebjsn88cdec7a205f",
                "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
            
            },
            setParams:{
                key:'36088c76d53e400d8da3eb46bcb4e423'
            }
        })

return next.handle(req)

    }
}