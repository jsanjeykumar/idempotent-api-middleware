# Who I am ?
Idempotent API Filter
# What I Do ?
  I will make your API request Idempotent and restrict duplicate API request if you follow my standards

# How can you configure me ?

import express from 'express'
import {GqlConfig,validateToken} from 'ideompotent-a'
const app = express()

const gqlConfig:GqlConfig = new GqlConfig('https://graphqlhost.in/v1/graphql')
let headers = { 'auth' :'xxxx'}
gqlConfig.setHeaders(headers)
const graphqlConfig:GraphQLClient  = gqlConfig.getGqlConfig()

app.use(validateToken)


# Database Configuration
* Schema :  transaction
* Table : token
* Fields :
    id :Int                     -> auto-generated id
    ref_id :Int                 -> process respective to transaction (eg: bank_account_no,employee_id  )
    token :String               -> auto-generated UUID -> primary key
    process :String             -> process name (Foreign key to )
    is_active :Boolean          -> token status
    is_request_received:Boolean -> token request received at
    request:String              -> Request
    request_received_at:timestamp
    initiated_at:timestamp
    response:String             -> Response
    completed_at:timestamp
    status:String               -> transction status
    steps:String                -> Error Occured Stage

* Table : process
* Fields :
    id :Int                     -> auto-generated id
    name:String                 -> process name (eg: BOOK_ORDER,CANCEL_ORDER )
    entity:String               -> process respective to (eg: ORDER , PAYMENT )
   
# Graphql
 Either use Hasura Graohql Query  or Follow Hasura Graohql Query Standards for Graphql Query and mutation


