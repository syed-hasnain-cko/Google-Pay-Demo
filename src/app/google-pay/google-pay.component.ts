import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import { TokenRequestService } from '../services/token-request.service';
import { PaymentRequestService } from '../services/payment-request.service';
import { TokenDataModel, TokenRequestModel } from '../models/token-request';
import { PaymentRequestModel, Source } from '../models/payment-request';

@Component({
  selector: 'app-google-pay',
  templateUrl: './google-pay.component.html',
  styleUrls: ['./google-pay.component.scss']
})
export class GooglePayComponent implements OnInit {

  constructor(private tokenRequestService: TokenRequestService,
    private paymentRequestService: PaymentRequestService){
  }

  tokenizationDataString: any = {};
  tokenizationDataObject: any = {};
  ckoTokenData: any = {};
  ckoToken: any = {};
  isDisabledStep2: boolean = true;
  paymentID: any ={};

  ngOnInit(): void {
  }

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
      this.tokenizationDataString = JSON.stringify(this.tokenizationDataObject, undefined,2);
      console.log(this.tokenizationDataString);
    }    
    return{transactionState:'SUCCESS'}
  }

  onError = (event: ErrorEvent): void =>{
    console.error('error', event.error);
  }

  getCKOToken(event: Event){

    let tokenObject: TokenRequestModel = new TokenRequestModel(
      "googlepay",
       <TokenDataModel>this.tokenizationDataObject
    );
      
    this.tokenRequestService.getCKOToken(tokenObject).subscribe(data =>{
    console.log(data);
    this.ckoToken = data["token"];
  });
  }

requestPayment(event: Event){
  
  let paymentRequestModel: PaymentRequestModel = new PaymentRequestModel(
    100,
    "EUR",
    new Source(
      this.ckoToken,
      "token"
    )
  ) 
      this.paymentRequestService.requestPayment(paymentRequestModel).subscribe(data => {
      console.log(data["id"]);
      this.paymentID = data["id"];
});
}

makeAnotherPayment(event:Event){
  window.location.reload();
}

}
