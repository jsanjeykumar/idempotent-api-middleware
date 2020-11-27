import express from 'express'
const router = express.Router()
import { ApiResponse, Status } from '../temp/ApiResponse'
import { getActiveToken } from '../validator';

import { ActiveTokenRequest, TOKEN } from './types';

export { GqlConfig, validateToken } from '../validator'


router.post('/active/token', async (req: express.Request, res: express.Response) => {
    let activeTokenRequest = <ActiveTokenRequest>req.body

    const { isSuccessful, description, result } = await getActiveToken(activeTokenRequest.ref_id, activeTokenRequest.process)
    if (isSuccessful) {
        return res.status(200).send(new ApiResponse({ status: Status.OK, result: result }))
    }
    return res.status(500).send(new ApiResponse({ status: Status.NOT_OK, description }))
})

router.post(`${TOKEN.URI}/bank/track`, async (req, res) => {
    return res.status(200).send(new ApiResponse({ status: Status.OK, description:"" }))
})


export default router;