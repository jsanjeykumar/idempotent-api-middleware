enum ErrorCode {
    E000 = `Unexpected Error`,
    E001 = `Invalid Transaction.Contact FR8`,
    E002 = `Error while updating token`,
    E003 = `Unable to Create New token.Already an Active Token exists`,
    E004 = `Un-Authorized`,
    E05 = "Invalid Graphql Config"
}
export { ErrorCode };