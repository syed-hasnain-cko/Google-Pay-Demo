import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentRequestService {

  constructor(private http: HttpClient) { }

  requestPayment(requestObject:any){
    
      return this.http.post<any>(`${environment.baseAPIUrl}/payments`, requestObject, {
      headers: {
        Authorization: `${environment.secret_key}`
      }
    });
  }
}
