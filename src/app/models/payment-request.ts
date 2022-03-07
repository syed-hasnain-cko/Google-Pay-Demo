
export class PaymentRequestModel {
    constructor(public amount: number, 
                public currency: string, 
                public processing_channel_id: string,
                public source: Source){}
 }
 export class Source{
    constructor(
        public token: string, 
        public type: string){}      
     } 