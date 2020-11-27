import { GraphQLClient } from 'graphql-request'
import { isNil } from 'lodash';
import ApplicationError from '../utils/ApplicationError';
import { ErrorCode } from '../utils/ErrorCode';


export class GqlConfig {

    private gqlConfig: any = undefined
    constructor(host: string) {
        this.gqlConfig = new GraphQLClient(host)
    }
    setHeaders(headers: any) {
        if (!isNil(this.gqlConfig) && !isNil(headers)) {
            this.gqlConfig.setHeaders(headers)
        }
    }
    getGqlConfig = () => {
        if (isNil(this.gqlConfig)) { 
            throw new ApplicationError(ErrorCode.E05,'GRAPHQL_CONFIG')
        }
        return <GraphQLClient>this.gqlConfig
    };

}

