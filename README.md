<div align="center" id="top"> 
  <img src="https://www.fr8.in/images/logo.png" alt="Ideompotentcy Validator" />

  &#xa0;

</div>

<h1 align="center">Idempotentcy Validator - beta</h1>

<p align="center">
  <a href="#about">About</a> &#xa0; | &#xa0; 
  <a href="#features">Features</a> &#xa0; | &#xa0;
  <a href="#configuration">Configuration</a> &#xa0; | &#xa0;
  <a href="#technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#license">License</a>
</p>

<br>

## :About ##

I am an express js API middleware .I will make your API request Idempotent and restrict duplicate API request.

## :Features ##
* create an active token for each post request
* validate token on each request 

## :Configuration ##

```js
import express from 'express'
import {GqlConfig, validateToken, getActiveToken } from 'ideompotent-a'
const app = express()

const gqlConfig:GqlConfig = new GqlConfig('https://graphqlhost.in/v1/graphql')
let headers = { 'auth' :'xxxx'}
gqlConfig.setHeaders(headers)
const graphqlConfig:GraphQLClient  = gqlConfig.getGqlConfig()

app.use(validateToken)
```

## :Technologies ##

The following tools were used in this project:
- [typeScript](https://www.typescriptlang.org/)
- [node.js](https://nodejs.org/en/)
- [express](https://expressjs.com/)
- [lodash](https://lodash.com/)
- [graphql](https://graphql.org/graphql-js/)
- [graphql-request](https://www.npmjs.com/package/graphql-request)
- [uuid](https://www.npmjs.com/package/uuid)



## :Requirements ##

### API Convention
Just add <b>/secured</b> in your API uri \
eg : https://127.0.0.1/secured/book/now

- The API uri that contains "/secured" will be validated for idempotency

- Before hitting the secured API call **getActiveToken(ref_id:number ,process:string )** and get the unique token for the API.

- While hitting the secured API set the header **'idempotent-token'** and **'process'**

eg:
```js
let process = 'PAY_NOW'
let unique_token:string = getActiveToken(ref_id:number ,process:string )
```
curl --location --request POST 'http://localhost:/order/now' \
--header 'Content-Type: application/json' \
--header 'idempotent-token: unique_token' \
--header 'process: PAY_NOW' \
--data-raw '{
    "member_id": 3018,
    "amount": 10,
    "created_by": "abc@123.in"
}' 

### Database Configuration
Make your Database like this 
* Schema :<b>  transaction</b>
 * #### Table  :  <b>token</b>
   * Fields : \
    id :In---> auto-generated id\
    ref_id :Int                 ---> process respective to transaction (eg: bank_account_no,employee_id)\
    token :String               ---> auto-generated UUID -> primary key\
    process :String             ---> process name (Foreign key to )\
    is_active :Boolean          ---> token status\
    is_request_received:Boolean ---> token request received at\
    request:String              ---> Request\
    request_received_at:timestamp\
    initiated_at:timestamp\
    response:String             ---> Response\
    completed_at:timestamp\
    status:String               ---> transction status\
    steps:String                ---> Error Occured Stage

 * #### Table  :  <b>process</b>
   * Fields :\
    id :Int                     ---> auto-generated id\
    name:String                 ---> process name (eg: BOOK_ORDER,CANCEL_ORDER )\
    entity:String               ---> process respective to (eg: ORDER , PAYMENT )
    
* ### Graphql  :
 Either use Hasura Graphql Query  or Follow Hasura Graphql Query Standards for Graphql Query and mutation for Database actions \
  eg:
```graphql
 query getToken(($token: String!) {
    transaction_token_by_pk(token: $token) {
    ref_id
    is_active
    is_request_received
    request
    response
    process
    initiated_at
    completed_at
       }
}
 ```
## :License ##

This project is  un-licensed.


Developed by <a href="https://github.com/jsanjeykumar" target="_blank">Sanjay Kumar</a> 
<p>Contact :sanjay.k@fr8.in&#xa0;</p>

<a href="#top">Back to top</a>
