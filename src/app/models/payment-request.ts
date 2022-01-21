
// export interface PaymentRequestModel{
//     amount:          number;
//     currency:        string;
//     source:          Source;
// }

// export interface Source{
//     type: string;
//     token: string;
// } 
export class PaymentRequestModel {
    constructor(public amount: number, 
                public currency: string, 
                public source: Source){}
 }
 export class Source{
    constructor(
        public token: string, 
        public type: string){}      
     } 