<div align="center" id="top"> 
  <img src="https://www.fr8.in/images/logo.png" alt="Ideompotentcy Validator" />

  &#xa0;

</div>

<h1 align="center">Idempotentcy Validator</h1>

<p align="center">
  <a href="#about">About</a> &#xa0; | &#xa0; 
  <a href="#features">Features</a> &#xa0; | &#xa0;
  <a href="#technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#configuration">Configuration</a> &#xa0; | &#xa0;
  <a href="#requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#license">License</a>
</p>

<br>

## :About ##

I am an express js API middleware .I will make your API request Idempotent and restrict duplicate API request.

## :Features ##
* create an active token for each post request
* validate token on each request 

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

### Database Configuration
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
 Either use Hasura Graphql Query  or Follow Hasura Graphql Query Standards for Graphql Query and mutation for Database actions

## :Configuration ##

```js
import express from 'express'
import {GqlConfig,validateToken} from 'ideompotent-a'
const app = express()

const gqlConfig:GqlConfig = new GqlConfig('https://graphqlhost.in/v1/graphql')
let headers = { 'auth' :'xxxx'}
gqlConfig.setHeaders(headers)
const graphqlConfig:GraphQLClient  = gqlConfig.getGqlConfig()

app.use(validateToken)
```

## :License ##

This project is  un-licensed.


Made with :heart: by <a href="https://github.com/jsanjeykumar" target="_blank">Sanjay Kumar</a>

&#xa0;

<a href="#top">Back to top</a>
