import { gql, GraphQLClient } from 'graphql-request';
//import { graphqlConfig as gqlConfig  } from './config/config'
import { GqlConfig } from './config/graphqlConfig';
import {
  PartnerToken, UpdatePartnerTokenResult
} from './types'
import { ErrorCode } from './utils/ErrorCode'
import { now, isNil } from 'lodash';
import ApplicationError from './utils/ApplicationError';

const gqlConfig:GqlConfig = new GqlConfig('https://dcore.olog.in/v1/graphql')
let headers = { 'x-hasura-admin-secret' :'freightolog@123'}
gqlConfig.setHeaders(headers)
const graphqlConfig:GraphQLClient  = gqlConfig.getGqlConfig()

const currentTime = new Date().toISOString();

const _getTokenDetailsQuery = gql`query getToken${now()}(($token: String!) {
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
`
const getTokenDetails = async (token: string) =>
  <PartnerToken>await graphqlConfig.request(_getTokenDetailsQuery, { token })
    .then(data => data.transaction_token_by_pk)

const _getActiveTokenQuery = gql`query getToken${now()}($ref_id: Int!, $is_active: Boolean!, $process: String!) {
  transaction_token(where: {ref_id: {_eq: $ref_id}, is_active: {_eq: $is_active}, process: {_eq: $process}}) {
    token
  }
}
`
const getActiveToken = async (ref_id: number, process: string, is_active: boolean) => {

  let activeToken = await graphqlConfig.request(_getActiveTokenQuery, { ref_id, is_active, process })
    .then(data => data.transaction_token)

  if (activeToken.length == 0) {
    return null
  }
  if (activeToken.length > 1) {
    throw new ApplicationError(ErrorCode.E001, `INVALID_TOKEN`)
  }
  return activeToken[0].token;
}

const _isActiveTokenQuery = gql`query isActiveToken($token: String!, $process: String!, $is_request_received: Boolean!, $is_active: Boolean!) {
  transaction_token(where: {token: {_eq: $token}, process: {_eq: $process}, is_request_received: {_eq: $is_request_received}, is_active: {_eq: $is_active}}) {
    token
  }
}
`
const isActiveToken = async (token: string, process:string , is_request_received: boolean, is_active: boolean) => {

  let activeToken = <Array<PartnerToken>>await graphqlConfig.request(_isActiveTokenQuery, { token, process , is_request_received, is_active })
    .then(data => data.transaction_token)
  console.log("activeToken promiose ", activeToken)

  if (activeToken.length != 1) {
    return false
  }
  return true
}
const _createTokenQuery = gql`mutation createToken($token: String!, $ref_id: Int!, $is_active: Boolean!, $process: String!) {
  insert_transaction_token_one(object: {token: $token, ref_id: $ref_id, is_active: $is_active, process: $process}) {
    token
  }
}
`
const createToken = async (token: string, ref_id: number, is_active: boolean, process: string) => {

  let createdToken: string = await graphqlConfig.request(_createTokenQuery, { token, ref_id, is_active, process })
    .then(data => data.insert_transaction_token_one.token)
  console.log('createToken query- ', createdToken)
  if (isNil(createdToken)) {
    throw new ApplicationError(ErrorCode.E001, `INVALID_TOKEN`)
  }

  return createdToken
}

const _updateRequestReceivedInTokenQuery = gql`mutation updateToken($token: String!, $is_active: Boolean!, $is_request_received: Boolean!, $request: String!, $request_received_at: timestamp!) {
  update_transaction_token(where: {token: {_eq: $token}, is_active: {_eq: $is_active},is_request_received: {_eq: $is_request_received}, }, _set: {is_request_received: true,request: $request, request_received_at: $request_received_at}) {
    affected_rows
  }
}
`
const updateRequestReceivedInToken = async (token: string, is_active: boolean, is_request_received: boolean, request: string) => {
  let affected_rows = await graphqlConfig.request(_updateRequestReceivedInTokenQuery, { token, is_active, is_request_received, request, request_received_at: currentTime })
    .then(data => data.update_transaction_token.affected_rows)
  console.log(" updateRequestReceivedInToken - ", affected_rows)
  if (affected_rows != 1) {
    return false
  }
  return true
}
const _deactivateTokenQuery = gql`mutation deactivateToken($token: String!, $is_active: Boolean!, $response: String, $status: String!, $completed_at: timestamp!, $steps: String) {
  update_transaction_token(where: {token: {_eq: $token}}, _set: {is_active: $is_active, response: $response, status: $status, completed_at: $completed_at, steps: $steps}) {
    affected_rows
    returning {
      ref_id
      process
    }
  }
}
`
const deactivateToken = async (token: string, is_active: boolean, response: string | undefined, status: string, steps: string| undefined) => {

  let tokenData = <UpdatePartnerTokenResult>await graphqlConfig.request(_deactivateTokenQuery, { token, is_active, response, status, steps, completed_at: currentTime })

  if (tokenData.update_transaction_token.affected_rows != 1) {
    throw new ApplicationError(ErrorCode.E002, `TOKEN_VALIDATION`)
  }
  let updatedTokenDetails = tokenData.update_transaction_token.returning[0];
  console.log("deactivatedToken - ", updatedTokenDetails)

  let ref_id = updatedTokenDetails.ref_id
  let process = updatedTokenDetails.process
  return { ref_id, process }
}
const _getTokenAggregateQuery = gql`query getTokenAggregate${now()}($ref_id: Int!, $process: String!, $is_active: Boolean!) {
  transaction_token_aggregate(where: {ref_id: {_eq: $ref_id}, is_active: {_eq: $is_active}, process: {_eq: $process}}) {
    aggregate {
      count
    }
  }
}
`
const getActiveTokenCountByPartnerIdAndProcessName = async (ref_id: number, process: string, is_active: boolean) => {
  let activeTokenCountByPartnerIdAndProcess: number = await graphqlConfig.request(_getTokenAggregateQuery, { ref_id, process, is_active })
    .then(data => data.transaction_token_aggregate.aggregate.count)
  console.log("getActiveTokenCountByPartnerIdAndProcess - {}", activeTokenCountByPartnerIdAndProcess)
  return activeTokenCountByPartnerIdAndProcess

}

export {
  getTokenDetails, getActiveToken, isActiveToken, createToken, updateRequestReceivedInToken,
  deactivateToken, getActiveTokenCountByPartnerIdAndProcessName
}
