import { Request, Response, NextFunction } from 'express'

import TokenService from './TokenService'
import { ApiResponse, Status } from '../temp/ApiResponse';
import { isNil } from 'lodash';
import { ErrorCode } from './utils/ErrorCode';
import ApplicationError from './utils/ApplicationError';
import { TOKEN,APIResponse } from './types';
import { STATUS } from './tokenConstants';


let tokenService: TokenService = new TokenService();

let validateToken = async (req: Request, res: Response, next: NextFunction) => {
    
    let url = req.originalUrl;
    if (url.includes(TOKEN.URI)) {
        try {
            let token = req.header(TOKEN.HEADER)
            let process = req.header(TOKEN.PROCESS)
            console.log("token - {}", token)
            console.log("process - {}", process)

            if (isNil(token) || isNil(process)) {
                throw new ApplicationError(ErrorCode.E004, `INVALID_TOKEN`)
            }
            
            let isActive: boolean = await tokenService.isActiveToken(token, process , JSON.stringify(req.body))
            console.log(`token - ${token} status -  ${isActive}`)
            if (!isActive) {
                throw new ApplicationError(ErrorCode.E004, `INVALID_TOKEN`)
            }
            await deactivateToken( req,res);
        }
        catch (error) {
            let description: string = ErrorCode.E000;
            if (error instanceof ApplicationError) {
                description = error.message
            }
            return res.status(401).send(new ApiResponse({ status: Status.NOT_OK, description }))
            
        }

    }
    next();
};

async function  deactivateToken( req:Request,res: Response) {
    let responseObject: APIResponse;
    let sentResponse = res.send;
    
    //using this to get the response which we  sent in API call
    res.send = function (data): any {
        console.log('in reponse send', data);
        res.send = sentResponse;
        responseObject = data;
        return res.send(data);
    };
//on API ending this event will be triggered
    res.on('close',async () => {
        console.log("onclose event");
        let token = req.header(TOKEN.HEADER);

        if (isNil(token)) {
            throw new ApplicationError(ErrorCode.E004, `INVALID_TOKEN`);
        }
        console.log("responseObject after sent ", responseObject);
        console.log("token", token);
        let status = responseObject.status == Status.OK ? STATUS.SUCESS : STATUS.FAILED;
        await tokenService.deactiveAndCreateNewToken(token, responseObject.description, status, responseObject.steps);
    });
}

export default validateToken