
import {
    getTokenDetails, getActiveToken, isActiveToken, createToken,
    updateRequestReceivedInToken, deactivateToken, getActiveTokenCountByPartnerIdAndProcessName
} from './tokenQuery'
import { PartnerToken } from './types'
import { ErrorCode } from './utils/ErrorCode'
import { v4 as uuidv4 } from 'uuid';
import ApplicationError from './utils/ApplicationError';
import { isNil } from 'lodash';
import { Request, Response } from 'express'
import { TOKEN } from './types';
import { ApiResponse, Status } from './../temp/ApiResponse'


export default class TokenService {
    public async getTokenDetails(token: string) {
        let tokenDetails: PartnerToken = await getTokenDetails(token)
        console.log("getIdempotentTokenDetails - {}", tokenDetails)
        return tokenDetails
    }
    public async getActiveToken(ref_id: number, process: string) {
        try {
            let isActive = true;
            let token = await getActiveToken(ref_id, process, isActive)
            console.log('token - ', token)

            if (isNil(token)) {
                let newtoken = await this.generateIdempotentToken(ref_id, process)
                if (isNil(newtoken)) {
                    throw new ApplicationError(ErrorCode.E001, `INVALID_TOKEN`)
                }
                return { isSuccessful: true, result: newtoken }
            }
            return { isSuccessful: true, result: token }
        }
        catch (error) {
            console.log("error while getting activeToken", error)
            let description: string = ErrorCode.E000;
            if (error instanceof ApplicationError) {
                description = error.message
            }
            return { isSuccessful: false, description: description }
        }

    }
    public async isActiveToken(token: string, process:string,request: string) {
        let is_request_received = false;
        let is_active = true
        let isActive = await isActiveToken(token, process , is_request_received, is_active)
        console.log("isActiveToken - {}", isActive)
        return isActive && this.updateRequestReceivedInToken(token, request)

    }
    public async generateIdempotentToken(ref_id: number, process: string) {
        let is_active = true
        let activeTokenCountByCardCodeAndProcess: any = await getActiveTokenCountByPartnerIdAndProcessName(ref_id, process, is_active);
        console.log("activeTokenCountByCardCodeAndProcess- {}", activeTokenCountByCardCodeAndProcess)
        if (activeTokenCountByCardCodeAndProcess !== 0) {
            throw new ApplicationError(ErrorCode.E003, `INVALID_TOKEN`)
        }
        let token = uuidv4()
        let isActive = true;
        let createdToken = await createToken(token, ref_id, isActive, process)
        console.log('createdToken - ', createdToken)
        return createdToken

    }

    public async updateRequestReceivedInToken(token: string, request: string) {
        console.log('updating request received in token - ', token)
        let isRequestReceived = false;
        let is_active = true;
        return await updateRequestReceivedInToken(token, is_active, isRequestReceived, request)
    }
    public async deactiveAndCreateNewToken(token: string, response: string | undefined, status: string, steps: string | undefined) {

        let is_active = false;
        let { ref_id, process } = await deactivateToken(token, is_active, response, status, steps)
        await this.generateIdempotentToken(ref_id, process)
    }

    public async isTokenNull(request: Request, response: Response) {
        console.log("token data",request)
        let token = request.header(TOKEN.HEADER)
        return isNil(token) ?
            response.status(401).send(new ApiResponse({ status: Status.NOT_OK, description: ErrorCode.E004 })) : token
    }

}