import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Google Pay Demo';
  constructor(private http: HttpClient){

  }
  gateway_CKO: String = "checkoutltd"
  public_API_key_CKO : String = "pk_test_fa6df4e6-6c34-4560-82e9-f407f86c18fc";
  secret_API_key_CKO : String = "sk_test_cb8572cb-715a-4e6f-866e-cd85df2b8f35";
  baseURL : String = "https://api.sandbox.checkout.com";
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
            gateway:`${this.gateway_CKO}`,
            gatewayMerchantId:`${this.public_API_key_CKO}`
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

    return this.http.post<any>(`${this.baseURL}/tokens`, tokenObject, {
      headers: { 
          Authorization: `${this.public_API_key_CKO}`
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
    this.http.post<any>(`${this.baseURL}/payments`, paymentRequest, {
    headers: { 
        Authorization: `${this.secret_API_key_CKO}`
    }
}).subscribe(data => {
 console.log(data["id"]);
 this.paymentID = data["id"];
});
}
}
