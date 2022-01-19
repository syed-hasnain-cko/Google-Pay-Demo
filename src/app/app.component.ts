import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Google Pay Demo';
  constructor(private http: HttpClient){

  }
  tokenizationDataString: any = {};
  tokenizationDataObject: any = {};
  ckoTokenData: any = {};
  ckoToken: any = {};
  isDisabledStep2: boolean = true;
  paymentID: any ={};

  paymentRequest: google.payments.api.PaymentDataRequest = {
    
    apiVersion:2,
    apiVersionMinor:0,
    allowedPaymentMethods:[
      {
        type:'CARD',
        parameters:{
          allowedAuthMethods:['PAN_ONLY','CRYPTOGRAM_3DS'],
          allowedCardNetworks:['AMEX', 'DISCOVER', 'INTERAC', 'JCB', 'MASTERCARD', 'VISA']
        },
        tokenizationSpecification:{
          type:'PAYMENT_GATEWAY',
          parameters:{
            gateway:`${environment.gateway}`,
            gatewayMerchantId:`${environment.public_key}`
          }
        }
      }
    ],
    merchantInfo:{
      merchantId:`01234567890123456789`,
      merchantName:'Demo Shop'
    },
      transactionInfo:{
      totalPriceStatus:'FINAL',
      totalPriceLabel:'Total',
      totalPrice:'100',
      currencyCode:'EUR',
      countryCode:'DE'
    },
    callbackIntents:['PAYMENT_AUTHORIZATION']
  };

  onLoadPaymentData = (event: Event): void =>{
    const eventDetail =  event as CustomEvent<google.payments.api.PaymentData>;
    console.log(eventDetail);
  }

  onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler =(paymentData) =>{
    this.tokenizationDataObject = JSON.parse(paymentData.paymentMethodData.tokenizationData.token);
    
    if(this.tokenizationDataObject){
      this.isDisabledStep2 = false;
      this.tokenizationDataString = JSON.stringify(this.tokenizationDataObject, undefined,4);
      console.log(JSON.stringify(this.tokenizationDataObject));
    }    
    return{transactionState:'SUCCESS'}
  }

  onError = (event: ErrorEvent): void =>{
    console.error('error', event.error);
  }

  //Checkout API Calling Level Functions 
   //Bad practice - Use services for this. This is just a demo.

  getCKOToken(event: Event){

   let tokenObject: any = {
    type:"googlepay",
    token_data: {
      protocolVersion : this.tokenizationDataObject["protocolVersion"],
      signature :  this.tokenizationDataObject["signature"],
      signedMessage : this.tokenizationDataObject["signedMessage"]
    }
  }

    return this.http.post<any>(`${environment.baseAPIUrl}/tokens`, tokenObject, {
      headers: { 
          Authorization: `${environment.public_key}`
      }
  }).subscribe(data =>{
    console.log(data);
   this.ckoToken = data["token"];
  });
  }

requestPayment(event: Event){
  let paymentRequest: any = 
  {
    "source": {
      "type": "token",
      "token": `${this.ckoToken}`
    },
    "amount": 100,
    "currency": "EUR"
  }  
    this.http.post<any>(`${environment.baseAPIUrl}/payments`, paymentRequest, {
    headers: { 
        Authorization: `${environment.secret_key}`
    }
}).subscribe(data => {
 console.log(data["id"]);
 this.paymentID = data["id"];
});
}
}
