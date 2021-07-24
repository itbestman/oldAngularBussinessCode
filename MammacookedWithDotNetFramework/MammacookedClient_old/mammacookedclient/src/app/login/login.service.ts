import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiURL: string = 'http://localhost:59786/api';
  token = localStorage.getItem('token');
  headers = new  HttpHeaders().set("Content-Type", "application/json")
  .set("charset","UTF-8");
  constructor(private httpClient: HttpClient) { }


  checkLogin(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURL}/values`);
  }

  getToken():Observable<any>{
    return this.httpClient.get<any>(`${this.apiURL}/values`);
  }
}
