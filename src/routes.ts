import express from 'express'
const router = express.Router()
import { ApiResponse, Status } from '../temp/ApiResponse'

import TokenService from './TokenService';

import { ActiveTokenRequest, TOKEN } from './types';



const tokenService = new TokenService()



router.post('/active/token', async (req: express.Request, res: express.Response) => {
    let activeTokenRequest = <ActiveTokenRequest>req.body
    const { isSuccessful, description, result } = await tokenService.getActiveToken(activeTokenRequest.ref_id, activeTokenRequest.process)
    if (isSuccessful) {
        return res.status(200).send(new ApiResponse({ status: Status.OK, result: result }))
    }
    return res.status(500).send(new ApiResponse({ status: Status.NOT_OK, description }))
})

router.post(`${TOKEN.URI}/bank/track`, async (req, res) => {
    return res.status(200).send(new ApiResponse({ status: Status.OK, description:"" }))
})


export default router;