import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MammaService } from "./mamma.service";

@Injectable() export class AppHttpInterceptor implements HttpInterceptor {
    constructor(private appService: MammaService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        var token = this.appService.token;
        if (token && req.url.indexOf('token') == -1) {
            req = req.clone({
                setHeaders: { authorization: `Bearer ${token}` }
            })
        }
        return next.handle(req);
    }

}