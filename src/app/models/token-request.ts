// export interface TokenRequestModel{
//     type:          string;
//     token_data:        TokenDataModel;
// }

// export interface TokenDataModel{
//     protocolVersion: string;
//     signature: string;
//     signedMessage: string;
// }

export class TokenRequestModel{
    constructor(
        public type: string, 
        public token_data: TokenDataModel
    ){}
    
}

export class TokenDataModel{
    constructor(
        public protocolVersion: string,
        public signature: string,
        public signedMessage: string,
    ){}
   
}