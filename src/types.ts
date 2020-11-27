
enum TOKEN {
   HEADER = 'idempotent-token',
   PROCESS='process',
   URI = '/secured'
}

interface PartnerToken {
   token: string
   ref_id: number
   is_active: boolean
   is_request_received: boolean
   process: string
   request?: JSON
   response?: JSON
   initiated_at?: string
   completed_at?: string
   status?: string
}

interface UpdatePartnerTokenResult {
   update_transaction_token: {
      affected_rows: number
      returning:
      [{
         process: string
         ref_id: number
      }]
   }
}
interface InsertPartnerTokenResult {
   insert_transaction_token_one: {
      affected_rows: number
      returning: [
         token: string
      ]
   }
}

interface PartnerTokenAggregate {
   transaction_token_aggregate: {
      aggregate: {
         count: number
      }
   }
}
interface ActiveTokenRequest {
   ref_id: number
   process: string
}
interface APIResponse{
   status: string
     description?: string
     result?: any
     steps?:string
}


export {
   PartnerToken, InsertPartnerTokenResult, UpdatePartnerTokenResult,
   PartnerTokenAggregate, TOKEN, ActiveTokenRequest,APIResponse
};
