import { Request, Response, NextFunction } from 'express'

let loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let method = req.method;
    let url = req.originalUrl;
    const start = process.hrtime();

    console.log(`Before Request[uri=${url},method=${method},payload=${JSON.stringify(req.body)}]`);

    res.on('close', () =>
        console.log(`After Request[uri=${url},method=${method},Duration:${getDurationInMilliseconds(start)}ms]`))

    next();
};
const getDurationInMilliseconds = (start: any) => {
    const NS_PER_SEC = 1e9
    const NS_TO_MS = 1e6
    const diff = process.hrtime(start)
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

export default loggerMiddleware