# GooglePayIntegration

#Requirements: 

Node, NPM, Angular CLI (All latest stable versions would work)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.18.

# Set/Run Deveopment Environment

- git clone https://github.com/syed-hasnain-cko/Google-Pay-Demo.git

- Run `npm install` to install all dependencies.

- Run `ng serve --hmr` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# Configuration:

If you need to test for your own checkout sandbox environment, change the following properties in environments/environment.ts:

- gatewayMerchantID = <your_public_key> (starting with pk_xxxx)
- public_key = <your_public_key> (starting with pk_xxxx)
- secret_key = <your_secret_key> (starting with sk_xxxx)

Serve the application again and happy testing.
