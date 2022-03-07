// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  gateway: "checkoutltd",
  gatewayMerchantID: "pk_sbox_7za2ppcb4pw7zzdkfzutahfjl4t",
  baseAPIUrl:"https://api.sandbox.checkout.com",
  //public_key:"pk_test_fa6df4e6-6c34-4560-82e9-f407f86c18fc", //MBC
  //secret_key:"sk_test_cb8572cb-715a-4e6f-866e-cd85df2b8f35" //MBC
  public_key:"pk_sbox_7za2ppcb4pw7zzdkfzutahfjl4t", //NAS
  secret_key: "Bearer sk_sbox_dqmcmja373yetcnwkrwi6x6biyv" //NAS
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
