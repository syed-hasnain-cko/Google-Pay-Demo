import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenRequestService {

  constructor(private http: HttpClient) { }

  getCKOToken(requestObject: any){

     return this.http.post<any>(`${environment.baseAPIUrl}/tokens`, requestObject, {
       headers: { 
           Authorization: `${environment.public_key}`
       }
   });
   }
}
